const User = require("../models/User.model");
const { StatusCodes } = require("http-status-codes");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

module.exports.register = (req, res, next) => {
  if (req.file) {
    req.body.avatar = req.file.path;
  }

  User.create(req.body)
    .then((user) => res.status(StatusCodes.CREATED).json(user))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const loginError = createError(
    StatusCodes.UNAUTHORIZED,
    "Invalid email or password"
  );
  const { email, password } = req.body;

  if (!email || !password) {
    return next(loginError);
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return next(loginError);
      }
      return user.checkPassword(password).then((match) => {
        if (!match) {
          return next(loginError);
        }
        const token = jwt.sign(
          { id: user._id },
          process.env.JWT_SECRET || "Super Secret",
          {
            expiresIn: "1h",
          }
        );
        res.json({ accessToken: token });
      });
    })
    .catch(next);
};
