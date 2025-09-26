import React from 'react';
import { Link } from 'react-router-dom';

export default function Home(){
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
      <div>
        <h1 className="text-4xl font-bold">Delicious Fast Food & Biryani Delivered Home</h1>
        <p className="mt-4 text-gray-600">Shivance Hotel — Halsi, Lakhisarai. Fresh, hot, and delivered to your door.</p>
        <div className="mt-6">
          <Link to="/menu" className="px-5 py-3 bg-yellow-500 text-white rounded">See Menu</Link>
        </div>
      </div>
      <div>
        <img src="https://via.placeholder.com/700x400?text=Delicious+Food" alt="hero" className="rounded shadow"/>
      </div>
    </div>
  );
}
