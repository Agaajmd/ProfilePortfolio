"use client"

import { motion } from "framer-motion"
import AnimatedText from "./animated-text"
import { useRef } from "react"
import { useInView } from "framer-motion"
import ThemeConsistentText from "./theme-consistent-text"

export default function Hero() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section id="home" className="flex min-h-screen items-center justify-center pt-16">
      <div className="section-container flex flex-col items-center justify-center text-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
          className="mb-4"
        >
          <motion.span
            className="inline-block text-lg font-medium text-primary"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 200,
              damping: 10,
            }}
          >
            <ThemeConsistentText text="Welcome to my portfolio" />
          </motion.span>
        </motion.div>

        <div className="mb-6 text-3xl font-bold leading-tight sm:text-4xl md:text-6xl">
          <AnimatedText text="Hi! My Name is" type="bounce" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
            className="mt-2 text-primary"
          >
            <AnimatedText 
              text={[
          "Nur Jagad",
          "Muhammad Dani"
              ].join(" ")} 
              type="chars" 
              delay={1}
              className="whitespace-pre-line" 
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mb-8 max-w-2xl text-xl text-muted-foreground"
        >
          <AnimatedText text="A passionate Web Developer & Photographer" type="typewriter" delay={1.8} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.3 }}
        >
          <motion.a
            href="#work"
            className="group relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#3b82f6_0%,#4f46e5_50%,#3b82f6_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-primary px-8 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              View My Work
            </span>
          </motion.a>
        </motion.div>

        {/* Animated arrow down */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary"
            >
              <path
                d="M12 5V19M12 19L19 12M12 19L5 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
