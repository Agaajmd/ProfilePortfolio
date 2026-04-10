import Hero from "@/components/hero"
import About from "@/components/about"
import ScrollToTop from "@/components/scroll-to-top"
import dynamic from 'next/dynamic'

const Skills = dynamic(() => import('@/components/skills'), { ssr: true })
const Work = dynamic(() => import('@/components/work'), { ssr: true })

export default function Home() {
  return (
    <>
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
