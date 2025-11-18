"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface AnimatedSkillBarProps {
  name: string
  level?: number
  index: number
}

function SkillIcon({ name }: { name: string }) {
  const size = 28
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" }
  switch (name) {
    case "HTML":
      return (
        <svg {...common} aria-hidden>
          <path d="M3 3l1.5 18L12 21l7.5-0.9L21 3H3z" stroke="currentColor" strokeWidth={0.8} />
          <path d="M7.5 8h9M7.5 12h9M7.5 16l4.5 1" stroke="currentColor" strokeWidth={0.8} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case "CSS":
      return (
        <svg {...common} aria-hidden>
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth={0.8} />
          <path d="M7 8h10M7 12h10M7 16l5 1" stroke="currentColor" strokeWidth={0.8} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case "JavaScript":
      return (
        <svg {...common} aria-hidden>
          <rect x="3" y="3" width="18" height="18" rx="2" fill="currentColor" opacity="0.06" />
          <path d="M8 7h8v10H8z" stroke="currentColor" strokeWidth={0.8} />
          <path d="M10.5 14.5c.6 1 2 1 2.6 0M13 9h.01" stroke="currentColor" strokeWidth={0.8} strokeLinecap="round" />
        </svg>
      )
    case "TypeScript":
      return (
        <svg {...common} aria-hidden>
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth={0.8} />
          <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontSize="9" fontWeight="700" fill="currentColor">TS</text>
        </svg>
      )
    case "React":
      return (
        <svg {...common} aria-hidden>
          <ellipse cx="12" cy="12" rx="6.5" ry="3.5" stroke="currentColor" strokeWidth={0.8} />
          <ellipse cx="12" cy="12" rx="3.5" ry="6.5" transform="rotate(60 12 12)" stroke="currentColor" strokeWidth={0.8} />
          <circle cx="12" cy="12" r="1.2" fill="currentColor" />
        </svg>
      )
    case "Next.js":
      return (
        <svg {...common} aria-hidden>
          <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontSize="10" fontWeight="700" fill="currentColor">N</text>
        </svg>
      )
    case "Tailwind CSS":
      return (
        <svg {...common} aria-hidden>
          <path d="M3 12c4 4 8 4 12 0 4-4 8-4 12 0" stroke="currentColor" strokeWidth={0.8} fill="none" />
        </svg>
      )
    case "Photography":
      return (
        <svg {...common} aria-hidden>
          <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth={0.8} />
          <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth={0.8} />
          <rect x="7" y="4" width="3" height="2" rx="0.5" stroke="currentColor" strokeWidth={0.8} />
        </svg>
      )
    default:
      return (
        <svg {...common} aria-hidden>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={0.8} />
          <path d="M8 12h8" stroke="currentColor" strokeWidth={0.8} strokeLinecap="round" />
        </svg>
      )
  }
}

export default function AnimatedSkillBar({ name, index }: AnimatedSkillBarProps) {
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
      <div className="flex items-center gap-4 rounded-lg bg-secondary/40 p-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-background text-primary ring-1 ring-primary/10">
          <SkillIcon name={name} />
        </div>

        <motion.h3
          className="font-medium"
          initial={{ opacity: 0, x: -8 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
          transition={{ duration: 0.5, delay: 0.3 + index * 0.08 }}
        >
          {name}
        </motion.h3>
      </div>
    </motion.div>
  )
}
