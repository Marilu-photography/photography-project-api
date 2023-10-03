const createError = require('http-errors');
const Image = require('../models/Images.model');
const { StatusCodes } = require('http-status-codes');

module.exports.createImage = (req, res, next) => {
    if (req.file) {
        req.body.image = req.file.path;
    }

    Image.create(req.body)
        .then(image => res.status(StatusCodes.CREATED).json(image))
        .catch(next)
}