const nodemailer = require("nodemailer");

const email = process.env.EMAIL_ACCOUNT;

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: email,
    pass: process.env.EMAIL_PASSWORD,
  },
});

module.exports.sendActivationEmail = (user) => {
  const activationLink = `${process.env.API_HOST}/login?activate=${user.id}`;

  const userData = {
    name: user.name,
  };

  transporter
    .sendMail({
      from: `onClick <${email}>`,
      to: user.email,
      subject: "Activate your account",
      html: `
      <h1>Hi ${userData.name}</h1>
      <p>Thanks for registering!</p>
      <a href="${activationLink}">Activate your account</a>
        `,
    })
    .then(() => {
      console.log(`Email sent to ${user.id}`);
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports.sendInvoice = (user) => {

  const userData = {
    name: user.name,
  };

  transporter
    .sendMail({
      from: `onClick <${email}>`,
      to: user.email,
      subject: "Invoice",
      html: `
      <h1>Hi ${userData.name}</h1>
      <p>Thanks for buying!</p>
      <a href="${activationLink}">Activate your account</a>
        `,
    })
    .then(() => {
      console.log(`Email sent to ${user.id}`);
    })
    .catch((err) => {
      console.error(err);
    });
};

