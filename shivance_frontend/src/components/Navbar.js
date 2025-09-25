import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../App';
export default function Navbar(){
  const {cart} = useContext(CartContext);
  return (
    <nav className="nav">
      <div className="logo">Shivance Hotel</div>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/cart">Cart ({cart.length})</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  )
}
