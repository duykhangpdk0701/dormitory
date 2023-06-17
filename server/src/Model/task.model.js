const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoose_delete = require('mongoose-delete');

const Task = new Schema(
    {
        staffId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "staffs"
        },
        description: {
            type: String,
        },
        dateAssign: {
            type: Date,
        },
        status: {
            type: String, 
            enum: ['Pending', 'Working', 'Done','Cancel'],
            default: 'Pending',
        },
    },
    {
        timestamps: true,
    }
)

Task.plugin(mongoose_delete, {
    deletedAt: true
})

module.exports = mongoose.model('task', Task)
