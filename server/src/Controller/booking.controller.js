const mongoose = require('mongoose')
const argon2 = require('argon2')
var sendMail = require('../Service/mail.service');
const Booking = require('../Model/booking.model');
const Occupancy = require('../Model/occupancy.model');
const Civilian = require('../Model/civilian.model');
const Account = require('../Model/user.model');
const Address = require('../Model/address.model');
const Permission = require('../Model/permission.model');

class BookingController {
    async showAll(req, res) {
        try {
            const filter = req.query || null
            let aggregate = []
            const deFault = [
                {
                    $lookup: {
                        from: "rooms",
                        localField: "room",
                        foreignField: "_id",
                        as: "room"
                    }
                },
                { $unwind: '$room' },
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
                        from: "roomtypes",
                        localField: "room.roomType",
                        foreignField: "_id",
                        as: "room.roomType"
                    }
                },
                { $unwind: '$room.roomType' },
                { $sort: { createdAt: -1 } }
            ]
            aggregate = aggregate.concat(deFault)
            const bookings = await Booking.aggregate(aggregate)
            res.json({ success: true, data: bookings})
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
                        from: "rooms",
                        localField: "room",
                        foreignField: "_id",
                        as: "room"
                    }
                },
                { $unwind: '$room' },
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
                        from: "roomtypes",
                        localField: "room.roomType",
                        foreignField: "_id",
                        as: "room.roomType"
                    }
                },
                { $unwind: '$room.roomType' },
                { $sort: { createdAt: -1 } }
            ]
            const booking = await Booking.aggregate(aggregate)
            if (!booking) return res.json({ success: false, messages: 'Invalid booking' })
            res.json({ success: true, data: booking })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async store(req, res) {
        try {
            const booking = new Booking({...req.body, dateOfBirth: new Date(req.body.dateOfBirth), images: req.files ? req.files.map(file => "/images/"+file.filename) : 'default'})
            await booking.save()
            res.json({ success: true, messages: 'Create successfully', data: booking })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message})
        }
    }

    async update(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const booking = await Booking.updateOne({ _id: id }, req.body, { new: true })
            if (!booking) return res.json({ success: false, messages: 'Cant update booking' })
            res.json({ success: true, messages: 'Update successfully ' })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async deposit(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            let booking = await Booking.updateOne({ _id: id }, {status: "Deposit"}, { new: true })
            if (!booking) return res.json({ success: false, messages: 'Cant update booking' })

            booking = await Booking.findOne({ _id: id});
            const {firstname, lastname, dateOfBirth, email, phone } = booking
            const permission = await Permission.findOne({name: 'civilian'})
            const hashpassword = await argon2.hash('123');
            const account = new Account({ username: booking.studentId + "@dormitory", password: hashpassword, permission: permission._id, firstname, lastname, dateOfBirth, email, phone})
            await account.save()
            const civilian = new Civilian({ accountId: account._id, ...booking, studentId: booking.studentId, address: booking.address})
            await civilian.save()
            const occupancy = new Occupancy({ roomId: booking.room, civilianId: civilian._id, accountId: account._id, ...booking, checkInDate: booking.dateStart})
            await occupancy.save()

            if (!booking) return res.json({ success: false, messages: 'Cant update booking' })
            res.json({ success: true, messages: 'deposit' })
            sendMail(booking.email, "Mail form Dormitory", `Your booking is deposited, now you can enter our website, your username: ${booking.studentId + "@dormitory"} and password: 123`);
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async paid(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            let booking = await Booking.updateOne({ _id: id }, {status: "Paid"}, { new: true })
            if (!booking) return res.json({ success: false, messages: 'Cant update booking' })
            booking = await Booking.find({ _id: id});
            res.json({ success: true, messages: 'paid'})
            sendMail(booking[0].email, "Mail form Dormitory", "Your booking is paid");
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async cancel(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            let booking = await Booking.updateOne({ _id: id }, {status: "Cancel"}, { new: true })
            if (!booking) return res.json({ success: false, messages: 'Cant update booking' })
            booking = await Booking.find({ _id: id});
            res.json({ success: true, messages: 'cancel'})
            sendMail(booking[0].email, "Mail form Dormitory", "Your booking is cancel");
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async delete(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const booking = await Booking.deleteOne({ _id: id })
            if (!booking) return res.status(401).json({ success: false, messages: 'Cant delete booking' })
            res.json({ success: true, messages: 'Delete successfully' })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }
}

module.exports = new BookingController()