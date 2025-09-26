const mongoose = require('mongoose');
const MenuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  price: Number,
  image: String,
  description: String
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', MenuItemSchema);
