const Address = require('../Model/address.model');

class AddressController {
    async showAll(req, res) {
        try {
            const address = await Address.find({});
            res.json({ success: true, data: address})
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async show(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Thiếu id' })
        try {
            const address = await Address.findById(id)
            if (!address) return res.json({ success: false, messages: 'Invalid address' })
            res.json({ success: true, data: address })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async store(req, res) {
        try {
            const address = new Address(req.body)
            await address.save()
            res.json({ success: true, messages: 'Tạo thành công', data: req.body })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message})
        }
    }

    async update(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Thiếu id' })
        try {
            const address = await Address.updateOne({ _id: id }, req.body, { new: true })
            if (!address) return res.json({ success: false, messages: 'Cant update address' })
            res.json({ success: true, messages: 'Cập nhật thành công' })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async delete(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Thiếu id' })
        try {
            const address = await Address.delete({ _id: id })
            if (!address) return res.status(401).json({ success: false, messages: 'Cant delete address' })
            res.json({ success: true, messages: 'Xoá thành công' })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Lỗi hệ thống' })
        }
    }
}

module.exports = new AddressController()