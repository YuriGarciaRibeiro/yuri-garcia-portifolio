"use client"

import type { ReactNode } from "react"

interface TextGradientProps {
  children: ReactNode
  className?: string
  from?: string
  to?: string
}

export default function TextGradient({
  children,
  className = "",
  from = "#6366f1",
  to = "#8b5cf6",
}: TextGradientProps) {
  return (
    <span
      className={`bg-clip-text text-transparent bg-gradient-to-r ${className}`}
      style={{ backgroundImage: `linear-gradient(to right, ${from}, ${to})` }}
    >
      {children}
    </span>
  )
}

