const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
// Get all menu
router.get('/', async (req,res)=>{
  const items = await MenuItem.find();
  res.json(items);
});
// Add menu item (admin)
router.post('/add', auth, admin, async (req,res)=>{
  const item = new MenuItem(req.body);
  await item.save();
  res.json({msg:'Added'});
});
// Update availability
router.put('/toggle/:id', auth, admin, async (req,res)=>{
  const item = await MenuItem.findById(req.params.id);
  item.available = !item.available;
  await item.save();
  res.json(item);
});
module.exports = router;
