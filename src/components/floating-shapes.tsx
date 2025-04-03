"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Shape {
  id: number
  x: number
  y: number
  size: number
  rotation: number
  duration: number
  delay: number
  type: "square" | "circle" | "triangle" | "hexagon"
  color: string
}

export default function FloatingShapes() {
  const [shapes, setShapes] = useState<Shape[]>([])

  useEffect(() => {
    // Generate random shapes
    const newShapes: Shape[] = []
    const count = window.innerWidth < 768 ? 8 : 15

    const colors = [
      "rgba(99, 102, 241, 0.1)", // Indigo
      "rgba(139, 92, 246, 0.1)", // Purple
      "rgba(236, 72, 153, 0.1)", // Pink
      "rgba(34, 197, 94, 0.1)", // Green
    ]

    for (let i = 0; i < count; i++) {
      newShapes.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 60 + 20,
        rotation: Math.random() * 360,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 5,
        type: ["square", "circle", "triangle", "hexagon"][Math.floor(Math.random() * 4)] as "square" | "circle" | "triangle" | "hexagon",
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    setShapes(newShapes)
  }, [])

  const renderShape = (shape: Shape) => {
    switch (shape.type) {
      case "square":
        return (
          <div
            style={{
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              backgroundColor: shape.color,
              borderRadius: "4px",
            }}
          />
        )
      case "circle":
        return (
          <div
            style={{
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              backgroundColor: shape.color,
              borderRadius: "50%",
            }}
          />
        )
      case "triangle":
        return (
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: `${shape.size / 2}px solid transparent`,
              borderRight: `${shape.size / 2}px solid transparent`,
              borderBottom: `${shape.size}px solid ${shape.color}`,
            }}
          />
        )
      case "hexagon":
        return (
          <div style={{ position: "relative" }}>
            <svg width={shape.size} height={shape.size * 0.866} viewBox="0 0 100 86.6">
              <polygon points="50 0, 100 25, 100 75, 50 100, 0 75, 0 25" fill={shape.color} />
            </svg>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
          }}
          animate={{
            y: ["0%", "100%"],
            x: [`${shape.x}%`, `${shape.x + (Math.random() * 20 - 10)}%`],
            rotate: [shape.rotation, shape.rotation + 360],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          {renderShape(shape)}
        </motion.div>
      ))}
    </div>
  )
}

