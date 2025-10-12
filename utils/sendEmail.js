const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, html) => {
    try {
        const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER, // your Gmail
            pass: process.env.EMAIL_PASS, // your Gmail App password
        },
        });

        await transporter.sendMail({
        from: `"Faculty Management System" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
        });

        console.log(`📧 Email sent to: ${to}`);
    } catch (error) {
        console.error("❌ Error sending email:", error.message);
    }
};

module.exports = sendEmail;
