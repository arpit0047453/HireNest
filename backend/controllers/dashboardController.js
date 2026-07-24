const User = require("../models/User");
const Company = require("../models/Company");
const Application = require("../models/Application");

const getAdminStats = async (req, res) => {
    try {
        const totalStudents = await User.countDocuments({
            role: "student",
        });

        const totalCompanies = await Company.countDocuments();

        const totalApplications = await Application.countDocuments();

        const selectedStudents = await Application.countDocuments({
            status: "Selected",
        });

        // Status Counts
        const pending = await Application.countDocuments({
            status: "Pending",
        });

        const shortlisted = await Application.countDocuments({
            status: "Shortlisted",
        });

        const rejected = await Application.countDocuments({
            status: "Rejected",
        });

        // Applications Per Company
        const companyStats = await Application.aggregate([
            {
                $group: {
                    _id: "$companyId",
                    count: { $sum: 1 },
                },
            },
            {
                $lookup: {
                    from: "companies",
                    localField: "_id",
                    foreignField: "_id",
                    as: "company",
                },
            },
            {
                $unwind: "$company",
            },
            {
                $project: {
                    _id: 0,
                    company: "$company.companyName",
                    count: 1,
                },
            },
        ]);

        res.json({
            totalStudents,
            totalCompanies,
            totalApplications,
            selectedStudents,

            pending,
            shortlisted,
            rejected,

            companyStats,
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