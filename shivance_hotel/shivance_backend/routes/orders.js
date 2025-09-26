const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protect, adminOnly } = require('../middleware/auth');

// place order (public)
router.post('/', async (req, res) => {
  const { user, items, totalPrice, paymentMethod, paymentInfo } = req.body;
  const order = new Order({ user, items, totalPrice, paymentMethod, paymentInfo });
  await order.save();
  res.json(order);
});

// get all orders (admin)
router.get('/', protect, adminOnly, async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

// update status (admin)
router.put('/:id/status', protect, adminOnly, async (req, res) => {
  const { status } = req.body;
  const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json(order);
});

module.exports = router;
