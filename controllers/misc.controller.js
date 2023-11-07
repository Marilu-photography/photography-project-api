const mongoose = require("mongoose");
const Comment = require("../models/Comment.model");
const Like = require("../models/Like.model");
const Image = require("../models/Images.model")
const createError = require("http-errors");

// CREATE COMMENT

module.exports.createComment = (req, res, next) => {
  const data = {
    ...req.body,
    user: req.currentUser,
    date: new Date(),
    product: req.params.id
  };

  Comment.create(data)
    .then((comment) => {
      res.status(201).json(comment);
    })
    .catch((error) => {
      next(error);
    });
};

// GET COMMENTS

module.exports.listComments = (req, res, next) => {
  const { id } = req.params;
  console.log(id)
  Comment.find({ product: id })
    .populate("user")
    .populate("product")
    .then((comments) => {
      res.json(comments);
    })
    .catch((error) => {
      next(error);
    });
};

// DELETE COMMENT

module.exports.deleteComment = (req, res, next) => {
  const { id } = req.params;
  Comment.findByIdAndDelete(id)
    .then((comment) => {
      console.log("comment deleted");
      res.status(204).json({ status: "deleted" });
    })
    .catch((error) => {
      next(error);
    });
};

//LIKES 

module.exports.likeCreate = (req, res, next) => {
  const userId = req.params.userId;
  const imageId = req.params.imageId

  Image.findById(imageId)
    .then(image => {
      console.log(imageId)
      if (!image) {
        return res.status(404).json({ error: 'Image not found' });
      }

      Like.findOne({ user: userId, image: imageId })
        .then(like => {
          if (!like) {
            const like = new Like({
              user: userId,
              image: imageId
            });
            like.save()
              .then(() => {
                res.status(204).json({ status: "created" });
              })
              .catch(err => {
                next(err);
              });
          }
        })
        .catch(err => {
          next(err);
        });

    })
    .catch(err => {
      next(err);
    });
};


module.exports.likeDelete = (req, res, next) => {
  const userId = req.params.userId;
  const imageId = req.params.imageId

  Image.findById(imageId)
    .then(image => {
      console.log(imageId)
      if (!image) {
        return res.status(404).json({ error: 'Image not found' });
      }

      Like.findOne({ user: userId, image: imageId })
        .then(like => {
          if (like) {
            Like.findOneAndDelete({ user: userId, image: imageId })
            .then(() => {
              res.status(204).json({ status: "deleted" });
            })
            .catch(err => {
              next(err);
            });
          }
        })
        .catch(err => {
          next(err);
        });

    })
    .catch(err => {
      next(err);
    });
};

module.exports.listLikes = (req, res, next) => {
  Like.find()
    .populate("user")
    .populate("image")
    .then((likes) => {
      res.json(likes);
    })
    .catch((error) => {
      next(error);
    });
};