"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, Mail, ChevronDown, Briefcase, MessageSquare } from "lucide-react"
import TechStack from "@/components/tech-stack"
import ExperienceTimeline from "@/components/experience-timeline"
import { FaWhatsapp } from "react-icons/fa"
import Navigation from "@/components/navigation"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import ScrollToTop from "@/components/scroll-to-top"
import ResumeButton from "@/components/resume-button"
import Certifications from "@/components/certifications"
import ContactForm from "@/components/contact-form"
import ThemeToggle from "@/components/theme-toggle"
import ProjectsSection from "@/components/projects-section"
import SubtleGradientBackground from "@/components/subtle-gradient-background"
import SectionDivider from "@/components/section-divider"
import SectionHeading from "@/components/section-heading"
import AnimatedText from "@/components/animated-text"
import FloatingShapes from "@/components/floating-shapes"
import CardHoverEffect from "@/components/card-hover-effect"
import TextGradient from "@/components/text-gradient"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-[#e0e0e0] relative">
      {/* Background Elements */}
      <SubtleGradientBackground />
      <FloatingShapes />

      {/* Navigation */}
      <nav className="container mx-auto py-6 px-4 flex justify-between items-center border-b border-[#1f1f1f] sticky top-0 z-50 bg-[#0f0f0f]/95 backdrop-blur-sm">
        <motion.div
          className="text-xl font-bold text-white"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-[#6366f1]">Dev</span> Yuri Garcia
        </motion.div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Navigation />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 min-h-[calc(100vh-80px)] flex items-center relative">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="relative w-[150px] h-[150px] rounded-full overflow-hidden border-2 border-[#6366f1] bg-[#1a1a1a]"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src="https://avatars.githubusercontent.com/u/81641949"
                alt="Profile"
                fill
                sizes="160px"
                className="object-cover"
                priority
              />

              {/* Animated border effect */}
              <motion.div
                className="absolute inset-0 border-2 border-[#6366f1] rounded-full"
                animate={{
                  boxShadow: ["0 0 0 0 rgba(99, 102, 241, 0)", "0 0 0 10px rgba(99, 102, 241, 0)"],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              />
            </motion.div>

            <div className="text-center md:text-left">
              <motion.h1
                className="text-4xl md:text-5xl font-bold mb-4 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Software <TextGradient>Engineer</TextGradient>
              </motion.h1>

              <AnimatedText
                text="Software Engineer with 3+ years building scalable backend systems in .NET, distributed architectures, and high-reliability environments. Specialized in RESTful APIs for financial systems and currently working on AI-driven products."
                className="text-lg text-[#a0a0a0] max-w-2xl"
                delay={0.3}
              />
            </div>
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-4 justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button className="bg-[#6366f1] hover:bg-[#4f46e5] text-white" onClick={() => scrollToSection("projects")}>
              <Briefcase className="mr-2 h-4 w-4" />
              See Projects
            </Button>

            <Button
              variant="outline"
              className="border-[#333] text-[#a0a0a0] hover:text-white hover:border-[#6366f1]"
              onClick={() => scrollToSection("contact")}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Contact
            </Button>

            <ResumeButton resumeUrl="https://docs.google.com/document/d/18amvtWzFUcQ7OH-QzaEpPMdfx8-gSFZiCzZd8A6thYU/export?format=pdf" />
          </motion.div>

          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
              className="cursor-pointer"
              onClick={() => scrollToSection("about")}
            >
              <ChevronDown className="h-8 w-8 text-[#6366f1]" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section Divider */}
      <SectionDivider variant="wave" />

      {/* About Section */}
      <section id="about" className="py-20 bg-[#0a0a0a]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <SectionHeading title="About Me" subtitle="My journey, expertise, and passion for software engineering" />

            <div className="space-y-4 text-[#a0a0a0]">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Software Engineer with <span className="text-white font-semibold">3+ years of experience</span> building, scaling, and operating backend systems in production, with a strong focus on <TextGradient>.NET (currently .NET 10)</TextGradient>, distributed architectures, and high-reliability environments.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Experienced in designing and maintaining <span className="text-white font-semibold">scalable RESTful APIs</span> for high-throughput systems, particularly in the <TextGradient>financial and banking domain</TextGradient>. Strong advocate of <span className="text-white font-semibold">Clean Architecture</span>, <span className="text-white font-semibold">DDD fundamentals</span>, and <span className="text-white font-semibold">SOLID principles</span> to deliver maintainable, testable, and resilient software.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Currently working on a <TextGradient>highly AI-driven product</TextGradient>, integrating LLM APIs, building data pipelines, handling model evaluation and versioning, and implementing AI observability with monitoring of latency, cost, failures, and model behavior in production.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Hands-on experience with automated testing, asynchronous messaging, containerized environments, and CI/CD pipelines. Background also includes frontend and mobile development with <TextGradient>React, Next.js, and Flutter</TextGradient>, enabling effective collaboration in product-oriented teams.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <SectionDivider variant="angle" className="transform rotate-180" />

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Technical Skills"
            subtitle="The technologies and tools I use to build robust backend systems"
            className="max-w-3xl mx-auto"
          />

          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <TechStack />
          </motion.div>
        </div>
      </section>

      {/* Section Divider */}
      <SectionDivider variant="curve" />

      {/* Certifications Section */}
      <section id="certifications" className="py-20 bg-[#0a0a0a]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-12">
            <SectionHeading
              title="Main Certifications and Awards"
              subtitle="Professional certifications and recognition that validate my expertise and commitment to excellence in software development."
            />
          </div>

          <div className="max-w-5xl mx-auto">
            <Certifications />
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <SectionDivider variant="triangle" className="transform rotate-180" />

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Projects"
            subtitle="A showcase of my technical skills and problem-solving abilities"
            className="max-w-3xl mx-auto"
          />

          <div className="max-w-6xl mx-auto">
            <ProjectsSection />
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <SectionDivider variant="wave" />

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-[#0a0a0a]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-12">
            <SectionHeading
              title="Professional Experience"
              subtitle="My career journey in software development, from intern to mid-level backend developer, showcasing growth in building scalable systems and financial solutions."
            />
          </div>

          <div className="w-full mx-auto">
            <ExperienceTimeline />
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <SectionDivider variant="angle" className="transform rotate-180" />

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <SectionHeading title="Contact" subtitle="Let's discuss how I can contribute to your team or project" />

            <CardHoverEffect className="bg-[#1a1a1a] rounded-lg p-8 border border-[#2a2a2a] shadow-lg">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <ContactForm />
              </motion.div>
            </CardHoverEffect>

            <motion.div
              className="mt-12 flex justify-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400 }}>
                <Link href={"https://github.com/YuriGarciaRibeiro"} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-lg h-12 w-12 border-[#333] hover:border-[#6366f1] hover:bg-[#6366f1]/10 transition-all duration-200"
                  >
                    <Github className="h-5 w-5 text-[#a0a0a0] group-hover:text-white" />
                    <span className="sr-only">GitHub</span>
                  </Button>
                </Link>
              </motion.div>

              <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400 }}>
                <Link href={"https://www.linkedin.com/in/yurigarciaribeiro/"} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-lg h-12 w-12 border-[#333] hover:border-[#6366f1] hover:bg-[#6366f1]/10 transition-all duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[#a0a0a0]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                    <span className="sr-only">LinkedIn</span>
                  </Button>
                </Link>
              </motion.div>

              <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400 }}>
                <a href="mailto:yurirgarciar@gmail.com" target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-lg h-12 w-12 border-[#333] hover:border-[#6366f1] hover:bg-[#6366f1]/10 transition-all duration-200"
                  >
                    <Mail className="h-5 w-5 text-[#a0a0a0]" />
                    <span className="sr-only">Email</span>
                  </Button>
                </a>
              </motion.div>

              <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400 }}>
                <Link href="https://wa.me/5579988636388" target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-lg h-12 w-12 border-[#333] hover:border-[#6366f1] hover:bg-[#6366f1]/10 transition-all duration-200"
                  >
                    <FaWhatsapp className="h-5 w-5 text-[#a0a0a0] group-hover:text-white" />
                    <span className="sr-only">Whatsapp</span>
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-[#666] border-t border-[#1f1f1f]">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} | Yuri Garcia - Back-End Developer</p>
        </div>
      </footer>

      <ScrollToTop />
    </main>
  )
}

