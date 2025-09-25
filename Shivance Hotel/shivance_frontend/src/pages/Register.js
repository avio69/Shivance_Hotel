import React, {useState} from 'react';
import API from '../api';
export default function Register(){
  const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [msg,setMsg]=useState('');
  const submit = async ()=>{
    try{ await API.post('/auth/register',{name,email,password}); setMsg('Registered'); }
    catch(e){ setMsg('Registration failed') }
  }
  return (<div className='container'><h2>Register</h2><input placeholder='Name' value={name} onChange={e=>setName(e.target.value)} /><input placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)} /><input placeholder='Password' type='password' value={password} onChange={e=>setPassword(e.target.value)} /><button onClick={submit}>Register</button><p>{msg}</p></div>)
}
