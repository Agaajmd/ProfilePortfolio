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
      className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border shadow-sm transform-gpu transition-all duration-300 ease-out will-change-[transform,box-shadow] hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:border-primary/50 hover:ring-2 hover:ring-primary/30 md:hover:scale-[1.03] md:hover:-translate-y-2.5 focus-within:shadow-2xl focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-primary/35 motion-reduce:transform-none"
    >
      {/* Full background image */}
      <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          loading="lazy"
          decoding="async"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.1] motion-reduce:transform-none"
        />
        
        {/* Gradient overlay for text readability - always visible */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        
        {/* Hover overlay - darkens more on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 ease-out" />

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5 md:p-6">
          {/* Tags */}
          <div className="mb-3 flex flex-wrap gap-1.5 sm:gap-2">
            {tags.slice(0, 3).map((tag) => (
              <span 
                key={tag} 
                className="rounded-full bg-white/20 backdrop-blur-sm px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium text-white border border-white/20"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="mb-2 text-lg sm:text-xl md:text-2xl font-bold text-white line-clamp-2">
            {title}
          </h3>

          {/* Description - hidden on small screens */}
          <p className="mb-4 hidden sm:block text-xs sm:text-sm text-white/90 line-clamp-2">
            {description}
          </p>

          {/* Buttons */}
          <div className="flex gap-2 sm:gap-3">
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full bg-primary px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white transition-all duration-150 hover:bg-primary/90 hover:scale-105 active:scale-95 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={14} className="sm:w-4 sm:h-4" />
              <span>Live</span>
            </a>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white transition-all duration-150 hover:bg-white/30 hover:scale-105 active:scale-95 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={14} className="sm:w-4 sm:h-4" />
              <span>Code</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  )
}
