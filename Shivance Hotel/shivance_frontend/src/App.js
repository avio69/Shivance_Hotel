import React, {useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminPanel from './pages/AdminPanel';
import Navbar from './components/Navbar';
export const CartContext = React.createContext();
function App(){
  const [cart, setCart] = useState([]);
  return (
    <BrowserRouter>
      <CartContext.Provider value={{cart,setCart}}>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/menu' element={<Menu/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/checkout' element={<Checkout/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/admin' element={<AdminPanel/>} />
        </Routes>
      </CartContext.Provider>
    </BrowserRouter>
  )
}
export default App;
