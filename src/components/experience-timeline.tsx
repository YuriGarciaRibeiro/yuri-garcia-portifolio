"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string;
  skills?: string[];
}

export default function ExperienceTimeline() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
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

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = 350; // Adjust as needed
      
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="relative">
      {/* Scroll controls */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20">
        <button 
          onClick={() => scroll('left')}
          className="bg-[#1a1a1a] p-2 rounded-full border border-[#333] hover:border-[#6366f1] hover:bg-[#6366f1]/10 text-white"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      </div>
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20">
        <button 
          onClick={() => scroll('right')}
          className="bg-[#1a1a1a] p-2 rounded-full border border-[#333] hover:border-[#6366f1] hover:bg-[#6366f1]/10 text-white"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
      
      {/* Timeline container */}
      <div className="relative px-10">
        {/* Linha horizontal da timeline */}
        <div className="absolute left-0 right-0 top-16 h-0.5 bg-[#333]"></div>
        
        {/* Experiences container with horizontal scroll */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto hide-scrollbar pt-8 pb-8 px-4 space-x-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {experiences.map((experience, index) => (
            <motion.div 
              key={index}
              className="relative flex-shrink-0 w-80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Círculo na timeline */}
              <div className="absolute top-[-24px] left-1/2 w-4 h-4 bg-[#6366f1] rounded-full transform -translate-x-1/2 z-10"></div>
              
              {/* Year marker */}
              <div className="absolute top-[-60px] left-1/2 transform -translate-x-1/2 text-center">
                <span className="text-sm text-[#a0a0a0] bg-[#0f0f0f] px-2 py-1 rounded-full">
                  {experience.period.split(' - ')[0]}
                </span>
              </div>
              
              <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#2a2a2a] hover:border-[#6366f1] transition-colors duration-300 h-full">
                <h3 className="text-xl font-bold text-white mb-2">{experience.title}</h3>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[#6366f1]">{experience.company}</span>
                  <span className="text-sm text-[#a0a0a0]">{experience.period}</span>
                </div>
                <p className="text-[#a0a0a0] mb-4 text-sm line-clamp-4">{experience.description}</p>
                
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
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Add custom styles to hide scrollbar */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}