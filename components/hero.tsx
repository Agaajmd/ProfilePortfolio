"use client"

import { motion } from "framer-motion"
import { Download, Eye } from "lucide-react"
import AnimatedText from "./animated-text"
import { useRef } from "react"
import { useInView } from "framer-motion"
import ThemeConsistentText from "./theme-consistent-text"

export default function Hero() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section id="home" className="flex min-h-screen items-center justify-center pt-16">
  <div className="section-container flex flex-col items-center justify-center text-center w-full px-3 sm:px-0" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="mb-4"
        >
          <motion.span
            className="inline-block text-lg font-medium text-primary"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <ThemeConsistentText text="Welcome to my portfolio" />
          </motion.span>
        </motion.div>

        <div className="mb-6 font-bold leading-tight break-words text-2xl sm:text-4xl md:text-6xl">
          <AnimatedText text="Hi! My Name is" type="words" />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.35, ease: "easeOut" }}
            className="mt-2 text-primary"
          >
            {/* Mobile: allow natural word-wrapping */}
            <span className="sm:hidden block">
              <AnimatedText text="Nur Jagad Muhammad Dani" type="words" delay={0.2} />
            </span>
            {/* Desktop: per-character animation */}
            <span className="hidden sm:block">
              <AnimatedText text="Nur Jagad Muhammad Dani" type="chars" delay={0.2} />
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.35, ease: "easeOut" }}
          className="mb-8 max-w-2xl text-xl text-muted-foreground"
        >
          <AnimatedText text="A passionate Web Developer & Photographer" type="typewriter" delay={0.4} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.5, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          {/* View My Work */}
          <motion.a
            href="#work"
            className="group relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#3b82f6_0%,#4f46e5_50%,#3b82f6_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-8 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              <Eye size={16} />
              <span>View My Work</span>
            </span>
          </motion.a>

          {/* Download CV - using exact path with URL encoding for spaces */}
          <motion.a
            href={encodeURI("/CV/Agaaa Professional CV.pdf")}
            download
            className="group relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#22c55e_0%,#3b82f6_50%,#22c55e_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-8 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              <Download size={16} />
              <span>Download CV</span>
            </span>
          </motion.a>
        </motion.div>

      
      </div>
    </section>
  )
}
