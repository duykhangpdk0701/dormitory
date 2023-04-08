var sendMail = require('../Service/mail.service');
const Booking = require('../Model/booking.model');

class BookingController {
    async showAll(req, res) {
        try {
            const bookings = await Booking.find({});
            res.json({ success: true, data: bookings})
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async show(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const booking = await Booking.findById(id)
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

    async accepted(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const booking = await Booking.updateOne({ _id: id }, {status: "Accepted"}, { new: true })
            if (!booking) return res.json({ success: false, messages: 'Cant update booking' })
            res.json({ success: true, messages: ' accepted' })
            sendMail(booking.email, "Mail form Dormitory", "Your  is accepted");
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
            res.json({ success: true, messages: ' cancel'})
            sendMail(booking[0].email, "Mail form Dormitory", "Your  is not accepted");
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