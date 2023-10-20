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
  // const activationLink = `${process.env.APP_HOST}/login?activate=${user.id}`; 

  const activationLink = `https://onclick-photography.netlify.app/login?activate=${user.id}`;




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
  const itemsList = order.items
    .filter(item => item.product && item.image)
    .map(item => {
      return `
        <p>Product Name: ${item.product.name}</p>
        <p>Image Name: ${item.image.name}</p>
        <p>Quantity: ${item.quantity}</p>
        <p>Price per Product: ${item.product.price}</p>
        <p>Price per Image: ${item.image.price}</p>
      `;
    })
    .join('');

  transporter
    .sendMail({
      from: `onClick <${email}>`,
      to: user.email,
      subject: `Order ${order.id} - ${order.date}`,
      html: `
        <h1>Hi ${userData.name}</h1>
        <p>Thanks for buying!</p>
        <p>This is your order:</p>
        ${itemsList}
      `,
    })
    .then(() => {
      console.log(`Email sent to ${user.id}`);
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports.sendStatusMail = (user, order) => {


  transporter
    .sendMail({
      from: `onClick <${email}>`,
      to: user.email,
      subject: `Your order is ${order.status} `,
      html: `
      <h1>Hi ${user.name}</h1>
      <p>Your order is ${order.status}</p>
      <p>This is your order</p>
     `,
    })
    .then(() => {
      console.log(`Email sent to ${user.id}`);
    })
    .catch((err) => {
      console.error(err);
    });
};
