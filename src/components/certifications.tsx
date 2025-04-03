"use client"

import { motion } from "framer-motion"
import { Award, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"

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
      date: "2024",
      image: "https://placehold.co/800?text=NASA+Space+Apps+Challenge&font=roboto",
      link: "#",
      description:
        "First place for the second consecutive year, demonstrating consistent excellence in space technology innovation.",
    },
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
      title: "Google Cloud Certified",
      issuer: "Google",
      date: "2023",
      image: "https://placehold.co/800?text=Google+Cloud+Certified&font=roboto",
      link: "#",
      description: "Professional certification in Google Cloud Platform services and architecture.",
    },
    {
      title: "Google Cloud Computing Foundations: Cloud Computing Fundamentals",
      issuer: "Google Cloud",
      date: "2024",
      image: "https://placehold.co/800?text=Google+Cloud+Foundations+Fundamentals&font=roboto",
      link: "#",
      description: "Core concepts of cloud computing with hands-on experience on Google Cloud.",
    },
    {
      title: "Google Cloud Computing Foundations: Infrastructure in Google Cloud",
      issuer: "Google Cloud",
      date: "2024",
      image: "https://placehold.co/800?text=Google+Cloud+Foundations+Infrastructure&font=roboto",
      link: "#",
      description: "Focus on cloud infrastructure components, including compute, storage, and networking.",
    },
    {
      title: "Google Cloud Computing Foundations: Networking & Security in Google Cloud",
      issuer: "Google Cloud",
      date: "2024",
      image: "https://placehold.co/800?text=Google+Cloud+Networking+Security&font=roboto",
      link: "#",
      description: "Covers the basics of cloud networking and securing cloud environments.",
    },
    {
      title: "Google Cloud Computing Foundations: Data, ML, and AI in Google Cloud",
      issuer: "Google Cloud",
      date: "2024",
      image: "https://placehold.co/800?text=Google+Cloud+ML+AI&font=roboto",
      link: "#",
      description: "Introduction to data analytics, machine learning, and AI in the cloud.",
    },
    {
      title: "Docker for Developers (with Docker Swarm and Kubernetes)",
      issuer: "Udemy",
      date: "2023",
      image: "https://placehold.co/800?text=Docker+for+Developers&font=roboto",
      link: "#",
      description: "Hands-on training in Docker, Swarm, and Kubernetes for production-ready applications.",
    },
    {
      title: "Bootcamp .NET Developer",
      issuer: "DIO",
      date: "2023",
      image: "https://placehold.co/800?text=.NET+Bootcamp+DIO&font=roboto",
      link: "#",
      description: "Complete bootcamp for .NET development including backend and cloud solutions.",
    },
    {
      title: ".NET 6: Creating a Web API",
      issuer: "Alura",
      date: "2024",
      image: "https://placehold.co/800?text=.NET+6+Web+API&font=roboto",
      link: "#",
      description: "Building RESTful Web APIs using .NET 6 framework and best practices.",
    },
    {
      title: ".NET 6: Relating Entities",
      issuer: "Alura",
      date: "2024",
      image: "https://placehold.co/800?text=.NET+6+Relating+Entities&font=roboto",
      link: "#",
      description: "Mastery of entity relationships using .NET 6 in real-world applications.",
    },
    {
      title: "Python 3: From Basics to Advanced with Real Projects",
      issuer: "Udemy",
      date: "2023",
      image: "https://placehold.co/800?text=Python+3+Advanced+Projects&font=roboto",
      link: "#",
      description: "Comprehensive course on Python 3 development with real-world project applications.",
    },
    {
      title: "HTTP: Understanding the Web Under the Hood",
      issuer: "Alura",
      date: "2023",
      image: "https://placehold.co/800?text=HTTP+Fundamentals&font=roboto",
      link: "#",
      description: "Explores how the web works through HTTP, requests, and response structures.",
    },
    {
      title: "Excel: Mastering the Spreadsheet Editor",
      issuer: "Alura",
      date: "2023",
      image: "https://placehold.co/800?text=Excel+Mastery&font=roboto",
      link: "#",
      description: "In-depth course on using Excel for data manipulation and analysis.",
    },
    {
      title: "UI Design: Diving into Digital Interfaces",
      issuer: "Alura",
      date: "2023",
      image: "https://placehold.co/800?text=UI+Design+Fundamentals&font=roboto",
      link: "#",
      description: "Basics of user interface design focusing on usability and visual hierarchy.",
    },
    {
      title: "Python 3 Course - Part 3",
      issuer: "Curso em Vídeo",
      date: "2023",
      image: "https://placehold.co/800?text=Python+3+Course+Part+3&font=roboto",
      link: "#",
      description: "Advanced Python 3 topics including functions, modules, and error handling.",
    },
    {
      title: "Python 3 Course - Part 2",
      issuer: "Curso em Vídeo",
      date: "2023",
      image: "https://placehold.co/800?text=Python+3+Course+Part+2&font=roboto",
      link: "#",
      description: "Intermediate Python programming with data structures and logic building.",
    },
    {
      title: "Python 3 Course - Part 1",
      issuer: "Curso em Vídeo",
      date: "2023",
      image: "https://placehold.co/800?text=Python+3+Course+Part+1&font=roboto",
      link: "#",
      description: "Introduction to Python 3 programming covering basic concepts and syntax.",
    }
  ];
  

  const isMobile = useMediaQuery("(max-width: 768px)")
  const isTablet = useMediaQuery("(max-width: 1024px)")

  // Determine items per page based on screen size
  const getItemsPerPage = () => {
    if (isMobile) return 1
    if (isTablet) return 2
    return 3
  }

  const [currentPage, setCurrentPage] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(3)
  const [totalPages, setTotalPages] = useState(Math.ceil(certifications.length / itemsPerPage))

  // Update items per page when screen size changes
  useEffect(() => {
    const newItemsPerPage = getItemsPerPage()
    setItemsPerPage(newItemsPerPage)
    setTotalPages(Math.ceil(certifications.length / newItemsPerPage))

    // Reset to first page if current page would be out of bounds
    if (currentPage >= Math.ceil(certifications.length / newItemsPerPage)) {
      setCurrentPage(0)
    }
  }, [isMobile, isTablet, certifications.length, currentPage])

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const goToPage = (pageIndex: number) => {
    setCurrentPage(pageIndex)
  }

  // Get current items to display
  const currentCertifications = certifications.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

  return (
    <div className="relative">
      {/* Pagination Controls - Left */}
      <motion.button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-[#1a1a1a] p-2 rounded-full border border-[#333] hover:border-[#6366f1] hover:bg-[#6366f1]/10 text-white"
        onClick={prevPage}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-5 w-5" />
      </motion.button>

      {/* Pagination Controls - Right */}
      <motion.button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-[#1a1a1a] p-2 rounded-full border border-[#333] hover:border-[#6366f1] hover:bg-[#6366f1]/10 text-white"
        onClick={nextPage}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        aria-label="Next page"
      >
        <ChevronRight className="h-5 w-5" />
      </motion.button>

      {/* Certifications Grid */}
      <div className="px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCertifications.map((cert, index) => (
            <motion.div
              key={`${cert.title}-${currentPage}-${index}`}
              className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] overflow-hidden hover:border-[#6366f1] transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
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
      </div>

      {/* Pagination Indicators */}
      <div className="flex justify-center mt-8 gap-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <Button
            key={index}
            variant="ghost"
            size="icon"
            className={`w-8 h-8 rounded-full ${
              currentPage === index
                ? "bg-[#6366f1] text-white"
                : "bg-[#1a1a1a] text-[#a0a0a0] hover:text-white hover:bg-[#6366f1]/20"
            }`}
            onClick={() => goToPage(index)}
            aria-label={`Go to page ${index + 1}`}
            aria-current={currentPage === index ? "page" : undefined}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </div>
  )
}

