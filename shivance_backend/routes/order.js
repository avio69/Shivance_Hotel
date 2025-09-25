 const express = require('express');
 const router = express.Router();
 const Order = require('../models/Order');
 const auth = require('../middleware/auth');
 const admin = require('../middleware/admin');
 // Create order
router.post('/create', async (req,res)=>{
  try{
    const order = new Order(req.body);
    await order.save();
    res.json({msg:'Order placed', order});
  }catch(err){console.error(err); res.status(500).send('Server error')}
});
// Get orders for a user
router.get('/user/:userId', auth, async (req,res)=>{
  const orders = await Order.find({userId:req.params.userId}).sort({createdAt:-1});
  res.json(orders);
});
// Admin: get all orders
router.get('/', auth, admin, async (req,res)=>{
  const orders = await Order.find().populate('userId').sort({createdAt:-1});
  res.json(orders);
});
// Update order status
router.put('/update/:id', auth, admin, async (req,res)=>{
  const order = await Order.findById(req.params.id);
  order.status = req.body.status || order.status;
  await order.save();
  res.json(order);
});
module.exports = router;
