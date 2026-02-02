'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

export type SkillCategory = 'Languages' | 'Frameworks' | 'Databases' | 'DevOps' | 'Tools' | 'Other';
export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export interface Skill {
  id: string;
  name: string;
  description?: string;
  category: SkillCategory;
  icon?: string;
  level: SkillLevel;
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface UseSkillsOptions {
  autoFetch?: boolean;
}

export function useSkills(options: UseSkillsOptions = { autoFetch: true }) {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (options.autoFetch) {
      fetchSkills();
    }
  }, [options.autoFetch]);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('🔍 Fetching skills from:', api.defaults.baseURL + '/api/skill');
      const { data } = await api.get('/api/skill');
      console.log('✅ Skills loaded:', data);
      setSkills(data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Erro ao carregar skills';
      setError(errorMessage);
      console.error('❌ Error fetching skills:', err);
      console.error('Response:', err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const getSkillById = async (id: string): Promise<Skill | null> => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await api.get(`/api/skill/${id}`);
      return data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Erro ao carregar skill';
      setError(errorMessage);
      console.error('Error fetching skill:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createSkill = async (skillData: Omit<Skill, 'id' | 'createdAt' | 'updatedAt'>): Promise<Skill | null> => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await api.post('/api/skill', skillData);
      await fetchSkills();
      return data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Erro ao criar skill';
      setError(errorMessage);
      console.error('Error creating skill:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateSkill = async (id: string, skillData: Partial<Skill>): Promise<Skill | null> => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await api.put(`/api/skill/${id}`, skillData);
      await fetchSkills();
      return data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Erro ao atualizar skill';
      setError(errorMessage);
      console.error('Error updating skill:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteSkill = async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      await api.delete(`/api/skill/${id}`);
      await fetchSkills();
      return true;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Erro ao deletar skill';
      setError(errorMessage);
      console.error('Error deleting skill:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Agrupar skills por categoria
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<SkillCategory, Skill[]>);

  return {
    skills,
    skillsByCategory,
    loading,
    error,
    refetch: fetchSkills,
    getSkillById,
    createSkill,
    updateSkill,
    deleteSkill,
  };
}
