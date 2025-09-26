const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
  user: {
    name: String,
    phone: String,
    address: String
  },
  items: [{
    menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
    name: String,
    qty: Number,
    price: Number
  }],
  totalPrice: Number,
  paymentMethod: { type: String, enum: ['COD','RAZORPAY'], default: 'COD' },
  paymentInfo: {},
  status: { type: String, enum: ['Pending','Accepted','Delivered'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
