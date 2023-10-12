const nodeMailer = require('nodemailer');

const email = process.env.EMAIL_ACCOUNT;

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: email,
        password: process.env.EMAIL_PASSWORD
    }
});

transporter.verify().then(() => {
    console.log('Ready for send emails');
});

module.exports.transporter = transporter;

