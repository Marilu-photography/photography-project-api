const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeSchema = new Schema(  
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        image: {
            type: Schema.Types.ObjectId,
            ref: 'Images',
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
                return ret;
            }
        }
    }
);

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;