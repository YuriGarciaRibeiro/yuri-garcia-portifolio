"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import Image from "next/image"

interface Testimonial {
  name: string
  role: string
  company: string
  image: string
  text: string
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      name: "Ana Silva",
      role: "Project Manager",
      company: "Banese",
      image: "/placeholder.svg?height=100&width=100",
      text: "Yuri's backend development skills were instrumental in our Mastercard integration project. His attention to detail and ability to architect secure, scalable systems made a significant impact on our success.",
    },
    {
      name: "Carlos Mendes",
      role: "CTO",
      company: "Protech Solutions",
      image: "/placeholder.svg?height=100&width=100",
      text: "Working with Yuri has been a pleasure. His deep knowledge of .NET and microservices architecture helped us deliver complex financial solutions on time and with exceptional quality.",
    },
    {
      name: "Mariana Costa",
      role: "Senior Developer",
      company: "Banese Labs",
      image: "/placeholder.svg?height=100&width=100",
      text: "Yuri's innovative approach to problem-solving and his expertise in automation technologies transformed our internal processes. His contributions continue to save us countless hours of manual work.",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="relative">
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
        <motion.button
          onClick={prevTestimonial}
          className="bg-[#1a1a1a] p-2 rounded-full border border-[#333] hover:border-[#6366f1] hover:bg-[#6366f1]/10 text-white"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="h-5 w-5" />
        </motion.button>
      </div>

      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
        <motion.button
          onClick={nextTestimonial}
          className="bg-[#1a1a1a] p-2 rounded-full border border-[#333] hover:border-[#6366f1] hover:bg-[#6366f1]/10 text-white"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="h-5 w-5" />
        </motion.button>
      </div>

      <div className="overflow-hidden px-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] p-8 relative"
          >
            <Quote className="absolute top-6 left-6 h-8 w-8 text-[#6366f1]/20" />

            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#6366f1] flex-shrink-0">
                <Image
                  src={testimonials[currentIndex].image || "/placeholder.svg"}
                  alt={testimonials[currentIndex].name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <p className="text-[#a0a0a0] mb-4 italic relative z-10">{testimonials[currentIndex].text}</p>

                <div>
                  <h4 className="font-bold text-white">{testimonials[currentIndex].name}</h4>
                  <p className="text-sm text-[#6366f1]">
                    {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full ${index === currentIndex ? "bg-[#6366f1]" : "bg-[#333]"}`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

