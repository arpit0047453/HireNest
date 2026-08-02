const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },

    name: String,
    phone: String,
    skills: String,
    github: String,
    linkedin: String,
    bio: String,
    resumeUrl: String,
});

module.exports = mongoose.model(
    "Profile",
    profileSchema
);