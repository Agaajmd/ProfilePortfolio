import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Work from "@/components/work"
import ScrollToTop from "@/components/scroll-to-top"
import AnimatedBackground from "@/components/animated-background"

export default function Home() {
  return (
    <main className="min-h-screen">
      <AnimatedBackground />
      <Hero />
      <About />
      <Skills />
      <Work />
      <ScrollToTop />
    </main>
  )
}
