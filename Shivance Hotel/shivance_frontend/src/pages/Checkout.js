import React, {useContext, useState} from 'react';
import { CartContext } from '../App';
import API from '../api';
export default function Checkout(){
  const {cart,setCart} = useContext(CartContext);
  const [name,setName] = useState('');
  const [phone,setPhone] = useState('');
  const [address,setAddress] = useState('Halsi Lakhisarai, Bihar');
  const [msg,setMsg] = useState('');
  const [payOnline,setPayOnline] = useState(false);
  const total = cart.reduce((s,i)=> s + i.price*i.quantity,0);
  async function placeOrderOnline(){
    try{
      const orderData = await API.post('/razorpay/create-order', { amount: total, currency: 'INR' });
      const r = orderData.data;
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: r.amount,
        currency: r.currency,
        name: 'Shivance Hotel',
        description: 'Order Payment',
        order_id: r.id,
        handler: async function (response){
          // After successful payment you can call backend to save order with paymentMode='Online'
          const orderPayload = {
            userId: null,
            items: cart.map(i=>({foodId:i._id, name:i.name, price:i.price, quantity:i.quantity})),
            totalPrice: total,
            paymentMode: 'Online',
            address,
            phone
          };
          const res = await API.post('/orders/create', orderPayload);
          setMsg('Order placed! ID: '+res.data.order._id);
          setCart([]);
        }
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    }catch(err){ console.error(err); setMsg('Payment failed'); }
  }
  async function placeOrderCOD(){
    if(!name||!phone) return setMsg('Please enter name and phone');
    const orderPayload = {
      userId: null,
      items: cart.map(i=>({foodId:i._id, name:i.name, price:i.price, quantity:i.quantity})),
      totalPrice: total,
      paymentMode: 'Cash on Delivery',
      address,
      phone
    };
    try{
      const res = await API.post('/orders/create', orderPayload);
      setMsg('Order placed! Order ID: ' + res.data.order._id);
      setCart([]);
    }catch(err){ console.error(err); setMsg('Error placing order') }
  }
  return (
    <div className="container">
      <h2>Checkout</h2>
      <input placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} />
      <input placeholder="Phone" value={phone} onChange={e=>setPhone(e.target.value)} />
      <textarea value={address} onChange={e=>setAddress(e.target.value)} />
      <h3>Total: ₹{total}</h3>
      <div>
        <label><input type="radio" checked={!payOnline} onChange={()=>setPayOnline(false)} /> Cash on Delivery</label>
        <label style={{marginLeft:12}}><input type="radio" checked={payOnline} onChange={()=>setPayOnline(true)} /> Pay Online</label>
      </div>
      {payOnline ? <button onClick={placeOrderOnline}>Pay ₹{total} Now</button> : <button onClick={placeOrderCOD}>Place Order (COD)</button>}
      {msg && <p>{msg}</p>}
    </div>
  )
}
