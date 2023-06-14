const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Civilian = new Schema(
    {
        accountId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "users"
        },
        roomId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "rooms"
        },
        address: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "addresses"
        },
        studentId: {
            type: String,
            required: true,
            unique: true
        },
        isStaying: {
            type: Boolean,
            required: true,
            default: true,
        },
        dateStart: {
            type: Date,
        },
        dateEnd: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('civilian', Civilian)
