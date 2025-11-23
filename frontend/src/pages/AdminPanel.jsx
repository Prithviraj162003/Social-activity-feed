import React, { useEffect, useState } from 'react';
import API from '../services/api.js';
import * as userService from '../services/userService.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function AdminPanel() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(()=> {
    (async ()=> {
      try {
        const res = await API.get('/activities');
        const map = new Map();
        res.data.forEach(a => { if (a.actor) map.set(a.actor._id, a.actor); if (a.targetUser) map.set(a.targetUser._id, a.targetUser); });
        setUsers(Array.from(map.values()));
      } catch (err) { console.error(err); }
    })();
  }, []);

  const makeAdmin = async (email) => {
    try {
      await userService.adminCreateAdmin({ email });
      alert('Admin created');
    } catch (err) { console.error(err); alert('Failed'); }
  };

  const deleteUser = async (id) => {
    if (!confirm('Delete this user?')) return;
    try {
      await userService.adminDeleteUser(id);
      alert('Deleted');
      setUsers(users.filter(u=>u._id !== id));
    } catch (err) { console.error(err); alert('Failed'); }
  };

  return (
    <div className="mt-6 bg-white p-6 rounded-2xl shadow">
      <h2 className="text-xl mb-4">Admin controls</h2>
      <p className="text-sm text-gray-600 mb-4">You are: {user?.name} ({user?.role})</p>
      <div>
        <h3 className="font-semibold mb-2">Users (derived)</h3>
        {users.map(u => (
          <div key={u._id} className="flex justify-between items-center mb-2">
            <div>{u.name} <span className="text-xs text-gray-500">({u.email})</span></div>
            <div>
              <button onClick={() => makeAdmin(u.email)} className="px-2 py-1 border rounded mr-2">Make Admin</button>
              <button onClick={() => deleteUser(u._id)} className="px-2 py-1 border rounded text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
