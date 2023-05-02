const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Feedback = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        civilianId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "civilians"
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('feedback', Feedback)
