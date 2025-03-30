"use client";

import { motion } from "framer-motion";

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string;
  skills?: string[];
}

export default function ExperienceTimeline() {
  const experiences: ExperienceItem[] = [
    {
      title: "Mid-Level Backend Developer",
      company: "Protech Solutions",
      period: "Jan/2025 - present",
      description: "I actively participate in the development cycle of a project to implement the Mastercard brand on BANESE credit cards using .NET, from solution design to implementation. I collaborate in creating APIs and back-end services for integration with banking systems, ensuring security, scalability, and compliance with financial standards.",
      skills: ["C#", ".NET", "Redis", "Docker", "Azure DevOps"]
    },
    {
      title: "Mid-Level Developer",
      company: "Banese",
      period: "Mar/2024 - Jan/2025",
      description: "I participated in the entire development cycle of a project to create a centralized automation environment using an agent-server model, utilizing Python and .NET, from idea conception to implementation. Additionally, I create Python-based automations focused on banking processes, interacting with web systems, legacy systems, and files.",
      skills: ["Python","C#", ".NET", "PostgreSQL", "Azure DevOps", "Docker", "Jenkins"]
    },
    {
      title: "Junior Developer",
      company: "Banese",
      period: "Sep/2023 - Feb/2024",
      description: "I developed Python automations using various libraries like Selenium and PyAutoGUI, focusing on banking processes. My automations interact with web systems, legacy systems, and handle files, optimizing repetitive tasks and increasing operational efficiency.",
      skills: ["Python", "Selenium", "PyAutoGUI"]
    },
    {
        title: "Trainee Banese Labs",
        company: "Banese",
        period: "Feb/2023 - Sep/2023",
        description: "I learned the basic concepts of RPA and its applications, putting them into practice. Additionally, I studied the metaverse and implemented a virtual meeting environment.",
        skills: ["Python", "Selenium", "PyAutoGUI","C#", "Unity", "Metaverse"]
    },
    {
        title: "Intern",
        company: "Medlynx Medical Informatics",
        period: "Dec/2022 - Sep/2023",
        description: "I developed web systems using JavaScript, HTML, CSS, and PHP/Laravel, focusing on both front-end and back-end, creating intuitive user interfaces and robust server-side functionality.",
        skills: ["JavaScript", "HTML", "CSS","C#", "PHP", "Laravel"]
    },
  ];

  return (
    <div className="relative">
      {/* Linha vertical da timeline */}
      <div className="absolute left-0 md:left-1/2 h-full w-0.5 bg-[#333] transform -translate-x-1/2"></div>
      
      <div className="space-y-16">
        {experiences.map((experience, index) => (
          <motion.div 
            key={index}
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {/* Círculo na timeline */}
            <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-[#6366f1] rounded-full transform -translate-x-1/2 z-10"></div>
            
            <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:ml-auto' : 'md:pl-12'}`}>
              <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#2a2a2a] hover:border-[#6366f1] transition-colors duration-300">
                <h3 className="text-xl font-bold text-white">{experience.title}</h3>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[#6366f1]">{experience.company}</span>
                  <span className="text-sm text-[#a0a0a0]">{experience.period}</span>
                </div>
                <p className="text-[#a0a0a0] mb-4">{experience.description}</p>
                
                {experience.skills && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {experience.skills.map((skill, skillIndex) => (
                      <span 
                        key={skillIndex} 
                        className="px-2 py-1 bg-[#0f0f0f] text-[#a0a0a0] rounded-md text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}