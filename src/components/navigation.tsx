"use client"

import type React from "react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [isScrolling, setIsScrolling] = useState(false)

  // Function for smooth scrolling
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()

    const section = document.getElementById(sectionId)
    if (section) {
      // Set scrolling flag to prevent scroll handler from overriding
      setIsScrolling(true)
      setActiveSection(sectionId)

      // Calculate position with offset for better centering
      const navHeight = 80 // Height of the fixed navigation
      const offset = 50 // Additional offset for breathing room
      const elementPosition = section.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - navHeight - offset

      // Smooth scroll to calculated position
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })

      // Update URL with hash (optional)
      window.history.pushState({}, "", `#${sectionId}`)

      // Close mobile menu if open
      setIsOpen(false)

      // Reset scrolling flag after animation completes
      setTimeout(() => {
        setIsScrolling(false)
      }, 1000)
    }
  }

  // Check URL hash on page load
  useEffect(() => {
    const hash = window.location.hash.substring(1)
    if (hash) {
      setActiveSection(hash)
      const section = document.getElementById(hash)
      if (section) {
        // Small timeout to ensure page is fully loaded
        setTimeout(() => {
          const navHeight = 80
          const offset = 50
          const elementPosition = section.getBoundingClientRect().top + window.scrollY
          const offsetPosition = elementPosition - navHeight - offset
          
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          })
        }, 100)
      }
    }

    // Add scroll event listener to update active section
    const handleScroll = () => {
      // Don't update if we're in the middle of a click-triggered scroll
      if (isScrolling) return

      const sections = ["about", "skills", "certifications", "projects", "experience", "contact"]
      const scrollPosition = window.scrollY + 150

      // Iterate from bottom to top to find the current section
      // This ensures we detect the most specific section first
      let currentSection = ""
      
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          
          // If we've scrolled past the top of this section, it's a candidate
          if (scrollPosition >= offsetTop) {
            currentSection = section
          }
        }
      }
      
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isScrolling])

  const navItems = [
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Certifications", id: "certifications" },
    { name: "Projects", id: "projects" },
    { name: "Experience", id: "experience" },
    { name: "Contact", id: "contact" },
  ]

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-1">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => scrollToSection(e, item.id)}
            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors relative ${
              activeSection === item.id
                ? "text-[#6366f1]"
                : "text-[#a0a0a0] hover:text-white hover:bg-[#1a1a1a]"
            }`}
          >
            {item.name}
            {activeSection === item.id && (
              <motion.span
                className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#6366f1]"
                layoutId="underline"
              />
            )}
          </a>
        ))}
      </div>

      {/* Mobile Navigation Button */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="text-[#a0a0a0] hover:text-white"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-[#0f0f0f]/95 z-50 md:hidden flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-4 text-[#a0a0a0] hover:text-white"
            >
              <X className="h-6 w-6" />
            </Button>

            <div className="flex flex-col items-center gap-6">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => scrollToSection(e, item.id)}
                  className={`text-2xl font-medium transition-colors ${
                    activeSection === item.id
                      ? "text-[#6366f1]"
                      : "text-[#a0a0a0] hover:text-white"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

