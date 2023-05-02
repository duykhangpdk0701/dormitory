const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Address = new Schema(
    {
        street: {
            type: String,
            required: true,
        },
        district: {
            type: String,
            required: true,
        },
        province: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('address', Address)
