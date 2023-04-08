const Permission = require('../Model/permission.model');
const mongoose = require('mongoose');

class PermissionController {
    async showAll(req, res) {
        try {
            const permissions = await Permission.find({});
            res.json({ success: true, permissions})
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async show(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const permission = await Permission.findById(id)
            if (!permission) return res.json({ success: false, messages: 'Invalid permission' })
            res.json({ success: true, permission })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async store(req, res) {
        try {
            const permission = new Permission(req.body)
            await permission.save()
            res.json({ success: true, messages: 'Create successfully', data: req.body })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message})
        }
    }

    async update(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const permission = await Permission.updateOne({ _id: id }, req.body, { new: true })
            if (!permission) return res.json({ success: false, messages: 'Cant update permission' })
            res.json({ success: true, messages: 'Update successfully ' })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async delete(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const permission = await Permission.deleteOne({ _id: id })
            if (!permission) return res.status(401).json({ success: false, messages: 'Cant delete permission' })
            res.json({ success: true, messages: 'Delete successfully' })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }
}

module.exports = new PermissionController()