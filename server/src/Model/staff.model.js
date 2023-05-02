const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Staff = new Schema(
    {
        accountId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "users"
        },
        job: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "jobs"
        },
        address: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "addresses"
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
