const express = require("express");
const router = express.Router();

const {
    createApplication,
    getApplications,
    updateApplicationStatus,
    deleteApplication,
} = require("../controllers/applicationController");

router.post("/", createApplication);
router.get("/", getApplications);
router.put("/:id", updateApplicationStatus);
router.delete("/:id", deleteApplication);

module.exports = router;
