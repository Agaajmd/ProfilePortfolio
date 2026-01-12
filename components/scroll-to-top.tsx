"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Detect mobile
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)

    // Throttled scroll handler for better performance
    let ticking = false
    const toggleVisibility = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 300) {
            setIsVisible(true)
          } else {
            setIsVisible(false)
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", toggleVisibility, { passive: true })
    return () => {
      window.removeEventListener("scroll", toggleVisibility)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 0.8,
          }}
          transition={{
            duration: isMobile ? 0.2 : 0.3,
            ease: "easeOut",
          }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg touch-manipulation"
          aria-label="Scroll to top"
          whileHover={isMobile ? {} : {
            scale: 1.1,
          }}
          whileTap={{ scale: 0.9 }}
        >
          {/* Simple icon - no continuous animation on mobile */}
          {isMobile ? (
            <ArrowUp size={20} />
          ) : (
            <motion.div
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 1.5,
                ease: "easeInOut",
              }}
            >
              <ArrowUp size={24} />
            </motion.div>
          )}

          {/* Animated ring - desktop only */}
          {!isMobile && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-primary"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0, 1],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 2,
                ease: "easeInOut",
              }}
            />
          )}
        </motion.button>
      )}
    </AnimatePresence>
  )
}
