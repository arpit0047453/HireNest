const Profile = require("../models/ProfileTemp");

const saveProfile = async (req, res) => {
    try {
        const {
            email,
            name,
            phone,
            skills,
            github,
            linkedin,
            bio,
            resumeUrl,
        } = req.body;

        const profile = await Profile.findOneAndUpdate(
            { email },
            {
                email,
                name,
                phone,
                skills,
                github,
                linkedin,
                bio,
                resumeUrl,
            },
            {
                new: true,
                upsert: true,
            }
        );

        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const getProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({
            email: req.params.email,
        });

        res.json(profile);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    saveProfile,
    getProfile,
};