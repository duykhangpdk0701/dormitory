const mongoose = require('mongoose');
const argon2 = require('argon2');
const paypal = require('paypal-rest-sdk');
var sendMail = require('../Service/mail.service');
const Room = require('../Model/room.model');
const Booking = require('../Model/booking.model');
const Occupancy = require('../Model/occupancy.model');
const Civilian = require('../Model/civilian.model');
const Account = require('../Model/user.model');
const Permission = require('../Model/permission.model');
const Contract = require('../Model/contract.model');
const { depositBooking, paidBooking, cancelBooking } = require('../../Utils/mail.format');

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

    async depositPaypal(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const booking = await Booking.findOne({ _id: id});
            const room = await Room.findOne({ _id: booking.room});
            paypal.configure({
                mode: "sandbox",
                client_id:
                    "AaCXIzH-_6OorZZ1gpcq8ggAd40P1bkQ6zrDCFgUpMAvOg0xVQpRiYNZENlDRKHUqfrGxg5rVaWOfawT",
                client_secret:
                    "ENV7adJpOG5DzRA_Y-ZuNcy5KETKc48T5wNPB1uN7DES_FdbWlcJNbLcqReg2jomW1qoVLX6vXxdGghJ",
            });
            const create_payment_json = {
                "intent": "sale",
                "payer": {
                    "payment_method": "paypal"
                },
                "redirect_urls": {
                    "return_url": `https://dormitory-zeta.vercel.app/booking/${id}/deposit/paypal/done`,
                    "cancel_url": `https://sgu-dormitory.vercel.app`
                },
                "transactions": [{
                    "item_list": {
                        "items": [{
                            "name": "Đặt cọc phòng : " + room.name,
                            "sku": "001",
                            "price": booking.priceDeposit,
                            "currency": "USD",
                            "quantity": 1
                        }]
                    },
                    "amount": {
                        "currency": "USD",
                        "total": booking.priceDeposit
                    },
                    "description": "Đặt cọc tiền phòng"
                }] 
            };
        
            paypal.payment.create(create_payment_json, function (error, payment) {
                if (error) {
                    throw error;
                } else {
                    for (let i = 0; i < payment.links.length; i++) {
                        if (payment.links[i].rel === 'approval_url') {
                            res.redirect(payment.links[i].href);
                        }
                    }
                }
            });
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async depositPaypalDone(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            let booking = await Booking.updateOne({ _id: id }, {status: "Deposit"}, { new: true })
            if (!booking) return res.send('Lỗi không thể cập nhật thông tin');

            booking = await Booking.findOne({ _id: id});
            if (!booking) return res.send('Lỗi không thể thấy booking phù hợp');

            const checkAccount = await Account.findOne({ username: booking.studentId + "@dormitory" })
            if(checkAccount) res.send('Fail (Bạn đã đặt cọc rồi)');

            const {firstname, lastname, dateOfBirth, email, phone, gender } = booking
            const permission = await Permission.findOne({name: 'civilian'})
            const hashpassword = await argon2.hash('123');
            const account = new Account({ username: booking.studentId + "@dormitory", password: hashpassword, permission: permission._id, firstname, lastname, dateOfBirth, email, phone, gender})
            await account.save()
            const civilian = new Civilian({ accountId: account._id, ...booking, studentId: booking.studentId, address: booking.address})
            await civilian.save()
            const occupancy = new Occupancy({ roomId: booking.room, civilianId: civilian._id, accountId: account._id, ...booking, checkInDate: booking.dateStart})
            await occupancy.save()

            res.send('Success (Đặt cọc thành công)');
            sendMail(booking.email, depositBooking(booking));
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
            if (!booking) return res.json({ success: false, messages: 'Cant update booking' })

            const checkAccount = Account({ username: booking.studentId + "@dormitory" })
            if(checkAccount) return res.json({ success: false, messages: 'Cant deposit because have deposited before' })

            const {firstname, lastname, dateOfBirth, email, phone, gender } = booking
            const permission = await Permission.findOne({name: 'civilian'})
            const hashpassword = await argon2.hash('123');
            const account = new Account({ username: booking.studentId + "@dormitory", password: hashpassword, permission: permission._id, firstname, lastname, dateOfBirth, email, phone, gender})
            await account.save()
            const civilian = new Civilian({ accountId: account._id, ...booking, studentId: booking.studentId, address: booking.address})
            await civilian.save()
            const occupancy = new Occupancy({ roomId: booking.room, civilianId: civilian._id, accountId: account._id, ...booking, checkInDate: booking.dateStart})
            await occupancy.save()

            res.json({ success: true, messages: 'deposit' })
            sendMail(booking.email, depositBooking(booking));
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async paidPaypal(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            const booking = await Booking.findOne({ _id: id});
            const room = await Room.findOne({ _id: booking.room});
            paypal.configure({
                mode: "sandbox",
                client_id:
                    "AaCXIzH-_6OorZZ1gpcq8ggAd40P1bkQ6zrDCFgUpMAvOg0xVQpRiYNZENlDRKHUqfrGxg5rVaWOfawT",
                client_secret:
                    "ENV7adJpOG5DzRA_Y-ZuNcy5KETKc48T5wNPB1uN7DES_FdbWlcJNbLcqReg2jomW1qoVLX6vXxdGghJ",
            });
            const create_payment_json = {
                "intent": "sale",
                "payer": {
                    "payment_method": "paypal"
                },
                "redirect_urls": {
                    "return_url": `https://dormitory-zeta.vercel.app/booking/${id}/paid/paypal/done`,
                    "cancel_url": `https://sgu-dormitory.vercel.app`
                },
                "transactions": [{
                    "item_list": {
                        "items": [{
                            "name": "Thanh toán tiền phòng : " + room.name,
                            "sku": "001",
                            "price": booking.totalPrice,
                            "currency": "USD",
                            "quantity": 1
                        }]
                    },
                    "amount": {
                        "currency": "USD",
                        "total": booking.totalPrice
                    },
                    "description": "Thanh toán tiền phòng"
                }]
            };
        
            paypal.payment.create(create_payment_json, function (error, payment) {
                if (error) {
                    throw error;
                } else {
                    for (let i = 0; i < payment.links.length; i++) {
                        if (payment.links[i].rel === 'approval_url') {
                            res.redirect(payment.links[i].href);
                        }
                    }
                }
            });
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async paidPaypalDone(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            let booking = await Booking.findOne({ _id: id});
            if(booking.status == "Paid")  res.send('Lỗi, bạn đã thanh toán rồi');

            let bookingUpdate = await Booking.updateOne({ _id: id }, {status: "Paid"}, { new: true })
            if (!bookingUpdate) return res.send('Lỗi không thể cập nhật thông tin');

            const civilian = await Civilian.findOne({ studentId: booking.studentId })
            const contract = new Contract({ roomId: booking.room, civilianId: civilian._id, staffId: new mongoose.Types.ObjectId('6450c645e3958e8e5fe49721'), totalPrice: booking.totalPrice})
            await contract.save()

            res.send('Success (Thanh toán thành công)');
            sendMail(booking.email, paidBooking());
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async paid(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Missing id' })
        try {
            let booking = await Booking.findOne({ _id: id});
            if(booking.status == "Paid")  return res.json({ success: false, messages: 'Cant paid because have paid before' })

            let bookingUpdate = await Booking.updateOne({ _id: id }, {status: "Paid"}, { new: true })
            if (!bookingUpdate) return res.json({ success: false, messages: 'Cant update booking' })

            const civilian = await Civilian.findOne({ studentId: booking.studentId })
            const contract = new Contract({ roomId: booking.room, civilianId: civilian._id, staffId: new mongoose.Types.ObjectId('6450c645e3958e8e5fe49721'), totalPrice: booking.totalPrice})
            await contract.save()

            res.json({ success: true, messages: 'paid'})
            sendMail(booking.email, paidBooking());
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
            booking = await Booking.findOne({ _id: id});
            const civilian = await Civilian.findOne({ studentId: booking.studentId })
            await Occupancy.deleteOne({ civilianId: civilian._id })
            await Account.deleteOne({ _id: civilian.accountId})
            await Civilian.deleteOne({ studentId: booking.studentId })
            res.json({ success: true, messages: 'cancel'})
            sendMail(booking.email, cancelBooking());
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