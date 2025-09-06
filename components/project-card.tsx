"use client"

import Image from "next/image"
import { ExternalLink, Github } from "lucide-react"

export interface ProjectCardProps {
  title: string
  description: string
  image: string
  tags: string[]
  liveUrl: string
  githubUrl: string
}

export default function ProjectCard({ title, description, image, tags, liveUrl, githubUrl }: ProjectCardProps) {
  return (
    <article
      className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-card border border-border shadow-sm transform-gpu transition-all duration-300 ease-out will-change-[transform,box-shadow] hover:-translate-y-2 hover:scale-[1.05] hover:shadow-2xl hover:border-primary/50 hover:ring-2 hover:ring-primary/30 md:hover:scale-[1.06] md:hover:-translate-y-2.5 focus-within:shadow-2xl focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-primary/35 motion-reduce:transform-none"
    >
      <a
        href={liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <div className="relative w-full aspect-[16/10]">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            loading="lazy"
            decoding="async"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.07] motion-reduce:transform-none"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100" />
          {/* Subtle radial highlight for extra pop */}
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100" aria-hidden>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.18),transparent_60%)] mix-blend-overlay" />
          </div>
          {/* Soft glow ring on hover */}
          <div className="pointer-events-none absolute inset-0 rounded-xl ring-0 ring-primary/0 transition-all duration-300 ease-out group-hover:ring-2 group-hover:ring-primary/25" aria-hidden />
        </div>
      </a>
      <div className="p-4 sm:p-5">
        <h3 className="mb-1 text-base font-semibold sm:text-lg md:text-xl line-clamp-2">{title}</h3>
        <p className="mb-3 hidden text-sm text-muted-foreground sm:block line-clamp-2">{description}</p>
        <div className="mb-4 flex flex-wrap gap-2">
          {tags.slice(0, 4).map((tag) => (
            <span key={tag} className="rounded-full bg-primary px-2.5 py-1 text-xs font-medium text-white">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-2 sm:gap-3">
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary/90 px-3 py-1.5 text-xs font-medium text-white transition-all duration-150 hover:bg-primary hover:translate-x-0.5 active:scale-95"
          >
            <ExternalLink size={16} />
            <span className="hidden sm:inline">Live Demo</span>
            <span className="sm:hidden">Live</span>
          </a>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-foreground transition-all duration-150 hover:bg-muted/80 hover:translate-x-0.5 active:scale-95"
          >
            <Github size={16} />
            <span className="hidden sm:inline">Source</span>
            <span className="sm:hidden">Code</span>
          </a>
        </div>
      </div>
    </article>
  )
}
