"use client"

import Image from "next/image"
import { ExternalLink, Github, Share2 } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { useState } from "react"
import { resolveProjectImagePath } from "@/lib/projects"

export interface ProjectCardProps {
  title: string
  description: string
  image: string
  tags: string[]
  liveUrl: string
  githubUrl: string
  slug: string
}

export default function ProjectCard({ title, description, image, tags, liveUrl, githubUrl, slug }: ProjectCardProps) {
  const { t } = useLanguage()
  const [copied, setCopied] = useState(false)
  const normalizedImage = resolveProjectImagePath(image || "/placeholder.svg")

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/work/${slug}`

    try {
      if (navigator.share) {
        await navigator.share({
          title: `${title} | Nur Jagad Muhammad Dani`,
          text: description,
          url: shareUrl,
        })
        return
      }

      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.alert(t.work.shareError)
    }
  }

  return (
    <article
      className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border shadow-sm transform-gpu transition-all duration-300 ease-out will-change-[transform,box-shadow] hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:border-primary/50 hover:ring-2 hover:ring-primary/30 md:hover:scale-[1.03] md:hover:-translate-y-2.5 focus-within:shadow-2xl focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-primary/35 motion-reduce:transform-none"
    >
      {/* Full background image */}
      <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] overflow-hidden">
        <button
          type="button"
          className="absolute right-3 top-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm border border-white/30 sm:hidden"
          onClick={(e) => {
            e.stopPropagation()
            void handleShare()
          }}
          aria-label={copied ? t.work.copied : t.work.share}
          title={copied ? t.work.copied : t.work.share}
        >
          <Share2 size={15} />
        </button>

        <Image
          src={normalizedImage}
          alt={title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          quality={72}
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
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary p-0 text-xs font-medium text-white transition-all duration-150 hover:bg-primary/90 active:scale-95 z-10 sm:h-auto sm:w-auto sm:gap-1.5 sm:px-4 sm:py-2 sm:text-sm"
              onClick={(e) => e.stopPropagation()}
              aria-label={t.work.live}
            >
              <ExternalLink size={14} className="sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">{t.work.live}</span>
            </a>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30 p-0 text-xs font-medium text-white transition-all duration-150 hover:bg-white/30 active:scale-95 z-10 sm:h-auto sm:w-auto sm:gap-1.5 sm:px-4 sm:py-2 sm:text-sm"
              onClick={(e) => e.stopPropagation()}
              aria-label={t.work.code}
            >
              <Github size={14} className="sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">{t.work.code}</span>
            </a>
            <button
              type="button"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 text-sm font-medium text-white transition-all duration-150 hover:bg-white/30 active:scale-95 z-10"
              onClick={(e) => {
                e.stopPropagation()
                void handleShare()
              }}
              aria-label={t.work.share}
            >
              <Share2 size={14} className="sm:w-4 sm:h-4" />
              <span>{copied ? t.work.copied : t.work.share}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
