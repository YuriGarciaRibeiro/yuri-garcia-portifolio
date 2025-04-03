"use client"

import { motion } from "framer-motion"

interface TechItem {
  name: string
  category: string
}

export default function TechStack() {
  const techItems: TechItem[] = [
    // Backend
    { name: "C#", category: "Backend" },
    { name: ".NET Core", category: "Backend" },
    { name: "ASP.NET", category: "Backend" },
    { name: "Go", category: "Backend" },
    { name: "Python", category: "Backend" },

    // Frontend
    { name: "Next", category: "Frontend" },
    { name: "React", category: "Frontend" },

    // Database
    { name: "SQL Server", category: "Database" },
    { name: "PostgreSQL", category: "Database" },
    { name: "Redis", category: "Database" },

    // Agile
    { name: "Scrum", category: "Agile" },
    { name: "Sprints", category: "Agile" },
    { name: "OKRs", category: "Agile" },

    // Management
    { name: "Azure DevOps", category: "Management" },

    // Cloud & DevOps
    { name: "Docker", category: "DevOps" },
    { name: "Kubernetes", category: "DevOps" },
    { name: "Jenkins", category: "DevOps" },

    // Tools
    { name: "Visual Studio", category: "Tools" },
    { name: "VS Code", category: "Tools" },
    { name: "Git", category: "Tools" },
    { name: "Postman", category: "Tools" },
    { name: "ApiDog", category: "Tools" },

    // Testing
    { name: "xUnit", category: "Testing" },
  ]

  // Group and sort categories
  const groupedItems = techItems.reduce(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = []
      acc[item.category].push(item)
      return acc
    },
    {} as Record<string, TechItem[]>,
  )

  const categoryOrder = ["Backend", "Frontend", "Database", "DevOps", "Agile", "Management", "Tools", "Testing"]

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
                {category === "Agile"
                  ? "Metodologias Ágeis"
                  : category === "Management"
                    ? "Gestão"
                    : category === "DevOps"
                      ? "Cloud & DevOps"
                      : category}
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

