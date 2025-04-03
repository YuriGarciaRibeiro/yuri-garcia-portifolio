"use client"

import { useEffect, useRef } from "react"

export default function SubtleGradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight * 3 // Make it taller to cover the whole page
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create gradient
    const createGradient = () => {
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 3,
        0,
        canvas.width / 2,
        canvas.height / 3,
        canvas.width * 0.8,
      )

      // Subtle indigo/purple gradient
      gradient.addColorStop(0, "rgba(99, 102, 241, 0.03)")
      gradient.addColorStop(0.5, "rgba(79, 70, 229, 0.02)")
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

      return gradient
    }

    // Draw the gradient
    const drawGradient = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = createGradient()
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    drawGradient()
    window.addEventListener("resize", drawGradient)

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      window.removeEventListener("resize", drawGradient)
    }
  }, [])

  return (
    <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" aria-hidden="true" />
  )
}

