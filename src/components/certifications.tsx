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
      link: "https://drive.google.com/file/d/1vWFDJaEDm1spyLh6MHzBylzyyUvEgcrB/view?usp=sharing",
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
      title: "Google Cloud Computing Foundations: Cloud Computing Fundamentals",
      issuer: "Google Cloud",
      date: "2024",
      image: "https://placehold.co/800?text=Google+Cloud+Foundations+Fundamentals&font=roboto",
      link: "https://www.cloudskillsboost.google/public_profiles/accd8d56-a969-4369-a7d8-facd90861e94/badges/3615673?utm_medium=social&utm_source=linkedin&utm_campaign=ql-social-share",
      description: "Core concepts of cloud computing with hands-on experience on Google Cloud.",
    },
    {
      title: "Google Cloud Computing Foundations: Infrastructure in Google Cloud",
      issuer: "Google Cloud",
      date: "2024",
      image: "https://placehold.co/800?text=Google+Cloud+Foundations+Infrastructure&font=roboto",
      link: "https://www.cloudskillsboost.google/public_profiles/accd8d56-a969-4369-a7d8-facd90861e94/badges/3620376?utm_medium=social&utm_source=linkedin&utm_campaign=ql-social-share",
      description: "Focus on cloud infrastructure components, including compute, storage, and networking.",
    },
    {
      title: "Google Cloud Computing Foundations: Networking & Security in Google Cloud",
      issuer: "Google Cloud",
      date: "2024",
      image: "https://placehold.co/800?text=Google+Cloud+Networking+Security&font=roboto",
      link: "https://www.cloudskillsboost.google/public_profiles/accd8d56-a969-4369-a7d8-facd90861e94/badges/3623795?utm_medium=social&utm_source=linkedin&utm_campaign=ql-social-share",
      description: "Covers the basics of cloud networking and securing cloud environments.",
    },
    {
      title: "Google Cloud Computing Foundations: Data, ML, and AI in Google Cloud",
      issuer: "Google Cloud",
      date: "2024",
      image: "https://placehold.co/800?text=Google+Cloud+ML+AI&font=roboto",
      link: "https://www.cloudskillsboost.google/public_profiles/accd8d56-a969-4369-a7d8-facd90861e94/badges/3625178?utm_medium=social&utm_source=linkedin&utm_campaign=ql-social-share",
      description: "Introduction to data analytics, machine learning, and AI in the cloud.",
    },
    {
      title: "Docker for Developers (with Docker Swarm and Kubernetes)",
      issuer: "Udemy",
      date: "2023",
      image: "https://placehold.co/800?text=Docker+for+Developers&font=roboto",
      link: "https://www.udemy.com/certificate/UC-d8c8ebb8-9080-424b-87e9-7c64f0e1ec7c/",
      description: "Hands-on training in Docker, Swarm, and Kubernetes for production-ready applications.",
    },
    {
      title: "Bootcamp .NET Developer",
      issuer: "DIO",
      date: "2023",
      image: "https://placehold.co/800?text=.NET+Bootcamp+DIO&font=roboto",
      link: "https://hermes.dio.me/certificates/C9EZVMDQ.pdf",
      description: "Complete bootcamp for .NET development including backend and cloud solutions.",
    },
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

