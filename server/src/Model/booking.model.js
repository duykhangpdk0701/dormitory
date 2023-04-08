const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Booking = new Schema(
    {
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

module.exports = mongoose.model('booking', Booking)
