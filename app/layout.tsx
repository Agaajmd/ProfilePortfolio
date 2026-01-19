import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import MotionProvider from "@/components/motion-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Nur Jagad Muhammad Dani | Web Developer & Photographer Portfolio",
  description: "Personal portfolio of Nur Jagad Muhammad Dani - A passionate Web Developer specializing in Next.js, React, and TypeScript. Also a skilled photographer based in Malang, Indonesia.",
  keywords: ["Nur Jagad Muhammad Dani", "Web Developer", "Photographer", "Next.js", "React", "TypeScript", "Portfolio", "Malang", "Indonesia", "Frontend Developer"],
  authors: [{ name: "Nur Jagad Muhammad Dani" }],
  creator: "Nur Jagad Muhammad Dani",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Nur Jagad Muhammad Dani | Web Developer & Photographer",
    description: "Personal portfolio showcasing web development projects and photography work.",
    siteName: "Agaaa Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nur Jagad Muhammad Dani | Portfolio",
    description: "Web Developer & Photographer Portfolio",
  },
  robots: {
    index: true,
    follow: true,
  },
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
          <MotionProvider>
            <div className="flex min-h-screen flex-col bg-background text-foreground">
              <Navbar />
              {children}
              <Footer />
            </div>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
