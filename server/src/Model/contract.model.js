const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoose_delete = require('mongoose-delete');

const Contract = new Schema(
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

Contract.plugin(mongoose_delete, {
    deletedAt: true
})

module.exports = mongoose.model('contract', Contract)
