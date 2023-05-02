const Task = require('../Model/task.model');

class TaskController {
    async showAll(req, res) {
        try {
            const tasks = await Task.find({});
            res.json({ success: true, data: tasks})
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async show(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const task = await Task.findById(id)
            if (!task) return res.json({ success: false, messages: 'Invalid task' })
            res.json({ success: true, data: task })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async store(req, res) {
        try {
            const task = new Task(req.body)
            await task.save()
            res.json({ success: true, messages: 'Create successfully', data: req.body })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message})
        }
    }

    async update(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const task = await Task.updateOne({ _id: id }, req.body, { new: true })
            if (!task) return res.json({ success: false, messages: 'Cant update task' })
            res.json({ success: true, messages: 'Update successfully ' })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async delete(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const task = await Task.deleteOne({ _id: id })
            if (!task) return res.status(401).json({ success: false, messages: 'Cant delete task' })
            res.json({ success: true, messages: 'Delete successfully' })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }
}

module.exports = new TaskController()