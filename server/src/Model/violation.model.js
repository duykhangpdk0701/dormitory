const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoose_delete = require('mongoose-delete');

const Violation = new Schema(
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
            ref: "civilians",
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "processed"],
            required: true,
            default: "pending",
        },
        processing: {
            type: String,
            enum: ["warning", "expulsion"],
            required: true,
            default: "warning",
        },
    },
    {
        timestamps: true,
    }
);

Violation.plugin(mongoose_delete, {
    deletedAt: true
})

module.exports = mongoose.model("violation", Violation);
