const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  faculty: {
    type: String,
    required: true,
    enum: ['Engineering', 'Pharmacy', 'Computer Science', 'Other']
  },
  type: {
    type: String,
    required: true,
    enum: ['Book', 'Sheet', 'Tool']
  },
  image: {
    type: String,
    default: 'default-product.jpg'
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema); 