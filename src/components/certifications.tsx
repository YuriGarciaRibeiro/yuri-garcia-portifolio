"use client"

import { motion } from "framer-motion"
import { Award, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Certification {
  title: string
  issuer: string
  date: string
  image: string
  link?: string
  description?: string
}

export default function Certifications() {
  const certifications: Certification[] = [
    {
      title: "NASA Space Apps Challenge Winner",
      issuer: "NASA",
      date: "2023",
      image: "https://placehold.co/800?text=NASA+Space+Apps+Challenge&font=roboto",
      link: "#",
      description:
        "First place in the Brazilian stage of NASA's global hackathon, developing innovative space technology solutions.",
    },
    {
      title: "NASA Space Apps Challenge Winner",
      issuer: "NASA",
      date: "2024",
      image: "https://placehold.co/800?text=NASA+Space+Apps+Challenge&font=roboto",
      link: "#",
      description:
        "First place for the second consecutive year, demonstrating consistent excellence in space technology innovation.",
    },
    {
      title: "Google Cloud Certified",
      issuer: "Google",
      date: "2023",
      image: "https://placehold.co/800?text=Google+Cloud+Certified&font=roboto",
      link: "#",
      description: "Professional certification in Google Cloud Platform services and architecture.",
    },
    {
      title: "Docker Certified Associate",
      issuer: "Docker",
      date: "2023",
      image: "https://placehold.co/800?text=Docker+Certified+Associate&font=roboto",
      link: "#",
      description: "Certification demonstrating expertise in containerization and Docker technologies.",
    },
    {
      title: ".NET Developer Certification",
      issuer: "Microsoft",
      date: "2022",
      image: "https://placehold.co/800?text=.NET+Developer+Certification&font=roboto",
      link: "#",
      description: "Professional certification in .NET development, architecture, and best practices.",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {certifications.map((cert, index) => (
        <motion.div
          key={index}
          className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] overflow-hidden hover:border-[#6366f1] transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -5 }}
        >
          <div className="p-4 flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-md overflow-hidden bg-[#0f0f0f] flex-shrink-0">
              <Image src={cert.image || "/placeholder.svg"} alt={cert.title} fill className="object-cover" />
            </div>
            <div>
              <h3 className="font-bold text-white">{cert.title}</h3>
              <div className="flex items-center gap-2 text-sm text-[#a0a0a0]">
                <Award className="h-3 w-3 text-[#6366f1]" />
                <span>
                  {cert.issuer} • {cert.date}
                </span>
              </div>
            </div>
          </div>

          {cert.description && (
            <div className="px-4 pb-4 text-sm text-[#a0a0a0]">
              <p>{cert.description}</p>
            </div>
          )}

          {cert.link && (
            <div className="px-4 pb-4">
              <Link
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6366f1] text-sm hover:text-[#4f46e5] flex items-center gap-1"
              >
                View Certificate <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}

