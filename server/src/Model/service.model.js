const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Service = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
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

module.exports = mongoose.model('service', Service)