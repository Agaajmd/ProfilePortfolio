"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<any[]>([])
  const animationFrameId = useRef<number>()
  const mousePosition = useRef({ x: 0, y: 0 })
  const hue = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    const initParticles = () => {
      particles.current = []
      const particleCount = Math.min(Math.floor(window.innerWidth / 15), 150)

      for (let i = 0; i < particleCount; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 1.5,
          speedY: (Math.random() - 0.5) * 1.5,
          hue: Math.random() * 60 - 30, // Hue offset
          opacity: Math.random() * 0.5 + 0.3,
        })
      }
    }

    const drawParticles = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Increment the base hue for color cycling effect
      hue.current = (hue.current + 0.5) % 360

      particles.current.forEach((particle, i) => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Boundary check
        if (particle.x > canvas.width) particle.x = 0
        else if (particle.x < 0) particle.x = canvas.width

        if (particle.y > canvas.height) particle.y = 0
        else if (particle.y < 0) particle.y = canvas.height

        // Mouse interaction
        const dx = particle.x - mousePosition.current.x
        const dy = particle.y - mousePosition.current.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 200

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance
          particle.speedX += dx * force * 0.02
          particle.speedY += dy * force * 0.02

          // Increase size when near mouse
          particle.size = Math.min(particle.size + 0.1, 5)

          // Limit speed
          const maxSpeed = 3
          const speed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY)
          if (speed > maxSpeed) {
            particle.speedX = (particle.speedX / speed) * maxSpeed
            particle.speedY = (particle.speedY / speed) * maxSpeed
          }
        } else {
          // Return to original size
          particle.size = Math.max(particle.size - 0.05, Math.random() * 3 + 1)
        }

        // Calculate color based on theme-appropriate blues
        const particleHue = 220 + (particle.hue % 30) // Keep within blue range (220-250)

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${particleHue}, 100%, 60%, ${particle.opacity})`
        ctx.fill()

        // Draw connections with gradient
        particles.current.forEach((otherParticle, j) => {
          if (i === j) return

          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            const opacity = 0.3 * (1 - distance / 120)

            // Create gradient for line
            const gradient = ctx.createLinearGradient(particle.x, particle.y, otherParticle.x, otherParticle.y)

            gradient.addColorStop(0, `hsla(${particleHue}, 100%, 60%, ${opacity})`)
            gradient.addColorStop(1, `hsla(${particleHue + 10}, 100%, 60%, ${opacity})`)

            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = gradient
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        })
      })

      animationFrameId.current = requestAnimationFrame(drawParticles)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener("resize", resizeCanvas)
    window.addEventListener("mousemove", handleMouseMove)

    resizeCanvas()
    drawParticles()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [])

  return (
    <motion.canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-70 dark:opacity-40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  )
}
