const nodemailer = require("nodemailer");
const getWelcomeMessage = require("../misc/bienvenida");


const email = process.env.EMAIL_ACCOUNT;

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: email,
    pass: process.env.EMAIL_PASSWORD,
  },
});

module.exports.sendActivationEmail = (user) => {
  const activationLink = `${process.env.APP_HOST}/login?activate=${user.id}`;

  const userData = {
    name: user.name,
  };

  transporter
    .sendMail({
      from: `onClick <${email}>`,
      to: user.email,
      subject: "Activate your account",
      html: getWelcomeMessage(userData, activationLink),
    })
    .then(() => {
      console.log(`Email sent to ${user.id}`);
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports.sendInvoice = (user, order) => {

  const userData = {
    name: user.name,
  };

  transporter
    .sendMail({
      from: `onClick <${email}>`,
      to: user.email,
      subject: `order ${order.id} ${order.date} `,
      html: `
      <h1>Hi ${userData.name}</h1>
      <p>Thanks for buying!</p>
      <p>This is your order</p>
      <p>${order.products.map(product => {
    return `<p>${product.name}</p>`})}</p>`,
    })
    .then(() => {
      console.log(`Email sent to ${user.id}`);
    })
    .catch((err) => {
      console.error(err);
    });
};

