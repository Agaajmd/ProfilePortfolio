"use client"

import { useEffect, useRef } from "react"
import { motion, useReducedMotion } from "framer-motion"

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<any[]>([])
  const animationFrameId = useRef<number | null>(null)
  const mousePosition = useRef({ x: 0, y: 0 })
  const hue = useRef(0)
  const lastFrameTime = useRef(0)
  const reduceMotion = useReducedMotion()
  const paused = useRef(false)
  const scaleRef = useRef(1)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      // Downscale the drawing resolution to reduce GPU/CPU load
      const scale = reduceMotion ? 0.6 : 0.8
      scaleRef.current = scale
      canvas.width = Math.max(1, Math.floor(window.innerWidth * scale))
      canvas.height = Math.max(1, Math.floor(window.innerHeight * scale))
      // Stretch to full viewport visually
      canvas.style.width = "100%"
      canvas.style.height = "100%"
      initParticles()
    }

    const initParticles = () => {
      particles.current = []
      const base = Math.min(Math.floor(window.innerWidth / 16), 120)
      const particleCount = reduceMotion ? Math.floor(base * 0.5) : base

      for (let i = 0; i < particleCount; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3.5 + 1.2,
          speedX: (Math.random() - 0.5) * (reduceMotion ? 1.0 : 1.3),
          speedY: (Math.random() - 0.5) * (reduceMotion ? 1.0 : 1.3),
          hue: Math.random() * 60 - 30, // Hue offset
          opacity: Math.random() * 0.4 + 0.3,
        })
      }
    }

  const drawParticles = (now?: number) => {
      if (!ctx || !canvas) return

      if (paused.current) return

      // Frame cap for smoother CPU usage
      const t = now ?? performance.now()
      const targetFps = reduceMotion ? 24 : 45
      const interval = 1000 / targetFps
      if (t - lastFrameTime.current < interval) {
        animationFrameId.current = requestAnimationFrame(drawParticles)
        return
      }
      lastFrameTime.current = t

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Increment the base hue for color cycling effect
      hue.current = (hue.current + (reduceMotion ? 0.1 : 0.35)) % 360

  // Update particles and draw them
  particles.current.forEach((particle) => {
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
  const maxDistance = reduceMotion ? 120 : 180

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance
          particle.speedX += dx * force * 0.02
          particle.speedY += dy * force * 0.02

          // Increase size when near mouse
          particle.size = Math.min(particle.size + 0.1, 5)

          // Limit speed
          const maxSpeed = reduceMotion ? 1.8 : 2.6
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

      })

      // Spatial hashing to avoid O(n^2) for line connections
  const threshold = reduceMotion ? 95 : 125
      const cellSize = threshold
      const grid = new Map<string, number[]>()
      const pts = particles.current

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]
        const cx = Math.floor(p.x / cellSize)
        const cy = Math.floor(p.y / cellSize)
        const key = `${cx},${cy}`
        const arr = grid.get(key)
        if (arr) arr.push(i)
        else grid.set(key, [i])
      }

  const maxConnections = reduceMotion ? 3 : 7
  const lineWidth = reduceMotion ? 0.7 : 0.9
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]
        const cx = Math.floor(p.x / cellSize)
        const cy = Math.floor(p.y / cellSize)
        let connections = 0
        for (let gx = cx - 1; gx <= cx + 1; gx++) {
          for (let gy = cy - 1; gy <= cy + 1; gy++) {
            const key = `${gx},${gy}`
            const arr = grid.get(key)
            if (!arr) continue
            for (let k = 0; k < arr.length; k++) {
              const j = arr[k]
              if (j <= i) continue
              const q = pts[j]
              const dx2 = p.x - q.x
              const dy2 = p.y - q.y
              const dist = Math.sqrt(dx2 * dx2 + dy2 * dy2)
              if (dist < threshold) {
                const opacity = 0.35 * (1 - dist / threshold)
                const particleHue = 220 + (p.hue % 30)
                const gradient = ctx.createLinearGradient(p.x, p.y, q.x, q.y)
                gradient.addColorStop(0, `hsla(${particleHue}, 100%, 60%, ${opacity})`)
                gradient.addColorStop(1, `hsla(${particleHue + 10}, 100%, 60%, ${opacity})`)
                ctx.beginPath()
                ctx.moveTo(p.x, p.y)
                ctx.lineTo(q.x, q.y)
                ctx.strokeStyle = gradient
                ctx.lineWidth = lineWidth
                ctx.stroke()
                connections++
                if (connections >= maxConnections) break
              }
            }
            if (connections >= maxConnections) break
          }
          if (connections >= maxConnections) break
        }
      }

  animationFrameId.current = requestAnimationFrame(drawParticles)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const s = scaleRef.current
      mousePosition.current = { x: e.clientX * s, y: e.clientY * s }
    }

    window.addEventListener("resize", resizeCanvas)
    window.addEventListener("mousemove", handleMouseMove)

    // Listen for pause/resume from other components (e.g., Work section)
    const onBgState = (e: Event) => {
      const ce = e as CustomEvent<{ paused?: boolean }>
      const next = !!ce.detail?.paused
      paused.current = next
      if (!next && !animationFrameId.current) {
        // Resume drawing loop when unpaused
        animationFrameId.current = requestAnimationFrame(drawParticles)
      } else if (next && animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
        animationFrameId.current = null
      }
    }
    window.addEventListener("bg:state", onBgState as EventListener)

    resizeCanvas()
    drawParticles()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("bg:state", onBgState as EventListener)
      if (animationFrameId.current !== null) cancelAnimationFrame(animationFrameId.current)
    }
  }, [])

  return (
    <motion.canvas
      ref={canvasRef}
  className="pointer-events-none fixed inset-0 z-0 opacity-60 dark:opacity-40"
  initial={{ opacity: 0 }}
  animate={{ opacity: reduceMotion ? 0.2 : 0.9 }}
  transition={{ duration: 0.6 }}
    />
  )
}
