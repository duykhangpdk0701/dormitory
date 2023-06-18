const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoose_delete = require('mongoose-delete');

const ServiceUsage = new Schema(
    {
        serviceId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "services"
        },
        civilianId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "civilians"
        },
        description: {
            type: String,
        },
        totalPrice: {
            type: Number,
        },
    },
    {
        timestamps: true,
    }
)

ServiceUsage.plugin(mongoose_delete, {
    deletedAt: true
})

module.exports = mongoose.model('serviceUsage', ServiceUsage)
