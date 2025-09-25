const mongoose = require('mongoose');
const menuSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  description: String,
  image: String,
  available: {type:Boolean, default:true}
});
module.exports = mongoose.model('MenuItem', menuSchema);
