"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface AnimatedTextProps {
  text: string
  className?: string
  once?: boolean
  type?: "words" | "chars" | "rainbow" | "typewriter" | "bounce"
  delay?: number
}

export default function AnimatedText({
  text,
  className = "",
  once = true,
  type = "words",
  delay = 0,
}: AnimatedTextProps) {
  const [scope, setScope] = useState<HTMLDivElement | null>(null)
  const [inView, setInView] = useState(!once)
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

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

  useEffect(() => {
    if (type === "typewriter" && inView) {
      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setDisplayText(text.substring(0, currentIndex + 1))
          setCurrentIndex(currentIndex + 1)
        }, 50)
        return () => clearTimeout(timeout)
      }
    }
  }, [currentIndex, inView, text, type])

  // Split text based on animation type
  const getAnimatedElements = () => {
    if (type === "words") {
      const words = text.split(" ")
      return (
        <>
          {words.map((word, index) => (
            <motion.span key={index} className="inline-block mr-1" variants={wordVariants} custom={index}>
              {word}
            </motion.span>
          ))}
        </>
      )
    } else if (type === "chars") {
      return (
        <>
          {text.split("").map((char, index) => (
            <motion.span key={index} className="inline-block" variants={charVariants} custom={index}>
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </>
      )
    } else if (type === "rainbow") {
      return (
        <>
          {text.split("").map((char, index) => (
            <motion.span
              key={index}
              className="inline-block"
              variants={rainbowVariants}
              custom={index}
              style={{
                color: `hsl(220, 100%, ${65 - (index % 4) * 5}%)`, // Variations of blue
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </>
      )
    } else if (type === "typewriter") {
      return (
        <span className="inline-block">
          {displayText}
          {currentIndex < text.length && (
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8 }}
              className="inline-block ml-1 w-[2px] h-[1em] bg-primary"
            />
          )}
        </span>
      )
    } else if (type === "bounce") {
      return (
        <>
          {text.split("").map((char, index) => (
            <motion.span key={index} className="inline-block" variants={bounceVariants} custom={index}>
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </>
      )
    }
  }

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

  const wordVariants = {
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
        delay: i * 0.05,
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

  const rainbowVariants = {
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
      y: 40,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  }

  const bounceVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 6,
        stiffness: 300,
        delay: i * 0.05,
      },
    }),
  }

  return (
    <motion.div
      ref={setScope}
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {getAnimatedElements()}
    </motion.div>
  )
}
