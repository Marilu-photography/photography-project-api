const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const SALT_WORK_FACTOR = 10;
const EMAIL_PATTERN =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      minlength: [3, "Username needs at least 3 chars"],
      required: [true, "Username is required."],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name needs at least 3 chars"],
      maxlength: [50, "Name needs max 50 chars"],
    },
    surname: {
      type: String,
      required: [true, "Surname is required"],
      trim: true,
      minlength: [3, "Surname needs at least 3 chars"],
    },
    email: {
      type: String,
      requir: true,
      unique: true,
      lowercase: true,
      match: [EMAIL_PATTERN, "Please use a valid email address."],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password needs at least 8 chars"],
    },

    avatar: {
      type: String,
      default:
        "https://cdn1.iconfinder.com/data/icons/web-seo-and-marketing/512/camera-1024.png",
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    active: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = doc.id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        return ret;
      },
    },
  }
);

userSchema.virtual("images", {
  ref: "Image",
  localField: "_id",
  foreignField: "author",
  justOne: false,
});

userSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "user",
  justOne: false,
});

userSchema.virtual("order", {
  ref: "Order",
  localField: "_id",
  foreignField: "user",
  justOne: false,
});

userSchema.virtual("like", {
  ref: "Like",
  localField: "_id",
  foreignField: "user",
  justOne: false,
});

userSchema.pre("save", function (next) {
  const user = this;

  if (user.isModified("password")) {
    bcrypt
      .genSalt(SALT_WORK_FACTOR)
      .then((salt) => {
        return bcrypt.hash(user.password, salt).then((hash) => {
          user.password = hash;
          next();
        });
      })
      .catch((error) => next(error));
  } else {
    next();
  }
});

userSchema.methods.checkPassword = function (passwordToCheck) {
  return bcrypt.compare(passwordToCheck, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
