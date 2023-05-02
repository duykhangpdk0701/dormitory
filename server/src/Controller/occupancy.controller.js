const Occupancy = require('../Model/occupancy.model');

class OccupancyController {
    async showAll(req, res) {
        try {
            const occupancies = await Occupancy.find({});
            res.json({ success: true, data: occupancies})
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async show(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const occupancy = await Occupancy.findById(id)
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