import React, {useContext} from 'react';
import { CartContext } from '../App';
import { Link } from 'react-router-dom';
export default function Cart(){
  const {cart,setCart} = useContext(CartContext);
  const total = cart.reduce((s,i)=> s + i.price*i.quantity,0);
  function changeQty(i,delta){ const copy = [...cart]; copy[i].quantity = Math.max(1, copy[i].quantity + delta); setCart(copy); }
  function remove(i){ const copy=[...cart]; copy.splice(i,1); setCart(copy); }
  return (
    <div className="container">
      <h2>Your Cart</h2>
      {cart.length===0 ? <p>Cart empty. <Link to='/menu'>View menu</Link></p> : (
        <div>
          {cart.map((it,idx)=> (
            <div key={it._id} className="cartItem">
              <div>{it.name} (₹{it.price})</div>
              <div>
                <button onClick={()=>changeQty(idx,-1)}>-</button>
                {it.quantity}
                <button onClick={()=>changeQty(idx,1)}>+</button>
                <button onClick={()=>remove(idx)}>Remove</button>
              </div>
            </div>
          ))}
          <h3>Total: ₹{total}</h3>
          <Link to='/checkout'><button>Checkout</button></Link>
        </div>
      )}
    </div>
  )
}
