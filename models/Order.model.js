const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema(

    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        products: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                default: 1
            }
        }],

        date: {
            type: Date,
            default: Date.now
        },
        status: {
            type: String,
            enum: ['pending', 'paid', 'cancelled'],
            default: 'pending'
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

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;