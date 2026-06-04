const express = require("express");

const {
    createApplication,
    getApplications,
    updateApplicationStatus,
} = require("../controllers/applicationController");

const router = express.Router();

router.post("/", createApplication);

router.get("/", getApplications);

router.put("/:id", updateApplicationStatus);

module.exports = router;