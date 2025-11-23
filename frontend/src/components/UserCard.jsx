import React from 'react';
import { Link } from 'react-router-dom';

export default function UserCard({ user }) {
  return (
    <div className="bg-white p-3 rounded-lg shadow flex justify-between items-center mb-2">
      <div>
        <div className="font-semibold">{user.name}</div>
        <div className="text-xs text-gray-500">{user.email}</div>
      </div>
      <div>
        <Link to={`/profile/${user._id}`} className="px-3 py-1 border rounded">View</Link>
      </div>
    </div>
  );
}
