const createHttpError = require('http-errors');
const Product = require('../models/Products.model');
const { StatusCodes } = require('http-status-codes');


module.exports.list = (req, res, next) => {
  console.log('holaaaaaa');
    Product.find()
      .then(products => res.status(StatusCodes.OK).json(products))
      .catch(next)
  }