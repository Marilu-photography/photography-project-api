const mongoose = require ("mongoose");

const EMAIL_PATTERN =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const UserSchema = new mongoose.Schema (
    {
        username: {
            type: String,
            "require" : true,
        },
        surname: {
            type: String,
            "require" : true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: EMAIL_PATTERN,
          },
        password: {
            type: String,
            "require" : true,
        },
       
        avatar: {
            type: String,
            default : "https://cdn1.iconfinder.com/data/icons/web-seo-and-marketing/512/camera-1024.png"
        }
    },
    {
        timestamps: true,
        
      }
);

const User = mongoose.model("User" , UserSchema);

module.exports = User;