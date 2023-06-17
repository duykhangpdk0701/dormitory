const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoose_delete = require('mongoose-delete');

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

Feedback.plugin(mongoose_delete, {
    deletedAt: true
})

module.exports = mongoose.model('feedback', Feedback)
