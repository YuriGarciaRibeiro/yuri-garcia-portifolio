"use client"

import { motion } from "framer-motion"
import { useSkills } from "@/hooks/use-skills"
import { Loader2 } from "lucide-react"

// Mapeamento de categoria (número para string)
const SkillCategoryMap: Record<number, string> = {
  0: 'Languages',
  1: 'Frameworks',
  2: 'Databases',
  3: 'DevOps',
  4: 'Tools',
  5: 'Other'
};

// Helper para obter o nome da categoria
const getCategoryName = (category: number | string): string => {
  if (typeof category === 'number') {
    return SkillCategoryMap[category] || 'Other';
  }
  return category;
};

export default function TechStack() {
  const { skills, loading, error } = useSkills()

  // Map API categories to display categories
  const categoryDisplayMap: Record<string, string> = {
    'Languages': 'Languages',
    'Frameworks': 'Frameworks',
    'Databases': 'Database',
    'DevOps': 'Cloud & DevOps',
    'Tools': 'Tools',
    'Other': 'Other'
  }

  const categoryOrder = ["Languages", "Frameworks", "Database", "Cloud & DevOps", "Tools", "Other"]

  // Function to generate a consistent color based on the tech name
  const generateColor = (name: string) => {
    let hash = 0
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }

    // Use a color palette that complements the site's theme
    const colors = [
      "#6366f1", // Primary indigo
      "#8b5cf6", // Purple
      "#ec4899", // Pink
      "#f43f5e", // Rose
      "#f97316", // Orange
      "#eab308", // Yellow
      "#22c55e", // Green
      "#06b6d4", // Cyan
    ]

    return colors[Math.abs(hash) % colors.length]
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-[#6366f1]" />
        <span className="ml-3 text-[#a0a0a0]">Loading skills...</span>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error loading skills: {error}</p>
      </div>
    )
  }

  // Agrupar skills por categoria (usando mapeamento numérico)
  const groupedItems: Record<string, Array<{ name: string }>> = {}

  skills.forEach((skill) => {
    const apiCategory = getCategoryName(skill.category)
    const displayCategory = categoryDisplayMap[apiCategory] || apiCategory
    
    if (!groupedItems[displayCategory]) {
      groupedItems[displayCategory] = []
    }
    groupedItems[displayCategory].push({ name: skill.name })
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categoryOrder.map(
        (category, catIndex) =>
          groupedItems[category] && (
            <motion.div
              key={category}
              className="flex flex-col gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.1 }}
            >
              <h4 className="text-[#6366f1] font-semibold text-sm md:text-base">
                {category}
              </h4>
              <div className="flex flex-wrap gap-2">
                {groupedItems[category].map((item, itemIndex) => {
                  const color = generateColor(item.name)

                  return (
                    <motion.div
                      key={item.name}
                      className="px-3 py-1.5 rounded-md bg-[#1a1a1a] border border-[#2a2a2a] text-[#a0a0a0] hover:border-[#6366f1] hover:text-white transition-colors duration-300 text-sm md:text-base relative overflow-hidden group"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: catIndex * 0.1 + itemIndex * 0.05,
                        type: "spring",
                        stiffness: 100,
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {/* Colored background that appears on hover */}
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                        style={{ backgroundColor: color }}
                      />

                      {/* Colored left border that's always visible */}
                      <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: color }} />

                      <span className="relative pl-1">{item.name}</span>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          ),
      )}
    </div>
  )
}

