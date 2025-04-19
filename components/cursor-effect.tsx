"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function CursorEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isHoveringLink, setIsHoveringLink] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleLinkHover = () => setIsHoveringLink(true)
    const handleLinkLeave = () => setIsHoveringLink(false)

    // Add event listeners
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    // Add event listeners for links and buttons
    const interactiveElements = document.querySelectorAll("a, button")
    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", handleLinkHover)
      element.addEventListener("mouseleave", handleLinkLeave)
    })

    // Hide cursor when mouse leaves window
    const handleMouseLeave = () => setIsVisible(false)
    window.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("mouseleave", handleMouseLeave)

      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleLinkHover)
        element.removeEventListener("mouseleave", handleLinkLeave)
      })
    }
  }, [isVisible])

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Main cursor */}
          <motion.div
            className="pointer-events-none fixed z-50 h-6 w-6 rounded-full mix-blend-difference"
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
              backgroundColor: "#fff",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: isClicking ? 0.8 : isHoveringLink ? 1.5 : 1,
              opacity: 1,
              x: "-50%",
              y: "-50%",
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 15,
              mass: 0.5,
            }}
          />

          {/* Trailing cursor */}
          <motion.div
            className="pointer-events-none fixed z-40 h-32 w-32 rounded-full bg-primary/20 blur-xl"
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: isHoveringLink ? 1.2 : 1,
              opacity: 0.5,
              x: "-50%",
              y: "-50%",
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 25,
              mass: 1,
              delay: 0.05,
            }}
          />
        </>
      )}
    </AnimatePresence>
  )
}
