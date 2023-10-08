const createError = require("http-errors");
const Image = require("../models/Images.model");
const { StatusCodes } = require("http-status-codes");
//const cloudinary = require("../config/storage.config");


module.exports.createImage = (req, res, next) => {
    const data = { 
        ...req.body,
        imageUrl: req.file ? req.file.path : undefined, };

  Image.create(data)
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

/*module.exports.editImage = (req, res, next) => {

    cloudinary.uploader.upload(req.file.path)
    .then((result) => {
        return Image.findByIdAndUpdate(req.params.id);
    })
        .then((image) => {
            if(!image) {
                return res.status(404).json({message: 'Image not found'})
            }

            image.imageUrl = result.secure_url;
            return image.save();

    })
    .then(() => {
        res.status(StatusCodes.OK).json({ message: 'Imagen actualizada con éxito' });
    })
    .catch(error => {
        res.stattus(500).json({ message: 'Something went wrong' });
    });
    }*/