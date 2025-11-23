import React from 'react';
import { motion } from 'framer-motion';

export default function ActivityCard({ activity }) {
  const actor = activity.actor?.name || 'Someone';
  const targetUser = activity.targetUser?.name;
  const postSnippet = activity.targetPost?.content ? `"${activity.targetPost.content.slice(0,80)}"` : '';
  let text = activity.message || '';

  if (!text) {
    if (activity.type === 'post') text = `${actor} made a post ${postSnippet}`;
    else if (activity.type === 'follow') text = `${actor} followed ${targetUser}`;
    else if (activity.type === 'like') text = `${actor} liked a post`;
    else if (activity.type === 'block') text = `${actor} blocked ${targetUser}`;
    else if (activity.type === 'user_deleted') text = `${actor} deleted a user`;
    else if (activity.type === 'post_deleted') text = `${actor} deleted a post`;
    else text = activity.type;
  }

  return (
    <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} className="bg-white p-3 rounded-xl shadow mb-3">
      <div className="text-sm text-gray-700">{text}</div>
      <div className="text-xs text-gray-400 mt-1">{new Date(activity.createdAt).toLocaleString()}</div>
    </motion.div>
  );
}
