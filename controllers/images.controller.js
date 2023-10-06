const createError = require("http-errors");
const Image = require("../models/Images.model");
const { StatusCodes } = require("http-status-codes");


module.exports.createImage = (req, res, next) => {
  if (req.file) {
    req.body.image = req.file.path;
  }

  Image.create(req.body)
    .then((image) => res.status(StatusCodes.CREATED).json(image))
    .catch(next);
};

module.exports.imagesList = (req, res, next) => {
    Image.find()
    .populate('author')
    .then((images) => {
      res.status(StatusCodes.OK).json(images);
    })
    .catch(next);
}  