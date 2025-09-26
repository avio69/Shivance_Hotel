import React, { useEffect, useState, useContext } from 'react';
import API from '../api/api';
import MenuCard from '../components/MenuCard';
import { CartContext } from '../context/CartContext';

const categories = ["All","Burgers","Sandwiches","Rolls","Pizza","Biryani","Momos","Noodles","Pasta","Sides","Beverages"];

export default function MenuPage(){
  const [items, setItems] = useState([]);
  const [cat, setCat] = useState('All');
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetch = async () => {
      const res = await API.get('/menu' + (cat === 'All' ? '' : `?category=${cat}`));
      setItems(res.data);
    }
    fetch();
  }, [cat]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Menu</h2>
      <div className="flex gap-2 overflow-x-auto mb-4">
        {categories.map(c => <button key={c} onClick={() => setCat(c)} className={`px-3 py-1 rounded ${c===cat ? 'bg-yellow-500 text-white' : 'bg-white'}`}>{c}</button>)}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map(i => <MenuCard key={i._id} item={i} onAdd={addToCart} />)}
      </div>
    </div>
  );
}
