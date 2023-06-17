const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoose_delete = require('mongoose-delete');

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
            enum: ['Pending', 'Processed','Resolved'],
            default: 'Pending',
        },
    },
    {
        timestamps: true,
    }
)

Complaint.plugin(mongoose_delete, {
    deletedAt: true
})

module.exports = mongoose.model('complaint', Complaint)
