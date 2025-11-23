import API from './api.js';
export const getProfile = id => API.get(`/users/${id}`);
export const followUser = id => API.post(`/users/${id}/follow`);
export const blockUser = id => API.post(`/users/${id}/block`);
export const adminCreateAdmin = payload => API.post('/admin', payload);
export const adminDeleteUser = id => API.delete(`/admin/user/${id}`);
export const adminRevoke = id => API.post(`/admin/${id}/revoke`);
