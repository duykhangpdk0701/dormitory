const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        firstname: {
            type: String,
        },
        lastname: {
            type: String,
        },
        dateOfBirth: {
            type: Date,
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
        },
        permission: {
            type: Schema.Types.ObjectId,
            ref: "permissions",
            required: true,
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

module.exports = mongoose.model('users', User)
