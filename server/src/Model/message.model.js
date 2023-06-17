const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoose_delete = require('mongoose-delete');

const Message = new Schema(
    {
        conversation: {
            type: Schema.Types.ObjectId,
            ref: 'conversations',
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },
        content: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
)

Message.plugin(mongoose_delete, {
    deletedAt: true
})

module.exports = mongoose.model('Message', Message);