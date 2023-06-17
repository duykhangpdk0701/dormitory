const RoomType = require('../Model/roomType.model');

class RoomTypeController {
    async showAll(req, res) {
        try {
            const filter = req.query || null
            let aggregate = [
                {
                    $match: {
                        deleted: { $ne: true }
                    }
                },
            ]
            if (filter) {
                if (filter.search) {
                    aggregate.push(
                        {
                            $match: {
                                $or: [
                                    { name: { $regex: filter.search || '', $options: "i" } },
                                    { description: { $regex: filter.search || '', $options: "i" } },
                                ]
                            }
                        }
                    )
                }
                if (filter.page) {
                    aggregate.push(
                        {
                            $skip: (filter.page - 1) * (filter.limit ? parseInt(filter.limit) : 0)
                        }
                    )
                }
                if (filter.limit) {
                    aggregate.push(
                        {
                            $limit: parseInt(filter.limit)
                        }
                    )
                }
            }
            const roomTypes = aggregate.length > 0 ? await RoomType.aggregate(aggregate) : await RoomType.find({})
            res.json({ success: true, data: roomTypes})
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async show(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Thiếu id' })
        try {
            const roomType = await RoomType.findById(id)
            if (!roomType) return res.json({ success: false, messages: 'Invalid roomType' })
            res.json({ success: true, data: roomType })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async store(req, res) {
        try {
            const roomType = new RoomType({...req.body, images: req.files ? req.files.map(file => "/images/"+file.filename) : ''})
            await roomType.save()
            res.json({ success: true, messages: 'Tạo thành công', data: roomType })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message})
        }
    }

    async update(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Thiếu id' })
        try {
            const roomType = await RoomType.updateOne({ _id: id }, req.files ? {...req.body, images: req.files.map(file => "/images/"+file.filename)} : {...req.body}, { new: true })
            if (!roomType) return res.json({ success: false, messages: 'Cant update roomType' })
            res.json({ success: true, messages: 'Cập nhật thành công' })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async delete(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Thiếu id' })
        try {
            const roomType = await RoomType.deleteOne({ _id: id })
            if (!roomType) return res.status(401).json({ success: false, messages: 'Cant delete roomType' })
            res.json({ success: true, messages: 'Xoá thành công' })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Lỗi hệ thống' })
        }
    }
}

module.exports = new RoomTypeController()