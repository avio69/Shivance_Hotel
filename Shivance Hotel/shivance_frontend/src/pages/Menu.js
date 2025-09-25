import React, {useEffect, useState, useContext} from 'react';
import API from '../api';
import { CartContext } from '../App';
export default function Menu(){
  const [items,setItems] = useState([]);
  const {cart,setCart} = useContext(CartContext);
  useEffect(()=>{
    API.get('/menu').then(res=>setItems(res.data)).catch(console.error);
  },[]);
  function addToCart(item){
    const idx = cart.findIndex(c=>c._id===item._id);
    if(idx>-1){ const copy=[...cart]; copy[idx].quantity +=1; setCart(copy); }
    else setCart([...cart, {...item, quantity:1}]);
  }
  const grouped = items.reduce((acc,it)=>{(acc[it.category] = acc[it.category]||[]).push(it); return acc},{})    
  return (
    <div className="container">
      <h2>Menu</h2>
      {Object.keys(grouped).map(cat=> (
        <div key={cat}>
          <h3>{cat}</h3>
          <div className="grid">
            {grouped[cat].map(item=> (
              <div className="card" key={item._id}>
                <h4>{item.name}</h4>
                <p>₹{item.price}</p>
                <button onClick={()=>addToCart(item)}>Add to cart</button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
