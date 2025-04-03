"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function AnimatedCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    const mouseDown = () => setCursorVariant("click")
    const mouseUp = () => setCursorVariant("default")

    const handleLinkHover = () => setCursorVariant("hover")
    const handleLinkLeave = () => setCursorVariant("default")

    window.addEventListener("mousemove", mouseMove)
    window.addEventListener("mousedown", mouseDown)
    window.addEventListener("mouseup", mouseUp)

    // Add hover effect to all links and buttons
    const links = document.querySelectorAll("a, button")
    links.forEach((link) => {
      link.addEventListener("mouseenter", handleLinkHover)
      link.addEventListener("mouseleave", handleLinkLeave)
    })

    return () => {
      window.removeEventListener("mousemove", mouseMove)
      window.removeEventListener("mousedown", mouseDown)
      window.removeEventListener("mouseup", mouseUp)

      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleLinkHover)
        link.removeEventListener("mouseleave", handleLinkLeave)
      })
    }
  }, [])

  const variants = {
    default: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      height: 16,
      width: 16,
      backgroundColor: "rgba(99, 102, 241, 0.5)",
      mixBlendMode: "difference" as const,
    },
    hover: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(99, 102, 241, 0.8)",
      mixBlendMode: "difference" as const,
    },
    click: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      height: 16,
      width: 16,
      backgroundColor: "rgba(99, 102, 241, 1)",
      mixBlendMode: "difference" as const,
    },
  }

  // Only show custom cursor on non-touch devices
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(hover: none)").matches)
  }, [])

  if (isTouchDevice) return null

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-50"
      variants={variants}
      animate={cursorVariant}
      transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
    />
  )
}

