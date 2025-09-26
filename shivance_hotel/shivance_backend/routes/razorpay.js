const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// create order
router.post('/create-order', async (req, res) => {
  const { amount, currency = 'INR', receipt } = req.body;
  try {
    const options = {
      amount: Math.round(amount * 100), // in paise
      currency,
      receipt: receipt || `rcpt_${uuidv4()}`
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
