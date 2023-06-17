const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoose_delete = require('mongoose-delete');

const Conversation = new Schema(
    {
        title: {
            type : String,
        },
        userId: {
            type : [Schema.Types.ObjectId],
            ref: 'users'
        }
    },
    {
        timestamps: true,
    }
)

Conversation.plugin(mongoose_delete, {
    deletedAt: true
})

module.exports = mongoose.model('Conversation', Conversation);