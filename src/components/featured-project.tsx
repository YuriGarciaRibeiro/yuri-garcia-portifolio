"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Project } from "@/data/projects"
import { motion } from "framer-motion"
import { CheckCircle, Circle, Clock, ExternalLink, GitFork, Github, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface FeaturedProjectProps extends Project {
  index: number
}

export default function FeaturedProject({
  title,
  description,
  longDescription,
  image,
  tags,
  link,
  demo,
  status,
  githubStats,
  index,
}: FeaturedProjectProps) {
  // Generate a consistent color based on the project title
  const generateColor = (title: string) => {
    let hash = 0
    for (let i = 0; i < title.length; i++) {
      hash = title.charCodeAt(i) + ((hash << 5) - hash)
    }

    const hue = hash % 360
    return `hsl(${hue}, 70%, 60%)`
  }

  // Generate placeholder image if none provided
  const projectImage = image || `/placeholder.svg?height=600&width=800`
  const bgColor = generateColor(title)
  const isEven = index % 2 === 0

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  // Status indicator
  const getStatusIndicator = () => {
    switch (status) {
      case "completed":
        return (
          <div className="flex items-center gap-1 text-green-500">
            <CheckCircle className="h-4 w-4" /> Completed
          </div>
        )
      case "in-progress":
        return (
          <div className="flex items-center gap-1 text-yellow-500">
            <Clock className="h-4 w-4" /> In Progress
          </div>
        )
      case "planned":
        return (
          <div className="flex items-center gap-1 text-blue-500">
            <Circle className="h-4 w-4" /> Planned
          </div>
        )
      default:
        return null
    }
  }

  return (
    <motion.div
      className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-6 md:gap-10 bg-[#1a1a1a] rounded-lg overflow-hidden border border-[#2a2a2a] hover:border-[#6366f1] transition-colors duration-300 p-6`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-full md:w-1/2 h-64 md:h-auto rounded-lg overflow-hidden">
        {image ? (
          <Image src={projectImage || "/placeholder.svg"} alt={title} fill className="object-cover" />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${bgColor}, ${bgColor}88)` }}
          >
            <div className="text-6xl font-bold text-white/90 p-4 text-center">
              {title.substring(0, 2).toUpperCase()}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center w-full md:w-1/2">
        <div className="flex items-center gap-3 mb-2">
          <Badge className="bg-[#6366f1] hover:bg-[#4f46e5] text-white border-none">Featured Project</Badge>
          {status && (
            <Badge variant="outline" className="bg-[#0f0f0f] border-[#333]">
              {getStatusIndicator()}
            </Badge>
          )}
        </div>

        <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>

        <p className="text-[#a0a0a0] mb-4">{longDescription || description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <Badge
              key={index}
              variant="outline"
              className="bg-[#0f0f0f] text-[#a0a0a0] border-[#333] hover:border-[#6366f1] transition-colors"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {githubStats && (
          <div className="flex gap-4 mb-4 text-sm text-[#a0a0a0]">
            {githubStats.stars !== undefined && (
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>{githubStats.stars}</span>
              </div>
            )}
            {githubStats.forks !== undefined && (
              <div className="flex items-center gap-1">
                <GitFork className="h-4 w-4 text-[#6366f1]" />
                <span>{githubStats.forks}</span>
              </div>
            )}
            {githubStats.lastUpdated && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>Updated {formatDate(githubStats.lastUpdated)}</span>
              </div>
            )}
          </div>
        )}

        <div className="flex gap-4 mt-2">
          {link && (
            <Button className="bg-[#6366f1] hover:bg-[#4f46e5] text-white" asChild>
              <Link href={link} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" /> View on GitHub
              </Link>
            </Button>
          )}
          {demo && (
            <Button
              variant="outline"
              className="border-[#333] text-[#a0a0a0] hover:text-white hover:border-[#6366f1]"
              asChild
            >
              <Link href={demo} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
              </Link>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

