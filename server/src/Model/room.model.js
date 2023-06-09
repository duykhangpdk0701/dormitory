const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoose_delete = require('mongoose-delete');

const Room = new Schema(
    {
        name: {
            type: String,
        },
        description: {
            type: String,
        },
        numberPeople: {
            type: Number,
        },
        numberBed: {
            type: Number,
        },
        area: {
            type: Number,
        },
        length: {
            type: Number,
        },
        width: {
            type: Number,
        },
        floor: {
            type: Number, 
        },
        price: {
            type: Number,
        },
        images: {
            type: [String],
        },
        roomType: {
            type: Schema.Types.ObjectId,
            ref: "roomTypes",
            require: true,
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

Room.plugin(mongoose_delete, {
    deletedAt: true
})

module.exports = mongoose.model('room', Room)
