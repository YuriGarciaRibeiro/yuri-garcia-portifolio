'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  image?: string;
  description?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface UseCertificationsOptions {
  autoFetch?: boolean;
}

export function useCertifications(options: UseCertificationsOptions = { autoFetch: true }) {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (options.autoFetch) {
      fetchCertifications();
    }
  }, [options.autoFetch]);

  const fetchCertifications = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await api.get('/api/certification');
      setCertifications(data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Erro ao carregar certificações';
      setError(errorMessage);
      console.error('Error fetching certifications:', err);
    } finally {
      setLoading(false);
    }
  };

  const getCertificationById = async (id: string): Promise<Certification | null> => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await api.get(`/api/certification/${id}`);
      return data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Erro ao carregar certificação';
      setError(errorMessage);
      console.error('Error fetching certification:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createCertification = async (certData: Omit<Certification, 'id' | 'createdAt' | 'updatedAt'>): Promise<Certification | null> => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await api.post('/api/certification', certData);
      await fetchCertifications();
      return data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Erro ao criar certificação';
      setError(errorMessage);
      console.error('Error creating certification:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateCertification = async (id: string, certData: Partial<Certification>): Promise<Certification | null> => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await api.put(`/api/certification/${id}`, certData);
      await fetchCertifications();
      return data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Erro ao atualizar certificação';
      setError(errorMessage);
      console.error('Error updating certification:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteCertification = async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      await api.delete(`/api/certification/${id}`);
      await fetchCertifications();
      return true;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Erro ao deletar certificação';
      setError(errorMessage);
      console.error('Error deleting certification:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    certifications,
    loading,
    error,
    refetch: fetchCertifications,
    getCertificationById,
    createCertification,
    updateCertification,
    deleteCertification,
  };
}
