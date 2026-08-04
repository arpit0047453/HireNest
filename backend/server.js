const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

const profileRoutes = require("./routes/profileRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const adminRoutes = require("./routes/adminRoutes");

dotenv.config();

// =====================
// Debug Environment Variables
// =====================
console.log("==================================");
console.log("EMAIL_USER =", process.env.EMAIL_USER);
console.log("FRONTEND_URL =", process.env.FRONTEND_URL);
console.log("PORT =", process.env.PORT);
console.log("==================================");

connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Static folder for uploaded resumes
app.use(
    "/uploads",
    express.static("uploads")
);

// Routes
app.use(
    "/api/upload",
    uploadRoutes
);

app.use(
    "/api/profile",
    profileRoutes
);

app.use(
    "/api/admin",
    adminRoutes
);

app.use(
    "/api/dashboard",
    dashboardRoutes
);

app.use(
    "/api/auth",
    require("./routes/authRoutes")
);

app.use(
    "/api/company",
    require("./routes/companyRoutes")
);

app.use(
    "/api/application",
    require("./routes/applicationRoutes")
);

// Test Route
app.get("/", (req, res) => {
    res.send("InternshipHub API Running");
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});