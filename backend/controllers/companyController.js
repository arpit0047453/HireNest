const Company = require("../models/Company");

// Create Internship
const createCompany = async (req, res) => {
    try {
        const company = await Company.create(req.body);

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
            { new: true }
        );

        res.json(company);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const deleteCompany = async (req, res) => {
    try {
        await Company.findByIdAndDelete(
            req.params.id
        );

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