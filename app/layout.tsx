import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import MotionProvider from "@/components/motion-provider"
import { LanguageProvider } from "@/components/language-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://nurjagadmuhammaddani.vercel.app"),
  applicationName: "Agaaa Portfolio",
  alternates: {
    canonical: "/",
  },
  title: "Nur Jagad Muhammad Dani | Web Developer & Photographer Portfolio",
  description: "Personal portfolio of Nur Jagad Muhammad Dani - A passionate Web Developer specializing in Next.js, React, and TypeScript. Also a skilled photographer based in Malang, Indonesia.",
  keywords: ["Nur Jagad Muhammad Dani", "Web Developer", "Photographer", "Next.js", "React", "TypeScript", "Portfolio", "Malang", "Indonesia", "Frontend Developer"],
  authors: [{ name: "Nur Jagad Muhammad Dani" }],
  creator: "Nur Jagad Muhammad Dani",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nurjagadmuhammaddani.vercel.app",
    title: "Nur Jagad Muhammad Dani | Web Developer & Photographer",
    description: "Personal portfolio showcasing web development projects and photography work.",
    siteName: "Agaaa Portfolio",
    images: [
      {
        url: "https://nurjagadmuhammaddani.vercel.app/opengraph-image.png",
        width: 1750,
        height: 1750,
        alt: "Nur Jagad Muhammad Dani Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nur Jagad Muhammad Dani | Portfolio",
    description: "Web Developer & Photographer Portfolio",
    images: ["https://nurjagadmuhammaddani.vercel.app/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "DYtXdo-ndLdf8It3CjKCOvoJblxDgu-pzxFVmo1O-X8",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Nur Jagad Muhammad Dani",
              url: "https://nurjagadmuhammaddani.vercel.app",
              image: "https://nurjagadmuhammaddani.vercel.app/profil.jpg",
              jobTitle: "Web Developer & Photographer",
              description: "A passionate Web Developer specializing in Next.js, React, and TypeScript. Also a skilled photographer based in Malang, Indonesia.",
              sameAs: [
                "https://github.com/agaajmd",
                "https://www.linkedin.com/in/nurjagadmuhammaddani",
                "https://www.instagram.com/n.agaaa?igsh=MW1yOGhkdmZjNjE3MA=="
              ]
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <MotionProvider>
              <div className="flex min-h-screen flex-col bg-background text-foreground">
                <Navbar />
                {children}
                <Footer />
              </div>
            </MotionProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
