export interface Project {
  title: string
  description: string
  longDescription?: string
  image: string
  tags: string[]
  link: string
  demo: string
  featured?: boolean
  status?: "completed" | "in-progress" | "planned"
  githubStats?: {
    stars?: number
    forks?: number
    lastUpdated?: string
  }
}

export const projects: Project[] = [
  {
    title: "Csharp easy class",
    description: "VSCode extension for C# code generation.",
    longDescription:
      "A Visual Studio Code extension that simplifies C# development by providing intuitive code generation tools. It helps developers create classes, interfaces, and other C# constructs with minimal effort, improving productivity and reducing boilerplate code.",
    image: "https://placehold.co/800?text=Csharp+easy+class&font=roboto",
    tags: ["Typescript", "VSCode Extension", "Developer Tools"],
    link: "https://github.com/YuriGarciaRibeiro/csharp-easy-class",
    demo: "",
    featured: true,
    status: "completed",

  },
  {
    title: "ZipZop Chat",
    description: "A chat application built with Next and Golang.",
    longDescription:
      "A real-time chat application that leverages the power of Next.js for the frontend and Golang for the backend. Features include instant messaging, user authentication, message history, and WebSocket integration for real-time communication.",
    image: "https://placehold.co/800?text=ZipZop+Chat&font=roboto",
    tags: ["Golang", "Nextjs", "WebSocket", "Real-time", "Authentication"],
    link: "https://github.com/YuriGarciaRibeiro/zipzop-chat",
    demo: "",
    featured: true,
    status: "in-progress",
  },
  {
    title: "URL Shortener",
    description: "A URL shortener built with Golang.",
    longDescription:
      "A high-performance URL shortening service built with Golang and PostgreSQL. It generates short, unique URLs for long web addresses, tracks click analytics, and provides an API for integration with other services.",
    image: "https://placehold.co/800?text=URL+Shortener&font=roboto",
    tags: ["Golang", "PostgreSQL", "API", "Web Service"],
    link: "https://github.com/YuriGarciaRibeiro/url-shortener",
    demo: "",
    status: "completed",
  },
  {
    title: "Yuri Garcia Portfolio",
    description: "My personal portfolio built with Next.js.",
    longDescription:
      "A modern, responsive portfolio website built with Next.js and Tailwind CSS. Features include dark mode, animations, and a clean, professional design that showcases my projects, skills, and professional experience.",
    image: "https://placehold.co/800?text=Yuri+Garcia+Portfolio&font=roboto",
    tags: ["Nextjs", "Tailwind CSS", "Framer Motion", "Responsive Design"],
    link: "https://github.com/YuriGarciaRibeiro/github-profile",
    demo: "",
    status: "completed",
  },
  {
    title: "TCC",
    description: "My Bachelor's Capstone Project.",
    longDescription:
      "An innovative facial animation system that converts audio input into realistic facial expressions. Built using Python for audio processing, OpenFace for facial landmark detection, and Unreal Engine for rendering the final animations.",
    image: "https://placehold.co/800?text=TCC&font=roboto",
    tags: ["Python", "Audio2Face", "OpenFace", "Unreal Engine", "Machine Learning"],
    link: "https://github.com/YuriGarciaRibeiro/TCC",
    demo: "",
    featured: true,
    status: "in-progress",
  },
  {
    title: "Project Templates",
    description: "Clean Architecture and Production-Ready Project Templates.",
    longDescription:
      "A curated collection of professional project templates focused on clean architecture, modularity, and real-world development practices. Featuring ASP.NET Core APIs with Hexagonal Architecture, Minimal APIs, Auth Services, and Next.js frontends. Designed to speed up development and enforce solid engineering standards.",
    image: "https://placehold.co/800x400?text=Templates&font=roboto",
    tags: ["ASP.NET Core", "Hexagonal Architecture", "MediatR", "FluentValidation", "Next.js", "Clean Architecture"],
    link: "https://github.com/YuriGarciaRibeiro/project-templates",
    demo: "",
    featured: true,
    status: "in-progress",
  }  
]

