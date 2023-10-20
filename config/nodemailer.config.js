const nodemailer = require("nodemailer");
const getWelcomeMessage = require("../misc/bienvenida");
const getOrderConfirmationMail = require("../misc/orderConfirmation");
const getStatusMail = require("../misc/statusMail");


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

  // const activationLink = `https://onclick-photography.netlify.app/login?activate=${user.id}`;




  const userData = {
    name: user.name,
  };

  transporter
    .sendMail({
      from: `onClick <${email}>`,
      to: user.email,
      subject: "Welcome to onClick. Please Activate your account.",
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

  const profileLink = `${process.env.APP_HOST}/profile/${user.id}`; 

  const userData = {
    name: user.name,
  };
  transporter
    .sendMail({
      from: `onClick <${email}>`,
      to: user.email,
      subject: `Order ${order.orderName} Confirmation - Thank You for Your Purchase`,
      html: getOrderConfirmationMail(userData, order, profileLink),
    })
    .then(() => {
      console.log(`Email sent to ${user.id}`);
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports.sendStatusMail = (user, order) => {
  const profileLink = `${process.env.APP_HOST}/profile/${user.id}`; 

  const userData = {
    name: user.name,
  };
  
  transporter
    .sendMail({
      from: `onClick <${email}>`,
      to: user.email,
      subject: `Your order is ${order.status} `,
      html: getStatusMail(userData, order, profileLink)
    })
    .then(() => {
      console.log(`Email sent to ${user.id}`);
    })
    .catch((err) => {
      console.error(err);
    });
};
