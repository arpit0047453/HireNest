const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
    {
        companyName: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        stipend: {
            type: String,
            required: true,
        },
        duration: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        skills: [String],
    },
    { timestamps: true }
);

module.exports = mongoose.model(
    "Company",
    companySchema
);