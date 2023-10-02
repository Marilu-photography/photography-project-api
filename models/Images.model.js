const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required.'],
    },
    imageUrl: {
        type: String,
        required: [true, 'Image is required.']
    },
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
        required: [true, 'Author is required.'],
    }
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;