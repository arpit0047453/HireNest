const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/emailService");

const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );
};

// Register
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters.",
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Please enter a valid email address.",
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const verificationToken = crypto.randomBytes(32).toString("hex");

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpires: Date.now() + 24 * 60 * 60 * 1000,
        });

        const verificationLink =
            `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;


        await sendEmail(
            user.email,
            // "Verify Your HireNest Account"
            "HireNest TEST 123",
            `
    <div style="font-family:Arial,sans-serif;padding:20px">

        <h2 style="color:#2563EB;">
            // Welcome to HireNest 🎉
            Welcome to HireNest TEST 123 🎉
        </h2>

        <p>Hello <strong>${user.name}</strong>,</p>

        <p>
            Thank you for registering with HireNest.
        </p>

        <p>
            Please verify your email by clicking the button below.
        </p>

        <a
            href="${verificationLink}"
            style="
                display:inline-block;
                padding:12px 24px;
                background:#2563EB;
                color:white;
                text-decoration:none;
                border-radius:6px;
            "
        >
            Verify Email
        </a>

        <p style="margin-top:20px">
            This verification link expires in
            <strong>24 hours</strong>.
        </p>

        <hr>

        <small>
            If you didn't create this account,
            you can safely ignore this email.
        </small>

    </div>
    `
        );
        console.log("✅ Verification email sent successfully.");

        return res.status(201).json({
            message:
                "Registration successful! Please verify your email before logging in.",
        });

    } catch (error) {
        console.error("❌ Register Error:", error);

        return res.status(500).json({
            message: error.message,
        });
    }
};

// Login

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            email,
        });


        if (
            user &&
            (await bcrypt.compare(password, user.password))
        ) {

            if (!user.isVerified) {
                return res.status(401).json({
                    message: "Please verify your email before logging in.",
                });
            }

            return res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        }

        return res.status(401).json({
            message: "Invalid credentials",
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Profile

exports.getProfile = async (
    req,
    res
) => {
    try {
        const user = await User.findById(
            req.user.id
        ).select("-password");

        res.json(user);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Forgot Password

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "No account found with this email.",
            });
        }

        // Generate secure token
        const resetToken = crypto.randomBytes(32).toString("hex");

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

        await user.save();

        const resetLink =
            `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
        await sendEmail(
            user.email,
            "Reset Your HireNest Password",
            `
            <div style="font-family:Arial;padding:20px">
                <h2 style="color:#2563EB;">HireNest</h2>

                <p>Hello <strong>${user.name}</strong>,</p>

                <p>You requested to reset your password.</p>

                <p>
                    Click the button below to continue:
                </p>

                <a
                    href="${resetLink}"
                    style="
                        display:inline-block;
                        background:#2563EB;
                        color:white;
                        padding:12px 22px;
                        text-decoration:none;
                        border-radius:6px;
                    "
                >
                    Reset Password
                </a>

                <p style="margin-top:20px">
                    This link expires in
                    <strong>15 minutes</strong>.
                </p>

                <hr>

                <small>
                    If you didn't request this,
                    simply ignore this email.
                </small>
            </div>
            `
        );

        res.json({
            message: "Password reset email sent.",
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Reset Password

exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({
                message: "Reset link is invalid or has expired.",
            });
        }

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        user.resetPasswordToken = "";
        user.resetPasswordExpires = null;

        await user.save();

        res.json({
            message: "Password reset successfully.",
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Verify Email

exports.verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;

        const user = await User.findOne({
            verificationToken: token,
            verificationTokenExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({
                message: "Verification link is invalid or has expired.",
            });
        }

        user.isVerified = true;
        user.verificationToken = "";
        user.verificationTokenExpires = null;

        await user.save();

        res.json({
            message: "Email verified successfully.",
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Resend Verification Email

exports.resendVerificationEmail = async (req, res) => {
    try {

        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "No account found with this email.",
            });
        }

        if (user.isVerified) {
            return res.status(400).json({
                message: "Email is already verified.",
            });
        }

        const verificationToken =
            crypto.randomBytes(32).toString("hex");

        user.verificationToken = verificationToken;

        user.verificationTokenExpires =
            Date.now() + 24 * 60 * 60 * 1000;

        await user.save();

        const verificationLink =
            `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;

        await sendEmail(
            user.email,
            "Verify Your HireNest Account",
            `
            <div style="font-family:Arial;padding:20px">

                <h2 style="color:#2563EB;">
                    Verify Your HireNest Account
                </h2>

                <p>Hello <strong>${user.name}</strong>,</p>

                <p>
                    Here is your new verification link.
                </p>

                <a
                    href="${verificationLink}"
                    style="
                        display:inline-block;
                        padding:12px 22px;
                        background:#2563EB;
                        color:white;
                        text-decoration:none;
                        border-radius:6px;
                    "
                >
                    Verify Email
                </a>

                <p style="margin-top:20px;">
                    This link expires in 24 hours.
                </p>

            </div>
            `
        );

        res.json({
            message: "Verification email sent successfully.",
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};