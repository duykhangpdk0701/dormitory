const Message = require('../Model/message.model');
const mongoose = require('mongoose');

class MessageController {
    async showAll(req, res) {
        try {
            const filter = req.query || null
            let messages
            if(filter.conversationId){
                messages = await Message.aggregate([
                    {
                        $match: {
                            conversation: new mongoose.Types.ObjectId(filter.conversationId)
                        }
                    },
                    {
                        $lookup: {
                            from: 'users',
                            localField: 'user',
                            foreignField: '_id',
                            as: 'user'
                        }
                    },
                    { $unwind: '$user' }
                ])
            }else{
                // messages = await Message.aggregate([
                    // {
                    //     $lookup: {
                    //         from: 'users',
                    //         localField: 'user',
                    //         foreignField: '_id',
                    //         as: 'user'
                    //     }
                    // },
                    // { $unwind: '$user' }
                // ])
                messages = await Message.find({})
            }
            res.json({ success: true, messages })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Lỗi hệ thống' })
        }
    }

    async show(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Thiếu id' })
        try {
            const message = await Message.findById(id)
            if (!message) return res.json({ success: false, messages: 'Invalid message' })
            res.json({ success: true, message })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Lỗi hệ thống' })
        }
    }

    async store(req, res) {
        try {
            const message = new Message(req.body)
            await message.save()
            res.json({ success: true, messages: 'Store message successfully' })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Lỗi hệ thống'})
        }
    }

    async update(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Thiếu id' })
        try {
            const message = await Message.updateOne({ _id: id }, req.body, { new: true })
            if (!message) return res.json({ success: false, messages: 'Cant update message' })
            res.json({ success: true, messages: 'Cập nhật thành công' })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async delete(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Thiếu id' })
        try {
            const message = await Message.deleteOne({ _id: id })
            if (!message) return res.status(401).json({ success: false, messages: 'Cant delete message' })
            res.json({ success: true, messages: 'Xoá thành công' })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Lỗi hệ thống' })
        }
    }
}

module.exports = new MessageController()