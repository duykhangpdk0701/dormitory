const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Occupancy = new Schema(
    {
        roomId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "rooms"
        },
        civilianId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "civilians"
        },
        checkInDate: {
            type: Date,
        },
        checkOutDate: {
            type: Date,
        },
        totalPrice: {
            type: Number,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('occupancy', Occupancy)
