const createHttpError = require('http-errors');
const Product = require('../models/Products.model');
const { StatusCodes } = require('http-status-codes');


module.exports.list = (req, res, next) => {
  console.log('holaaaaaa');
    Product.find()
      .then(products => res.status(StatusCodes.OK).json(products))
      .catch(next)
  }

  module.exports.prouctDetail = (req, res, next) => {
    Product.findById(req.params.id)
      .then(product => res.status(StatusCodes.OK).json(product))
      .catch(next)
  }

  module.exports.createCheckoutSession = async  (req, res, next) => {
    const { _id, name, price, image } = req.body;
  
  const session = await stripe.checkout.sessions.create({
    paymen_methof_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: name,
            images: [image]
          },
          unit_amount: parseFloat((price) * 100).toFixed(2),
        },
        quantity: 1
      },
    ],
    mode: 'payment',
    succes_url: `${process.env.APP_HOST}/products/${_id}/success=true`, 
    cancel_url: `${process.env.APP_HOST}/products/${_id}/canceled=true`, 
  })}