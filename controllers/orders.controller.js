const createHttpError = require('http-errors');
const Order = require('../models/Order.model');
const { StatusCodes } = require("http-status-codes");

module.exports.listOrders = (req, res, next) => {
    Order.find({ owner: req.currentUser })
        .populate('products')
        .then(orders => res.status(StatusCodes.OK).json(orders))
        .catch(next)
    }