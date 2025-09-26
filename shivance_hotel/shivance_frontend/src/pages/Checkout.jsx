import React, { useContext, useState } from 'react';
import API from '../api/api';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Checkout(){
  const { cart, total, clear } = useContext(CartContext);
  const [form, setForm] = useState({ name:'', phone:'', address:'', paymentMethod:'COD' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const placeOrder = async (paymentInfo={}) => {
    const payload = {
      user: { name: form.name, phone: form.phone, address: form.address },
      items: cart.map(i => ({ menuItem: i._id, name: i.name, qty: i.qty, price: i.price })),
      totalPrice: total,
      paymentMethod: form.paymentMethod,
      paymentInfo
    };
    const res = await API.post('/orders', payload);
    clear();
    navigate(`/order/${res.data._id}`);
  };

  const handleRazorpay = async () => {
    setLoading(true);
    try {
      const create = await API.post('/razorpay/create-order', { amount: total });
      const order = create.data;
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || '<RAZOR_KEY>',
        amount: order.amount,
        currency: order.currency,
        name: "Shivance Hotel",
        description: "Food Order",
        order_id: order.id,
        handler: async function (response) {
          await placeOrder({ razorpay: response });
        },
        prefill: { name: form.name, contact: form.phone }
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert('Payment error: ' + err.message);
    } finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.paymentMethod === 'COD') {
      await placeOrder();
    } else {
      if (!window.Razorpay) {
        const s = document.createElement('script');
        s.src = 'https://checkout.razorpay.com/v1/checkout.js';
        document.body.appendChild(s);
        s.onload = handleRazorpay;
      } else handleRazorpay();
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input required placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full p-2 border rounded" />
        <input required placeholder="Phone" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full p-2 border rounded" />
        <textarea required placeholder="Address" value={form.address} onChange={e => setForm({...form, address: e.target.value})} className="w-full p-2 border rounded" />
        <div>
          <label className="mr-3"><input type="radio" checked={form.paymentMethod==='COD'} onChange={() => setForm({...form, paymentMethod:'COD'})} /> Cash on Delivery</label>
          <label className="ml-6"><input type="radio" checked={form.paymentMethod==='RAZORPAY'} onChange={() => setForm({...form, paymentMethod:'RAZORPAY'})} /> Razorpay</label>
        </div>
        <div className="text-right font-bold">Total: ₹{total}</div>
        <button type="submit" disabled={loading} className="w-full bg-yellow-500 text-white py-2 rounded">{ form.paymentMethod === 'COD' ? 'Place Order (COD)' : 'Pay with Razorpay' }</button>
      </form>
    </div>
  );
}
