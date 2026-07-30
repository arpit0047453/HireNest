const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            enum: ["student", "admin"],
            default: "student",
        },

        phone: {
            type: String,
            default: "",
        },

        skills: {
            type: String,
            default: "",
        },

        github: {
            type: String,
            default: "",
        },

        linkedin: {
            type: String,
            default: "",
        },

        bio: {
            type: String,
            default: "",
        },

        resetPasswordToken: {
            type: String,
            default: "",
        },

        isVerified: {
            type: Boolean,
            default: false,
        },

        verificationToken: {
            type: String,
            default: "",
        },

        verificationTokenExpires: {
            type: Date,
        },

        resetPasswordExpires: {
            type: Date,
        },

    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);
