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
    <motion.div
      className="group relative h-[450px] overflow-hidden rounded-xl bg-card shadow-xl transition-all hover:shadow-2xl dark:bg-card/80"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.8,
        delay: 0.2 + index * 0.15,
        type: "spring",
        stiffness: 50,
        damping: 15,
      }}
      whileHover={{
        y: -10,
        transition: { duration: 0.3, type: "spring", stiffness: 300, damping: 15 },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        perspective: "1000px",
      }}
    >
      <motion.div
        className="absolute inset-0 z-10 flex flex-col justify-end p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0.7 }}
          transition={{ duration: 0.3 }}
        />

        <motion.h3
          className="relative z-10 mb-2 text-2xl font-bold text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
        >
          {title}
        </motion.h3>

        <motion.p
          className="relative z-10 mb-4 text-white/90"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
        >
          {description}
        </motion.p>

        <motion.div
          className="relative z-10 mb-4 flex flex-wrap gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
        >
          {tags.map((tag, tagIndex) => (
            <motion.span
              key={tag}
              className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-white"
              whileHover={{ scale: 1.1, backgroundColor: "var(--primary)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: 0.6 + index * 0.1 + tagIndex * 0.05,
                type: "spring",
              }}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          className="relative z-10 flex gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
        >
          <motion.a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/30"
            whileHover={{ scale: 1.05, x: 2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ExternalLink size={16} />
            Live Demo
          </motion.a>
          <motion.a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/30"
            whileHover={{ scale: 1.05, x: 2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={16} />
            Source Code
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute inset-0 h-full w-full"
        animate={{
          rotateY: isHovered ? 5 : 0,
          rotateX: isHovered ? -5 : 0,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100, damping: 15 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </motion.div>
    </motion.div>
  )
}
