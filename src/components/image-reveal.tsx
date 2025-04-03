"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface ImageRevealProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
}

export default function ImageReveal({ src, alt, width, height, className = "" }: ImageRevealProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 bg-[#6366f1] z-10"
        initial={{ x: 0 }}
        whileInView={{ x: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          className={`object-cover ${className}`}
        />
      </motion.div>
    </div>
  )
}

