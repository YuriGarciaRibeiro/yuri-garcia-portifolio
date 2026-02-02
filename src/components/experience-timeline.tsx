"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AnimatePresence, motion } from "framer-motion"
import { Award, Building, Calendar, ChevronDown, ChevronUp, ExternalLink, Loader2 } from "lucide-react"
import { useState } from "react"
import { useExperience } from "@/hooks/use-experience"

export default function ExperienceTimeline() {
  const { experiences: apiExperiences, loading, error } = useExperience()
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  // Format period from API dates
  const formatPeriod = (startDate: string, endDate?: string, isCurrent?: boolean) => {
    const start = new Date(startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    if (isCurrent) return `${start} - present`
    if (!endDate) return start
    const end = new Date(endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    return `${start} - ${end}`
  }

  // Map API data to component format
  const experiences = apiExperiences.map(exp => ({
    title: exp.position,
    company: exp.companyName,
    period: formatPeriod(exp.startDate, exp.endDate, exp.isCurrentlyWorkingHere),
    description: exp.description,
    achievements: exp.highlights,
    skills: exp.technologies,
    companyUrl: '#',
    location: exp.location
  }))

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#6366f1]" />
        <span className="ml-3 text-[#a0a0a0]">Loading experiences...</span>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 mb-4">Error loading experiences: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-[#6366f1] text-white rounded-md hover:bg-[#5558e3] transition-colors"
        >
          Retry
        </button>
      </div>
    )
  }


  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <div className="relative px-4 max-w-3xl mx-auto">
      {/* Vertical timeline line - centered */}
      <div className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-0.5 bg-[#333] md:-translate-x-1/2 z-0"></div>

      <div className="space-y-12">
        {experiences.map((experience, index) => (
          <div
            key={index}
            className="relative"
          >
            {/* Circle on timeline - always centered on line */}
            <motion.div
              className="absolute w-4 h-4 bg-[#6366f1] rounded-full z-10 border-2 border-[#0f0f0f] shadow-lg top-6 left-[32px] md:left-1/2 md:-translate-x-1/2"
              whileInView={{ scale: [0, 1.5, 1] }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            ></motion.div>
            
            <motion.div
              className={`relative ${index % 2 === 0 ? "md:pr-12 md:text-right md:mr-[50%]" : "md:pl-12 md:ml-[50%]"} pl-16 md:pl-0 md:w-[calc(50%-24px)]`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1 }}
            >

            <motion.div
              className="bg-[#1a1a1a] p-6 rounded-lg border border-[#2a2a2a] hover:border-[#6366f1] transition-colors duration-300"
              whileHover={{ y: -5 }}
            >
              {/* Date inside the card */}
              <div
                className={`flex items-center gap-2 text-[#6366f1] text-sm mb-3 ${index % 2 === 0 ? "md:justify-end" : ""}`}
              >
                <Calendar className="h-4 w-4 flex-shrink-0" />
                <span>{experience.period}</span>
              </div>

              <h3 className={`text-xl font-bold text-white mb-2 ${index % 2 === 0 ? "md:text-right" : ""}`}>
                {experience.title}
              </h3>

              <div className={`flex items-center gap-2 mb-4 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                <Building className="h-4 w-4 text-[#a0a0a0] flex-shrink-0" />
                <a
                  href={experience.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#a0a0a0] hover:text-[#6366f1] transition-colors flex items-center gap-1"
                >
                  {experience.company}
                  {experience.companyUrl && experience.companyUrl !== "#" && <ExternalLink className="h-3 w-3" />}
                </a>
                {experience.location && <span className="text-[#666] text-sm">• {experience.location}</span>}
              </div>

              <p className={`text-[#a0a0a0] mb-4 text-sm ${index % 2 === 0 ? "md:text-right" : ""}`}>
                {experience.description}
              </p>

              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    {experience.achievements && (
                      <div className="mb-4">
                        <h4
                          className={`text-white font-medium mb-2 flex items-center gap-2 ${index % 2 === 0 ? "md:justify-end" : ""}`}
                        >
                          <Award className="h-4 w-4 text-[#6366f1]" />
                          <span>Key Achievements</span>
                        </h4>
                        <ul
                          className={`space-y-2 ${index % 2 === 0 ? "md:pl-0 md:pr-5 md:text-right" : "pl-5"} list-disc text-sm text-[#a0a0a0]`}
                        >
                          {experience.achievements.map((achievement, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: index % 2 === 0 ? 10 : -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className={index % 2 === 0 ? "md:list-none" : ""}
                            >
                              {achievement}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {experience.skills && (
                <div className={`flex flex-wrap gap-2 mt-3 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                  {experience.skills.slice(0, expandedIndex === index ? undefined : 3).map((skill, skillIndex) => (
                    <Badge
                      key={skillIndex}
                      variant="outline"
                      className="bg-[#0f0f0f] text-[#a0a0a0] border-[#333] text-xs"
                    >
                      {skill}
                    </Badge>
                  ))}
                  {experience.skills.length > 3 && expandedIndex !== index && (
                    <Badge variant="outline" className="bg-[#0f0f0f] text-[#a0a0a0] border-[#333] text-xs">
                      +{experience.skills.length - 3} more
                    </Badge>
                  )}
                </div>
              )}

              <div className={`mt-3 ${index % 2 === 0 ? "md:text-right" : ""}`}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleExpand(index)}
                  className="text-[#6366f1] hover:text-[#4f46e5] hover:bg-[#6366f1]/5 p-0 h-auto"
                >
                  {expandedIndex === index ? (
                    <span className="flex items-center gap-1">
                      <ChevronUp className="h-4 w-4" /> Show less
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <ChevronDown className="h-4 w-4" /> Show more
                    </span>
                  )}
                </Button>
              </div>
            </motion.div>
          </motion.div>
          </div>
        ))}
      </div>
    </div>
  )
}

