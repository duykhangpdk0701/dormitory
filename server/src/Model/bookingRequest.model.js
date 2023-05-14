const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingRequest = new Schema(
    {
        roomType: {
            type: Schema.Types.ObjectId,
            ref: "roomTypes",
            require: true,
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
        priority: {
            type: Schema.Types.ObjectId,
            ref: "priorities",
            require: true,
        },
        images: {
            type: [String],
        },
        dateOfBirth: {
            type: Date,
        },
        dateStart: {
            type: Date,
        },
        status: { 
            type: String, 
            enum: ['Pending', 'Accepted','Cancel'],
            default: 'Pending',
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("bookingRequest", BookingRequest);
