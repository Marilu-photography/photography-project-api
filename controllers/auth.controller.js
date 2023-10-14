const User = require("../models/User.model");
const { StatusCodes } = require("http-status-codes");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { sendActivationEmail } = require("../config/nodemailer.config");

module.exports.register = (req, res, next) => {
  const data = {
    ...req.body,
    avatar: req.file ? req.file.path : undefined,
  };

  User.create(data)
    .then((user) =>{ 
      sendActivationEmail(user);
      res.status(StatusCodes.CREATED).json(user)})
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

  const activatedError = createError(
    StatusCodes.UNAUTHORIZED,
    "You need to activate your account. Please check your email"
  );

  User.findOne({email, active: true})
    .then((user) => {
      if (!user) {
        return next(activatedError);
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

// ACTIVATE USER

module.exports.activateUser = (req, res, next) => {
  const { id } = req.params;

  User.findByIdAndUpdate(id, { active: true }, { new: true })
    .then((user) => {
      console.log(user, 'user activated');
      res.json({ message: 'User activated successfully' });
      }
    )
    .catch(next);
}

// GET USER

// module.exports.getUser = (req, res, next) => {
//   const id  = req.query;
//   console.log(id, 'id');

//   User.findById(id)
//     .then((user) => {
//       console.log(user, 'user activated');
//       res.json(user);
//       }
//     )
//     .catch(next);
// }