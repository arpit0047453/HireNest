const User = require("../models/User");
const Company = require("../models/Company");
const Application = require("../models/Application");

const getAdminStats = async (req, res) => {
    try {
        const totalStudents =
            await User.countDocuments({
                role: "student",
            });

        const totalCompanies =
            await Company.countDocuments();

        const totalApplications =
            await Application.countDocuments();

        const selectedStudents =
            await Application.countDocuments({
                status: "Selected",
            });

        res.json({
            totalStudents,
            totalCompanies,
            totalApplications,
            selectedStudents,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    getAdminStats,
};