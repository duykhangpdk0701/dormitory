const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoose_delete = require('mongoose-delete');

const Priority = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        score: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

Priority.plugin(mongoose_delete, {
    deletedAt: true
})

module.exports = mongoose.model('priority', Priority)
