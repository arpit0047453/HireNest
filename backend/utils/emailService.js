const axios = require("axios");

const sendEmail = async (to, subject, html) => {
    try {
        const response = await axios.post(
            "https://api.brevo.com/v3/smtp/email",
            {
                sender: {
                    name: "HireNest",
                    email: "arpitomre@gmail.com"
                },
                to: [
                    {
                        email: to
                    }
                ],
                subject: subject,

                // IMPORTANT
                htmlContent: html,

                // Optional plain text version
                textContent: "Please use an HTML email client to view this email."
            },
            {
                headers: {
                    "accept": "application/json",
                    "content-type": "application/json",
                    "api-key": process.env.BREVO_API_KEY
                }
            }
        );

        console.log("✅ Email sent successfully");
        console.log(response.data);

    } catch (error) {

        console.error("❌ Brevo API Error");

        if (error.response) {
            console.error(error.response.data);
        } else {
            console.error(error.message);
        }

        throw error;
    }
};

module.exports = sendEmail;