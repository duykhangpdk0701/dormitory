const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomType = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
        },
        price: {
            type: Number,
            required: true,
        },
        images: {
            type: [String],
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('roomType', RoomType)
