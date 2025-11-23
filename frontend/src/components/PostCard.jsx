import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext.jsx';
import * as postService from '../services/postService.js';

export default function PostCard({ post, onAction }) {
  const { user } = useAuth();

  const handleLike = async () => {
    try {
      await postService.likePost(post._id);
      onAction && onAction();
    } catch (e) { console.error(e); alert('Like failed'); }
  };

  const handleDelete = async () => {
    if (!confirm('Delete this post?')) return;
    try {
      await postService.deletePost(post._id);
      onAction && onAction();
    } catch (e) { console.error(e); alert('Delete failed'); }
  };

  const canDelete = user && (user.role === 'owner' || user.role === 'admin' || user.id === (post.author?._id ?? post.author));

  return (
    <motion.article initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.005 }} className="bg-white p-5 rounded-2xl shadow-md mb-4 border">
      <div className="flex justify-between">
        <div>
          <div className="font-semibold text-lg">{post.author?.name || 'Unknown'}</div>
          <p className="text-gray-700 mt-2">{post.content}</p>
          <div className="text-xs text-gray-400 mt-2">{new Date(post.createdAt).toLocaleString()}</div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <button onClick={handleLike} className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-md hover:shadow">
            👍 Like ({post.likes?.length || 0})
          </button>

          {canDelete && (
            <button onClick={handleDelete} className="px-3 py-1 bg-red-50 text-red-600 rounded-md hover:shadow">
              🗑 Delete
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}
