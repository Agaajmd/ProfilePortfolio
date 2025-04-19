"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface ThemeConsistentTextProps {
  text: string
  className?: string
  once?: boolean
  delay?: number
}

export default function ThemeConsistentText({
  text,
  className = "",
  once = true,
  delay = 0,
}: ThemeConsistentTextProps) {
  const [scope, setScope] = useState<HTMLDivElement | null>(null)
  const [inView, setInView] = useState(!once)

  useEffect(() => {
    if (!scope || !once) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(scope)

    return () => {
      observer.disconnect()
    }
  }, [scope, once])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: delay + 0.04 * i,
      },
    }),
  }

  const charVariants = {
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
        delay: i * 0.03,
      },
    }),
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  }

  return (
    <motion.div
      ref={setScope}
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={charVariants}
          custom={index}
          style={{
            color: index % 3 === 0 ? "var(--primary)" : "currentColor",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  )
}
