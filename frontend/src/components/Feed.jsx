import React, { useEffect, useState } from 'react';
import { getPosts } from '../services/postService.js';
import PostCard from './PostCard.jsx';
import CreatePost from './CreatePost.jsx';

export default function Feed() {
  const [posts, setPosts] = useState([]);

  const load = async () => {
    try {
      const res = await getPosts();
      setPosts(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <CreatePost onCreated={load} />
      <div className="mt-6">
        {posts.length === 0 ? (
          <div className="text-center text-gray-500 py-8">No posts yet</div>
        ) : (
          posts.map(p => <PostCard key={p._id} post={p} onAction={load} />)
        )}
      </div>
    </div>
  );
}
