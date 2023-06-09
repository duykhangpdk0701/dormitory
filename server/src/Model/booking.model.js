const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoose_delete = require('mongoose-delete');

const Booking = new Schema(
    {
        roomType: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "roomTypes"
        },
        room: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "rooms"
        },
        firstname: {
            type: String,
            require: true,
        },
        lastname: {
            type: String,
            require: true,
        },
        address: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "addresses"
        },
        gender: {
            type: String,
            enum: ['Male', 'Female','Other'],
            require: true,
        },
        studentId: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true,
        },
        phone: {
            type: String,
            require: true,
        },
        dateOfBirth: {
            type: Date,
        },
        dateStart: {
            type: Date,
        },
        dateEnd: {
            type: Date,
        },
        priceDeposit: {
            type: Number,
        },
        totalPrice: {
            type: Number,
        },
        status: { 
            type: String, 
            enum: ['Pending', 'Deposit', 'Paid','Cancel'],
            default: 'Pending',
        },
    },
    {
        timestamps: true,
    }
)

Booking.plugin(mongoose_delete, {
    deletedAt: true
})

module.exports = mongoose.model('booking', Booking)
