"use client"

import { useRef } from "react"
import ProjectCard from "./project-card"

const projects = [
  {
    title: "Aga Game Station",
    description: "A fully responsive booking system, built with Next.js and Tailwind CSS.",
    image: "/agagameS.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://aga-game-station02.vercel.app/",
    githubUrl: "https://github.com/Agaajmd/",
  },
  {
    title: "KAI Website",
    description: "A fully responsive e-commerce platform built with Next.js and Tailwind CSS.",
    image: "/kai.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma"],
    liveUrl: "https://kai-access-betaaga.vercel.app/",
    githubUrl: "https://github.com/Agaajmd/KAI-ACCESS",
  },
  {
    title: "Manual Book KAI WEB",
    description: "A productivity app for managing tasks and projects with team collaboration features.",
    image: "/manualBook.png",
    tags: ["HTML", "CSS"],
    liveUrl: "https://manual-book-kai-accessagaaa.vercel.app/",
    githubUrl: "https://github.com/Agaajmd/manualBook-KAI_ACCESS",
  },
  {
    title: "System Order Online",
    description: "A system for managing online orders and payments at the table.",
    image: "/Afif coffe.png",
    tags: ["next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://afif-order-by-table.vercel.app/",
    githubUrl: "https://github.com/Agaajmd",
  },
  {
    title: "Cafe Order by Table",
    description: "A system for admin and user managing online orders and payments at the table.",
    image: "/Afif Cafe.png",
    tags: ["next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://afif-coffee.vercel.app/",
    githubUrl: "https://github.com/Agaajmd",
  },
  {
    title: "E-Commerce",
    description: "A store Take A Riz.",
    image: "/Take A RIz.png",
    tags: ["Next.js", "TypeScript", "CSS", "Weather API"],
    liveUrl: "https://take-a-riz-e-commerce.vercel.app/",
    githubUrl: "https://github.com/Agaajmd/TakeARizStore",
  },
]

export default function Work() {
  const ref = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  return (
  <section id="work" className="bg-secondary/30 dark:bg-secondary/10" ref={ref}>
      <div className="section-container" ref={containerRef}>
        <h2 className="section-title">My Work</h2>
        <p className="section-subtitle">Check out some of my recent projects</p>

        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:grid-cols-3 lg:gap-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              image={project.image}
              tags={project.tags}
              liveUrl={project.liveUrl}
              githubUrl={project.githubUrl}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

