"use client"

import type React from "react"

import { motion } from "framer-motion"
import { type ReactNode, useState } from "react"

interface CardHoverEffectProps {
  children: ReactNode
  className?: string
}

export default function CardHoverEffect({ children, className = "" }: CardHoverEffectProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -5 }}
    >
      {/* Gradient spotlight effect */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.4) 0%, rgba(0, 0, 0, 0) 60%)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
        />
      )}

      {/* Border glow effect */}
      <motion.div
        className="absolute inset-0 rounded-lg pointer-events-none"
        style={{
          boxShadow: isHovered ? "0 0 0 1px rgba(99, 102, 241, 0.3)" : "none",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
      />

      {children}
    </motion.div>
  )
}

