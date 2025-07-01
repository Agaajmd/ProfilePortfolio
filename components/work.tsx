"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import AnimatedCard from "./animated-card"

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
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section id="work" className="bg-secondary/30 dark:bg-secondary/10">
      <div className="section-container" ref={ref}>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          My Work
        </motion.h2>

        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Check out some of my recent projects
        </motion.p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {projects.map((project, index) => (
            <AnimatedCard
              key={project.title}
              title={project.title}
              description={project.description}
              image={project.image}
              tags={project.tags}
              liveUrl={project.liveUrl}
              githubUrl={project.githubUrl}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

