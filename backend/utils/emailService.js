const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

transporter.verify(function (error, success) {
    if (error) {
        console.error("SMTP Error:", error);
    } else {
        console.log("✅ Brevo SMTP Connected Successfully");
    }
});

const sendEmail = async (to, subject, html) => {
    try {
        const info = await transporter.sendMail({
            from: `"HireNest" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        });

        console.log("✅ Email sent:", info.messageId);
    } catch (error) {
        console.error("❌ Email Error:", error);
    }
};

module.exports = sendEmail;