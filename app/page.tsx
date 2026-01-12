import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Work from "@/components/work"
import ScrollToTop from "@/components/scroll-to-top"
import AnimatedBackground from "@/components/animated-background"

export default function Home() {
  return (
    <>
      <AnimatedBackground />
      <main className="min-h-screen relative z-1">
        <Hero />
        <About />
        <Skills />
        <Work />
      </main>
      <ScrollToTop />
    </>
  )
}
