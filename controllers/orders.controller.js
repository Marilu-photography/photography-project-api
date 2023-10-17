const createHttpError = require('http-errors');
const Order = require('../models/Order.model');
const Product = require('../models/Products.model');
const Image = require('../models/Images.model');
const { StatusCodes } = require("http-status-codes");

module.exports.listOrders = (req, res, next) => {
    Order.find()
        .populate('user')
        .populate({
            path: 'items.product',
            model: 'Product',
        })
        .populate({
            path: 'items.image',
            model: 'Image',
        })
        .then((orders) => {
            const ordersWithProductsAndImages = [];
            const findProductsForOrder = (order) => {
                return Promise.all(order.products.map(async (productEntry) => {
                    const product = await Product.findById(productEntry.product);
                    return {
                        product,
                        quantity: productEntry.quantity,
                    };
                }));
            };
            const processOrders = (orderIndex) => {
                if (orderIndex < orders.length) {
                    const order = orders[orderIndex];
                    return findProductsForOrder(order)
                        .then((products) => {
                            const orderWithProducts = {
                                ...order.toObject(),
                                products,
                            };
                            ordersWithProducts.push(orderWithProducts);
                            return processOrders(orderIndex + 1);
                        });
                } else {
                    res.status(StatusCodes.OK).json(ordersWithProducts);
                }
            };
            processOrders(0);
        })
        .catch(next);
};

module.exports.updateOrderStatus = (req, res, next) => {
    const status = req.body.status;

    Order.findByIdAndUpdate(req.params.id, { status }, { new: true })
        .then((order) => {
            if (order) {
                res.status(StatusCodes.OK).json(order);
            } else {
                next(createHttpError(StatusCodes.NOT_FOUND, 'Order not found'));
            }
        })
        .catch(next);
};


