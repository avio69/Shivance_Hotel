require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const MenuItem = require('../models/MenuItem');
const User = require('../models/User');

const menuItems = [
  { name: "Veg Burger", category: "Burgers", price: 60, image: "https://via.placeholder.com/300?text=Veg+Burger" },
  { name: "Cheese Burger", category: "Burgers", price: 80, image: "https://via.placeholder.com/300?text=Cheese+Burger" },
  { name: "Paneer Burger", category: "Burgers", price: 90, image: "https://via.placeholder.com/300?text=Paneer+Burger" },
  { name: "Chicken Burger", category: "Burgers", price: 100, image: "https://via.placeholder.com/300?text=Chicken+Burger" },
  { name: "Veg Sandwich", category: "Sandwiches", price: 50, image: "https://via.placeholder.com/300?text=Veg+Sandwich" },
  { name: "Cheese Grilled Sandwich", category: "Sandwiches", price: 70, image: "https://via.placeholder.com/300?text=Cheese+Grilled+Sandwich" },
  { name: "Veg Roll", category: "Rolls", price: 50, image: "https://via.placeholder.com/300?text=Veg+Roll" },
  { name: "Paneer Roll", category: "Rolls", price: 70, image: "https://via.placeholder.com/300?text=Paneer+Roll" },
  { name: "Egg Roll", category: "Rolls", price: 60, image: "https://via.placeholder.com/300?text=Egg+Roll" },
  { name: "Chicken Roll", category: "Rolls", price: 90, image: "https://via.placeholder.com/300?text=Chicken+Roll" },
  { name: "Margherita", category: "Pizza", price: 120, image: "https://via.placeholder.com/300?text=Margherita" },
  { name: "Veg Loaded", category: "Pizza", price: 150, image: "https://via.placeholder.com/300?text=Veg+Loaded" },
  { name: "Paneer Tikka", category: "Pizza", price: 170, image: "https://via.placeholder.com/300?text=Paneer+Tikka" },
  { name: "Chicken BBQ", category: "Pizza", price: 200, image: "https://via.placeholder.com/300?text=Chicken+BBQ" },
  { name: "Veg Biryani", category: "Biryani", price: 120, image: "https://via.placeholder.com/300?text=Veg+Biryani" },
  { name: "Paneer Biryani", category: "Biryani", price: 150, image: "https://via.placeholder.com/300?text=Paneer+Biryani" },
  { name: "Egg Biryani", category: "Biryani", price: 140, image: "https://via.placeholder.com/300?text=Egg+Biryani" },
  { name: "Chicken Biryani", category: "Biryani", price: 180, image: "https://via.placeholder.com/300?text=Chicken+Biryani" },
  { name: "Mutton Biryani", category: "Biryani", price: 250, image: "https://via.placeholder.com/300?text=Mutton+Biryani" },
  { name: "Veg Steam Momos", category: "Momos", price: 70, image: "https://via.placeholder.com/300?text=Veg+Steam+Momos" },
  { name: "Veg Fried Momos", category: "Momos", price: 90, image: "https://via.placeholder.com/300?text=Veg+Fried+Momos" },
  { name: "Paneer Momos", category: "Momos", price: 100, image: "https://via.placeholder.com/300?text=Paneer+Momos" },
  { name: "Chicken Steam Momos", category: "Momos", price: 100, image: "https://via.placeholder.com/300?text=Chicken+Steam+Momos" },
  { name: "Chicken Fried Momos", category: "Momos", price: 120, image: "https://via.placeholder.com/300?text=Chicken+Fried+Momos" },
  { name: "Veg Hakka Noodles", category: "Noodles", price: 80, image: "https://via.placeholder.com/300?text=Veg+Hakka+Noodles" },
  { name: "Egg Noodles", category: "Noodles", price: 90, image: "https://via.placeholder.com/300?text=Egg+Noodles" },
  { name: "Chicken Noodles", category: "Noodles", price: 110, image: "https://via.placeholder.com/300?text=Chicken+Noodles" },
  { name: "White Sauce Pasta", category: "Pasta", price: 120, image: "https://via.placeholder.com/300?text=White+Sauce+Pasta" },
  { name: "Red Sauce Pasta", category: "Pasta", price: 130, image: "https://via.placeholder.com/300?text=Red+Sauce+Pasta" },
  { name: "French Fries", category: "Sides", price: 60, image: "https://via.placeholder.com/300?text=French+Fries" },
  { name: "Cheese Fries", category: "Sides", price: 80, image: "https://via.placeholder.com/300?text=Cheese+Fries" },
  { name: "Spring Roll", category: "Sides", price: 70, image: "https://via.placeholder.com/300?text=Spring+Roll" },
  { name: "Cold Drink (200ml)", category: "Beverages", price: 20, image: "https://via.placeholder.com/300?text=Cold+Drink+200ml" },
  { name: "Cold Drink (500ml)", category: "Beverages", price: 40, image: "https://via.placeholder.com/300?text=Cold+Drink+500ml" },
  { name: "Cold Coffee", category: "Beverages", price: 60, image: "https://via.placeholder.com/300?text=Cold+Coffee" },
  { name: "Fresh Lime Soda", category: "Beverages", price: 40, image: "https://via.placeholder.com/300?text=Fresh+Lime+Soda" },
  { name: "Tea", category: "Beverages", price: 20, image: "https://via.placeholder.com/300?text=Tea" },
  { name: "Coffee", category: "Beverages", price: 30, image: "https://via.placeholder.com/300?text=Coffee" }
];

const seed = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await MenuItem.deleteMany({});
    await User.deleteMany({});
    await MenuItem.insertMany(menuItems);
    const admin = new User({
      name: 'Shivance Admin',
      email: process.env.ADMIN_EMAIL || 'admin@shivance.com',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      phone: '0000000000',
      address: 'Halsi, Lakhisarai',
      isAdmin: true
    });
    await admin.save();
    console.log('Seed completed');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
