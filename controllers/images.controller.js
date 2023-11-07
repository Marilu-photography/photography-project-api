const createError = require("http-errors");
const Image = require("../models/Images.model");
const { StatusCodes } = require("http-status-codes");

module.exports.createImage = (req, res, next) => {
    const images = req.files.map(file => file.path);
    const data = {
      ...req.body,
      images,
    };
  
    Image.create(data)
      .then((image) => res.status(StatusCodes.CREATED).json(image))
      .catch(next);
  };

module.exports.imagesList = (req, res, next) => {
    Image.find()
    .populate({
      path: 'author',
      populate: [
        { path: 'like' },
      ]
    })
        .then((images) => {
            res.status(StatusCodes.OK).json(images);
        })
        .catch(next);
}

module.exports.deleteImage = (req, res, next) => {
    Image.findByIdAndDelete(req.params.id)
        .then(() => res.status(StatusCodes.NO_CONTENT).send())
        .catch(next);
}

module.exports.editorTool = (req, res, next) => {
    Image.findById(req.params.id)
        .then(image => res.status(StatusCodes.OK).json(image))
        .catch(next)
}


module.exports.editImage = (req, res, next) => {
    const { editedImageUrl } = req.body;
    Image.findById(req.params.id)
      .then((image) => {
        image.images.unshift(editedImageUrl);
        return image.save();
      })
      .then((updatedImage) => {
        res.status(StatusCodes.OK).json(updatedImage);
      })
      .catch(next);
  };