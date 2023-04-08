const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Priority = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        score: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('priority', Priority)
