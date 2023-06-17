const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoose_delete = require('mongoose-delete');

const Bill = new Schema(
    {
        title: {
            type: String,
        },
        services: {
            type: [Schema.Types.ObjectId],
            required: true,
            ref: "serviceusages"
        },
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
        totalPrice: {
            type: String,
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

Bill.plugin(mongoose_delete, {
    deletedAt: true
})

module.exports = mongoose.model('bill', Bill)
