const express = require("express");
const router = express.Router();

const {
    getAdminStats,
} = require("../controllers/dashboardController");

router.get("/", getAdminStats);

module.exports = router;