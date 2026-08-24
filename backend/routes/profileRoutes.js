const express = require("express");

const router = express.Router();

const {
    saveProfile,
    getProfile,
} = require("../controllers/profileController");

const { protect } = require("../middleware/auth");

router.post("/", protect, saveProfile);

router.get("/:email", protect, getProfile);

module.exports = router;