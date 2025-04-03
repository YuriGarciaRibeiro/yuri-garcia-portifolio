"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AnimatePresence, motion } from "framer-motion"
import { Award, Building, Calendar, ChevronDown, ChevronUp, ExternalLink } from "lucide-react"
import { useState } from "react"

interface ExperienceItem {
  title: string
  company: string
  period: string
  description: string
  achievements?: string[]
  skills?: string[]
  companyUrl?: string
  location?: string
}

export default function ExperienceTimeline() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const experiences: ExperienceItem[] = [
    {
      title: "Mid-Level Backend Developer",
      company: "Protech Solutions",
      companyUrl: "https://protechsolutions.com",
      location: "Aracaju, SE",
      period: "Jan/2025 - present",
      description:
        "Leading backend development for the Mastercard integration project with BANESE credit cards, focusing on secure API development and financial system integration.",
      achievements: [
        "Designed and implemented secure API architecture for Mastercard integration",
        "Reduced transaction processing time by 35% through optimized database queries",
        "Implemented comprehensive logging and monitoring systems for financial transactions",
        "Collaborated with cross-functional teams to ensure compliance with financial regulations",
      ],
      skills: ["C#", ".NET", "Redis", "Docker", "Azure DevOps", "RESTful APIs", "Microservices"],
    },
    {
      title: "Mid-Level Developer",
      company: "Banese",
      companyUrl: "https://www.banese.com.br",
      location: "Aracaju, SE",
      period: "Mar/2024 - Jan/2025",
      description:
        "Developed a centralized automation environment using an agent-server model with Python and .NET, from concept to implementation.",
      achievements: [
        "Architected and implemented a centralized automation platform that reduced manual processes by 60%",
        "Created Python-based automations that saved approximately 25 hours of manual work per week",
        "Integrated legacy banking systems with modern web interfaces",
        "Implemented CI/CD pipelines using Jenkins for automated testing and deployment",
      ],
      skills: ["Python", "C#", ".NET", "PostgreSQL", "Azure DevOps", "Docker", "Jenkins", "CI/CD"],
    },
    {
      title: "Junior Developer",
      company: "Banese",
      companyUrl: "https://www.banese.com.br",
      location: "Aracaju, SE",
      period: "Sep/2023 - Feb/2024",
      description:
        "Developed Python automations for banking processes using Selenium and PyAutoGUI, optimizing repetitive tasks and increasing operational efficiency.",
      achievements: [
        "Automated 15+ critical banking processes, reducing manual errors by 90%",
        "Created a file processing system that handled over 10,000 documents monthly",
        "Developed a reporting dashboard for monitoring automation performance",
        "Trained team members on automation best practices",
      ],
      skills: ["Python", "Selenium", "PyAutoGUI", "Process Automation", "Banking Systems"],
    },
    {
      title: "Trainee Banese Labs",
      company: "Banese",
      companyUrl: "https://www.banese.com.br",
      location: "Aracaju, SE",
      period: "Feb/2023 - Sep/2023",
      description:
        "Learned RPA concepts and applications, implementing them in practical scenarios. Studied metaverse technologies and implemented a virtual meeting environment.",
      achievements: [
        "Developed a proof-of-concept virtual meeting environment using Unity",
        "Created 5+ RPA solutions for internal processes",
        "Participated in innovation workshops and hackathons",
        "Presented metaverse applications for banking to executive leadership",
      ],
      skills: ["Python", "Selenium", "PyAutoGUI", "C#", "Unity", "Metaverse", "RPA"],
    },
    {
      title: "Intern",
      company: "Medlynx Medical Informatics",
      companyUrl: "#",
      location: "Aracaju, SE",
      period: "Dec/2022 - Sep/2023",
      description:
        "Developed web systems using JavaScript, HTML, CSS, and PHP/Laravel, focusing on both front-end and back-end, creating intuitive user interfaces and robust server-side functionality.",
      achievements: [
        "Contributed to the development of a patient management system used by 5+ medical clinics",
        "Implemented responsive UI components that improved user experience",
        "Created RESTful APIs for medical data integration",
        "Optimized database queries resulting in 40% faster page load times",
      ],
      skills: ["JavaScript", "HTML", "CSS", "C#", "PHP", "Laravel", "MySQL"],
    },
  ]

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <div className="relative px-4 max-w-3xl mx-auto">
      {/* Vertical timeline line */}
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-[#333] transform md:translate-x-[-0.5px] z-0"></div>

      <div className="space-y-12">
        {experiences.map((experience, index) => (
          <motion.div
            key={index}
            className={`relative ${index % 2 === 0 ? "md:pr-12 md:text-right md:ml-auto md:mr-[50%]" : "md:pl-12 md:ml-[50%]"} pl-16 md:pl-0 md:w-[calc(50%-12px)]`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: index * 0.1 }}
          >
            {/* Circle on timeline */}
            <motion.div
              className={`absolute left-7 md:left-auto ${
                index % 2 === 0 ? "md:right-[-8px]" : "md:left-[-8px]"
              } top-1.5 w-5 h-5 bg-[#6366f1] rounded-full z-10 border-2 border-[#0f0f0f] shadow-lg`}
              whileInView={{ scale: [0, 1.5, 1] }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            ></motion.div>

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
        ))}
      </div>
    </div>
  )
}

