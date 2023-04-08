const Room = require('../Model/room.model');

class RoomController {
    async showAll(req, res) {
        try {
            const rooms = await Room.find({});
            res.json({ success: true, data: rooms})
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async show(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const room = await Room.findById(id)
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