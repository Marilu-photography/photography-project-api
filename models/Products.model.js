const mongoose = require('mongoose');
const { BRAND, CATEGORY, CONDITION, CAMERATYPE, LENSTYPE, ACCESSORYTYPE } = ('../misc/enum.js')


const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
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
    enum: CATEGORY,
    required: true,
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