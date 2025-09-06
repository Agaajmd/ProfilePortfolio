import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { MotionConfig } from "framer-motion"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Nur Jagad Muhammad Dani | Portfolio",
  description: "Personal portfolio of Nur Jagad Muhammad Dani - Web Developer & Photographer",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <MotionConfig reducedMotion="user">
            <div className="flex min-h-screen flex-col bg-background text-foreground">
              <Navbar />
              {children}
              <Footer />
            </div>
          </MotionConfig>
        </ThemeProvider>
      </body>
    </html>
  )
}
