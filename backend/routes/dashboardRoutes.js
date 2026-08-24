const express = require("express");

const router = express.Router();

const {
    getAdminStats,
} = require("../controllers/dashboardController");

const { protect } = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/", protect, admin, getAdminStats);

module.exports = router;