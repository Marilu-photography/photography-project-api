const mongoose = require("mongoose");
const Comment = require("../models/Comment.model");
const Product = require("../models/Products.model");
const User = require("../models/User.model");
const createError = require("http-errors");

// DO COMMENT

module.exports.createComment = (req, res, next) => {
  const { id } = req.params;

  Product.findById(id)
    .then((product) => {
      if (!product) {
        return Promise.reject(createError(404, "Product not found"));
      }

      const comment = new Comment({
        user: req.user.id,
        product: id,
        message: req.body.message,
        score: req.body.score,
      });

      return comment.save().then((savedComment) => {
        product.comments = [...product.comments, savedComment._id];
        return product.save().then(() => {
          res.status(201).json(savedComment);
        });
      });
    })
    .catch((error) => {
      next(error);
    });
};

// GET COMMENTS FOR PRODUCT

module.exports.getCommentsForProduct = (req, res, next) => {
  const productId = req.params.id;
  Comment.find({ product: productId })
    .populate("user")
    .then((comments) => {
      res.status(200).json(comments);
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
      if (!comment) {
        return Promise.reject(createError(404, "Comment not found"));
      } else {
        res.status(204).json();
      }
    })
    .catch((error) => {
      next(error);
    });
};
