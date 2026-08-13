import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: `${API_URL}/api`,
});

export const getDevices = () => api.get('/devices');

export const addDevice = (device) => api.post('/devices', device);

export const deleteDevice = (id) => api.delete(`/devices/${id}`);

export default api;