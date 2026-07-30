const Application = require("../models/Application");
const Company = require("../models/Company");
const sendEmail = require("../utils/emailService");

// Apply Internship
const createApplication = async (req, res) => {
    try {
        const { studentEmail, companyId, studentName } = req.body;

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

        // Get company details
        const company = await Company.findById(companyId);

        // Send confirmation email
        await sendEmail(
            studentEmail,
            "Application Submitted Successfully - HireNest",
            `
            <div style="font-family: Arial, sans-serif; padding:20px;">
                <h2 style="color:#2563EB;">HireNest</h2>

                <p>Hello <strong>${studentName}</strong>,</p>

                <p>Your internship application has been submitted successfully.</p>

                <table style="border-collapse: collapse;">
                    <tr>
                        <td><strong>Company:</strong></td>
                        <td>${company.companyName}</td>
                    </tr>

                    <tr>
                        <td><strong>Role:</strong></td>
                        <td>${company.title}</td>
                    </tr>

                    <tr>
                        <td><strong>Status:</strong></td>
                        <td>Pending</td>
                    </tr>
                </table>

                <br>

                <p>
                    You can track your application anytime from your
                    <strong>HireNest Dashboard</strong>.
                </p>

                <hr>

                <p style="color: gray;">
                    This is an automated email from HireNest.
                </p>
            </div>
            `
        );

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
        const applications = await Application.find().populate("companyId");

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
        const application = await Application.findByIdAndUpdate(
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
        const application = await Application.findByIdAndDelete(req.params.id);

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