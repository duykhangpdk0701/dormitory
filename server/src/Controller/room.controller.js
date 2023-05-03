const mongoose = require('mongoose')
const Room = require('../Model/room.model');

class RoomController {
    async showAll(req, res) {
        try {
            const filter = req.query || null
            let aggregate = []
            const deFault = [
                {
                    $lookup: {
                        from: "roomtypes",
                        localField: "roomType",
                        foreignField: "_id",
                        as: "roomType"
                    }
                },
                { $unwind: '$roomType' },
                {
                    $lookup: {
                        from: "devices",
                        localField: "_id",
                        foreignField: "roomId",
                        as: "devices"
                    }
                },
                { $sort: { createdAt: -1 } }
            ]
            aggregate = aggregate.concat(deFault)
            if (filter) {
                if (filter.search) {
                    aggregate.push(
                        {
                            $match: {
                                $or: [
                                    { name: { $regex: filter.search || '', $options: "i" } },
                                    { description: { $regex: filter.search || '', $options: "i" } },
                                    { numberPeople: { $regex: filter.search || '', $options: "i" } },
                                    { numberBed: { $regex: filter.search || '', $options: "i" } },
                                    { length: { $regex: filter.search || '', $options: "i" } },
                                    { width: { $regex: filter.search || '', $options: "i" } },
                                    { price: { $regex: filter.search || '', $options: "i" } },
                                ]
                            }
                        }
                    )
                }
                if (filter.price) {
                    aggregate.push(
                        {
                            $sort: { price: parseInt(filter.price) }
                        }
                    )
                }
                if (filter.numberPeople) {
                    aggregate.push(
                        {
                            $sort: { numberPeople: parseInt(filter.numberPeople) }
                        }
                    )
                }
                if (filter.numberBed) {
                    aggregate.push(
                        {
                            $sort: { numberBed: parseInt(filter.numberBed) }
                        }
                    )
                }
                if (filter.area) {
                    aggregate.push(
                        {
                            $sort: { area: parseInt(filter.area) }
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
            const rooms = await Room.aggregate(aggregate)
            res.json({ success: true, data: rooms})
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async show(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const aggregate = [
                { $match: { _id : new mongoose.Types.ObjectId(id) } },
                {
                    $lookup: {
                        from: "roomtypes",
                        localField: "roomType",
                        foreignField: "_id",
                        as: "roomType"
                    }
                },
                { $unwind: '$roomType' },
                {
                    $lookup: {
                        from: "devices",
                        localField: "_id",
                        foreignField: "roomId",
                        as: "devices"
                    }
                },
            ]
            let room = await Room.aggregate(aggregate)
            room = room[0]
            if (!room) return res.json({ success: false, messages: 'Invalid room' })
            res.json({ success: true, data: room })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async store(req, res) {
        try {
            const room = new Room(req.body)
            await room.save()
            res.json({ success: true, messages: 'Create successfully', data: req.body })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message})
        }
    }

    async update(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const room = await Room.updateOne({ _id: id }, req.body, { new: true })
            if (!room) return res.json({ success: false, messages: 'Cant update room' })
            res.json({ success: true, messages: 'Update successfully ' })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async delete(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const room = await Room.deleteOne({ _id: id })
            if (!room) return res.status(401).json({ success: false, messages: 'Cant delete room' })
            res.json({ success: true, messages: 'Delete successfully' })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }
}

module.exports = new RoomController()