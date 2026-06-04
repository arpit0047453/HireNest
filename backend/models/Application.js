const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
    {
        studentName: {
            type: String,
            required: true,
        },
        studentEmail: {
            type: String,
            required: true,
        },
        companyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            required: true,
        },
        status: {
            type: String,
            default: "Pending",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model(
    "Application",
    applicationSchema
);