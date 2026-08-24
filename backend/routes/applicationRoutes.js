const express = require("express");

const router = express.Router();

const {
    createApplication,
    getApplications,
    updateApplicationStatus,
    deleteApplication,
} = require("../controllers/applicationController");

const { protect } = require("../middleware/auth");
const admin = require("../middleware/admin");

router.post("/", protect, createApplication);

router.get("/", protect, getApplications);

router.put("/:id", protect, admin, updateApplicationStatus);

router.delete("/:id", protect, deleteApplication);

module.exports = router;