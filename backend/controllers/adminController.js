const User = require("../models/User");
const Company = require("../models/Company");
const Application = require("../models/Application");

const getStats = async (req, res) => {
    try {
        const totalStudents =
            await User.countDocuments({
                role: "student",
            });
        const totalInternships =
            await Company.countDocuments();

        const totalApplications =
            await Application.countDocuments();

        const selectedCandidates =
            await Application.countDocuments({
                status: "Selected",
            });

        res.json({
            totalStudents,
            totalInternships,
            totalApplications,
            selectedCandidates,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }

};

module.exports = {
    getStats,
};
