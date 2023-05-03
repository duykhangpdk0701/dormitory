const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

module.exports = mongoose.model('Conversation', Conversation);