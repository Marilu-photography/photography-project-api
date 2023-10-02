const mongoose = require('mongoose');
const { BRAND, CATEGORY, CONDITION, CAMERATYPE, LENSTYPE, ACCESSORYTYPE } = ('../misc/enum.js')


const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required.'],
  },
  image: {
    type: String,
    required: [true, 'Image is required.'],
  },
  description: {
    type: String,
    required: [true, 'Description is required.']
  },
  price: {
    type: Number,
    required: [true, 'Price is required.'],
  },
  category: {
    type: String,
    enum: CATEGORY,
    required: [true, 'Category is required.']
  },
  condition: {
    type: String,
    enum: CONDITION,
    default: 'New',
  },
  brand: {
    type: String,
    enum: BRAND,
  },
  model: String,
  availability: Boolean,
  
  cameraType: {
    type: String,
    enum: CAMERATYPE,
  },
  lensType: {
    type: String,
    enum: LENSTYPE,
  },
  accessoryType: {
    type: String,
    enum: ACCESSORYTYPE,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;