const mongoose = require("mongoose");
const paypal = require('paypal-rest-sdk');
var sendMail = require('../Service/mail.service');
const Bill = require("../Model/bill.model");
const Civilian = require("../Model/civilian.model");

class BillController {
    async showAll(req, res) {
        try {
            const filter = req.query || null;
            let aggregate = [];
            const deFault = [
                {
                    $match: {
                        deleted: { $ne: true }
                    }
                },
                {
                    $lookup: {
                        from: "rooms",
                        localField: "roomId",
                        foreignField: "_id",
                        as: "room",
                    },
                },
                { $unwind: "$room" },
                {
                    $lookup: {
                        from: "roomtypes",
                        localField: "room.roomType",
                        foreignField: "_id",
                        as: "room.roomType",
                    },
                },
                { $unwind: "$room.roomType" },
                {
                    $lookup: {
                        from: "civilians",
                        localField: "civilianId",
                        foreignField: "_id",
                        as: "civilian",
                    },
                },
                { $unwind: "$civilian" },
                {
                    $lookup: {
                        from: "users",
                        localField: "civilian.accountId",
                        foreignField: "_id",
                        as: "civilian.account",
                    },
                },
                { $unwind: "$civilian.account" },
                {
                    $lookup: {
                        from: "addresses",
                        localField: "civilian.address",
                        foreignField: "_id",
                        as: "civilian.address",
                    },
                },
                { $unwind: "$civilian.address" },
                {
                    $lookup: {
                        from: "serviceusages",
                        localField: "services",
                        foreignField: "_id",
                        as: "serviceUsage",
                    },
                },
                {
                    $lookup: {
                        from: "services",
                        localField: "serviceUsage.serviceId",
                        foreignField: "_id",
                        as: "serviceUsage2",
                    },
                },
                { $sort: { createdAt: -1 } },
            ];
            aggregate = aggregate.concat(deFault);
            if (filter) {
                if (filter.civilianId) {
                    aggregate.push({
                        $match: {
                            civilianId: new mongoose.Types.ObjectId(
                                filter.civilianId
                            ),
                        },
                    });
                }
                if (filter.page) {
                    aggregate.push({
                        $skip:
                            (filter.page - 1) *
                            (filter.limit ? parseInt(filter.limit) : 0),
                    });
                }
                if (filter.limit) {
                    aggregate.push({
                        $limit: parseInt(filter.limit),
                    });
                }
            }
            const bills = await Bill.aggregate(aggregate);
            res.json({ success: true, data: bills });
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message });
        }
    }

    async show(req, res) {
        const { id } = req.params;
        if (!id)
            return res
                .status(401)
                .json({ success: false, messages: "Thiếu id" });
        try {
            const aggregate = [
                { $match: { _id: new mongoose.Types.ObjectId(id) } },
                {
                    $lookup: {
                        from: "rooms",
                        localField: "roomId",
                        foreignField: "_id",
                        as: "room",
                    },
                },
                { $unwind: "$room" },
                {
                    $lookup: {
                        from: "roomtypes",
                        localField: "room.roomType",
                        foreignField: "_id",
                        as: "room.roomType",
                    },
                },
                { $unwind: "$room.roomType" },
                {
                    $lookup: {
                        from: "civilians",
                        localField: "civilianId",
                        foreignField: "_id",
                        as: "civilian",
                    },
                },
                { $unwind: "$civilian" },
                {
                    $lookup: {
                        from: "users",
                        localField: "civilian.accountId",
                        foreignField: "_id",
                        as: "civilian.account",
                    },
                },
                { $unwind: "$civilian.account" },
                {
                    $lookup: {
                        from: "addresses",
                        localField: "civilian.address",
                        foreignField: "_id",
                        as: "civilian.address",
                    },
                },
                { $unwind: "$civilian.address" },
                {
                    $lookup: {
                        from: "serviceusages",
                        localField: "services",
                        foreignField: "_id",
                        as: "serviceUsage",
                    },
                },
                {
                    $lookup: {
                        from: "services",
                        localField: "serviceUsage.serviceId",
                        foreignField: "_id",
                        as: "serviceMatch",
                    },
                },
                { $sort: { createdAt: -1 } },
            ];
            let bill = await Bill.aggregate(aggregate);
            bill = bill[0];
            if (!bill)
                return res.json({ success: false, messages: "Invalid bill" });
            res.json({ success: true, data: bill });
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message });
        }
    }

    async store(req, res) {
        try {
            const bill = new Bill(req.body);
            await bill.save();
            res.json({
                success: true,
                messages: "Tạo thành công",
                data: req.body,
            });
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message });
        }
    }

    async update(req, res) {
        const { id } = req.params;
        if (!id)
            return res
                .status(401)
                .json({ success: false, messages: "Thiếu id" });
        try {
            const bill = await Bill.updateOne({ _id: id }, req.body, {
                new: true,
            });
            if (!bill)
                return res.json({
                    success: false,
                    messages: "Cant update bill",
                });
            res.json({ success: true, messages: "Cập nhật thành công" });
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message });
        }
    }

    async delete(req, res) {
        const { id } = req.params;
        if (!id)
            return res
                .status(401)
                .json({ success: false, messages: "Thiếu id" });
        try {
            const bill = await Bill.deleteOne({ _id: id });
            if (!bill)
                return res
                    .status(401)
                    .json({ success: false, messages: "Cant delete bill" });
            res.json({ success: true, messages: "Xoá thành công" });
        } catch (error) {
            res.status(500).json({ success: false, messages: "Lỗi hệ thống" });
        }
    }

    async sendBill(req, res) {
        try {
            const civilians = await Civilian.aggregate([
                { $match: { isStaying: true } },
                {
                    $lookup: {
                        from: "users",
                        localField: "accountId",
                        foreignField: "_id",
                        as: "account",
                    },
                },
                { $unwind: "$account" },
                {
                    $lookup: {
                        from: "addresses",
                        localField: "address",
                        foreignField: "_id",
                        as: "address",
                    },
                },
                {
                    $lookup: {
                        from: "contracts",
                        localField: "_id",
                        foreignField: "civilianId",
                        as: "contract",
                    },
                },
                { $unwind: "$contract" },
                {
                    $lookup: {
                        from: "rooms",
                        localField: "contract.roomId",
                        foreignField: "_id",
                        as: "room",
                    },
                },
                { $unwind: "$room" },
                {
                    $lookup: {
                        from: "serviceusages",
                        localField: "_id",
                        foreignField: "civilianId",
                        as: "serviceusages",
                    },
                },
                {
                    $lookup: {
                        from: "services",
                        localField: "serviceusages.serviceId",
                        foreignField: "_id",
                        as: "services",
                    },
                },
                { $sort: { createdAt: -1 } },
            ]);
            for (const civilian of civilians) {
                let servicePrice = 0;
                let serviceId = [];
                civilian.serviceusages
                    .filter((element) => !element.paid)
                    .forEach((element) => {
                        serviceId.push(element._id);
                        servicePrice += element.totalPrice;
                    });
                const service = {
                    '_id': serviceId,
                    'totalPrice': servicePrice
                }
                const bill = new Bill({
                    civilianId: civilian._id,
                    roomId: civilian.room._id,
                    totalPrice: civilian.room.price + service.totalPrice,
                    services: service._id,
                });
                await bill.save();
            };
            return res.json({ success: true, messages: 'Gửi hoá đơn thành công' });
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message });
        }
    }

    async paidPaypal(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Thiếu id' })
        try {
            const bill = await Bill.findOne({ _id: id});
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
                    "return_url": `https://dormitory-zeta.vercel.app/bill/${id}/paid/paypal/done`,
                    "cancel_url": `https://sgu-dormitory.vercel.app`
                },
                "transactions": [{
                    "item_list": {
                        "items": [{
                            "name": "Thanh toán hoá đơn ",
                            "sku": "001",
                            "price": bill.totalPrice,
                            "currency": "USD",
                            "quantity": 1
                        }]
                    },
                    "amount": {
                        "currency": "USD",
                        "total": bill.totalPrice
                    },
                    "description": "Thanh toán hoá đơn"
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
        if (!id) return res.status(401).json({ success: false, messages: 'Thiếu id' })
        try {
            const bill = await Bill.findOne({ _id: id});
            if(bill.paid)  res.send('Lỗi, bạn đã thanh toán rồi');

            let billUpdate = await Bill.updateOne({ _id: id }, {paid: true}, { new: true })
            if (!billUpdate) return res.send('Lỗi không thể cập nhật thông tin');

            res.send('Success (Thanh toán thành công)');
            // sendMail(booking.email, paidBooking());
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async paid(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Thiếu id' })
        try {
            let bill = await Bill.findOne({ _id: id});
            if(bill.paid)  return res.json({ success: false, messages: 'Lỗi, đã thanh toán rồi'})

            let billUpdate = await Bill.updateOne({ _id: id }, {paid: true}, { new: true })
            if (!billUpdate) return res.json({ success: false, messages: 'Cant update bill' })

            res.json({ success: true, messages: 'Đã thanh toán thành công'})
            // sendMail(booking.email, paidBooking());
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }
}

module.exports = new BillController();
