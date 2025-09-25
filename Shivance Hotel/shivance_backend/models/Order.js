const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  items: [{
    foodId: {type: mongoose.Schema.Types.ObjectId, ref:'MenuItem'},
    name: String,
    price: Number,
    quantity: Number
  }],
  totalPrice: Number,
  status: {type: String, default: 'Pending'},
  paymentMode: String,
  address: String,
  phone: String,
  createdAt: {type: Date, default: Date.now}
});
module.exports = mongoose.model('Order', orderSchema);
