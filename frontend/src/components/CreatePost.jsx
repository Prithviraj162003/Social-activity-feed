import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as postService from '../services/postService.js';

export default function CreatePost({ onCreated }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async e => {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);
    try {
      await postService.createPost({ content });
      setContent('');
      onCreated && onCreated();
    } catch (err) {
      console.error(err);
      alert('Create post failed');
    } finally { setLoading(false); }
  };

  return (
    <motion.form onSubmit={submit} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="What's happening?"
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
        rows="4"
      />
      <div className="flex justify-end mt-3">
        <button type="submit" disabled={loading} className="px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg shadow">
          {loading ? 'Posting...' : 'Post'}
        </button>
      </div>
    </motion.form>
  );
}
