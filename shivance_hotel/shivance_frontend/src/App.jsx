import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import OrderConfirm from './pages/OrderConfirm';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';

export default function App(){
  return (
    <CartProvider>
      <div className="min-h-screen">
        <Navbar />
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/menu" element={<MenuPage/>} />
            <Route path="/cart" element={<CartPage/>} />
            <Route path="/checkout" element={<Checkout/>} />
            <Route path="/order/:id" element={<OrderConfirm/>} />
            <Route path="/admin/login" element={<AdminLogin/>} />
            <Route path="/admin/dashboard" element={<AdminDashboard/>} />
          </Routes>
        </main>
      </div>
    </CartProvider>
  );
}
