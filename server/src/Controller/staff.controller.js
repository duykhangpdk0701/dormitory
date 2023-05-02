const mongoose = require('mongoose');
const argon2 = require('argon2')
const Staff = require('../Model/staff.model');
const Account = require('../Model/user.model');
const Address = require('../Model/address.model');
const Permission = require('../Model/permission.model');

class StaffController {
    async showAll(req, res) {
        try {
            const staffs = await Staff.find({});
            res.json({ success: true, data: staffs})
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async show(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const staff = await Staff.findById(id)
            if (!staff) return res.json({ success: false, messages: 'Invalid staff' })
            res.json({ success: true, data: staff })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async store(req, res) {
        try {
            // const { studentId } = req.body
            // if(!studentId) res.status(500).json({ success: false, messages: 'Missing data'})
            // const permission = await Permission.findOne({name: 'staff'})
            // const hashpassword = await argon2.hash('123');
            // const account = new Account({ username: studentId + "@dormitory", password: hashpassword, ...req.body, permission: permission._id})
            // await account.save()
            // const address = new Address(req.body)
            // await address.save()
            const staff = new Staff(req.body)
            await staff.save()
            res.json({ success: true, messages: 'Create successfully', data: req.body })
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