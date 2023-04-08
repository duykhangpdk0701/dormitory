const Priority = require('../Model/priority.model');

class PriorityController {
    async showAll(req, res) {
        try {
            const prioritys = await Priority.find({});
            res.json({ success: true, data: prioritys})
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async show(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const priority = await Priority.findById(id)
            if (!priority) return res.json({ success: false, messages: 'Invalid priority' })
            res.json({ success: true, data: priority })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async store(req, res) {
        try {
            const priority = new Priority(req.body)
            await priority.save()
            res.json({ success: true, messages: 'Create successfully', data: req.body })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message})
        }
    }

    async update(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const priority = await Priority.updateOne({ _id: id }, req.body, { new: true })
            if (!priority) return res.json({ success: false, messages: 'Cant update priority' })
            res.json({ success: true, messages: 'Update successfully ' })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async delete(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const priority = await Priority.deleteOne({ _id: id })
            if (!priority) return res.status(401).json({ success: false, messages: 'Cant delete priority' })
            res.json({ success: true, messages: 'Delete successfully' })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }
}

module.exports = new PriorityController()