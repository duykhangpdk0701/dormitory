const mongoose = require('mongoose');
const ServiceUsage = require('../Model/serviceUsage.model');
const Service = require('../Model/service.model');

class ServiceUsageController {
    async showAll(req, res) {
        try {
            const filter = req.query || null
            let aggregate = []
            const deFault = [
                {
                    $match: {
                        deleted: { $ne: true }
                    }
                },
                {
                    $lookup: {
                        from: "services",
                        localField: "serviceId",
                        foreignField: "_id",
                        as: "service"
                    }
                },
                { $unwind: '$service' },
                {
                    $lookup: {
                        from: "civilians",
                        localField: "civilianId",
                        foreignField: "_id",
                        as: "civilian"
                    }
                },
                { $unwind: '$civilian' },
                {
                    $lookup: {
                        from: "users",
                        localField: "civilian.accountId",
                        foreignField: "_id",
                        as: "civilian.account"
                    }
                },
                { $unwind: '$civilian.account' },
                {
                    $lookup: {
                        from: "addresses",
                        localField: "civilian.address",
                        foreignField: "_id",
                        as: "civilian.address"
                    }
                },
                { $unwind: '$civilian.address' },
                { $sort: { createdAt: -1 } }
            ]
            aggregate = aggregate.concat(deFault)
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
            const services = await ServiceUsage.aggregate(aggregate)
            res.json({ success: true, data: services})
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
                        from: "services",
                        localField: "serviceId",
                        foreignField: "_id",
                        as: "service"
                    }
                },
                { $unwind: '$service' },
                {
                    $lookup: {
                        from: "civilians",
                        localField: "civilianId",
                        foreignField: "_id",
                        as: "civilian"
                    }
                },
                { $unwind: '$civilian' },
                {
                    $lookup: {
                        from: "users",
                        localField: "civilian.accountId",
                        foreignField: "_id",
                        as: "civilian.account"
                    }
                },
                { $unwind: '$civilian.account' },
                {
                    $lookup: {
                        from: "addresses",
                        localField: "civilian.address",
                        foreignField: "_id",
                        as: "civilian.address"
                    }
                },
                { $unwind: '$civilian.address' },
                { $sort: { createdAt: -1 } }
            ]
            let service = await ServiceUsage.aggregate(aggregate)
            service = service[0]
            if (!service) return res.json({ success: false, messages: 'Invalid service' })
            res.json({ success: true, data: service })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async store(req, res) {
        try {
            const service = await Service.aggregate([
                { $match: { _id: new mongoose.Types.ObjectId(req.body.serviceId) } },
            ])
            if( service[0]){
                const serviceUsage = new ServiceUsage({...req.body, totalPrice: service[0].price })
                await serviceUsage.save()
            }
            res.json({ success: true, messages: 'Tạo thành công', data: req.body })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message})
        }
    }

    async update(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Thiếu id' })
        try {
            const service = await ServiceUsage.updateOne({ _id: id }, req.body, { new: true })
            if (!service) return res.json({ success: false, messages: 'Cant update service' })
            res.json({ success: true, messages: 'Cập nhật thành công' })
        } catch (error) {
            res.status(500).json({ success: false, messages: error.message })
        }
    }

    async delete(req, res) {
        const { id } = req.params
        if (!id) return res.status(401).json({ success: false, messages: 'Thiếu id' })
        try {
            const service = await ServiceUsage.delete({ _id: id })
            if (!service) return res.status(401).json({ success: false, messages: 'Cant delete service' })
            res.json({ success: true, messages: 'Xoá thành công' })
        } catch (error) {
            res.status(500).json({ success: false, messages: 'Lỗi hệ thống' })
        }
    }
}

module.exports = new ServiceUsageController()