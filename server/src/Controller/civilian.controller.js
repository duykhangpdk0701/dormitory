const mongoose = require('mongoose');
const argon2 = require('argon2')
const Civilian = require('../Model/civilian.model');
const Account = require('../Model/user.model');
const Address = require('../Model/address.model');
const Permission = require('../Model/permission.model');

class CivilianController {
    async showAll(req, res) {
        try {
            const filter = req.query || null
            let aggregate = []
            const deFault = [
                {
                    $lookup: {
                        from: "users",
                        localField: "accountId",
                        foreignField: "_id",
                        as: "account"
                    }
                },
                { $unwind: '$account' },
                {
                    $lookup: {
                        from: "addresses",
                        localField: "address",
                        foreignField: "_id",
                        as: "address"
                    }
                },
                { $unwind: '$address' },
                {
                    $lookup: {
                        from: "violations",
                        localField: "_id",
                        foreignField: "civilianId",
                        as: "violations"
                    }
                },
                {
                    $lookup: {
                        from: "rooms",
                        localField: "roomId",
                        foreignField: "_id",
                        as: "room"
                    }
                },
                { $unwind: '$room' },
                { $sort: { createdAt: -1 } }
            ]
            aggregate = aggregate.concat(deFault)
            if (filter) {
                if (filter.room) {
                    aggregate.push(
                        {
                            $match: {roomId : new mongoose.Types.ObjectId(filter.room)}
                        }
                    )
                }
                if (filter.onlyViolation) {
                    aggregate.push(
                        {
                            $match: { violations: {$ne : []} }
                        }
                    )
                }
                if (filter.search) {
                    aggregate.push(
                        {
                            $match: {
                                $or: [
                                    { name: { $regex: filter.search || '', $options: "i" } },
                                    { studentId: { $regex: filter.search || '', $options: "i" } },
                                    { "account.firstname": { $regex: filter.search || '', $options: "i" } },
                                    { "account.lastname": { $regex: filter.search || '', $options: "i" } },
                                    { "account.email": { $regex: filter.search || '', $options: "i" } },
                                    { "account.phone": { $regex: filter.search || '', $options: "i" } }
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
            const civilians = await Civilian.aggregate(aggregate)
            res.json({ success: true, data: civilians})
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
                        as: "account"
                    }
                },
                { $unwind: '$account' },
                {
                    $lookup: {
                        from: "addresses",
                        localField: "address",
                        foreignField: "_id",
                        as: "address"
                    }
                },
                { $unwind: '$address' },
                {
                    $lookup: {
                        from: "violations",
                        localField: "_id",
                        foreignField: "civilianId",
                        as: "violations"
                    }
                },
                {
                    $lookup: {
                        from: "contracts",
                        localField: "_id",
                        foreignField: "civilianId",
                        as: "contract"
                    }
                },
                { $unwind: '$contract' },
                {
                    $lookup: {
                        from: "rooms",
                        localField: "contract.roomId",
                        foreignField: "_id",
                        as: "room"
                    }
                },
                { $unwind: '$room' },
                { $sort: { createdAt: -1 } }
            ]
            let civilian = await Civilian.aggregate(aggregate)
            civilian = civilian[0]
            if (!civilian) return res.json({ success: false, messages: 'Invalid civilian' })
            res.json({ success: true, data: civilian })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async store(req, res) {
        try {
            const { studentId } = req.body
            if(!studentId) res.status(500).json({ success: false, messages: 'Missing data'})
            const permission = await Permission.findOne({name: 'civilian'})
            const hashpassword = await argon2.hash('123');
            const account = new Account({ username: studentId + "@dormitory", password: hashpassword, ...req.body, permission: permission._id})
            await account.save()
            const address = new Address(req.body)
            await address.save()
            const civilian = new Civilian({ accountId: account._id, address: address._id, ...req.body})
            await civilian.save()
            res.json({ success: true, messages: 'Tạo thành công', data: civilian })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message})
        }
    }

    async update(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Thiếu id' })
        try {
            const civilian = await Civilian.updateOne({ _id: id }, req.body, { new: true })
            if (!civilian) return res.json({ success: false, messages: 'Cant update civilian' })
            res.json({ success: true, messages: 'Cập nhật thành công' })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async delete(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Thiếu id' })
        try {
            const civilian = await Civilian.deleteOne({ _id: id })
            if (!civilian) return res.status(401).json({ success: false, messages: 'Cant delete civilian' })
            res.json({ success: true, messages: 'Xoá thành công' })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Lỗi hệ thống' })
        }
    }
}

module.exports = new CivilianController()