import React, { useState } from 'react';
import * as postService from '../services/postService';

export default function CreatePost({ onCreated }) {
  const [content, setContent] = useState('');
  const submit = async e => {
    e.preventDefault();
    if (!content.trim()) return;
    try {
      await postService.createPost({ content });
      setContent('');
      onCreated && onCreated();
    } catch (err) { console.error(err); alert('Create post failed'); }
  };
  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow">
      <textarea value={content} onChange={e => setContent(e.target.value)} className="w-full p-2 border rounded" placeholder="What's happening?" />
      <div className="flex justify-end mt-2">
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Post</button>
      </div>
    </form>
  );
}
