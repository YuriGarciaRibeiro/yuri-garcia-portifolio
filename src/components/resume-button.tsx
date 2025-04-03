"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Check, FileDown, Loader2 } from "lucide-react"
import { useState } from "react"

interface ResumeButtonProps {
  resumeUrl: string
  className?: string
}

export default function ResumeButton({ resumeUrl, className = "" }: ResumeButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const [isDownloaded, setIsDownloaded] = useState(false)

  const handleDownload = async () => {
    setIsDownloading(true)

    try {
      // Create a link element
      const link = document.createElement("a")
      link.href = resumeUrl
      link.download = "Yuri_Garcia_Resume.pdf" // Set the filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Show success state
      setIsDownloaded(true)
      setTimeout(() => setIsDownloaded(false), 3000)
    } catch (error) {
      console.error("Download failed:", error)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        variant="outline"
        onClick={handleDownload}
        disabled={isDownloading}
        className={`border-[#333] text-[#a0a0a0] hover:text-white hover:border-[#6366f1] ${className}`}
      >
        {isDownloading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Downloading...
          </>
        ) : isDownloaded ? (
          <>
            <Check className="mr-2 h-4 w-4 text-green-500" />
            Downloaded
          </>
        ) : (
          <>
            <FileDown className="mr-2 h-4 w-4" />
            Download Resume
          </>
        )}
      </Button>
    </motion.div>
  )
}

