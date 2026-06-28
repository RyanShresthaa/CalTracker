import axios from 'axios';

const apiBase =
  import.meta.env.VITE_API_URL
  || (import.meta.env.VITE_VERCEL_API === '1' ? '/_/backend/api' : '/api');

const api = axios.create({
  baseURL: apiBase,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// Auth
export const authAPI = {
  register: (data: any) => api.post('/auth/register', data),
  login: (data: any) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  completeProfile: (data: any) => api.post('/auth/complete-profile', data),
  forgotPassword: (email: string) => api.post('/auth/forgot-password', { email }),
  resetPassword: (data: any) => api.post('/auth/reset-password', data),
  getMe: () => api.get('/auth/me'),
};

// Dashboard
export const dashboardAPI = {
  get: () => api.get('/dashboard'),
};

// Foods
export const foodsAPI = {
  search: (params: any) => api.get('/foods', { params }),
  getById: (id: string) => api.get(`/foods/${id}`),
  getByBarcode: (barcode: string) => api.get(`/foods/barcode/${barcode}`),
  getCategories: () => api.get('/foods/categories'),
  getCustom: () => api.get('/foods/custom'),
  createCustom: (data: any) => api.post('/foods/custom', data),
  updateCustom: (id: string, data: any) => api.put(`/foods/custom/${id}`, data),
  importExternal: (data: { source: 'usda' | 'off'; externalId: string }) => api.post('/foods/import', data),
  deleteCustom: (id: string) => api.delete(`/foods/custom/${id}`),
};

// Recipes
export const recipesAPI = {
  list: (q?: string) => api.get('/recipes', { params: q ? { q } : {} }),
  get: (id: string) => api.get(`/recipes/${id}`),
  create: (data: any) => api.post('/recipes', data),
  update: (id: string, data: any) => api.put(`/recipes/${id}`, data),
  delete: (id: string) => api.delete(`/recipes/${id}`),
  preview: (data: any) => api.post('/recipes/preview', data),
};

// Food logs
export const foodLogsAPI = {
  get: (date?: string) => api.get('/food-logs', { params: { date } }),
  add: (data: any) => api.post('/food-logs', data),
  update: (id: string, data: any) => api.put(`/food-logs/${id}`, data),
  delete: (id: string) => api.delete(`/food-logs/${id}`),
};

// Water
export const waterAPI = {
  get: (date?: string) => api.get('/water', { params: { date } }),
  add: (amount: number) => api.post('/water', { amount }),
  delete: (id: string) => api.delete(`/water/${id}`),
};

// Weight
export const weightAPI = {
  get: (period?: number) => api.get('/weight', { params: { period } }),
  add: (data: any) => api.post('/weight', data),
  delete: (id: string) => api.delete(`/weight/${id}`),
};

// Activities
export const activitiesAPI = {
  get: (date?: string) => api.get('/activities', { params: { date } }),
  getHistory: (period?: number) => api.get('/activities/history', { params: { period } }),
  add: (data: any) => api.post('/activities', data),
  delete: (id: string) => api.delete(`/activities/${id}`),
};

// User
export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (data: any) => api.put('/user/profile', data),
  changePassword: (data: any) => api.put('/user/password', data),
  getSettings: () => api.get('/settings'),
  updateSettings: (data: any) => api.put('/settings', data),
};

// Notifications
export const notificationsAPI = {
  get: () => api.get('/notifications'),
  markRead: (id: string) => api.put(`/notifications/${id}/read`),
  markAllRead: () => api.put('/notifications/read-all'),
};

// Admin
export const adminAPI = {
  getStats: () => api.get('/admin/stats'),
  getUsers: (params?: any) => api.get('/admin/users', { params }),
  deleteUser: (id: string) => api.delete(`/admin/users/${id}`),
  getFoods: (params?: any) => api.get('/admin/foods', { params }),
  createFood: (data: any) => api.post('/admin/foods', data),
  updateFood: (id: string, data: any) => api.put(`/admin/foods/${id}`, data),
  deleteFood: (id: string) => api.delete(`/admin/foods/${id}`),
};
