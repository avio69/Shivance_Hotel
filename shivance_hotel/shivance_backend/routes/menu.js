const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');
const { protect, adminOnly } = require('../middleware/auth');

// public get all menu (with optional category filter)
router.get('/', async (req, res) => {
  const category = req.query.category;
  const filter = category && category !== 'All' ? { category } : {};
  const items = await MenuItem.find(filter);
  res.json(items);
});

// admin create
router.post('/', protect, adminOnly, async (req, res) => {
  const item = new MenuItem(req.body);
  await item.save();
  res.json(item);
});

// admin update
router.put('/:id', protect, adminOnly, async (req, res) => {
  const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
});

// admin delete
router.delete('/:id', protect, adminOnly, async (req, res) => {
  await MenuItem.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
