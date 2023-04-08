const RoomType = require('../Model/roomType.model');

class RoomTypeController {
    async showAll(req, res) {
        try {
            const roomTypes = await RoomType.find({});
            res.json({ success: true, data: roomTypes})
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async show(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const roomType = await RoomType.findById(id)
            if (!roomType) return res.json({ success: false, messages: 'Invalid roomType' })
            res.json({ success: true, data: roomType })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async store(req, res) {
        try {
            const roomType = new RoomType(req.body)
            await roomType.save()
            res.json({ success: true, messages: 'Create successfully', data: req.body })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message})
        }
    }

    async update(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const roomType = await RoomType.updateOne({ _id: id }, req.body, { new: true })
            if (!roomType) return res.json({ success: false, messages: 'Cant update roomType' })
            res.json({ success: true, messages: 'Update successfully ' })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async delete(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const roomType = await RoomType.deleteOne({ _id: id })
            if (!roomType) return res.status(401).json({ success: false, messages: 'Cant delete roomType' })
            res.json({ success: true, messages: 'Delete successfully' })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }
}

module.exports = new RoomTypeController()