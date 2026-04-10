"use client"

import { useRef } from "react"
import ProjectCard from "@/components/project-card"
import dynamic from "next/dynamic"
import { projects } from "@/lib/projects"
import { useLanguage } from "@/components/language-provider"

const PhotographyCarousel = dynamic(
  () => import("@/components/photography-carousel"),
  {
    ssr: false,
    loading: () => (
      <div className="mt-6 h-48 w-full rounded-lg bg-neutral-100 dark:bg-neutral-800 animate-pulse" />
    ),
  }
)

export default function Work() {
  const ref = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const { t } = useLanguage()

  return (
  <section id="work" className="bg-secondary/30 dark:bg-secondary/10" ref={ref}>
      <div className="section-container" ref={containerRef}>
        <h2 className="section-title">{t.work.title}</h2>
        <p className="section-subtitle">{t.work.subtitle}</p>

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
              slug={project.slug}
            />
          ))}
        </div>

        {/* Photography Section */}
        <div className="mt-16 md:mt-20 mb-4 md:mb-6">
          <h2 className="section-title">{t.work.photography}</h2>
          <p className="section-subtitle">{t.work.photographySubtitle}</p>
          <PhotographyCarousel />
        </div>
      </div>
    </section>
  )
}

