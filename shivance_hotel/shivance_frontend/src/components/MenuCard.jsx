import React from 'react';

export default function MenuCard({ item, onAdd }){
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-3">
      <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-md"/>
      <div className="mt-2">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold">{item.name}</h3>
          <div className="text-green-600 font-bold">₹{item.price}</div>
        </div>
        <p className="text-sm text-gray-500">{item.description || item.category}</p>
        <button onClick={() => onAdd(item)} className="mt-3 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded">Add</button>
      </div>
    </div>
  );
}
