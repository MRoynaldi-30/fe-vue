import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', 
});

export const register = (data) => api.post('/register', data);
export const login = (data) => api.post('/login', data);
export const logout = (token) =>
  api.post('/logout', {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });