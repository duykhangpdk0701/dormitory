const Job = require('../Model/job.model');

class JobController {
    async showAll(req, res) {
        try {
            const jobs = await Job.find({});
            res.json({ success: true, data: jobs})
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async show(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const job = await Job.findById(id)
            if (!job) return res.json({ success: false, messages: 'Invalid job' })
            res.json({ success: true, data: job })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async store(req, res) {
        try {
            const job = new Job(req.body)
            await job.save()
            res.json({ success: true, messages: 'Create successfully', data: req.body })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message})
        }
    }

    async update(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const job = await Job.updateOne({ _id: id }, req.body, { new: true })
            if (!job) return res.json({ success: false, messages: 'Cant update job' })
            res.json({ success: true, messages: 'Update successfully ' })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async delete(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const job = await Job.deleteOne({ _id: id })
            if (!job) return res.status(401).json({ success: false, messages: 'Cant delete job' })
            res.json({ success: true, messages: 'Delete successfully' })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }
}

module.exports = new JobController()