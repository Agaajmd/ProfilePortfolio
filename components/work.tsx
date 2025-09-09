"use client"

import { useRef } from "react"
import ProjectCard from "@/components/project-card"
import PhotographyCarousel from "@/components/photography-carousel"

const projects = [
  {
    title: "Aga Game Station",
    description: "A fully responsive booking system, built with Next.js and Tailwind CSS.",
    image: "/WORK/agagameS.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://aga-game-station02.vercel.app/",
    githubUrl: "https://github.com/Agaajmd/",
  },
  {
    title: "KAI Website",
    description: "A fully responsive e-commerce platform built with Next.js and Tailwind CSS.",
    image: "/WORK/kai.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma"],
    liveUrl: "https://kai-access-betaaga.vercel.app/",
    githubUrl: "https://github.com/Agaajmd/KAI-ACCESS",
  },
  {
    title: "Manual Book KAI WEB",
    description: "A productivity app for managing tasks and projects with team collaboration features.",
    image: "/WORK/manualBook.png",
    tags: ["HTML", "CSS"],
    liveUrl: "https://manual-book-kai-accessagaaa.vercel.app/",
    githubUrl: "https://github.com/Agaajmd/manualBook-KAI_ACCESS",
  },
  {
    title: "System Order Online",
    description: "A system for managing online orders and payments at the table.",
    image: "/WORK/Afif coffe.png",
    tags: ["next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://afif-order-by-table.vercel.app/",
    githubUrl: "https://github.com/Agaajmd",
  },
  {
    title: "Cafe Order by Table",
    description: "A system for admin and user managing online orders and payments at the table.",
    image: "/WORK/Afif Cafe.png",
    tags: ["next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://afif-coffee.vercel.app/",
    githubUrl: "https://github.com/Agaajmd",
  },
  {
    title: "E-Commerce",
    description: "A store Take A Riz.",
    image: "/WORK/Take A RIz.png",
    tags: ["Next.js", "TypeScript", "CSS"],
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

        {/* Photography Section */}
        <div className="mt-16 md:mt-20 mb-4 md:mb-6">
          <h3 className="section-title">Photography</h3>
          <p className="section-subtitle">Explore my photography collection</p>
          <PhotographyCarousel />
        </div>
      </div>
    </section>
  )
}

