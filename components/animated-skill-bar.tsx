"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface AnimatedSkillBarProps {
  name: string
  level: number
  index: number
}

export default function AnimatedSkillBar({ name, level, index }: AnimatedSkillBarProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 50, x: index % 2 === 0 ? -50 : 50 }}
      transition={{
        duration: 0.7,
        delay: 0.2 + index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 12,
      }}
      className="group"
    >
      <div className="mb-2 flex items-center justify-between">
        <motion.h3
          className="font-medium"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
        >
          {name}
        </motion.h3>
        <motion.span
          className="text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
        >
          {level}%
        </motion.span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-secondary">
        <motion.div
          className="h-full bg-gradient-to-r from-primary/80 to-primary"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{
            duration: 1.5,
            delay: 0.4 + index * 0.1,
            ease: [0.34, 1.56, 0.64, 1], // Custom spring-like easing
          }}
        />
      </div>

      {/* Animated dots that follow the progress bar */}
      <motion.div
        className="relative h-0"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
      >
        <motion.div
          className="absolute -top-[9px] h-5 w-5 rounded-full bg-primary shadow-lg"
          initial={{ left: "0%" }}
          animate={isInView ? { left: `${level}%` } : { left: "0%" }}
          transition={{
            duration: 1.5,
            delay: 0.4 + index * 0.1,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          style={{
            transform: "translateX(-50%)",
          }}
        >
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/30"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
