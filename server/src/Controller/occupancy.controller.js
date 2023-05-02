const mongoose = require('mongoose');
const Occupancy = require('../Model/occupancy.model');

class OccupancyController {
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
                        from: "roomtypes",
                        localField: "room.roomType",
                        foreignField: "_id",
                        as: "room.roomType"
                    }
                },
                { $unwind: '$room.roomType' },
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
            const occupancies = await Occupancy.aggregate(aggregate)
            res.json({ success: true, data: occupancies})
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
                        from: "roomtypes",
                        localField: "room.roomType",
                        foreignField: "_id",
                        as: "room.roomType"
                    }
                },
                { $unwind: '$room.roomType' },
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
            let occupancy = await Occupancy.aggregate(aggregate)
            occupancy = occupancy[0]
            if (!occupancy) return res.json({ success: false, messages: 'Invalid occupancy' })
            res.json({ success: true, data: occupancy })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async store(req, res) {
        try {
            const occupancy = new Occupancy(req.body)
            await occupancy.save()
            res.json({ success: true, messages: 'Create successfully', data: req.body })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message})
        }
    }

    async update(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const occupancy = await Occupancy.updateOne({ _id: id }, req.body, { new: true })
            if (!occupancy) return res.json({ success: false, messages: 'Cant update occupancy' })
            res.json({ success: true, messages: 'Update successfully ' })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async delete(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const occupancy = await Occupancy.deleteOne({ _id: id })
            if (!occupancy) return res.status(401).json({ success: false, messages: 'Cant delete occupancy' })
            res.json({ success: true, messages: 'Delete successfully' })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }
}

module.exports = new OccupancyController()