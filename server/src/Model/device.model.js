const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

module.exports = mongoose.model('device', Device)
