const createHttpError = require('http-errors');
const Product = require('../models/Products.model');
const Order = require('../models/Order.model');
const Comment = require('../models/Comment.model');
const User = require('../models/User.model');
const { StatusCodes } = require('http-status-codes');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { sendInvoice } = require('../config/nodemailer.config');


module.exports.search = (req, res, next) => {
  let { query } = req.query;

  // Verificar si query es un objeto y convertirlo a cadena si es necesario
  if (typeof query === 'object') {
    query = JSON.stringify(query);
  }

  // Verificar si query es una cadena JSON y convertirla a objeto si es necesario
  if (isJsonString(query)) {
    query = JSON.parse(query);
  }

  Product.find({ $text: { $search: query } })
    .then(products => res.status(StatusCodes.OK).json(products))
    .catch(next);
}

// Función para verificar si una cadena es un objeto JSON válido
function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}



module.exports.create = (req, res, next) => {


  const data = {
    ...req.body,
    owner: req.currentUser,
    image: req.file ? req.file.path : undefined,
  };
  // aquí ira lo delos archivos

  Product.create(data)
    .then(product => res.status(201).json(product))
    .catch(next);
}


module.exports.list = (req, res, next) => {
  Product.find()
    .sort({ createdAt: -1 })
    .then(products => res.status(StatusCodes.OK).json(products))
    .catch(next)
}

module.exports.productDetail = (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => res.status(StatusCodes.OK).json(product))
    .catch(next)
}


module.exports.edit = (req, res, next) => {

  const data = {
    ...req.body,
    owner: req.currentUser,
    image: req.file ? req.file.path : undefined,
  };


  Product.findByIdAndUpdate(req.params.id, data, { new: true })
    .then(product => res.status(StatusCodes.OK).json(product))
    .catch(next);
}

module.exports.deleteProduct = (req, res, next) => {
  Product.findByIdAndDelete(req.params.id)
    .then(() => res.status(StatusCodes.NO_CONTENT).send())
    .catch(next)
}


module.exports.createCheckoutSession = async (req, res, next) => {
  const products = req.body;

  console.log(products);

  const lineProducts = products.map(product => {
    return {
      price_data: {
        currency: 'eur',
        product_data: {
          name: product.name,
          description: product.description,
          images: [product.image]
        },
        unit_amount: parseFloat((product.price * 100).toFixed(2)),
      },
      quantity: product.quantity,
    }
  });

  Order.create({
    user: req.currentUser,
    products: products.map(product => {
      return {
        product: product._id,
        quantity: product.quantity
      };
    })
  })
    .then(order => {
      stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineProducts,
        mode: 'payment',
        success_url: `${process.env.APP_HOST}/cart?success=true&orderId=${order._id}`,
        cancel_url: `${process.env.APP_HOST}/cart?canceled=true`,
      }).then(session => {
        res.json({ url: session.url, orderId: order._id });
      })

    })
    .catch(next);

}

module.exports.success = (req, res, next) => {
  const user = req.currentUser;
  const order = req.params.id;

  User.findById(user)
    .then(user => {
      Order.findOne({ _id: order, status: 'pending' })
        .populate('products.product')
        .then(order => {
          if (order) {
            sendInvoice(user, order)
            Order.findByIdAndUpdate(order.id, { status: 'paid' })
              .then(() => res.json({ message: 'Order paid' }))
              .catch(next);
          } else { return res.json({ message: 'Order already paid' }); }
          

        })
        .catch(next);
    })
    .catch(next);
}

// controller de comentarios

module.exports.getComments = (req, res, next) => {
  Comment.find({ product: req.params.id })
    .populate('user')
    .then(comments => res.status(StatusCodes.OK).json(comments))
    .catch(next);
}

module.exports.doComments = (req, res, next) => {
  const data = {
    ...req.body,
    user: req.currentUser,
    product: req.params.id,
  };
  Comment.create(data)

    .then(comment => res.status(201).json(comment))
    .catch(next);
}
