import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

export default function Navbar(){
  const { cart } = useContext(CartContext);
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-xl">S</div>
          <div>
            <div className="font-bold">Shivance Hotel</div>
            <div className="text-sm text-gray-500">Halsi, Lakhisarai — 📞 0000000000</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/" className="hover:text-yellow-600">Home</Link>
          <Link to="/menu" className="hover:text-yellow-600">Menu</Link>
          <Link to="/admin/login" className="text-sm px-3 py-1 border rounded">Admin</Link>
          <Link to="/cart" className="relative">
            <span className="ml-1">Cart</span>
            {cart.length>0 && <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 rounded-full">{cart.length}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
}
