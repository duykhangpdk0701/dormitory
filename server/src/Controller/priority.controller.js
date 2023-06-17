const Priority = require('../Model/priority.model');

class PriorityController {
    async showAll(req, res) {
        try {
            const filter = req.query || null
            let aggregate = [
                {
                    $match: {
                        deleted: { $ne: true }
                    }
                },
            ]
            if (filter) {
                if (filter.search) {
                    aggregate.push(
                        {
                            $match: {
                                $or: [
                                    { name: { $regex: filter.search || '', $options: "i" } },
                                    { score: { $regex: filter.search || '', $options: "i" } },
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
            const priorities = aggregate.length > 0 ? await Priority.aggregate(aggregate) : await Priority.find({})
            res.json({ success: true, data: priorities})
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async show(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Thiếu id' })
        try {
            const priority = await Priority.findById(id)
            if (!priority) return res.json({ success: false, messages: 'Invalid priority' })
            res.json({ success: true, data: priority })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async store(req, res) {
        try {
            const priority = new Priority(req.body)
            await priority.save()
            res.json({ success: true, messages: 'Tạo thành công', data: req.body })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message})
        }
    }

    async update(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Thiếu id' })
        try {
            const priority = await Priority.updateOne({ _id: id }, req.body, { new: true })
            if (!priority) return res.json({ success: false, messages: 'Cant update priority' })
            res.json({ success: true, messages: 'Cập nhật thành công' })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async delete(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Thiếu id' })
        try {
            const priority = await Priority.deleteOne({ _id: id })
            if (!priority) return res.status(401).json({ success: false, messages: 'Cant delete priority' })
            res.json({ success: true, messages: 'Xoá thành công' })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Lỗi hệ thống' })
        }
    }
}

module.exports = new PriorityController()