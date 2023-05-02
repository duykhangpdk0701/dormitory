const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Room = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
        },
        numberPeople: {
            type: Number,
            required: true,
        },
        numberBed: {
            type: Number,
            required: true,
        },
        area: {
            type: Number,
            required: true,
        },
        length: {
            type: Number,
            required: true,
        },
        width: {
            type: Number,
            required: true,
        },
        floor: {
            type: Number,
        },
        price: {
            type: Number,
            required: true,
        },
        roomType: {
            type: Schema.Types.ObjectId,
            ref: "roomTypes",
            require: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('room', Room)
