const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ['Camera', 'Lens', 'Accessory'],
    required: true,
  },
  condition: {
    type: String,
    enum: ['New', 'Used'],
    default: 'New',
  },
  brand: String,
  model: String,
  image: String, // You can store the image URL or use another method to store images
  availability: Boolean,
  
  cameraType: {
    type: String,
    enum: ['DSLR', 'Mirrorless', 'Compact', 'Bridge', 'Action', 'Medium Format', 'Other'],
  },
  lensType: {
    type: String,
    enum: ['Prime', 'Zoom', 'Wide Angle', 'Telephoto', 'Macro', 'Fisheye', 'Other'],
  },
  accessoryType: {
    type: String,
    enum: ['Battery', 'Flash', 'Memory Card', 'Camera Bag', 'Camera Case', 'Tripod', 'Other'],
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;