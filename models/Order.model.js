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
            enum: ['Pending', 'Paid', 'Prepared', 'Sent', 'Delivered'],
            default: 'Pending'
        },
        orderNumber: {
            type: String,
            unique: true,
          },
          orderName: {
            type: String,
            unique: true,
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

orderSchema.pre('save', async function (next) {
    try {
        const count = await this.constructor.countDocuments();
        const orderNumber = `00${count + 1}`.slice(-3);
        const formattedDate = this.createdAt.toISOString().slice(0, 10).replace(/-/g, '');
        const orderName = `onClick-order-${orderNumber}-${formattedDate}`;

        this.orderNumber = orderNumber;
        this.orderName = orderName;

        next();
    } catch (err) {
        next(err);
    }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;