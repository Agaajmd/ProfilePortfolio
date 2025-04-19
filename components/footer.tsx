"use client"

import Link from "next/link"
import { Github, Linkedin, Instagram, Mail } from "lucide-react"
import { motion } from "framer-motion"

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-secondary/50 py-8 dark:bg-secondary/20">
      {/* Animated background shapes */}
      <div className="absolute inset-0 -z-10 overflow-hidden opacity-30">
        <motion.div
          className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-primary/30 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 8,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-20 right-1/4 h-60 w-60 rounded-full bg-primary/20 blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, -20, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 10,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -right-20 top-1/3 h-40 w-40 rounded-full bg-primary/20 blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 40, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 7,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="text-xl font-bold text-primary">
              <motion.span
                whileHover={{
                  scale: 1.05,
                  textShadow: "0 0 8px rgba(59, 130, 246, 0.5)",
                }}
              >
                Agaaa
              </motion.span>
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">Web Developer & Photographer</p>
          </motion.div>

          <motion.div
            className="flex space-x-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {[
              { icon: Github, href: "https://github.com/agaajmd", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/nur-jagad-muhammad-dani-6a9972287?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", label: "LinkedIn" },
              { icon: Instagram, href: "https://www.instagram.com/n.agaaa?igsh=MW1yOGhkdmZjNjE3MA==", label: "Instagram" },
              { icon: Mail, href: "mailto:n.jagadmd@gmail.com", label: "Email" },
            ].map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-background text-foreground transition-colors hover:bg-primary hover:text-white"
                aria-label={item.label}
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  backgroundColor: "var(--primary)",
                  color: "white",
                  boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)",
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {/* Animated ripple effect */}
                <motion.span
                  className="absolute inset-0 rounded-full bg-primary/20"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1.5, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                />

                <item.icon size={20} className="relative z-10" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="mt-8 text-center text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p>© {new Date().getFullYear()} Nur Jagad Muhammad Dani. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}
