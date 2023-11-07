const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required.'],
    },
    images: [{
        type: String,
        required: [true, 'Image is required.']
    }],
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: [true, 'Price is required.'],
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    editedImageUrl: {
        type: String,
    },
    productType: {
        type: String,
        default: 'image'
    },
    },
{ timestamps: true
  
});

imageSchema.virtual('order', {
    ref: 'Order',
    localField: '_id',
    foreignField: 'image',
    justOne: false,
  });

  imageSchema.virtual("like", {
    ref: "Like",
    localField: "_id",
    foreignField: "image",
    justOne: false,
  });

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;