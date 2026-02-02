'use client';

import { useState } from 'react';
import { useSkills } from '@/hooks/use-skills';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2, Plus, Pencil, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

// Mapeamento de categoria (número para string)
const SkillCategoryMap: Record<number, string> = {
  0: 'Languages',
  1: 'Frameworks',
  2: 'Databases',
  3: 'DevOps',
  4: 'Tools',
  5: 'Other'
};

// Mapeamento de nível (número para string)
const SkillLevelMap: Record<number, string> = {
  0: 'Beginner',
  1: 'Intermediate',
  2: 'Advanced',
  3: 'Expert'
};

// Helper para obter o nome da categoria
const getCategoryName = (category: number | string): string => {
  if (typeof category === 'number') {
    return SkillCategoryMap[category] || 'Other';
  }
  return category;
};

// Helper para obter o nome do nível
const getLevelName = (level: number | string): string => {
  if (typeof level === 'number') {
    return SkillLevelMap[level] || 'Beginner';
  }
  return level;
};

export default function SkillsPage() {
  const { skills, loading, error, deleteSkill, refetch } = useSkills();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    setDeletingId(id);
    const success = await deleteSkill(id);
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

  // Group skills by category (usando o mapeamento)
  const skillsByCategory = skills.reduce((acc, skill) => {
    const categoryName = getCategoryName(skill.category);
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Skills</h1>
          <p className="text-[#a0a0a0]">Manage your technical skills</p>
        </div>
        <Button className="bg-[#6366f1] hover:bg-[#4f46e5]">
          <Plus className="mr-2 h-4 w-4" />
          Add Skill
        </Button>
      </div>

      {skills.length === 0 ? (
        <Card className="p-12 bg-[#1a1a1a] border-[#2a2a2a] text-center">
          <p className="text-[#a0a0a0] mb-4">No skills yet</p>
          <Button className="bg-[#6366f1] hover:bg-[#4f46e5]">
            <Plus className="mr-2 h-4 w-4" />
            Add your first skill
          </Button>
        </Card>
      ) : (
        <div className="space-y-6">
          {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
            <div key={category}>
              <h2 className="text-xl font-bold text-white mb-4">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categorySkills.map((skill, index) => {
                  const levelName = getLevelName(skill.level);
                  return (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="p-4 bg-[#1a1a1a] border-[#2a2a2a] hover:border-[#6366f1] transition-colors">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white mb-1">{skill.name}</h3>
                          {skill.description && (
                            <p className="text-sm text-[#a0a0a0] mb-2">{skill.description}</p>
                          )}
                          <span
                            className={`inline-block px-2 py-1 rounded text-xs ${
                              levelName === 'Expert'
                                ? 'bg-purple-500/10 text-purple-500'
                                : levelName === 'Advanced'
                                ? 'bg-blue-500/10 text-blue-500'
                                : levelName === 'Intermediate'
                                ? 'bg-green-500/10 text-green-500'
                                : 'bg-yellow-500/10 text-yellow-500'
                            }`}
                          >
                            {levelName}
                          </span>
                        </div>

                        <div className="flex gap-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-[#333] hover:border-[#6366f1]"
                          >
                            <Pencil className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-[#333] hover:border-red-500 text-red-500"
                            onClick={() => handleDelete(skill.id, skill.name)}
                            disabled={deletingId === skill.id}
                          >
                            {deletingId === skill.id ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <Trash2 className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
