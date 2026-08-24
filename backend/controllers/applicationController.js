const Application = require("../models/Application");
const Company = require("../models/Company");
const sendEmail = require("../utils/emailService");

// Apply Internship
const createApplication = async (req, res) => {
    try {
        const { companyId } = req.body;

        const studentName = req.user.name;
        const studentEmail = req.user.email;

        const existingApplication = await Application.findOne({
            studentEmail,
            companyId,
        });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this internship",
            });
        }

        const company = await Company.findById(companyId);

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
            });
        }

        const application = await Application.create({
            studentName,
            studentEmail,
            companyId,
        });

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
        const query =
            req.user.role === "admin"
                ? {}
                : { studentEmail: req.user.email };

        const applications = await Application.find(query)
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
        const { status } = req.body;

        const allowedStatuses = [
            "Pending",
            "Shortlisted",
            "Selected",
            "Rejected",
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid application status",
            });
        }

        const application = await Application.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!application) {
            return res.status(404).json({
                message: "Application not found",
            });
        }

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
        const application = await Application.findById(req.params.id);

        if (!application) {
            return res.status(404).json({
                message: "Application not found",
            });
        }

        if (
            req.user.role !== "admin" &&
            application.studentEmail !== req.user.email
        ) {
            return res.status(403).json({
                message: "You are not allowed to withdraw this application",
            });
        }

        await Application.findByIdAndDelete(req.params.id);

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