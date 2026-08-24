const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const cloudinary = require("../config/cloudinary");
const { protect } = require("../middleware/auth");

router.post(
    "/resume",
    protect,
    upload.single("resume"),
    async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({
                    message: "No resume file uploaded.",
                });
            }

            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: "hirenest/resumes",
                    resource_type: "raw",
                },
                (error, result) => {
                    if (error) {
                        console.error(
                            "Cloudinary upload error:",
                            error
                        );

                        return res.status(500).json({
                            message: "Resume upload failed.",
                        });
                    }

                    return res.status(200).json({
                        resumeUrl: result.secure_url,
                    });
                }
            );

            stream.end(req.file.buffer);
        } catch (error) {
            console.error(
                "Resume upload error:",
                error
            );

            return res.status(500).json({
                message: error.message,
            });
        }
    }
);

module.exports = router;