import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService.js';
import { useAuth } from '../context/AuthContext.jsx';
import { motion } from 'framer-motion';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useAuth();
  const nav = useNavigate();

  const submit = async e => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      const token = res.data.token;
      const u = res.data.user;
      setUser(token, { id: u.id, name: u.name, role: u.role });
      nav('/');
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow mt-8">
      <h2 className="text-2xl font-semibold mb-4">Welcome back</h2>
      <form onSubmit={submit} className="space-y-3">
        <input required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-3 border rounded" />
        <input required value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" className="w-full p-3 border rounded" />
        <button className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg">Login</button>
      </form>
    </motion.div>
  );
}
