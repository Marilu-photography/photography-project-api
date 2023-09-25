const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
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
  conditionDescription: String,
  brand: String,
  model: String,
  image: String, // You can store the image URL or use another method to store images
  availability: Boolean,
  location: String,
  seller: {
    name: String,
    contact: String,
    // You can add more details about the seller as needed
  },
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