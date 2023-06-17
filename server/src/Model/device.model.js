const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoose_delete = require('mongoose-delete');

const Device = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        roomId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "rooms"
        },
        description: {
            type: String,
        },
        images: {
            type: [String],
        },
        dateAdd: {
            type: Date,
        },
        price: {
            type: Number, 
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

Device.plugin(mongoose_delete, {
    deletedAt: true
})

module.exports = mongoose.model('device', Device)
