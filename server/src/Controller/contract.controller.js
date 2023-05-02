const Contract = require('../Model/contract.model');

class ContractController {
    async showAll(req, res) {
        try {
            const contracts = await Contract.find({});
            res.json({ success: true, data: contracts})
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async show(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const contract = await Contract.findById(id)
            if (!contract) return res.json({ success: false, messages: 'Invalid contract' })
            res.json({ success: true, data: contract })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async store(req, res) {
        try {
            const contract = new Contract(req.body)
            await contract.save()
            res.json({ success: true, messages: 'Create successfully', data: req.body })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message})
        }
    }

    async update(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const contract = await Contract.updateOne({ _id: id }, req.body, { new: true })
            if (!contract) return res.json({ success: false, messages: 'Cant update contract' })
            res.json({ success: true, messages: 'Update successfully ' })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async delete(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const contract = await Contract.deleteOne({ _id: id })
            if (!contract) return res.status(401).json({ success: false, messages: 'Cant delete contract' })
            res.json({ success: true, messages: 'Delete successfully' })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }
}

module.exports = new ContractController()