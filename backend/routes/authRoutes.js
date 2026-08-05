const express = require("express");

const router = express.Router();

const {
    registerUser,
    loginUser,
    getProfile,
    forgotPassword,
    resetPassword,
    verifyEmail,
    resendVerificationEmail,
} = require("../controllers/authControllers");

const {
    protect,
} = require("../middleware/auth");

// Register
router.post(
    "/register",
    registerUser
);

// Login
router.post(
    "/login",
    loginUser
);

// Forgot Password
router.post(
    "/forgot-password",
    forgotPassword
);

// Reset Password
router.post(
    "/reset-password/:token",
    resetPassword
);

// Verify Email
router.get("/verify-email/:token", (req, res, next) => {
    console.log("✅ Verify Route Hit");
    console.log("Token:", req.params.token);
    next();
}, verifyEmail);

// Resend Verification Email
router.post(
    "/resend-verification",
    resendVerificationEmail
);

// Get Profile
router.get(
    "/profile",
    protect,
    getProfile
);

module.exports = router;