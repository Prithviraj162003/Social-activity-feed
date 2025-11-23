import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Profile from './pages/Profile.jsx';
import ActivityFeed from './pages/ActivityFeed.jsx';
import AdminPanel from './pages/AdminPanel.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<ProtectedRoute><ActivityFeed/></ProtectedRoute>} />
          <Route path="/profile/:id" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute adminOnly><AdminPanel/></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
    </div>
  );
}
