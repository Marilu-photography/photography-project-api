const mongoose = require("mongoose");
const Comment = require("../models/Comment.model");
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
