const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Complaint = new Schema(
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
        status: { 
            type: String, 
            enum: ['Pending', 'In Progress','Resolved'],
            default: 'Pending',
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('complaint', Complaint)
