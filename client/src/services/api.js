import axios from 'axios';

// IMPORTANT: Replace with your Vercel URL when deployed
// For local testing, this will use Vercel serverless functions
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5173/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired, logout user
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API Functions
export const authAPI = {
  login: (email, password, shop_id) => 
    api.post('/auth/login', { email, password, shop_id }),
  logout: () => api.post('/auth/logout'),
};

export const productsAPI = {
  getAll: (shop_id) => api.get(`/products?shop_id=${shop_id}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
};

export const appointmentsAPI = {
  getAll: (shop_id, date) => api.get(`/appointments?shop_id=${shop_id}&date=${date}`),
  create: (data) => api.post('/appointments', data),
  update: (id, data) => api.put(`/appointments/${id}`, data),
  delete: (id) => api.delete(`/appointments/${id}`),
};

export const invoicesAPI = {
  getAll: (shop_id, date) => api.get(`/invoices?shop_id=${shop_id}&date=${date}`),
  create: (data) => api.post('/invoices', data),
  getReceipt: (id) => api.get(`/invoices/${id}/receipt`),
};

export const cashupAPI = {
  getCurrent: (shop_id, date) => api.get(`/cashup?shop_id=${shop_id}&date=${date}`),
  create: (data) => api.post('/cashup', data),
};

export default api;