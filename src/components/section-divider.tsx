"use client"

import { motion } from "framer-motion"

interface SectionDividerProps {
  className?: string
  variant?: "wave" | "angle" | "curve" | "triangle"
}

export default function SectionDivider({ className = "", variant = "wave" }: SectionDividerProps) {
  // SVG paths for different divider styles
  const dividerPaths = {
    wave: "M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
    angle: "M0,160L1440,32L1440,320L0,320Z",
    curve: "M0,224L1440,96L1440,320L0,320Z",
    triangle: "M720,320L1440,320L0,320Z",
  }

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <svg
        preserveAspectRatio="none"
        viewBox="0 0 1440 320"
        className="w-full h-16 md:h-24 -mb-1 text-[#0a0a0a] dark:text-[#0f0f0f]"
        fill="currentColor"
      >
        <motion.path
          initial={{ opacity: 0, pathLength: 0 }}
          whileInView={{ opacity: 1, pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeInOut" }}
          d={dividerPaths[variant]}
        />
      </svg>
    </div>
  )
}

