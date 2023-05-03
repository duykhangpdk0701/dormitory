const mongoose = require('mongoose');
const Violation = require('../Model/violation.model');
const Account = require('../Model/user.model');
const Address = require('../Model/address.model');

class ViolationController {
    async showAll(req, res) {
        try {
            const filter = req.query || null
            let aggregate = []
            const deFault = [
                {
                    $lookup: {
                        from: "civilians",
                        localField: "civilianId",
                        foreignField: "_id",
                        as: "civilian"
                    }
                },
                { $unwind: '$civilian' },
                {
                    $lookup: {
                        from: "users",
                        localField: "civilian.accountId",
                        foreignField: "_id",
                        as: "civilian.account"
                    }
                },
                { $unwind: '$civilian.account' },
                {
                    $lookup: {
                        from: "addresses",
                        localField: "civilian.address",
                        foreignField: "_id",
                        as: "civilian.address"
                    }
                },
                { $unwind: '$civilian.address' },
                { $sort: { createdAt: -1 } }
            ]
            aggregate = aggregate.concat(deFault)
            if (filter) {
                if (filter.search) {
                    aggregate.push(
                        {
                            $match: {
                                $or: [
                                    { title: { $regex: filter.search || '', $options: "i" } },
                                    { description: { $regex: filter.search || '', $options: "i" } },
                                    { status: { $regex: filter.search || '', $options: "i" } },
                                    { processing: { $regex: filter.search || '', $options: "i" } },
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
            const violations = await Violation.aggregate(aggregate)
            res.json({ success: true, data: violations})
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async show(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const aggregate = [
                { $match: { _id: new mongoose.Types.ObjectId(id) } },
                {
                    $lookup: {
                        from: "civilians",
                        localField: "civilianId",
                        foreignField: "_id",
                        as: "civilian"
                    }
                },
                { $unwind: '$civilian' },
                {
                    $lookup: {
                        from: "users",
                        localField: "civilian.accountId",
                        foreignField: "_id",
                        as: "civilian.account"
                    }
                },
                { $unwind: '$civilian.account' },
                {
                    $lookup: {
                        from: "addresses",
                        localField: "civilian.address",
                        foreignField: "_id",
                        as: "civilian.address"
                    }
                },
                { $unwind: '$civilian.address' },
                { $sort: { createdAt: -1 } }
            ]
            let violation = await Violation.aggregate(aggregate)
            violation = violation[0]
            if (!violation) return res.json({ success: false, messages: 'Invalid violation' })
            res.json({ success: true, data: violation })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async store(req, res) {
        try {
            const violation = new Violation(req.body)
            await violation.save()
            res.json({ success: true, messages: 'Create successfully', data: violation })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message})
        }
    }

    async update(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const violation = await Violation.updateOne({ _id: id }, req.body, { new: true })
            if (!violation) return res.json({ success: false, messages: 'Cant update violation' })
            res.json({ success: true, messages: 'Update successfully ' })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async delete(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const violation = await Violation.deleteOne({ _id: id })
            if (!violation) return res.status(401).json({ success: false, messages: 'Cant delete violation' })
            res.json({ success: true, messages: 'Delete successfully' })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }
}

module.exports = new ViolationController()