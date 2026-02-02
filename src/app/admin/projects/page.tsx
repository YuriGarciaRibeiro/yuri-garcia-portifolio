'use client';

import { useState } from 'react';
import { useProjects } from '@/hooks/use-projects';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2, Plus, Pencil, Trash2, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ProjectsPage() {
  const { projects, loading, error, deleteProject, refetch } = useProjects();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    setDeletingId(id);
    const success = await deleteProject(id);
    if (success) {
      await refetch();
    }
    setDeletingId(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#6366f1]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 mb-4">Error: {error}</p>
        <Button onClick={() => refetch()}>Retry</Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
          <p className="text-[#a0a0a0]">Manage your portfolio projects</p>
        </div>
        <Button className="bg-[#6366f1] hover:bg-[#4f46e5]">
          <Plus className="mr-2 h-4 w-4" />
          Add Project
        </Button>
      </div>

      {projects.length === 0 ? (
        <Card className="p-12 bg-[#1a1a1a] border-[#2a2a2a] text-center">
          <p className="text-[#a0a0a0] mb-4">No projects yet</p>
          <Button className="bg-[#6366f1] hover:bg-[#4f46e5]">
            <Plus className="mr-2 h-4 w-4" />
            Create your first project
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-6 bg-[#1a1a1a] border-[#2a2a2a] hover:border-[#6366f1] transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{project.title}</h3>
                      {project.featured && (
                        <span className="px-2 py-1 bg-[#6366f1]/10 text-[#6366f1] text-xs rounded">
                          Featured
                        </span>
                      )}
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          project.status === 'completed'
                            ? 'bg-green-500/10 text-green-500'
                            : project.status === 'in-progress'
                            ? 'bg-yellow-500/10 text-yellow-500'
                            : 'bg-blue-500/10 text-blue-500'
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>

                    <p className="text-[#a0a0a0] mb-3">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-[#0f0f0f] border border-[#2a2a2a] text-[#a0a0a0] text-xs rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3 text-sm">
                      {project.repositoryUrl && (
                        <Link
                          href={project.repositoryUrl}
                          target="_blank"
                          className="text-[#6366f1] hover:underline flex items-center gap-1"
                        >
                          Repository <ExternalLink className="h-3 w-3" />
                        </Link>
                      )}
                      {project.liveDemoUrl && (
                        <Link
                          href={project.liveDemoUrl}
                          target="_blank"
                          className="text-[#6366f1] hover:underline flex items-center gap-1"
                        >
                          Live Demo <ExternalLink className="h-3 w-3" />
                        </Link>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <Button variant="outline" size="sm" className="border-[#333] hover:border-[#6366f1]">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#333] hover:border-red-500 text-red-500"
                      onClick={() => handleDelete(project.id, project.title)}
                      disabled={deletingId === project.id}
                    >
                      {deletingId === project.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
