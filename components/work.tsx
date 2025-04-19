"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import AnimatedCard from "./animated-card"

const projects = [
  {
    title: "KAI Website",
    description: "A fully responsive e-commerce platform built with Next.js and Tailwind CSS.",
    image: "/kai.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
    liveUrl: "https://kai-access-betaaga.vercel.app/",
    githubUrl: "https://github.com/Agaajmd/KAI-ACCESS",
  },
  {
    title: "Photography Picture",
    description: "A Picture i take.",
    image: "/gartenhutte.png",
    tags: ["Camera DsLR", "Photoshop", "Lightroom"],
    liveUrl: "https://www.instagram.com/p/Cz3JDdfr_3j/?igsh=MXJlZmJjcWdhejl2Zw==",
    githubUrl: "https://www.instagram.com/n.agaaa/?igsh=MW1yOGhkdmZjNjE3MA%3D%3D#",
  },
  {
    title: "Manual Book KAI WEB",
    description: "A productivity app for managing tasks and projects with team collaboration features.",
    image: "/manualBook.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    liveUrl: "https://manual-book-kai-accessagaaa.vercel.app/",
    githubUrl: "https://github.com/Agaajmd/manualBook-KAI_ACCESS",
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
