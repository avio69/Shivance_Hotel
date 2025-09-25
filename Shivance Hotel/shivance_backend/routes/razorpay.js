const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
require('dotenv').config();
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});
// Create an order (called from frontend before opening checkout)
router.post('/create-order', async (req,res)=>{
  try{
    const {amount, currency, receipt} = req.body; // amount in rupees
    const options = {
      amount: Math.round(amount*100), // in paise
      currency: currency || 'INR',
      receipt: receipt || 'rcpt_'+Date.now()
    };
    const order = await instance.orders.create(options);
    res.json(order);
  }catch(err){
    console.error(err); res.status(500).json({error:'Razorpay order creation failed'})
  }
});
module.exports = router;
