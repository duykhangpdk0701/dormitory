const Conversation = require('../Model/conversation.model');
const mongoose = require('mongoose');

class ConversationController {
    async showAll(req, res) {
        try {
            const filter = req.query || null
            let conversations
            if(filter.userId){
                conversations = await Conversation.aggregate([
                    {
                        $match: {
                            userId: new mongoose.Types.ObjectId(filter.userId)
                        }
                    },
                    {
                        $lookup: {
                            from: 'users',
                            localField: 'userId',
                            foreignField: '_id',
                            as: 'user'
                        }
                    },
                ])
            }else{
                conversations = await Conversation.aggregate([
                    {
                        $lookup: {
                            from: 'users',
                            localField: 'userId',
                            foreignField: '_id',
                            as: 'user'
                        }
                    },
                    { $sort : { createdAt: -1 } }
                ])
            }
            res.json({ success: true, conversations})
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async show(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const aggregate = [
                { $match: { _id: new mongoose.Types.ObjectId(id) } },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'user'
                    }
                },
                {
                    $lookup: {
                        from: 'messages',
                        localField: '_id',
                        foreignField: 'conversation',
                        as: 'messages'
                    }
                },
                { $sort : { createdAt: -1 } }
            ]
            let conversation = await Conversation.aggregate(aggregate)
            conversation = conversation[0]
            if (!conversation) return res.json({ success: false, messages: 'Invalid conversation' })
            res.json({ success: true, conversation })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async store(req, res) {
        try {
            const conversation = new Conversation({title: req.body.title, userId: req.body.userId.map((id)=> new mongoose.Types.ObjectId(id))})
            await conversation.save()
            res.json({ success: true, messages: 'Create successfully', data: req.body })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message})
        }
    }

    async update(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const conversation = await Conversation.updateOne({ _id: id }, req.body, { new: true })
            if (!conversation) return res.json({ success: false, messages: 'Cant update conversation' })
            res.json({ success: true, messages: 'Update successfully ' })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async delete(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const conversation = await Conversation.deleteOne({ _id: id })
            if (!conversation) return res.status(401).json({ success: false, messages: 'Cant delete conversation' })
            res.json({ success: true, messages: 'Delete successfully' })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }
}

module.exports = new ConversationController()