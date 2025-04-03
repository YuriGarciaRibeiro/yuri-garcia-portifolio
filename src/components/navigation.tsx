"use client"

import type React from "react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  // Function for smooth scrolling
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()

    const section = document.getElementById(sectionId)
    if (section) {
      // Smooth scroll to section
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })

      // Update URL with hash (optional)
      window.history.pushState({}, "", `#${sectionId}`)
      setActiveSection(sectionId)

      // Close mobile menu if open
      setIsOpen(false)
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
          section.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }, 100)
      }
    }

    // Add scroll event listener to update active section
    const handleScroll = () => {
      const sections = ["about", "skills", "projects", "experience", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    {name : "Certifications", id: "certifications"},
    { name: "Projects", id: "projects" },
    { name: "Experience", id: "experience" },
    { name: "Contact", id: "contact" },
  ]

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-6">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant="link"
            className={`${
              activeSection === item.id ? "text-[#6366f1] font-medium" : "text-[#a0a0a0] hover:text-white"
            } relative`}
          >
            <a href={`#${item.id}`} onClick={(e) => scrollToSection(e, item.id)}>
              {item.name}
              {activeSection === item.id && (
                <motion.span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#6366f1]" layoutId="underline" />
              )}
            </a>
          </Button>
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

            <div className="flex flex-col items-center gap-8">
              {navItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.indexOf(item) * 0.1 }}
                >
                  <Button
                    variant="link"
                    className={`text-2xl ${
                      activeSection === item.id ? "text-[#6366f1] font-medium" : "text-[#a0a0a0] hover:text-white"
                    }`}
                  >
                    <a href={`#${item.id}`} onClick={(e) => scrollToSection(e, item.id)}>
                      {item.name}
                    </a>
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

