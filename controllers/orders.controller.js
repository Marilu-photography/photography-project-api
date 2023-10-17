const createHttpError = require('http-errors');
const Order = require('../models/Order.model');
const Product = require('../models/Products.model');
const Image = require('../models/Images.model');
const { StatusCodes } = require("http-status-codes");
const { sendStatusMail } = require('../config/nodemailer.config');

module.exports.listOrders = (req, res, next) => {
    Order.find()
        .populate('user')
        .then((orders) => {
            const ordersWithProducts = [];
            const findProductsAndImagesForOrder = (order) => {
                return Promise.all(order.items.map(async (itemEntry) => {
                    const product = await Product.findById(itemEntry.product);
                    const image = await Image.findById(itemEntry.image);
                    return {
                        product,
                        image,
                        quantity: itemEntry.quantity,
                    };
                }));
            };
            const processOrders = (orderIndex) => {
                if (orderIndex < orders.length) {
                    const order = orders[orderIndex];
                    return findProductsAndImagesForOrder(order)
                        .then((items) => {
                            const orderWithItems = {
                                ...order.toObject(),
                                items,
                            };
                            ordersWithProducts.push(orderWithItems);
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
        .populate('user')
        .then((order) => {
            if (order) {
                console.log(order)
                sendStatusMail(order.user, order)

                res.status(StatusCodes.OK).json(order);
            } else {
                next(createHttpError(StatusCodes.NOT_FOUND, 'Order not found'));
            }
        })
        .catch(next);
};  