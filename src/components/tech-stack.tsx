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
    { name: "xUnit", category: "Testing" }
  ]

  // Agrupar e ordenar categorias
  const groupedItems = techItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, TechItem[]>)

  const categoryOrder = [
    "Backend", 
    "Frontend", 
    "Database", 
    "DevOps", 
    "Agile", 
    "Management", 
    "Tools", 
    "Testing"
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categoryOrder.map((category, catIndex) => (
        groupedItems[category] && (
          <motion.div
            key={category}
            className="flex flex-col gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: catIndex * 0.1 }}
          >
            <h4 className="text-[#6366f1] font-semibold text-sm md:text-base">
              {category === "Agile" ? "Metodologias Ágeis" : 
               category === "Management" ? "Gestão" : 
               category === "DevOps" ? "Cloud & DevOps" : category}
            </h4>
            <div className="flex flex-wrap gap-2">
              {groupedItems[category].map((item, itemIndex) => (
                <motion.div
                  key={item.name}
                  className="px-3 py-1.5 rounded-md bg-[#1a1a1a] border border-[#2a2a2a] text-[#a0a0a0] hover:border-[#6366f1] hover:text-white transition-colors duration-300 text-sm md:text-base"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: catIndex * 0.1 + itemIndex * 0.05,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  {item.name}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )
      ))}
    </div>
  )
}