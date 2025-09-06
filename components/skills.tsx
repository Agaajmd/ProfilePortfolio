"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import AnimatedSkillBar from "./animated-skill-bar"

const skills = [
  { name: "HTML", level: 90 },
  { name: "CSS", level: 85 },
  { name: "JavaScript", level: 80 },
  { name: "TypeScript", level: 75 },
  { name: "React", level: 85 },
  { name: "Next.js", level: 95 },
  { name: "Tailwind CSS", level: 90 },
  { name: "Photography", level: 95 },
]

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="skills">
      <div className="section-container" ref={ref}>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          My Skills
        </motion.h2>

        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Here are some of the skills I&apos;ve acquired over the years
        </motion.p>

        <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
          {skills.map((skill, index) => (
            <AnimatedSkillBar key={skill.name} name={skill.name} level={skill.level} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
