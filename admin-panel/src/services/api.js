import axios from 'axios';

// Django REST API + MongoDB-backed admin sessions. Not live yet — pages use mock data via these helpers.
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/admin', timeout: 15000 });
api.interceptors.request.use((c) => {
  const t = localStorage.getItem('bc_admin_token');
  if (t) c.headers.Authorization = `Bearer ${t}`;
  return c;
});
export default api;
