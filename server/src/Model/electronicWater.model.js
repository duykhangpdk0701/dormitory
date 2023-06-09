const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoose_delete = require('mongoose-delete');

const ElectronicWater = new Schema(
    {
        roomId: {
            type: Schema.Types.ObjectId,
            ref: 'rooms',
            required: true
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

ElectronicWater.plugin(mongoose_delete, {
    deletedAt: true
})

module.exports = mongoose.model('electronicWater', ElectronicWater);