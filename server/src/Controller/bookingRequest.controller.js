var sendMail = require('../Service/mail.service');
const BookingRequest = require('../Model/bookingRequest.model');
const Booking = require('../Model/booking.model');
const Room = require('../Model/room.model');

class BookingRequestController {
    async showAll(req, res) {
        try {
            const bookingRequests = await BookingRequest.find({});
            res.json({ success: true, data: bookingRequests})
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async show(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const bookingRequest = await BookingRequest.findById(id)
            if (!bookingRequest) return res.json({ success: false, messages: 'Invalid bookingRequest' })
            res.json({ success: true, data: bookingRequest })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async store(req, res) {
        try {
            const bookingRequest = new BookingRequest({...req.body, dateOfBirth: new Date(req.body.dateOfBirth), images: req.files ? req.files.map(file => "/images/"+file.filename) : 'default'})
            await bookingRequest.save()
            res.json({ success: true, messages: 'Create successfully', data: bookingRequest })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message})
        }
    }

    async update(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const bookingRequest = await BookingRequest.updateOne({ _id: id }, req.body, { new: true })
            if (!bookingRequest) return res.json({ success: false, messages: 'Cant update bookingRequest' })
            res.json({ success: true, messages: 'Update successfully ' })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async accepted(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            let bookingRequest = await BookingRequest.updateOne({ _id: id }, {status: "Accepted"}, { new: true })
            if (!bookingRequest) return res.json({ success: false, messages: 'Cant update bookingRequest' })

            bookingRequest = await BookingRequest.find({ _id: id});
            let room = await Room.find({});   
            delete bookingRequest[0]._doc._id

            const booking = new Booking({...bookingRequest[0]._doc, status: 'Pending', room: room[0]._id})
            await booking.save()

            res.json({ success: true, messages: 'Request accepted' })
            sendMail(bookingRequest[0].email, "Mail form Dormitory", "Your request is accepted");
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async cancel(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            let bookingRequest = await BookingRequest.updateOne({ _id: id }, {status: "Cancel"}, { new: true })
            if (!bookingRequest) return res.json({ success: false, messages: 'Cant update bookingRequest' })
            bookingRequest = await BookingRequest.find({ _id: id});
            res.json({ success: true, messages: 'Request cancel'})
            sendMail(bookingRequest[0].email, "Mail form Dormitory", "Your request is not accepted");
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async delete(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const bookingRequest = await BookingRequest.deleteOne({ _id: id })
            if (!bookingRequest) return res.status(401).json({ success: false, messages: 'Cant delete bookingRequest' })
            res.json({ success: true, messages: 'Delete successfully' })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Interval server error' })
        }
    }
}

module.exports = new BookingRequestController()