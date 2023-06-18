const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoose_delete = require('mongoose-delete');

const RequestChangeRoom = new Schema(
    {
        accountId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "users"
        },
        currentRoom: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "rooms"
        },
        roomType: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "roomTypes"
        },
        reason: {
            type: String,
            required: true,
        },
        status: { 
            type: String, 
            enum: ['Pending', 'Accepted', 'Denied'],
            default: 'Pending',
        },
    },
    {
        timestamps: true,
    }
)

RequestChangeRoom.plugin(mongoose_delete, {
    deletedAt: true
})

module.exports = mongoose.model('requestChangeRoom', RequestChangeRoom)
