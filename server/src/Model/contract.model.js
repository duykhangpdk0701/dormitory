const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Contract = new Schema(
    {
        roomId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "rooms"
        },
        staffId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "staffs"
        },
        civilianId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "civilians"
        },
        images: {
            type: [String],
        },
        totalPrice: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('contract', Contract)
