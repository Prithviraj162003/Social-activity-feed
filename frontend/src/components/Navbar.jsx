import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaUserAlt, FaSignOutAlt, FaPlus, FaBell } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext.jsx';
import CreatePostModal from './CreatePostModal.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [openCreate, setOpenCreate] = useState(false);

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <>
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
      >
        <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-6">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-2xl font-bold tracking-wide">SocialFeed</Link>
            <Link to="/activities" className="text-sm text-white/90 hover:underline">Activity</Link>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setOpenCreate(true)} className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition">
              <FaPlus />
            </button>
            <Link to="/"><FaHome className="text-lg" /></Link>
            <Link to={`/profile/${user?.id}`}><FaUserAlt /></Link>

            {user ? (
              <button onClick={handleLogout} className="px-3 py-1 bg-white/10 rounded-md hover:bg-white/20">
                <FaSignOutAlt />
              </button>
            ) : (
              <>
                <Link to="/login" className="px-3 py-1 border rounded bg-white/10 hover:bg-white/20">Login</Link>
                <Link to="/signup" className="px-3 py-1 rounded bg-red-500">Signup</Link>
              </>
            )}
          </div>
        </div>
      </motion.nav>

      <CreatePostModal open={openCreate} onClose={() => setOpenCreate(false)} />
    </>
  );
}
