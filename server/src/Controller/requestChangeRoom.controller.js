const RequestChangeRoom = require('../Model/requestChangeRoom.model');
const Account = require('../Model/user.model');
const Room = require('../Model/room.model');
const Civilian = require('../Model/civilian.model');
const Contract = require('../Model/contract.model');
const mongoose = require('mongoose');

class RequestChangeRoomController {
    async showAll(req, res) {
        try {
            const filter = req.query || null
            let aggregate = []
            const deFault = [
                {
                    $match: {
                        deleted: { $ne: true }
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "accountId",
                        foreignField: "_id",
                        as: "user"
                    }
                },
                { $unwind: '$user' },
                {
                    $lookup: {
                        from: "rooms",
                        localField: "currentRoom",
                        foreignField: "_id",
                        as: "room"
                    }
                },
                { $unwind: '$room' },
                {
                    $lookup: {
                        from: "roomtypes",
                        localField: "roomType",
                        foreignField: "_id",
                        as: "roomType"
                    }
                },
                { $unwind: '$roomType' },
                { $sort: { createdAt: -1 } }
            ]
            aggregate = aggregate.concat(deFault)
            if (filter) {
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
            const requestChangeRooms = await RequestChangeRoom.aggregate(aggregate)
            res.json({ success: true, data : requestChangeRooms})
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async show(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Thiếu id' })
        try {
            const aggregate = [
                { $match: { _id: new mongoose.Types.ObjectId(id) } },
                {
                    $lookup: {
                        from: "users",
                        localField: "accountId",
                        foreignField: "_id",
                        as: "user"
                    }
                },
                { $unwind: '$user' },
                {
                    $lookup: {
                        from: "rooms",
                        localField: "currentRoom",
                        foreignField: "_id",
                        as: "room"
                    }
                },
                { $unwind: '$room' },
                {
                    $lookup: {
                        from: "roomtypes",
                        localField: "roomType",
                        foreignField: "_id",
                        as: "roomType"
                    }
                },
                { $unwind: '$roomType' },
                { $sort: { createdAt: -1 } }
            ]
            let requestChangeRoom = await RequestChangeRoom.aggregate(aggregate)
            requestChangeRoom = requestChangeRoom[0]
            if (!requestChangeRoom) return res.json({ success: false, messages: 'Invalid requestChangeRoom' })
            res.json({ success: true, data: requestChangeRoom })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async store(req, res) {
        try {
            const civilian = await Civilian.aggregate([
                { $match: { accountId: new mongoose.Types.ObjectId(req.body.accountId) } },
                {
                    $lookup: {
                        from: "rooms",
                        localField: "roomId",
                        foreignField: "_id",
                        as: "room"
                    }
                },
                { $unwind: '$room' },
            ])
            if( civilian[0]){
                const requestChangeRoom = new RequestChangeRoom({...req.body, currentRoom: civilian[0].room._id })
                await requestChangeRoom.save()
            }
            res.json({ success: true, messages: 'Tạo thành công', data: req.body })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message})
        }
    }

    async accepted(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Thiếu id' })
        try {
            let requestChangeRoom = await RequestChangeRoom.updateOne({ _id: id }, {status: 'Accepted'}, { new: true })
            if (!requestChangeRoom) return res.json({ success: false, messages: 'Cant update requestChangeRoom' })

            requestChangeRoom = await RequestChangeRoom.aggregate([
                { $match: { _id: new mongoose.Types.ObjectId(id) } },
                {
                    $lookup: {
                        from: "users",
                        localField: "accountId",
                        foreignField: "_id",
                        as: "user"
                    }
                },
                { $unwind: '$user' },
            ]);
            requestChangeRoom = requestChangeRoom[0]
            
            const aggregate = [
                { $match: { roomType: new mongoose.Types.ObjectId(requestChangeRoom.roomType) } },
                {
                    $lookup: {
                        from: "contracts",
                        localField: "_id",
                        foreignField: "roomId",
                        as: "contracts"
                    }
                },
            ]
            const rooms = await Room.aggregate(aggregate)
            let room = ''
            for(var i = 0; i < rooms.length; i++){
                if(rooms[i].numberPeople > rooms[i].contracts.length && rooms[i].contracts.length > 0){
                    const civilian = await Civilian.findById(rooms[i].contracts[0].civilianId)
                    const account = await Account.findById(civilian.accountId)
                    if(account.gender && account.gender == requestChangeRoom.user.gender){
                        room = rooms[i]
                        break
                    }
                }else if(rooms[i].contracts.length == 0){
                    room = rooms[i]
                    break
                }
            }

            if(!room){
                return res.json({ success: false, messages: 'Cant find suitable room' })
            }

            let civilian = await Civilian.updateOne({ accountId: requestChangeRoom.user._id }, { roomId: new mongoose.Types.ObjectId(room._id) }, { new: true })
            if (!civilian) return res.json({ success: false, messages: 'Cant update civilian' })
            civilian = await Civilian.findOne({ accountId: requestChangeRoom.user._id })
            const contract = await Contract.updateOne({ civilianId: civilian._id }, { roomId: new mongoose.Types.ObjectId(room._id) }, { new: true })
            if (!contract) return res.json({ success: false, messages: 'Cant update contract' })
            res.json({ success: true, messages: 'Request accepted' })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async denied(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Thiếu id' })
        try {
            let bookingRequest = await RequestChangeRoom.updateOne({ _id: id }, {status: "Denied"}, { new: true })
            if (!bookingRequest) return res.json({ success: false, messages: 'Cant update RequestChangeRoom' })

            res.json({ success: true, messages: 'Status change'})
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async update(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Thiếu id' })
        try {
            const requestChangeRoom = await RequestChangeRoom.updateOne({ _id: id }, req.body, { new: true })
            if (!requestChangeRoom) return res.json({ success: false, messages: 'Cant update requestChangeRoom' })
            res.json({ success: true, messages: 'Cập nhật thành công' })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async delete(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Thiếu id' })
        try {
            const requestChangeRoom = await RequestChangeRoom.delete({ _id: id })
            if (!requestChangeRoom) return res.status(401).json({ success: false, messages: 'Cant delete requestChangeRoom' })
            res.json({ success: true, messages: 'Xoá thành công' })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Lỗi hệ thống' })
        }
    }
}

module.exports = new RequestChangeRoomController()