const mongoose = require('mongoose');
const Task = require('../Model/task.model');

class TaskController {
    async showAll(req, res) {
        try {
            const filter = req.query || null
            let aggregate = []
            const deFault = [
                {
                    $match: {
                        deleted: { $ne: true }
                    }
                },
                {
                    $lookup: {
                        from: "staffs",
                        localField: "staffId",
                        foreignField: "_id",
                        as: "staff"
                    }
                },
                { $unwind: '$staff' },
                {
                    $lookup: {
                        from: "jobs",
                        localField: "staff.job",
                        foreignField: "_id",
                        as: "staff.job"
                    }
                },
                { $unwind: '$staff.job' },
                {
                    $lookup: {
                        from: "users",
                        localField: "staff.accountId",
                        foreignField: "_id",
                        as: "staff.account"
                    }
                },
                { $unwind: '$staff.account' },
                {
                    $lookup: {
                        from: "addresses",
                        localField: "staff.address",
                        foreignField: "_id",
                        as: "staff.address"
                    }
                },
                { $unwind: '$staff.address' },
                { $sort: { createdAt: -1 } }
            ]
            aggregate = aggregate.concat(deFault)
            if (filter) {
                if (filter.status) {
                    aggregate.push(
                        {
                            $match: { status: filter.status }
                        }
                    )
                }
                if (filter.accountId) {
                    aggregate.push(
                        {
                            $match: { 'staff.accountId': new mongoose.Types.ObjectId(filter.accountId) }
                        }
                    )
                }
                if (filter.staffId) {
                    aggregate.push(
                        {
                            $match: { 'staff._id': new mongoose.Types.ObjectId(filter.staffId) }
                        }
                    )
                }
                if (filter.search) {
                    aggregate.push(
                        {
                            $match: {
                                $or: [
                                    { description: { $regex: filter.search || '', $options: "i" } },
                                    { status: { $regex: filter.search || '', $options: "i" } },
                                ]
                            }
                        }
                    )
                }
                if (filter.page) {
                    aggregate.push(
                        {
                            $skip: (filter.page - 1) * (filter.limit ? parseInt(filter.limit) : 0)
                        }
                    )
                }
                if (filter.limit) {
                    aggregate.push(
                        {
                            $limit: parseInt(filter.limit)
                        }
                    )
                }
            }
            const tasks = await Task.aggregate(aggregate)
            res.json({ success: true, data: tasks})
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async show(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Thiếu id' })
        try {
            const aggregate = [
                { $match: { _id: new mongoose.Types.ObjectId(id) } },
                {
                    $lookup: {
                        from: "staffs",
                        localField: "staffId",
                        foreignField: "_id",
                        as: "staff"
                    }
                },
                { $unwind: '$staff' },
                {
                    $lookup: {
                        from: "jobs",
                        localField: "staff.job",
                        foreignField: "_id",
                        as: "staff.job"
                    }
                },
                { $unwind: '$staff.job' },
                {
                    $lookup: {
                        from: "users",
                        localField: "staff.accountId",
                        foreignField: "_id",
                        as: "staff.account"
                    }
                },
                { $unwind: '$staff.account' },
                {
                    $lookup: {
                        from: "addresses",
                        localField: "staff.address",
                        foreignField: "_id",
                        as: "staff.address"
                    }
                },
                { $unwind: '$staff.address' },
                { $sort: { createdAt: -1 } }
            ]
            let task = await Task.aggregate(aggregate)
            task = task[0]
            if (!task) return res.json({ success: false, messages: 'Invalid task' })
            res.json({ success: true, data: task })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async store(req, res) {
        try {
            const task = new Task(req.body)
            await task.save()
            res.json({ success: true, messages: 'Tạo thành công', data: req.body })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message})
        }
    }

    async update(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Thiếu id' })
        try {
            const task = await Task.updateOne({ _id: id }, req.body, { new: true })
            if (!task) return res.json({ success: false, messages: 'Cant update task' })
            res.json({ success: true, messages: 'Cập nhật thành công' })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async start(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Thiếu id' })
        try {
            const task = await Task.updateOne({ _id: id }, {status: "Working"}, { new: true })
            if (!task) return res.json({ success: false, messages: 'Cant update task' })
            res.json({ success: true, messages: 'Update successfully'})
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async done(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Thiếu id' })
        try {
            const task = await Task.updateOne({ _id: id }, {status: "Done"}, { new: true })
            if (!task) return res.json({ success: false, messages: 'Cant update task' })
            res.json({ success: true, messages: 'Update successfully'})
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async cancel(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Thiếu id' })
        try {
            const task = await Task.updateOne({ _id: id }, {status: "Cancel"}, { new: true })
            if (!task) return res.json({ success: false, messages: 'Cant update task' })
            res.json({ success: true, messages: 'Update successfully'})
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async delete(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Thiếu id' })
        try {
            const task = await Task.deleteOne({ _id: id })
            if (!task) return res.status(401).json({ success: false, messages: 'Cant delete task' })
            res.json({ success: true, messages: 'Xoá thành công' })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Lỗi hệ thống' })
        }
    }
}

module.exports = new TaskController()