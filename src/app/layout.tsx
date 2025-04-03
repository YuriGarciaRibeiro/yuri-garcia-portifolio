import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import type React from "react"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Yuri Garcia | Back-End Developer",
  description:
    "Professional portfolio of Yuri Garcia, a Back-End Developer specializing in scalable APIs, microservices, and financial systems integration.",
  keywords: [
    "Back-End Developer",
    "Software Engineer",
    "API Development",
    "Microservices",
    ".NET",
    "Python",
    "Go",
    "Docker",
    "Kubernetes",
  ],
  authors: [{ name: "Yuri Garcia", url: "https://github.com/YuriGarciaRibeiro" }],
  creator: "Yuri Garcia",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yurigarcia.dev",
    title: "Yuri Garcia | Back-End Developer",
    description:
      "Professional portfolio of Yuri Garcia, a Back-End Developer specializing in scalable APIs, microservices, and financial systems integration.",
    siteName: "Yuri Garcia Portfolio",
    images: [
      {
        url: "https://avatars.githubusercontent.com/u/81641949",
        width: 800,
        height: 600,
        alt: "Yuri Garcia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yuri Garcia | Back-End Developer",
    description:
      "Professional portfolio of Yuri Garcia, a Back-End Developer specializing in scalable APIs, microservices, and financial systems integration.",
    images: ["https://avatars.githubusercontent.com/u/81641949"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  )
}

