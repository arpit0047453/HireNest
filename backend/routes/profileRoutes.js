const express = require("express");

const router = express.Router();

const {
    saveProfile,
    getProfile,
} = require("../controllers/profileController");

router.post("/", saveProfile);

router.get("/:email", getProfile);

module.exports = router;
