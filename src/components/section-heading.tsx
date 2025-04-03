"use client"

import { motion } from "framer-motion"

interface SectionHeadingProps {
  title: string
  subtitle?: string
  alignment?: "left" | "center"
  className?: string
}

export default function SectionHeading({ title, subtitle, alignment = "left", className = "" }: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${alignment === "center" ? "text-center" : ""} ${className}`}>
      <motion.h2
        className={`text-3xl font-bold text-white ${alignment === "left" ? "border-l-4 border-[#6366f1] pl-4" : ""}`}
        initial={{ opacity: 0, x: alignment === "left" ? -20 : 0, y: alignment === "center" ? -20 : 0 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          className="text-[#a0a0a0] max-w-2xl mt-4 mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

