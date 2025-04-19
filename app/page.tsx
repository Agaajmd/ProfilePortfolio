import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Work from "@/components/work"
import ScrollToTop from "@/components/scroll-to-top"
import AnimatedBackground from "@/components/animated-background"
import CursorEffect from "@/components/cursor-effect"

export default function Home() {
  return (
    <main className="min-h-screen">
      <AnimatedBackground />
      <CursorEffect />
      <Hero />
      <About />
      <Skills />
      <Work />
      <ScrollToTop />
    </main>
  )
}
