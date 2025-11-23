import API from './api.js';
export const createPost = payload => API.post('/posts', payload);
export const getPosts = () => API.get('/posts');
export const deletePost = id => API.delete(`/posts/${id}`);
export const likePost = postId => API.post(`/likes/${postId}`);
export const unlikePost = postId => API.delete(`/likes/${postId}`);
