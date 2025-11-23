import React from 'react';
import Feed from '../components/Feed.jsx';

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      <div className="md:col-span-2">
        <Feed />
      </div>

      <aside className="hidden md:block">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-semibold">Welcome</h3>
          <p className="text-sm text-gray-500 mt-2">Engage with the network — post, like, follow and see activities.</p>
        </div>
      </aside>
    </div>
  );
}
