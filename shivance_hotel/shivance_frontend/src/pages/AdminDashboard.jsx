import React, { useEffect, useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard(){
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await API.get('/orders');
        setOrders(res.data);
      } catch (err) {
        navigate('/admin/login');
      }
    }
    fetch();
  }, []);

  const updateStatus = async (id, status) => {
    await API.put(`/orders/${id}/status`, { status });
    setOrders(prev => prev.map(o => o._id === id ? { ...o, status } : o));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <div className="space-y-3">
        {orders.map(o => (
          <div key={o._id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <div className="font-semibold">Order {o._id}</div>
              <div>{o.user?.name} — {o.user?.phone}</div>
              <div className="text-sm">Total: ₹{o.totalPrice} — {o.paymentMethod}</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1 border rounded">{o.status}</div>
              {o.status === 'Pending' && <button onClick={()=>updateStatus(o._id, 'Accepted')} className="px-3 py-1 bg-green-500 text-white rounded">Accept</button>}
              {o.status === 'Accepted' && <button onClick={()=>updateStatus(o._id, 'Delivered')} className="px-3 py-1 bg-blue-500 text-white rounded">Mark Delivered</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
