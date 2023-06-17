const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoose_delete = require('mongoose-delete');

const Service = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        price: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

Service.plugin(mongoose_delete, {
    deletedAt: true
})

module.exports = mongoose.model('service', Service)
