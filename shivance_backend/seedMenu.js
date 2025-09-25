  const mongoose = require('mongoose');
  require('dotenv').config();
  const MenuItem = require('./models/MenuItem');
  const User = require('./models/User');
  const items = [
  {name:'Veg Burger', category:'Burgers & Sandwiches', price:60},
  {name:'Cheese Burger', category:'Burgers & Sandwiches', price:80},
  {name:'Paneer Burger', category:'Burgers & Sandwiches', price:90},
  {name:'Chicken Burger', category:'Burgers & Sandwiches', price:100},
  {name:'Veg Sandwich', category:'Burgers & Sandwiches', price:50},
  {name:'Cheese Grilled Sandwich', category:'Burgers & Sandwiches', price:70},
  {name:'Veg Roll', category:'Rolls & Wraps', price:50},
  {name:'Paneer Roll', category:'Rolls & Wraps', price:70},
  {name:'Egg Roll', category:'Rolls & Wraps', price:60},
  {name:'Chicken Roll', category:'Rolls & Wraps', price:90},
  {name:'Margherita', category:'Pizza', price:120},
  {name:'Veg Loaded', category:'Pizza', price:150},
  {name:'Paneer Tikka', category:'Pizza', price:170},
  {name:'Chicken BBQ', category:'Pizza', price:200},
  {name:'Veg Biryani', category:'Biryani Specials', price:120},
  {name:'Paneer Biryani', category:'Biryani Specials', price:150},
  {name:'Egg Biryani', category:'Biryani Specials', price:140},
  {name:'Chicken Biryani', category:'Biryani Specials', price:180},
  {name:'Mutton Biryani', category:'Biryani Specials', price:250},
  {name:'Veg Steam Momos', category:'Momos', price:70},
  {name:'Veg Fried Momos', category:'Momos', price:90},
  {name:'Paneer Momos', category:'Momos', price:100},
  {name:'Chicken Steam Momos', category:'Momos', price:100},
  {name:'Chicken Fried Momos', category:'Momos', price:120},
  {name:'Veg Hakka Noodles', category:'Noodles & Pasta', price:80},
  {name:'Egg Noodles', category:'Noodles & Pasta', price:90},
  {name:'Chicken Noodles', category:'Noodles & Pasta', price:110},
  {name:'White Sauce Pasta', category:'Noodles & Pasta', price:120},
  {name:'Red Sauce Pasta', category:'Noodles & Pasta', price:130},
  {name:'French Fries', category:'Sides', price:60},
  {name:'Cheese Fries', category:'Sides', price:80},
  {name:'Spring Roll', category:'Sides', price:70},
  {name:'Cold Drink (200ml)', category:'Beverages', price:20},
  {name:'Cold Drink (500ml)', category:'Beverages', price:40},
  {name:'Cold Coffee', category:'Beverages', price:60},
  {name:'Fresh Lime Soda', category:'Beverages', price:40},
  {name:'Tea', category:'Beverages', price:20},
  {name:'Coffee', category:'Beverages', price:30}
];

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser:true, useUnifiedTopology:true})
  .then(async ()=>{
    await MenuItem.deleteMany({});
    await MenuItem.insertMany(items);
    // create admin user if not exists
    const existing = await User.findOne({email: process.env.ADMIN_EMAIL});
    if(!existing){
      const bcrypt = require('bcryptjs');
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD||'admin123', salt);
      await User.create({name:'Admin', email:process.env.ADMIN_EMAIL, password:hash, isAdmin:true});
      console.log('Admin user created:', process.env.ADMIN_EMAIL);
    }
    console.log('Menu seeded');
    process.exit(0);
  })
  .catch(err=>{console.error(err); process.exit(1)});
