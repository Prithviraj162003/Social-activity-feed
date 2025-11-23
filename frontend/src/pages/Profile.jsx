import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as userService from '../services/userService.js';
import { motion } from 'framer-motion';

export default function Profile(){
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(()=> {
    (async ()=> {
      try {
        const res = await userService.getProfile(id);
        setProfile(res.data);
      } catch (err) { console.error(err); }
    })();
  }, [id]);

  if (!profile) return <div className="text-center py-8">Loading...</div>;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-6 rounded-2xl shadow">
      <h2 className="text-xl font-semibold">{profile.name}</h2>
      <p className="text-sm text-gray-600">{profile.email}</p>
      <div className="mt-3 text-sm text-gray-700">
        <div>Followers: {profile.followers?.length || 0}</div>
        <div>Following: {profile.following?.length || 0}</div>
      </div>
    </motion.div>
  );
}
