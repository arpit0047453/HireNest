const express = require("express");
const router = express.Router();

const {
    createApplication,
    getApplications,
    updateApplicationStatus,
} = require("../controllers/applicationController");

router.post("/", createApplication);
router.get("/", getApplications);
router.put("/:id", updateApplicationStatus);

module.exports = router;
