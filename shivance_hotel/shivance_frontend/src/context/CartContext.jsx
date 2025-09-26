import React, { createContext, useState } from 'react';
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const addToCart = (item) => {
    setCart(prev => {
      const found = prev.find(i => i._id === item._id);
      if(found) return prev.map(i => i._id === item._id ? {...i, qty: i.qty + 1} : i);
      return [...prev, {...item, qty: 1}];
    })
  };
  const removeFromCart = (id) => setCart(prev => prev.filter(i => i._id !== id));
  const updateQty = (id, qty) => setCart(prev => prev.map(i => i._id === id ? {...i, qty} : i));
  const clear = () => setCart([]);
  const total = cart.reduce((s,i) => s + (i.price * i.qty), 0);
  return <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clear, total }}>{children}</CartContext.Provider>
};
