const Company = require("../models/Company");

// Create Internship
const createCompany = async (req, res) => {
    try {
        const {
            companyName,
            title,
            location,
            stipend,
            duration,
            description,
            skills,
        } = req.body;

        const company = await Company.create({
            companyName,
            title,
            location,
            stipend,
            duration,
            description,
            skills,
        });

        res.status(201).json(company);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Get All Internships
const getCompanies = async (req, res) => {
    try {
        const companies = await Company.find();

        res.json(companies);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const updateCompany = async (req, res) => {
    try {
        const company = await Company.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
            });
        }

        res.json(company);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const deleteCompany = async (req, res) => {
    try {
        const company = await Company.findByIdAndDelete(req.params.id);

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
            });
        }

        res.json({
            message: "Company deleted",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    createCompany,
    getCompanies,
    updateCompany,
    deleteCompany,
};