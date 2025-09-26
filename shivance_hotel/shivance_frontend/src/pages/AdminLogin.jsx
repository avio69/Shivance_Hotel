import React, { useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin(){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const nav = useNavigate();
  const handle = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      if (res.data.user.isAdmin) {
        localStorage.setItem('token', res.data.token);
        nav('/admin/dashboard');
      } else alert('Not admin');
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Admin Login</h2>
      <form onSubmit={handle} className="space-y-3">
        <input required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded" />
        <input required type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full p-2 border rounded" />
        <button className="w-full bg-yellow-500 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
}
