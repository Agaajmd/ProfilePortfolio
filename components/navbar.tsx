"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ModeToggle } from "./mode-toggle"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Work", href: "#work" },
  { name: "Social Media", href: "#footer" },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      // Update active section based on scroll position
      const sections = navLinks.map((link) => link.href.substring(1))

      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      className={`fixed inset-x-0 top-0 z-50 w-full pointer-events-none transition-all duration-300`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.8,
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
    >
      <div
        className={`w-full pointer-events-auto transition-all duration-300`}
      >
        <motion.div
          layout
          initial={false}
          animate={isScrolled ? { scale: 1 } : { scale: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 26 }}
          className={`${
              isScrolled
                ? "max-w-screen-xl mx-3 sm:mx-auto mt-3 sm:mt-4 h-12 sm:h-14 rounded-full border backdrop-blur supports-[backdrop-filter]:bg-white/20 bg-white/30 dark:bg-slate-900/30 border-black/10 dark:border-white/10 shadow-lg"
              : "h-16"
          } transition-[background-color,backdrop-filter,box-shadow,border-radius,height,margin] duration-300 ease-out`}
        >
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
            className={`${
              isScrolled
                ? "flex h-full items-center justify-between px-3 sm:px-4"
                : "container mx-auto flex h-full items-center justify-between px-4"
            }`}
          >
          <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Link href="/" className="text-xl font-bold text-primary transition-colors hover:text-primary/80">
            <motion.span
              whileHover={{
                scale: 1.05,
                textShadow: "0 0 8px rgba(59, 130, 246, 0.5)",
              }}
            >
              Agaaa
            </motion.span>
          </Link>
          </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center space-x-8">
            {navLinks.map((link, index) => {
              const isActive = activeSection === link.href.substring(1)

              return (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                >
                  <Link
                    href={link.href}
                    className={`relative text-sm font-medium transition-colors ${
                      isActive ? "text-primary" : "text-foreground hover:text-primary"
                    }`}
                  >
                    <motion.span whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
                      {link.name}
                    </motion.span>

                    {/* Animated underline for active link */}
                    {isActive && (
                      <motion.div
                        className="absolute -bottom-1 left-0 h-0.5 w-full bg-primary"
                        layoutId="navbar-underline"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.li>
              )
            })}
            <motion.li
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <ModeToggle />
            </motion.li>
          </ul>
        </nav>

        {/* Mobile Navigation Toggle */}
          <motion.div
          className="flex items-center md:hidden"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <ModeToggle />
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="ml-4 p-1"
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
          </motion.div>
          </motion.div>
        </motion.div>
  </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: 1,
              height: "auto",
              transition: {
                height: { duration: 0.3 },
                opacity: { duration: 0.3, delay: 0.1 },
              },
            }}
            exit={{
              opacity: 0,
              height: 0,
              transition: {
                height: { duration: 0.3, delay: 0.1 },
                opacity: { duration: 0.2 },
              },
            }}
            className="md:hidden pointer-events-auto"
          >
            <div className="max-w-screen-xl mx-4">
              <nav
                className={`px-4 py-3 mt-2 rounded-2xl border shadow-lg backdrop-blur supports-[backdrop-filter]:bg-white/20 ${
                  isScrolled
                    ? "bg-white/30 dark:bg-slate-900/30 border-black/10 dark:border-white/10"
                    : "bg-white/30 dark:bg-slate-900/30 border-black/5 dark:border-white/5"
                } dark:[&_*]:text-foreground`}
              >
              <ul className="flex flex-col space-y-4">
                {navLinks.map((link, index) => {
                  const isActive = activeSection === link.href.substring(1)

                  return (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      whileHover={{ x: 5 }}
                    >
                      <Link
                        href={link.href}
                        className={`block py-2 transition-colors ${
                          isActive ? "text-primary font-medium" : "text-foreground"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <motion.div className="flex items-center">
                          {isActive && (
                            <motion.div
                              layoutId="mobile-active-bullet"
                              className="mr-2 h-2 w-2 rounded-full bg-primary"
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                          )}
                          {link.name}
                        </motion.div>
                      </Link>
                    </motion.li>
                  )
                })}
              </ul>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
