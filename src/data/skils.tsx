import { Code, Database, Server } from "lucide-react"

export const skills = {
    "Databases": {
      "itens": [
        {
          "name": "MongoDB",
          "Description": "Document-oriented database with flexible schema",
        },
        {
          "name": "PostgreSQL",
          "Description": "Advanced relational database with ACID compliance",
        },
        {
          "name": "Redis",
          "Description": "In-memory store for caching and real-time analytics",
        },
        {
          "name": "Elasticsearch",
          "Description": "Distributed search and analytics engine",
        },
      ],
      "icon": <Database className="h-6 w-6 text-[#6366f1]" />,
    },
    "Languages": {
      "itens": [
        {
          "name": "Go",
          "Description": "Statically typed language for concurrent programming",
        },
        {
          "name": "C#",
          "Description": "Object-oriented language for .NET applications",
        },
        {
          "name": "Python",
          "Description": "High-level language for scripting and automation",
        },
        {
          "name": "JavaScript",
          "Description": "Runtime environment for server-side applications",
        },
      ],
      "icon": <Code className="h-6 w-6 text-[#6366f1]" />,
    },
    "DevOps": {
      "itens": [
        {
          "name": "Docker",
          "Description": "Containerization platform for application packaging",
        },
        {
          "name": "Kubernetes",
          "Description": "Orchestration system for containerized applications",
        },
        {
          "name": "Git",
          "Description": "Distributed version control system",
        },
        {
          "name": "GitHub",
          "Description": "Platform for code collaboration and CI/CD pipelines",
        },
      ],
      "icon": <Server className="h-6 w-6 text-[#6366f1]" />,
    },
    "Frameworks": {
      "itens": [
        {
          "name": ".NET",
          "Description": "Framework for building cross-platform applications",
        },
        {
          "name": "ASP.NET",
          "Description": "Framework for building web applications",
        },
        {
          "name": "Next.js",
          "Description": "Framework for server-rendered React applications",
        }
      ],
      "icon": <Code className="h-6 w-6 text-[#6366f1]" />,
    }
  }
