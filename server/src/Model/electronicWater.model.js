const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ElectronicWater = new Schema(
    {
        roomId: {
            type: Schema.Types.ObjectId,
            ref: 'rooms',
            required: true
        },
        month: {
            type: Number,
        },
        year: {
            type: Number,
        },
        numberStart: {
            type: Number,
        },
        numberEnd: {
            type: Number,
        },
        totalPrice: {
            type: Number,
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('electronicWater', ElectronicWater);