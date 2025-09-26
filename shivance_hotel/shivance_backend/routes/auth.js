const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

// register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    const user = new User({ name, email, password, phone, address });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.json({ token, user: { name: user.name, email: user.email, phone: user.phone, address: user.address } });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  const isMatch = await user.matchPassword(password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
  res.json({ token, user: { name: user.name, email: user.email, phone: user.phone, address: user.address, isAdmin: user.isAdmin } });
});

module.exports = router;
