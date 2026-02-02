'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Check if user is logged in on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      console.log('🔍 Checking auth... Token exists:', !!token);

      if (!token) {
        console.log('❌ No token found');
        setLoading(false);
        return;
      }

      console.log('📡 Fetching user data from /api/auth/me');
      const { data } = await api.get('/api/auth/me');
      console.log('✅ User data loaded:', data);
      setUser(data);
    } catch (err: any) {
      console.error('❌ Auth check failed:', err);
      console.error('Response:', err.response?.data);
      localStorage.removeItem('auth_token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      console.log('🔐 Attempting login...');
      const { data } = await api.post('/api/auth/login', credentials);
      console.log('✅ Login response:', data);

      // Store token
      localStorage.setItem('auth_token', data.token);
      console.log('💾 Token saved to localStorage');

      // Store login timestamp to avoid immediate checkAuth call
      localStorage.setItem('login_timestamp', Date.now().toString());

      // Set user
      const userData = {
        id: data.userId,
        email: data.email,
        name: data.name,
        role: data.role
      };
      setUser(userData);
      console.log('👤 User set:', userData);
      console.log('🔓 isAuthenticated:', !!userData);

      return true;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Invalid credentials';
      setError(errorMessage);
      console.error('❌ Login failed:', err);
      console.error('Error details:', err.response?.data);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
    router.push('/admin/login');
  };

  const isAuthenticated = !!user;

  return {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated,
    checkAuth
  };
}
