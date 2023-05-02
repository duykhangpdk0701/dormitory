const mongoose = require('mongoose');
const Device = require('../Model/device.model');

class DeviceController {
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
            const devices = await Device.aggregate(aggregate)
            res.json({ success: true, data: devices})
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
                { $sort: { createdAt: -1 } }
            ]
            let device = await Device.aggregate(aggregate)
            device = device[0]
            if (!device) return res.json({ success: false, messages: 'Invalid device' })
            res.json({ success: true, data: device })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async store(req, res) {
        try {
            const device = new Device(req.body)
            await device.save()
            res.json({ success: true, messages: 'Create successfully', data: req.body })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message})
        }
    }

    async update(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const device = await Device.updateOne({ _id: id }, req.body, { new: true })
            if (!device) return res.json({ success: false, messages: 'Cant update device' })
            res.json({ success: true, messages: 'Update successfully ' })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async delete(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const device = await Device.deleteOne({ _id: id })
            if (!device) return res.status(401).json({ success: false, messages: 'Cant delete device' })
            res.json({ success: true, messages: 'Delete successfully' })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }
}

module.exports = new DeviceController()