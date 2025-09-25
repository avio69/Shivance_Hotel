import React, {useEffect, useState} from 'react';
import API from '../api';
export default function AdminPanel(){
  const [orders,setOrders] = useState([]);
  const [items,setItems] = useState([]);
  const [newItem, setNewItem] = useState({name:'',category:'',price:0});
  useEffect(()=>{
    // attach token if present
    const token = localStorage.getItem('token');
    if(token) API.defaults.headers.common['x-auth-token'] = token;
    API.get('/orders').then(r=>setOrders(r.data)).catch(()=>{});
    API.get('/menu').then(r=>setItems(r.data)).catch(()=>{});
  },[]);
  const updateStatus = async (id,status)=>{
    await API.put(`/orders/update/${id}`, {status});
    setOrders(orders.map(o=> o._id===id ? {...o, status} : o));
  }
  const addMenu = async ()=>{
    await API.post('/menu/add', newItem);
    const res = await API.get('/menu'); setItems(res.data);
    setNewItem({name:'',category:'',price:0});
  }
  return (
    <div className='container'>
      <h2>Admin Panel</h2>
      <section>
        <h3>Orders</h3>
        {orders.map(o => (
          <div key={o._id} style={{border:'1px solid #ddd',padding:8,margin:6}}>
            <div>Order: {o._id} | Status: {o.status}</div>
            <div>Items: {o.items.map(i=> i.name + ' x'+i.quantity).join(', ')}</div>
            <button onClick={()=>updateStatus(o._id,'Accepted')}>Accept</button>
            <button onClick={()=>updateStatus(o._id,'Out for Delivery')}>Out for Delivery</button>
            <button onClick={()=>updateStatus(o._id,'Delivered')}>Delivered</button>
          </div>
        ))}
      </section>
      <section>
        <h3>Menu Items</h3>
        {items.map(it => <div key={it._id}>{it.name} — ₹{it.price}</div>)}
        <div style={{marginTop:12}}>
          <input placeholder='Name' value={newItem.name} onChange={e=>setNewItem({...newItem,name:e.target.value})} />
          <input placeholder='Category' value={newItem.category} onChange={e=>setNewItem({...newItem,category:e.target.value})} />
          <input placeholder='Price' type='number' value={newItem.price} onChange={e=>setNewItem({...newItem,price:Number(e.target.value)})} />
          <button onClick={addMenu}>Add Item</button>
        </div>
      </section>
    </div>
  )
}
