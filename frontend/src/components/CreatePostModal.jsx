import React from 'react';
import { motion } from 'framer-motion';
import CreatePost from './CreatePost.jsx';

export default function CreatePostModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-lg p-6 bg-white rounded-2xl shadow-lg"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Create Post</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">✕</button>
        </div>

        <CreatePost onCreated={() => { onClose(); }} />
      </motion.div>
    </div>
  );
}
