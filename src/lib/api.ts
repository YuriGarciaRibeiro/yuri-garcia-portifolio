import axios from 'axios';

// Base URL da API externa
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5126';

console.log('🌐 API Base URL:', API_BASE_URL);

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      console.log('🔑 Request interceptor - Token exists:', !!token);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('✅ Authorization header added:', `Bearer ${token.substring(0, 20)}...`);
      } else {
        console.log('⚠️ No token found in localStorage');
      }
    }
    console.log('📤 Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Interceptor para lidar com erros globalmente
api.interceptors.response.use(
  (response) => {
    console.log('📥 Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('❌ Response error:', error.response?.status, error.config?.url);
    console.error('Error details:', error.response?.data);

    if (error.response?.status === 401) {
      console.warn('🚫 401 Unauthorized - Removing token and redirecting...');
      // Token inválido ou expirado
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        // Redirecionar para login apenas se estiver em rota admin
        if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
          console.log('↩️ Redirecting to login...');
          window.location.href = '/admin/login';
        }
      }
    }
    return Promise.reject(error);
  }
);
