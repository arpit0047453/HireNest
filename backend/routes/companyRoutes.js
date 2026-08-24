const express = require("express");

const {
    createCompany,
    getCompanies,
    updateCompany,
    deleteCompany,
} = require("../controllers/companyController");

const { protect } = require("../middleware/auth");
const admin = require("../middleware/admin");

const router = express.Router();

router.post("/", protect, admin, createCompany);

router.get("/", getCompanies);

router.put("/:id", protect, admin, updateCompany);

router.delete("/:id", protect, admin, deleteCompany);

module.exports = router;