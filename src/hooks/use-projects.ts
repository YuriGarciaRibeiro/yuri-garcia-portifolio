'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Project } from '@/types';

export type { Project };

interface UseProjectsOptions {
  autoFetch?: boolean;
}

export function useProjects(options: UseProjectsOptions = { autoFetch: true }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (options.autoFetch) {
      fetchProjects();
    }
  }, [options.autoFetch]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await api.get('/api/project');
      setProjects(data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Erro ao carregar projetos';
      setError(errorMessage);
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const getProjectById = async (id: string): Promise<Project | null> => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await api.get(`/api/project/${id}`);
      return data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Erro ao carregar projeto';
      setError(errorMessage);
      console.error('Error fetching project:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getProjectBySlug = async (slug: string): Promise<Project | null> => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await api.get(`/api/project/slug/${slug}`);
      return data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Erro ao carregar projeto';
      setError(errorMessage);
      console.error('Error fetching project by slug:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'slug'>): Promise<Project | null> => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await api.post('/api/project', projectData);
      await fetchProjects(); // Recarregar lista
      return data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Erro ao criar projeto';
      setError(errorMessage);
      console.error('Error creating project:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateProject = async (id: string, projectData: Partial<Project>): Promise<Project | null> => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await api.put(`/api/project/${id}`, projectData);
      await fetchProjects(); // Recarregar lista
      return data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Erro ao atualizar projeto';
      setError(errorMessage);
      console.error('Error updating project:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      await api.delete(`/api/project/${id}`);
      await fetchProjects(); // Recarregar lista
      return true;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Erro ao deletar projeto';
      setError(errorMessage);
      console.error('Error deleting project:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects,
    getProjectById,
    getProjectBySlug,
    createProject,
    updateProject,
    deleteProject,
  };
}
