const mongoose = require("mongoose");
const ElectronicWater = require("../Model/electronicWater.model");

class ElectonicWaterController {
    async showAll(req, res) {
        try {
            const filter = req.query || null;
            let aggregate = [];
            const deFault = [
                {
                    $match: {
                        deleted: { $ne: true },
                    },
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
                { $sort: { createdAt: -1 } },
            ];
            aggregate = aggregate.concat(deFault);
            if (filter) {
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
            const electronicWater = await ElectronicWater.aggregate(aggregate);
            res.json({ success: true, data: electronicWater });
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
                { $sort: { createdAt: -1 } },
            ];
            let electronicWater = await ElectronicWater.aggregate(aggregate);
            electronicWater = electronicWater[0];
            if (!electronicWater)
                return res.json({
                    success: false,
                    messages: "Invalid electronicWater",
                });
            res.json({ success: true, data: electronicWater });
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message });
        }
    }

    async store(req, res) {
        try {
            const totalPrice = (req.body.numberEnd - req.body.numberStart) * 3;
            const electronicWater = new ElectronicWater({...req.body, totalPrice});
            await electronicWater.save();
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
            const electronicWater = await ElectronicWater.updateOne(
                { _id: id },
                req.body,
                { new: true }
            );
            if (!electronicWater)
                return res.json({
                    success: false,
                    messages: "Cant update electronicWater",
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
            const electronicWater = await ElectronicWater.delete({
                _id: id,
            });
            if (!electronicWater)
                return res
                    .status(401)
                    .json({
                        success: false,
                        messages: "Cant delete electronicWater",
                    });
            res.json({ success: true, messages: "Xoá thành công" });
        } catch (error) {
            res.status(500).json({ success: false, messages: "Lỗi hệ thống" });
        }
    }
}

module.exports = new ElectonicWaterController();
