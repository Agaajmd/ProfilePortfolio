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
      <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 overflow-visible max-w-7xl">
        <div className="relative w-full">
          <Carousel 
            orientation="horizontal" 
            opts={{ 
              loop: true,
              duration: 800,
              dragFree: isMobile,
            }} 
            className="h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] w-full" 
            setApi={setApi}
          >
          {/* Main container with overflow visible for peek effect */}
          <div className="relative h-full overflow-visible rounded-3xl">
            {/* Invisible Embla content for navigation */}
            <CarouselContent className="h-full opacity-0 pointer-events-none">
              {photos.map((_, i) => (
                <CarouselItem key={`embla-${i}`} className="h-full" />
              ))}
            </CarouselContent>

            {/* Card carousel with preview container */}
            <div 
              className="absolute inset-0 flex items-center justify-center overflow-visible"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              style={{ 
                touchAction: isMobile ? "pan-x" : "none",
                overflowX: "visible", // Ensure carousel doesn't create horizontal scroll
              }}
            >
              {/* Cards container with closer spacing */}
              <div className="relative flex items-center justify-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 overflow-visible">
                {Array.from({ length: VISIBLE_CARDS }).map((_, idx) => {
                  const offset = idx - Math.floor(VISIBLE_CARDS / 2)
                  const photoIndex = (selectedIndex + offset + slidesCount) % slidesCount
                  const isCenter = offset === 0
                  const absOffset = Math.abs(offset)
                  
                  // Enhanced scaling for closer appearance
                  const scale = isCenter ? 1 : 0.85 // Larger side cards for closer feel
                  const opacity = isCenter ? 1 : 0.75 // Higher opacity for side cards
                  const zIndex = isCenter ? 20 : 10 - absOffset
                  
                  // Responsive card sizes with larger center card
                  const cardSizes = isMobile 
                    ? { width: 280, height: 210 } 
                    : { width: 400, height: 300 }
                  
                  const centerCardSizes = isMobile
                    ? { width: 380, height: 285 } // Increased mobile center size
                    : { width: 560, height: 420 } // Increased desktop center size significantly

                  return (
                    <div
                      key={`card-${idx}`}
                      className={`relative cursor-pointer transition-all duration-500 ease-out ${
                        isCenter ? "z-20" : "z-10"
                      }`}
                      style={{
                        transform: `scale(${scale})`,
                        opacity,
                        zIndex,
                      }}
                      onClick={() => handleCardClick(photoIndex)}
                    >
                      <div
                        className={`relative overflow-hidden shadow-2xl transition-all duration-500 hover:scale-105 ${
                          isCenter
                            ? "ring-2 ring-primary/60 shadow-primary/30 rounded-3xl shadow-[0_0_30px_rgba(59,130,246,0.4),0_0_60px_rgba(59,130,246,0.2),0_0_90px_rgba(59,130,246,0.1)]"
                            : "rounded-2xl hover:shadow-xl"
                        }`}
                        style={{
                          width: isCenter ? centerCardSizes.width : cardSizes.width,
                          height: isCenter ? centerCardSizes.height : cardSizes.height,
                          ...(isCenter && {
                            background: 'linear-gradient(45deg, rgba(59,130,246,0.1), rgba(147,51,234,0.1))',
                            backgroundClip: 'padding-box',
                          })
                        }}
                      >
                        {/* Animated glowing border for center card */}
                        {isCenter && (
                          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 p-[2px] animate-pulse">
                            <div className="h-full w-full rounded-3xl bg-transparent" />
                          </div>
                        )}
                        <Image
                          src={photos[photoIndex]}
                          alt={`Photography ${photoIndex + 1}`}
                          fill
                          className={`object-cover transition-all duration-500 relative z-10 ${
                            isCenter ? "rounded-3xl" : "rounded-2xl"
                          }`}
                          sizes={isCenter 
                            ? isMobile ? "380px" : "560px"
                            : isMobile ? "280px" : "400px"
                          }
                          unoptimized
                          priority={idx < 3}
                          onError={(e) => {
                            console.log('Image failed to load:', photos[photoIndex]);
                          }}
                        />
                        
                        {/* Overlay for non-center cards */}
                        {!isCenter && (
                          <div className="absolute inset-0 bg-black/20 transition-all duration-500 hover:bg-black/10" />
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </Carousel>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-2 text-center text-sm text-muted-foreground">
        <p>{isMobile ? "Swipe left/right to navigate" : "Click cards or use left/right arrow keys to navigate"}</p>
      </div>
    </div>
  )
}
