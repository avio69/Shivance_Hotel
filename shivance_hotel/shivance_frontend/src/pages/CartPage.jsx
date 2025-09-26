import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

export default function CartPage(){
  const { cart, updateQty, removeFromCart, total } = useContext(CartContext);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.length===0 ? <div>No items. <Link to="/menu" className="text-yellow-600">Browse menu</Link></div> :
        <div className="space-y-4">
          {cart.map(item => (
            <div key={item._id} className="bg-white p-3 rounded shadow flex items-center gap-4">
              <img src={item.image} className="w-20 h-20 object-cover rounded" alt="" />
              <div className="flex-1">
                <div className="font-semibold">{item.name}</div>
                <div>₹{item.price}</div>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => updateQty(item._id, Math.max(1, item.qty-1))} className="px-2 border">-</button>
                  <div>{item.qty}</div>
                  <button onClick={() => updateQty(item._id, item.qty+1)} className="px-2 border">+</button>
                </div>
              </div>
              <div>
                <div className="font-bold">₹{item.price * item.qty}</div>
                <button onClick={() => removeFromCart(item._id)} className="text-red-500 mt-2">Remove</button>
              </div>
            </div>
          ))}
          <div className="text-right font-bold">Total: ₹{total}</div>
          <div className="flex justify-end gap-2">
            <Link to="/menu" className="px-4 py-2 border rounded">Continue</Link>
            <Link to="/checkout" className="px-4 py-2 bg-yellow-500 text-white rounded">Checkout</Link>
          </div>
        </div>
      }
    </div>
  );
}
