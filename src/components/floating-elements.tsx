"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface FloatingElement {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  type: "code" | "data" | "star"
}

export default function FloatingElements() {
  const [elements, setElements] = useState<FloatingElement[]>([])

  useEffect(() => {
    // Generate random floating elements
    const newElements: FloatingElement[] = []
    const count = window.innerWidth < 768 ? 15 : 30

    for (let i = 0; i < count; i++) {
      newElements.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 20 + 5,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
        type: ["code", "data", "star"][Math.floor(Math.random() * 3)] as "code" | "data" | "star",
      })
    }

    setElements(newElements)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
          }}
          animate={{
            y: ["0%", "100%"],
            x: [`${element.x}%`, `${element.x + (Math.random() * 20 - 10)}%`],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          {element.type === "code" && (
            <div
              className="text-[#81c784] dark:text-[#388e3c] opacity-60 transform rotate-45"
              style={{ fontSize: `${element.size}px` }}
            >
              {"{ }"}
            </div>
          )}

          {element.type === "data" && (
            <div
              className="rounded-full bg-white dark:bg-[#ffccbc] opacity-40"
              style={{
                width: `${element.size / 2}px`,
                height: `${element.size / 2}px`,
                boxShadow: "0 0 10px 2px rgba(255, 255, 255, 0.3)",
              }}
            ></div>
          )}

          {element.type === "star" && (
            <div
              className="text-[#ffd54f] dark:text-[#ffca28] opacity-70"
              style={{ fontSize: `${element.size / 2}px` }}
            >
              ✨
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}

