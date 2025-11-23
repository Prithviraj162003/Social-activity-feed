import API from './api.js';
export const signup = payload => API.post('/auth/signup', payload);
export const login = payload => API.post('/auth/login', payload);
