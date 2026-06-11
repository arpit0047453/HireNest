const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

router.post(
    "/resume",
    upload.single("resume"),
    (req, res) => {
        res.json({
            resumeUrl:
                "http://localhost:5000/uploads/" +
                req.file.filename,
        });
    }
);

module.exports = router;
