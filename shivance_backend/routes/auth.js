 const express = require('express');
 const router = express.Router();
 const bcrypt = require('bcryptjs');
 const jwt = require('jsonwebtoken');
 const User = require('../models/User');
 // Register
router.post('/register', async (req,res)=>{
  try{
    const {name,email,password,phone,address} = req.body;
    const existing = await User.findOne({email});
    if(existing) return res.status(400).json({msg:'User exists'});
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = new User({name,email,password:hash,phone,address});
    await user.save();
    res.json({msg:'Registered'});
  }catch(err){console.error(err); res.status(500).send('Server error')}
});
// Login
router.post('/login', async (req,res)=>{
  try{
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user) return res.status(400).json({msg:'Invalid credentials'});
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch) return res.status(400).json({msg:'Invalid credentials'});
    const token = jwt.sign({id:user._id, isAdmin:user.isAdmin}, process.env.JWT_SECRET, {expiresIn:'7d'});
    res.json({token, user:{id:user._id, name:user.name, email:user.email, isAdmin:user.isAdmin}});
  }catch(err){console.error(err); res.status(500).send('Server error')}
});
module.exports = router;
