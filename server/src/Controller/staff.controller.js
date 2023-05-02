const mongoose = require('mongoose');
const argon2 = require('argon2')
const Staff = require('../Model/staff.model');
const Account = require('../Model/user.model');
const Address = require('../Model/address.model');
const Permission = require('../Model/permission.model');

class StaffController {
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
            const staffs = await Staff.aggregate(aggregate)
            res.json({ success: true, data: staffs})
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
                { $sort: { createdAt: -1 } }
            ]
            let staff = await Staff.aggregate(aggregate)
            staff = staff[0]
            if (!staff) return res.json({ success: false, messages: 'Invalid staff' })
            res.json({ success: true, data: staff })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async store(req, res) {
        try {
            const { email } = req.body
            const permission = await Permission.findOne({name: 'staff'})
            const hashpassword = await argon2.hash('123');
            const account = new Account({ username: email, password: hashpassword, ...req.body, permission: permission._id})
            await account.save()
            const address = new Address(req.body)
            await address.save()
            const staff = new Staff({ accountId: account._id, address: address._id, ...req.body})
            await staff.save()
            res.json({ success: true, messages: 'Create successfully', data: staff })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message})
        }
    }

    async update(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const staff = await Staff.updateOne({ _id: id }, req.body, { new: true })
            if (!staff) return res.json({ success: false, messages: 'Cant update staff' })
            res.json({ success: true, messages: 'Update successfully ' })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async delete(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const staff = await Staff.deleteOne({ _id: id })
            if (!staff) return res.status(401).json({ success: false, messages: 'Cant delete staff' })
            res.json({ success: true, messages: 'Delete successfully' })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }
}

module.exports = new StaffController()