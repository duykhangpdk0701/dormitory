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
        timeStart: {
            type: Date,
        },
        timeExpire: {
            type: Date,
        },
        totalPrice: {
            type: Number,
        },
        paid: { 
            type: Boolean, 
            default: false,
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
