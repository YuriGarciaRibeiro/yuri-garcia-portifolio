import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import Link from "next/link"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  tags: string[]
  link: string
  demo: string
}

export default function ProjectCard({ title, description, image, tags, link, demo }: ProjectCardProps) {
  return (
    <div className="bg-[#1a1a1a] rounded-lg overflow-hidden border border-[#2a2a2a] hover:border-[#6366f1] transition-colors duration-300 group">
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-[#a0a0a0] mb-4 line-clamp-2">{description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="bg-[#0f0f0f] text-[#a0a0a0] border-[#333]">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex justify-between">
          {
            link && (
              <Button
                variant="ghost"
                size="sm"
                className="text-[#a0a0a0] hover:text-white hover:bg-[#6366f1]/10"
                asChild
              >
                <Link href={link} target="_blank" rel="noopener noreferrer">
                  GitHub <Github className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )
          }
          {
            demo && (
              <Button
                variant="ghost"
                size="sm"
                className="text-[#a0a0a0] hover:text-white hover:bg-[#6366f1]/10"
                asChild
              >
                <Link href={demo} target="_blank" rel="noopener noreferrer">
                  Demo <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )
          }
        </div>
      </div>
    </div>
  )
}

