import React, {useState} from 'react';
import API from '../api';
export default function Login(){
  const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [msg,setMsg]=useState('');
  const submit = async ()=>{
    try{ const res = await API.post('/auth/login',{email,password}); localStorage.setItem('token', res.data.token); setMsg('Logged in'); }
    catch(e){ setMsg('Login failed') }
  }
  return (<div className='container'><h2>Login</h2><input placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)} /><input placeholder='Password' type='password' value={password} onChange={e=>setPassword(e.target.value)} /><button onClick={submit}>Login</button><p>{msg}</p></div>)
}
