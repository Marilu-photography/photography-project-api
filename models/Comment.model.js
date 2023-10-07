const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(  
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        image: {
            type: Schema.Types.ObjectId,
            ref: 'Image',
            required: true
        },
        message: {
            type: String,
            required: [true, 'Please, write a comment']
        },
        date: {
            type: Date,
            default: Date.now
        },
        score: {
            type: Number,
            min: 1,
            max: 5,
            default: 0
        }
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: (doc, ret) => {
                ret.id = doc.id;
                delete ret._id;
                delete ret.__v;
                return ret;
            }
        }
    }
);

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;