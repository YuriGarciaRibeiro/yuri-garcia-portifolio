'use client';

import { useProjects } from '@/hooks/use-projects';
import { useSkills } from '@/hooks/use-skills';
import { useCertifications } from '@/hooks/use-certifications';
import { useExperience } from '@/hooks/use-experience';
import { Card } from '@/components/ui/card';
import { FolderKanban, Code2, Award, Briefcase, Loader2, Mail, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function DashboardPage() {
  const { projects, loading: projectsLoading } = useProjects();
  const { skills, loading: skillsLoading } = useSkills();
  const { certifications, loading: certsLoading } = useCertifications();
  const { experiences, loading: expLoading } = useExperience();

  const loading = projectsLoading || skillsLoading || certsLoading || expLoading;

  const navigationCards = [
    {
      label: 'Projects',
      description: 'Manage your portfolio projects',
      value: projects.length,
      icon: FolderKanban,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'hover:border-blue-500',
      href: '/admin/projects',
    },
    {
      label: 'Skills',
      description: 'Manage your technical skills',
      value: skills.length,
      icon: Code2,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'hover:border-green-500',
      href: '/admin/skills',
    },
    {
      label: 'Certifications',
      description: 'Manage your certifications',
      value: certifications.length,
      icon: Award,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'hover:border-purple-500',
      href: '/admin/certifications',
    },
    {
      label: 'Experience',
      description: 'Manage work experience',
      value: experiences.length,
      icon: Briefcase,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      borderColor: 'hover:border-orange-500',
      href: '/admin/experience',
    },
    {
      label: 'Messages',
      description: 'View contact messages',
      value: 0,
      icon: Mail,
      color: 'text-pink-500',
      bgColor: 'bg-pink-500/10',
      borderColor: 'hover:border-pink-500',
      href: '/admin/contacts',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#6366f1]" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
      <p className="text-[#a0a0a0] mb-8">Welcome to your portfolio admin panel</p>

      {/* Navigation Cards */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {navigationCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <Link key={card.label} href={card.href}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`p-6 bg-[#1a1a1a] border-[#2a2a2a] ${card.borderColor} transition-all duration-300 cursor-pointer group hover:scale-105`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg ${card.bgColor}`}>
                        <Icon className={`h-6 w-6 ${card.color}`} />
                      </div>
                      <span className={`text-2xl font-bold ${card.color}`}>{card.value}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#6366f1] transition-colors">
                      {card.label}
                    </h3>
                    <p className="text-sm text-[#a0a0a0]">{card.description}</p>
                    <div className="flex items-center gap-1 mt-3 text-[#6366f1] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Manage <ArrowRight className="h-4 w-4" />
                    </div>
                  </Card>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Overview Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <Card className="p-6 bg-[#1a1a1a] border-[#2a2a2a]">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <FolderKanban className="h-5 w-5 text-[#6366f1]" />
            Recent Projects
          </h2>
          {projects.length === 0 ? (
            <p className="text-[#a0a0a0] text-center py-8">No projects yet</p>
          ) : (
            <div className="space-y-3">
              {projects.slice(0, 5).map((project) => (
                <div
                  key={project.id}
                  className="flex justify-between items-center p-3 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">{project.title}</p>
                    <p className="text-xs text-[#a0a0a0] truncate">{project.description.substring(0, 50)}...</p>
                  </div>
                  {project.status && (
                    <span
                      className={`px-2 py-1 rounded text-xs ml-2 ${
                        project.status === 'completed'
                          ? 'bg-green-500/10 text-green-500'
                          : project.status === 'in-progress'
                          ? 'bg-yellow-500/10 text-yellow-500'
                          : 'bg-blue-500/10 text-blue-500'
                      }`}
                    >
                      {project.status}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Skills Overview */}
        <Card className="p-6 bg-[#1a1a1a] border-[#2a2a2a]">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Code2 className="h-5 w-5 text-[#6366f1]" />
            Skills Overview
          </h2>
          {skills.length === 0 ? (
            <p className="text-[#a0a0a0] text-center py-8">No skills yet</p>
          ) : (
            <div className="space-y-3">
              {Object.entries(
                skills.reduce((acc, skill) => {
                  acc[skill.category] = (acc[skill.category] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>)
              ).map(([category, count]) => (
                <div
                  key={category}
                  className="flex justify-between items-center p-3 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]"
                >
                  <p className="text-white">{category}</p>
                  <span className="px-3 py-1 bg-[#6366f1]/10 text-[#6366f1] rounded-full text-sm font-medium">
                    {count} skills
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
