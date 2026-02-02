"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Project } from "@/types"
import { motion } from "framer-motion"
import { CheckCircle, Circle, Clock, ExternalLink, GitFork, Github, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

type ProjectCardProps = Project

export default function ProjectCard({
  title,
  description,
  longDescription,
  imageUrl,
  technologies,
  repositoryUrl,
  liveDemoUrl,
  status,
  githubStats,
}: ProjectCardProps) {
  const image = imageUrl
  const tags = technologies
  const link = repositoryUrl
  const demo = liveDemoUrl
  const [isHovered, setIsHovered] = useState(false)

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
  const projectImage = image || `/placeholder.svg?height=400&width=800`
  const bgColor = generateColor(title)

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
            <CheckCircle className="h-3 w-3" /> Completed
          </div>
        )
      case "in-progress":
        return (
          <div className="flex items-center gap-1 text-yellow-500">
            <Clock className="h-3 w-3" /> In Progress
          </div>
        )
      case "planned":
        return (
          <div className="flex items-center gap-1 text-blue-500">
            <Circle className="h-3 w-3" /> Planned
          </div>
        )
      default:
        return null
    }
  }

  return (
    <motion.div
      className="bg-[#1a1a1a] rounded-lg overflow-hidden border border-[#2a2a2a] hover:border-[#6366f1] transition-colors duration-300 group h-full flex flex-col"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
        {image ? (
          <Image
            src={projectImage || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-105"
            style={{ background: `linear-gradient(135deg, ${bgColor}, ${bgColor}88)` }}
          >
            <div className="text-4xl font-bold text-white/90 p-4 text-center">
              {title.substring(0, 2).toUpperCase()}
            </div>
          </div>
        )}

        <div className="absolute top-2 right-2 z-20">
          {status && (
            <Badge variant="outline" className="bg-[#0f0f0f]/80 backdrop-blur-sm border-none text-xs">
              {getStatusIndicator()}
            </Badge>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 p-4">
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <p className="text-[#a0a0a0] mb-4 line-clamp-3">
          {isHovered && longDescription ? longDescription : description}
        </p>

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
          <div className="flex gap-4 mb-4 text-xs text-[#a0a0a0]">
            {githubStats.stars !== undefined && (
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 text-yellow-500" />
                <span>{githubStats.stars}</span>
              </div>
            )}
            {githubStats.forks !== undefined && (
              <div className="flex items-center gap-1">
                <GitFork className="h-3 w-3 text-[#6366f1]" />
                <span>{githubStats.forks}</span>
              </div>
            )}
            {githubStats.lastUpdated && (
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>Updated {formatDate(githubStats.lastUpdated)}</span>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-between mt-auto pt-4">
          {link && (
            <Button variant="ghost" size="sm" className="text-[#a0a0a0] hover:text-white hover:bg-[#6366f1]/10" asChild>
              <Link href={link} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" /> GitHub
              </Link>
            </Button>
          )}
          {demo && (
            <Button variant="ghost" size="sm" className="text-[#a0a0a0] hover:text-white hover:bg-[#6366f1]/10" asChild>
              <Link href={demo} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" /> Demo
              </Link>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

