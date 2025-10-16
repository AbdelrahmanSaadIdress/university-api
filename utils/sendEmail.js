const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, html) => {
    try {
        await resend.emails.send({
        from: "Faculty <onboarding@resend.dev>",
        to,
        subject,
        html,
        });
        console.log(`✅ Email sent to ${to}`);
    } catch (error) {
        console.error("❌ Email sending failed:", error);
        throw new Error("Email could not be sent");
    }
};

module.exports = sendEmail;
