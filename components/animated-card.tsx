"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ExternalLink, Github } from "lucide-react"
import { useState } from "react"

interface AnimatedCardProps {
  title: string
  description: string
  image: string
  tags: string[]
  liveUrl: string
  githubUrl: string
  index: number
}

export default function AnimatedCard({
  title,
  description,
  image,
  tags,
  liveUrl,
  githubUrl,
  index,
}: AnimatedCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.article
      className="group overflow-hidden rounded-xl bg-card shadow-md transition-shadow hover:shadow-lg dark:bg-card/80"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.3, delay: 0.06 + index * 0.04, ease: "easeOut" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative aspect-[16/10] w-full">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
      </div>

      <div className="p-4 sm:p-5">
        <h3 className="mb-1 text-base font-semibold sm:text-lg md:text-xl">
          {title}
        </h3>
        <p className="mb-3 hidden text-sm text-muted-foreground sm:block">
          {description}
        </p>
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
            className="inline-flex items-center gap-1.5 rounded-full bg-primary/90 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-primary"
          >
            <ExternalLink size={16} />
            <span className="hidden sm:inline">Live Demo</span>
          </a>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted/80"
          >
            <Github size={16} />
            <span className="hidden sm:inline">Source</span>
          </a>
        </div>
      </div>
    </motion.article>
  )
}
