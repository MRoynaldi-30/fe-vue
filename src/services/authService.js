import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', 
});

// Auth API
export const register = (data) => api.post('/register', data);
export const login = (data) => api.post('/login', data);
export const logout = (token) =>
  api.post('/logout', {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// Guests API
export const showGuest = (token) =>
  api.get('/guest', {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addGuest = (data, token) =>
  api.post('/guest/store', data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateGuest = (id, data, token) =>
  api.put(`/guest/update/${id}`, data, {
    headers: { Authorization: `Bearer ${token}`}
  })

export const deleteGuest = (id, token) =>
  api.delete(`/guest/delete/${id}`, {
    headers: { Authorization: `Bearer ${token}`}
  })

export const searchGuest = (name, token) =>
  api.post('/guest/search', { name }, {
    headers: { Authorization: `Bearer ${token}` },
  });

export default api;