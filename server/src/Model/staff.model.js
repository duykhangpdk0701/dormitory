const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Staff = new Schema(
    {
        accountId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "users"
        },
        address: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "addresss"
        },
        salary: {
            type: Number,
            required: true,
        },
        isWorking: {
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

module.exports = mongoose.model('Staff', Staff)
