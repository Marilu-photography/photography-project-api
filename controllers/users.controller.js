const createHttpError = require('http-errors');
const User = require('../models/User.model');
const { StatusCodes } = require('http-status-codes');

module.exports.getCurrentUser = (req, res, next) => {
User.findById(req.currentUser)
.then(user => {
    if (!user) {
        next(createHttpError(StatusCodes.NOT_FOUND, 'User not found'))
    } else {
        res.json(user)
    }
})
.catch(next)
}

module.exports.userProfile = (req, res, next) => {
User.findById(req.params.id)
.populate({
    path: 'images',
    populate: {
        path: 'author',
        module: 'User'
    }
})

    .then(user => res.status(StatusCodes.OK).json(user))
    .catch(next)
}

module.exports.edit = (req, res, next) => {
    const data = {
        ...req.body,
    };

    if (req.file) {
        data.avatar = req.file.path;
    }
  
    User.findByIdAndUpdate(req.params.userId, data, { new: true })
  .then(user => {
    if (user) {
      const responseData = {
        username: user.username,
        name: user.name,
        message: "Profile updated successfully."
      };

      res.status(StatusCodes.OK).json(responseData);
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ error: "User not found." });
    }
  })
  .catch(error => {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "An error occurred while updating the profile." });
  });
}



