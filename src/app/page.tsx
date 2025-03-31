import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, Mail } from "lucide-react"
import ProjectCard from "@/components/project-card"
import TechStack from "@/components/tech-stack"
import { skills } from "@/data/skils"
import { projects } from "@/data/projects"
import ExperienceTimeline from "@/components/experience-timeline"
import { FaWhatsapp } from "react-icons/fa";
import Navigation from "@/components/navigation"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0f0f0f] text-[#e0e0e0]">
      {/* Navigation */}
      <nav className="container mx-auto py-6 px-4 flex justify-between items-center border-b border-[#1f1f1f]">
        <div className="text-xl font-bold text-white">
          <span className="text-[#6366f1]">Dev</span> Yuri Garcia
        </div>
        <Navigation />
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-[#1f1f1f] bg-[#1a1a1a]">
              <Image
                src="https://avatars.githubusercontent.com/u/81641949"
                alt="Profile"
                width={150}
                height={150}
                className="object-cover"
              />
            </div>

            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Back-End <span className="text-[#6366f1]">Developer</span>
              </h1>

              <p className="text-lg text-[#a0a0a0] max-w-2xl">
                Specialist in systems architecture, APIs and databases. Building the invisible infrastructure
                that supports modern applications.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <Button className="bg-[#6366f1] hover:bg-[#4f46e5] text-white">See Projects</Button>
            <Button variant="outline" className="border-[#333] text-[#a0a0a0] hover:text-white hover:border-[#6366f1]">
              Contact
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-[#0a0a0a]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-white border-l-4 border-[#6366f1] pl-4">About Me</h2>

            <div className="space-y-4 text-[#a0a0a0]">
              <p>
                Back-end developer with experience in designing and implementing scalable systems, robust APIs and
                microservices architectures. Specialized in creating efficient solutions to complex problems.
              </p>

              <p>
                My approach combines solid software engineering principles with modern development best practices. I constantly seek to improve my knowledge and explore new technologies to create more efficient and secure systems.
              </p>

              <p>
                When I&apos;m not coding, I spend my time studying distributed systems architectures,
                database optimization, and application security.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-white border-l-4 border-[#6366f1] pl-4 max-w-3xl mx-auto">
          Technical Skills
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {Object.entries(skills).map(([category, data]) => (
            <div key={category} className="bg-[#1a1a1a] p-6 rounded-lg border border-[#2a2a2a]">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-[#6366f1]/10 h-12 w-12 rounded-lg flex items-center justify-center">
                  {data.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{category}</h3>
              </div>
              <ul className="space-y-3 text-[#a0a0a0]">
                {data.itens.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-[#6366f1] font-bold">•</span>
                    <div>
                      <span>{item.name} - <span className="text-[#7a7a7a]">{item.Description}</span></span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          
        </div>
          <div className="mt-16 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-8 text-white">Technology Stack</h3>
            <TechStack />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-[#0a0a0a]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-white border-l-4 border-[#6366f1] pl-4 max-w-3xl mx-auto">
            Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

            {
              projects.map((project, index) => (
                <ProjectCard
                  key={index}
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  tags={project.tags}
                  link={project.link}
                  demo={project.demo}
                />
              ))
            }

          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-[#0a0a0a]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-white border-l-4 border-[#6366f1] pl-4 max-w-3xl mx-auto">
            Profissional Experience
          </h2>
          
          <div className="max-w-5xl mx-auto">
            <ExperienceTimeline />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-white border-l-4 border-[#6366f1] pl-4">Contact</h2>

            <div className="bg-[#1a1a1a] rounded-lg p-8 border border-[#2a2a2a]">
              <form 
                className="space-y-6" 
                action="mailto:yurirgarciar@gmail.com?subject=Contact%20from%20Portfolio" 
                method="POST"
                encType="text/plain"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-white">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-3 rounded-lg border border-[#333] bg-[#0f0f0f] text-white focus:ring-2 focus:ring-[#6366f1] focus:border-transparent"
                      placeholder="Complete Name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-white">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-3 rounded-lg border border-[#333] bg-[#0f0f0f] text-white focus:ring-2 focus:ring-[#6366f1] focus:border-transparent"
                      placeholder="YourEmail@gmail.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-white">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-[#333] bg-[#0f0f0f] text-white focus:ring-2 focus:ring-[#6366f1] focus:border-transparent"
                    placeholder="Describe your project or proposal..."
                    required
                  ></textarea>
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-[#6366f1] hover:bg-[#4f46e5] text-white py-3"
                >
                  Send Message
                </Button>
              </form>
            </div>

            <div className="mt-12 flex justify-center gap-6">
              <Link href={"https://github.com/YuriGarciaRibeiro"} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-lg h-12 w-12 border-[#333] hover:border-[#6366f1] hover:bg-[#6366f1]/10"
                >
                  <Github className="h-5 w-5 text-[#a0a0a0] group-hover:text-white" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </Link>

              <Link href={"https://www.linkedin.com/in/yurigarciaribeiro/"} target="_blank" rel="noopener noreferrer" >
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-lg h-12 w-12 border-[#333] hover:border-[#6366f1] hover:bg-[#6366f1]/10"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-[#a0a0a0]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                  <span className="sr-only">LinkedIn</span>
                </Button>
              </Link>

              <a href="mailto:yurirgarciar@gmail.com" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-lg h-12 w-12 border-[#333] hover:border-[#6366f1] hover:bg-[#6366f1]/10"
                >
                    <Mail className="h-5 w-5 text-[#a0a0a0]" />
                    <span className="sr-only">Email</span>
                </Button>
              </a>
              
              <Link href="https://wa.me/5579988636388" 
                  target="_blank" 
                  rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-lg h-12 w-12 border-[#333] hover:border-[#6366f1] hover:bg-[#6366f1]/10"
                >
                  <FaWhatsapp className="h-5 w-5 text-[#a0a0a0] group-hover:text-white" />
                  <span className="sr-only">Whatsapp</span>
                </Button>
              </Link>


            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-[#666] border-t border-[#1f1f1f]">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} | Back-End Developer</p>
        </div>
      </footer>
    </main>
  )
}

