const nodemailer = require('nodemailer');
require('dotenv').config();

const sendAlert = async (subject, message) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.ALERT_EMAIL,
            pass: process.env.PASS
        }
    })
    let mailOPtions = {
        from: process.env.ALERT_EMAIL,
        to: process.env.ALERT_EMAIL,
        subject: subject,
        text: message
    };
    await transporter.sendMail(mailOPtions);
}
module.exports = { sendAlert }