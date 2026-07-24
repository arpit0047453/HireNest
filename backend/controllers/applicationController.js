const Application = require("../models/Application");

// Apply Internship
const createApplication = async (req, res) => {
    try {
        const { studentEmail, companyId } = req.body;

        const existingApplication = await Application.findOne({
            studentEmail,
            companyId,
        });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this internship",
            });
        }

        const application = await Application.create(req.body);

        res.status(201).json(application);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Get All Applications
const getApplications = async (req, res) => {
    try {
        const applications = await Application.find()
            .populate("companyId");

        res.json(applications);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Update Application Status
const updateApplicationStatus = async (req, res) => {
    try {
        const application =
            await Application.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );

        res.json(application);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Withdraw Application
const deleteApplication = async (req, res) => {
    try {
        const application = await Application.findByIdAndDelete(
            req.params.id
        );

        if (!application) {
            return res.status(404).json({
                message: "Application not found",
            });
        }

        res.json({
            message: "Application withdrawn successfully",
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    createApplication,
    getApplications,
    updateApplicationStatus,
    deleteApplication,
};
