const express = require("express");

const { getStats } = require("../controllers/adminController");
const { protect } = require("../middleware/auth");
const admin = require("../middleware/admin");

const router = express.Router();

router.get("/stats", protect, admin, getStats);

module.exports = router;