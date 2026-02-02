'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

export interface Experience {
  id: string;
  companyName: string;
  position: string;
  description: string;
  startDate: string;
  endDate?: string;
  isCurrentlyWorkingHere: boolean;
  location?: string;
  technologies: string[];
  highlights: string[];
}

interface UseExperienceOptions {
  autoFetch?: boolean;
}

export function useExperience(options: UseExperienceOptions = { autoFetch: true }) {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (options.autoFetch) {
      fetchExperiences();
    }
  }, [options.autoFetch]);

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await api.get('/api/experiences');
      setExperiences(data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Erro ao carregar experiências';
      setError(errorMessage);
      console.error('Error fetching experiences:', err);
    } finally {
      setLoading(false);
    }
  };

  const getExperienceById = async (id: string): Promise<Experience | null> => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await api.get(`/api/experiences/${id}`);
      return data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Erro ao carregar experiência';
      setError(errorMessage);
      console.error('Error fetching experience:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createExperience = async (expData: Omit<Experience, 'id'>): Promise<Experience | null> => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await api.post('/api/experiences', expData);
      await fetchExperiences();
      return data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Erro ao criar experiência';
      setError(errorMessage);
      console.error('Error creating experience:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateExperience = async (id: string, expData: Partial<Experience>): Promise<Experience | null> => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await api.put(`/api/experiences/${id}`, expData);
      await fetchExperiences();
      return data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Erro ao atualizar experiência';
      setError(errorMessage);
      console.error('Error updating experience:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteExperience = async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      await api.delete(`/api/experiences/${id}`);
      await fetchExperiences();
      return true;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Erro ao deletar experiência';
      setError(errorMessage);
      console.error('Error deleting experience:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    experiences,
    loading,
    error,
    refetch: fetchExperiences,
    getExperienceById,
    createExperience,
    updateExperience,
    deleteExperience,
  };
}
