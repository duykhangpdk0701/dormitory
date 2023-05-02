const mongoose = require('mongoose');
const Contract = require('../Model/contract.model');

class ContractController {
    async showAll(req, res) {
        try {
            const filter = req.query || null
            let aggregate = []
            const deFault = [
                {
                    $lookup: {
                        from: "rooms",
                        localField: "roomId",
                        foreignField: "_id",
                        as: "room"
                    }
                },
                { $unwind: '$room' },
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
            const contracts = await Contract.aggregate(aggregate)
            res.json({ success: true, data: contracts})
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
                        from: "rooms",
                        localField: "roomId",
                        foreignField: "_id",
                        as: "room"
                    }
                },
                { $unwind: '$room' },
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
            let contract = await Contract.aggregate(aggregate)
            contract = contract[0]
            if (!contract) return res.json({ success: false, messages: 'Invalid contract' })
            res.json({ success: true, data: contract })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async store(req, res) {
        try {
            const contract = new Contract(req.body)
            await contract.save()
            res.json({ success: true, messages: 'Create successfully', data: req.body })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message})
        }
    }

    async update(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const contract = await Contract.updateOne({ _id: id }, req.body, { new: true })
            if (!contract) return res.json({ success: false, messages: 'Cant update contract' })
            res.json({ success: true, messages: 'Update successfully ' })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async delete(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const contract = await Contract.deleteOne({ _id: id })
            if (!contract) return res.status(401).json({ success: false, messages: 'Cant delete contract' })
            res.json({ success: true, messages: 'Delete successfully' })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }
}

module.exports = new ContractController()