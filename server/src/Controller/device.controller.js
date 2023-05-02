const Device = require('../Model/device.model');

class DeviceController {
    async showAll(req, res) {
        try {
            const devices = await Device.find({});
            res.json({ success: true, data: devices})
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async show(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const device = await Device.findById(id)
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