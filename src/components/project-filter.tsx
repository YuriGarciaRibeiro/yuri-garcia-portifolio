"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Filter, X } from "lucide-react"
import { projects } from "@/data/projects"

interface ProjectFilterProps {
  onFilterChange: (tags: string[]) => void
}

export default function ProjectFilter({ onFilterChange }: ProjectFilterProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)

  // Extract all unique tags from projects
  const allTags = Array.from(new Set(projects.flatMap((project) => project.tags))).sort()

  // Group tags by category
  const tagCategories = {
    Languages: ["Typescript", "Golang", "Python", "C#", "JavaScript", "PHP"],
    Frameworks: ["Nextjs", ".NET", "Laravel"],
    "Tools & Technologies": ["Docker", "Kubernetes", "CI/CD", "API", "WebSocket", "Microservices"],
    Domains: ["DevOps", "Machine Learning", "Automation", "Banking", "Web Service"],
  }

  // Categorize tags
  const categorizedTags: Record<string, string[]> = {}

  for (const category in tagCategories) {
    categorizedTags[category] = allTags.filter((tag) =>
      tagCategories[category as keyof typeof tagCategories].includes(tag),
    )
  }

  // Add "Other" category for uncategorized tags
  const otherTags = allTags.filter((tag) => !Object.values(tagCategories).flat().includes(tag))

  if (otherTags.length > 0) {
    categorizedTags["Other"] = otherTags
  }

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag)) {
        return prev.filter((t) => t !== tag)
      } else {
        return [...prev, tag]
      }
    })
  }

  const clearFilters = () => {
    setSelectedTags([])
  }

  useEffect(() => {
    onFilterChange(selectedTags)
  }, [selectedTags, onFilterChange])

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-[#333] text-[#a0a0a0] hover:text-white hover:border-[#6366f1]"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filter Projects
            {selectedTags.length > 0 && (
              <span className="ml-2 bg-[#6366f1] text-white text-xs rounded-full px-2 py-0.5">
                {selectedTags.length}
              </span>
            )}
          </Button>

          {selectedTags.length > 0 && (
            <Button variant="ghost" size="sm" className="text-[#a0a0a0] hover:text-white" onClick={clearFilters}>
              <X className="mr-1 h-3 w-3" />
              Clear filters
            </Button>
          )}
        </div>

        {selectedTags.length > 0 && (
          <div className="text-sm text-[#a0a0a0]">Showing projects with: {selectedTags.join(", ")}</div>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] p-4 mb-6"
          >
            <div className="space-y-4">
              {Object.entries(categorizedTags).map(([category, tags]) => (
                <div key={category}>
                  <h4 className="text-white font-medium mb-2">{category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Button
                        key={tag}
                        variant="outline"
                        size="sm"
                        className={`
                          border-[#333] text-xs
                          ${
                            selectedTags.includes(tag)
                              ? "bg-[#6366f1]/20 text-white border-[#6366f1]"
                              : "bg-[#0f0f0f] text-[#a0a0a0] hover:border-[#6366f1] hover:text-white"
                          }
                        `}
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

