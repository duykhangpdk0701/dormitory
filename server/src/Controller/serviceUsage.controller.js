const ServiceUsage = require('../Model/serviceUsage.model');

class ServiceUsageController {
    async showAll(req, res) {
        try {
            const services = await ServiceUsage.find({});
            res.json({ success: true, data: services})
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async show(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const service = await ServiceUsage.findById(id)
            if (!service) return res.json({ success: false, messages: 'Invalid service' })
            res.json({ success: true, data: service })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async store(req, res) {
        try {
            const service = new ServiceUsage(req.body)
            await service.save()
            res.json({ success: true, messages: 'Create successfully', data: req.body })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message})
        }
    }

    async update(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const service = await ServiceUsage.updateOne({ _id: id }, req.body, { new: true })
            if (!service) return res.json({ success: false, messages: 'Cant update service' })
            res.json({ success: true, messages: 'Update successfully ' })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async delete(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const service = await ServiceUsage.deleteOne({ _id: id })
            if (!service) return res.status(401).json({ success: false, messages: 'Cant delete service' })
            res.json({ success: true, messages: 'Delete successfully' })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }
}

module.exports = new ServiceUsageController()