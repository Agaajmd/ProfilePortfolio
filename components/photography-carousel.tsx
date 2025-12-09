"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"

const photos = [
  "/PHOTOGRAPHY/cat1.jpeg",
  "/PHOTOGRAPHY/cat2.jpeg",
  "/PHOTOGRAPHY/flowers.jpeg",
  "/PHOTOGRAPHY/gartenhutte1.jpeg",
  "/PHOTOGRAPHY/gartenhutte2.jpeg",
  "/PHOTOGRAPHY/pacet-made.jpeg",
  "/PHOTOGRAPHY/watu-leter.jpeg",
  "/PHOTOGRAPHY/watu-leter2.jpeg",
]

export default function PhotographyCarousel() {
  const [api, setApi] = useState<CarouselApi | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const isHoveringRef = useRef(false)
  const wheelLockRef = useRef(false)
  const dragStartRef = useRef({ x: 0, y: 0 })
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)
  const slidesCount = useMemo(() => photos.length, [])
  const VISIBLE_CARDS = 3 // Always show 3 cards (center + 2 preview)

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Sync selected index from Embla
  useEffect(() => {
    if (!api) return
    const onSelect = () => setSelectedIndex(api.selectedScrollSnap())
    onSelect()
    api.on("select", onSelect)
    api.on("reInit", onSelect)
    return () => {
      api.off("select", onSelect)
      api.off("reInit", onSelect)
    }
  }, [api])

  // Smooth autoplay with pause on hover
  useEffect(() => {
    if (!api) return
    
    const startAutoplay = () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current)
      autoplayRef.current = setInterval(() => {
        if (!isHoveringRef.current && !isDragging) {
          api.scrollNext()
        }
      }, 4500) // Slower, smoother auto-sliding (4.5 seconds)
    }

    const stopAutoplay = () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
        autoplayRef.current = null
      }
    }

    startAutoplay()
    
    return () => stopAutoplay()
  }, [api, isDragging])

  // Mouse wheel navigation
  const onWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      if (!api || isDragging) return
      if (wheelLockRef.current) return
      const threshold = 20
      if (Math.abs(e.deltaY) < threshold) return
      wheelLockRef.current = true
      if (e.deltaY > 0) api.scrollNext()
      else api.scrollPrev()
      const release = () => {
        wheelLockRef.current = false
        api?.off("settle", release)
      }
      api.on("settle", release)
    },
    [api, isDragging]
  )

  // Keyboard navigation
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (!api) return
      if (e.key === "ArrowLeft") {
        e.preventDefault()
        api.scrollPrev()
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        api.scrollNext()
      }
    },
    [api]
  )

  // Drag handlers (mobile only)
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (!isMobile) return // Only enable drag on mobile
    setIsDragging(false)
    dragStartRef.current = { x: e.clientX, y: e.clientY }
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }, [isMobile])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!api || !isMobile) return // Only enable drag on mobile
    const deltaY = e.clientY - dragStartRef.current.y
    const deltaX = e.clientX - dragStartRef.current.x
    
    if (Math.abs(deltaY) > 50 || Math.abs(deltaX) > 50) { // Higher threshold for smoother mobile
      setIsDragging(true)
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal drag
        if (deltaX > 50) {
          api.scrollPrev()
          dragStartRef.current = { x: e.clientX, y: e.clientY }
        } else if (deltaX < -50) {
          api.scrollNext()
          dragStartRef.current = { x: e.clientX, y: e.clientY }
        }
      }
    }
  }, [api, isMobile])

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (!isMobile) return // Only handle on mobile
    ;(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)
    setTimeout(() => setIsDragging(false), 100)
  }, [isMobile])

  const handleCardClick = useCallback((index: number) => {
    // Desktop: always allow click, Mobile: only if not dragging
    if ((!isMobile || !isDragging) && api) {
      api.scrollTo(index)
    }
  }, [api, isDragging, isMobile])

  return (
    <div
      className="relative z-10 w-full"
      onWheel={onWheel}
      onMouseEnter={() => (isHoveringRef.current = true)}
      onMouseLeave={() => (isHoveringRef.current = false)}
      onKeyDown={onKeyDown}
      tabIndex={0}
      aria-label="Photography Carousel"
    >
      {/* Container with proper left/right margins for carousel */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 overflow-visible max-w-7xl">
        <Carousel 
          orientation="horizontal" 
          opts={{ 
            loop: true,
            duration: 800,
            align: "center",
            dragFree: false,
            watchDrag: true,
          }} 
          className="w-full touch-pan-x" 
          setApi={setApi}
        >
          <CarouselContent className="-ml-2 md:-ml-4 touch-pan-x">
            {photos.map((src, i) => {
              const isCenter = i === selectedIndex

              return (
                <CarouselItem 
                  key={`card-${i}`} 
                  className="pl-2 md:pl-4 basis-[85%] sm:basis-[70%] md:basis-[60%] lg:basis-[45%]"
                >
                  <div
                    className={`relative cursor-pointer transition-all duration-500 ease-out ${
                      isCenter ? "scale-100" : "scale-90"
                    }`}
                    onClick={() => handleCardClick(i)}
                  >
                    <div
                      className={`relative w-full aspect-[4/3] overflow-hidden shadow-2xl transition-all duration-500 ${
                        isCenter
                          ? "ring-2 ring-primary/60 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
                          : "rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.08)] hover:shadow-xl opacity-80"
                      }`}
                    >
                      <Image
                        src={src}
                        alt={`Photography ${i + 1}`}
                        fill
                        className={`object-cover transition-all duration-500 ${
                          isCenter ? "rounded-3xl" : "rounded-2xl"
                        }`}
                        sizes="(max-width: 640px) 85vw, (max-width: 768px) 70vw, (max-width: 1024px) 60vw, 45vw"
                        unoptimized
                        priority={i < 3}
                      />

                      {!isCenter && (
                        <div className="absolute inset-0 bg-black/20 transition-all duration-500 hover:bg-black/10" />
                      )}
                    </div>
                  </div>
                </CarouselItem>
              )
            })}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Instructions */}
    </div>
  )
}
