"use client"

import FeaturedProject from "@/components/featured-project"
import ProjectCard from "@/components/project-card"
import ProjectFilter from "@/components/project-filter"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useProjects } from "@/hooks/use-projects"
import { AnimatePresence, motion } from "framer-motion"
import { Briefcase, CheckCircle, Clock, Star, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"

export default function ProjectsSection() {
  const { projects, loading, error } = useProjects()
  const [filteredProjects, setFilteredProjects] = useState(projects)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("all")

  const featuredProjects = projects.filter((project) => project.featured)

  const handleFilterChange = (tags: string[]) => {
    setSelectedTags(tags)
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  useEffect(() => {
    let result = projects

    // Apply tag filters
    if (selectedTags.length > 0) {
      result = result.filter((project) => selectedTags.some((tag) => project.technologies.includes(tag)))
    }

    // Apply tab filters
    if (activeTab === "featured") {
      result = result.filter((project) => project.featured)
    } else if (activeTab === "completed") {
      result = result.filter((project) => project.status === "completed")
    } else if (activeTab === "in-progress") {
      result = result.filter((project) => project.status === "in-progress" || project.status === "planned")
    }

    setFilteredProjects(result)
  }, [selectedTags, activeTab, projects])

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#6366f1]" />
        <span className="ml-3 text-[#a0a0a0]">Loading projects...</span>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 mb-4">Error loading projects: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-[#6366f1] text-white rounded-md hover:bg-[#5558e3] transition-colors"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div>
      {/* Featured Projects */}
      {featuredProjects.length > 0  && selectedTags.length === 0 && (
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-8">Featured Projects</h3>
          <div className="space-y-10">
            {featuredProjects.map((project, index) => (
              <FeaturedProject key={project.title} {...project} index={index} />
            ))}
          </div>
        </div>
      )}

      {/* Project Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="text-2xl font-bold text-white">
            {activeTab === "featured"
              ? "Featured Projects"
              : activeTab === "completed"
                ? "Completed Projects"
                : activeTab === "in-progress"
                  ? "Ongoing Projects"
                  : "All Projects"}
          </h3>

          <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange} className="w-full md:w-auto">
            <TabsList className="bg-[#1a1a1a] border border-[#2a2a2a]">
              <TabsTrigger value="all" className="data-[state=active]:bg-[#6366f1] data-[state=active]:text-white">
                <Briefcase className="mr-1 h-4 w-4" />
                All
              </TabsTrigger>
              <TabsTrigger value="featured" className="data-[state=active]:bg-[#6366f1] data-[state=active]:text-white">
                <Star className="mr-1 h-4 w-4" />
                Featured
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="data-[state=active]:bg-[#6366f1] data-[state=active]:text-white"
              >
                <CheckCircle className="mr-1 h-4 w-4" />
                Completed
              </TabsTrigger>
              <TabsTrigger
                value="in-progress"
                className="data-[state=active]:bg-[#6366f1] data-[state=active]:text-white"
              >
                <Clock className="mr-1 h-4 w-4" />
                In Progress
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <ProjectFilter onFilterChange={handleFilterChange} />
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => <ProjectCard key={project.title} {...project} />)
          ) : (
            <motion.div
              className="col-span-full text-center py-12 text-[#a0a0a0]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className="text-lg">No projects match your current filters.</p>
              <p>Try adjusting your filter criteria or clear filters to see all projects.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

