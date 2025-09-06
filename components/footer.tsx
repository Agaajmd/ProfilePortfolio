"use client"

import Link from "next/link"
import { Github, Linkedin, Instagram, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-secondary/50 py-8 dark:bg-secondary/20">
      {/* Soft static shapes to avoid animation overhead */}
      <div className="absolute inset-0 -z-10 overflow-hidden opacity-25">
        <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute -bottom-20 right-1/4 h-60 w-60 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -right-20 top-1/3 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="text-xl font-bold text-primary">
              <span className="transition-transform duration-200 will-change-transform group inline-block hover:scale-[1.03] hover:[text-shadow:0_0_8px_rgba(59,130,246,0.5)]">
                Agaaa
              </span>
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">Web Developer & Photographer</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 md:justify-end md:gap-4">
            {[
              { icon: Github, href: "https://github.com/agaajmd", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/nur-jagad-muhammad-dani-6a9972287?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", label: "LinkedIn" },
              { icon: Instagram, href: "https://www.instagram.com/n.agaaa?igsh=MW1yOGhkdmZjNjE3MA==", label: "Instagram" },
              { icon: Mail, href: "mailto:n.jagadmd@gmail.com", label: "Email" },
            ].map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-background text-foreground transition-colors hover:bg-primary hover:text-white"
                aria-label={item.label}
              >
                {/* Simple hover ring */}
                <span className="absolute inset-0 rounded-full bg-primary/10 opacity-0 transition duration-200 group-hover:opacity-100" />
                <item.icon size={20} className="relative z-10 transition-transform duration-150 group-hover:scale-110" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Nur Jagad Muhammad Dani. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
