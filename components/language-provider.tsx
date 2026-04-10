"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"

type Language = "en" | "id"

type Dictionary = {
  nav: {
    home: string
    about: string
    skills: string
    work: string
    social: string
  }
  hero: {
    welcome: string
    intro: string
    tagline: string
    viewWork: string
    contact: string
    downloadCv: string
  }
  about: {
    title: string
    role: string
    p1: string
    p2: string
    p3: string
    p4: string
  }
  skills: {
    title: string
    subtitle: string
  }
  work: {
    title: string
    subtitle: string
    photography: string
    photographySubtitle: string
    live: string
    code: string
    share: string
    copied: string
    shareError: string
  }
  footer: {
    role: string
    rights: string
  }
}

const dictionary: Record<Language, Dictionary> = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      work: "Work",
      social: "Social Media",
    },
    hero: {
      welcome: "Welcome to my portfolio",
      intro: "Hi! My Name is",
      tagline: "A passionate Web Developer & Photographer",
      viewWork: "View My Work",
      contact: "Contact",
      downloadCv: "Download CV",
    },
    about: {
      title: "About Me",
      role: "Web Developer & Photographer",
      p1: "I am a Software Engineering student at SMK Telkom Malang with a deep interest in web development. My main focus is Frontend Development using Next.js and Node.js.",
      p2: "I have practical experience in building web applications that are not only functional but also have good UI/UX. Some of the projects I have completed include a cafe ordering website, a PlayStation booking platform, and a florist business landing page.",
      p3: "Beyond my technical skills, I have strong leadership soft skills. My experience as a Drama Producer for Bulan Bahasa trained me in time management and team organization. I am also certified in AI fundamentals from Dicoding Academy.",
      p4: "I am open to discussions about internship opportunities or project collaborations.",
    },
    skills: {
      title: "My Skills",
      subtitle: "Here are some of the skills I have acquired over the years",
    },
    work: {
      title: "My Work",
      subtitle: "Check out some of my recent projects",
      photography: "Photography",
      photographySubtitle: "Explore my photography collection",
      live: "Live",
      code: "Code",
      share: "Share",
      copied: "Link copied",
      shareError: "Unable to share right now",
    },
    footer: {
      role: "Web Developer & Photographer",
      rights: "All rights reserved.",
    },
  },
  id: {
    nav: {
      home: "Beranda",
      about: "Tentang",
      skills: "Keahlian",
      work: "Proyek",
      social: "Media Sosial",
    },
    hero: {
      welcome: "Selamat datang di portofolio saya",
      intro: "Halo! Nama saya",
      tagline: "Seorang Web Developer & Fotografer yang bersemangat",
      viewWork: "Lihat Proyek",
      contact: "Kontak",
      downloadCv: "Unduh CV",
    },
    about: {
      title: "Tentang Saya",
      role: "Web Developer & Fotografer",
      p1: "Saya adalah siswa Rekayasa Perangkat Lunak di SMK Telkom Malang yang memiliki minat besar pada pengembangan web. Fokus utama saya adalah Frontend Development menggunakan Next.js dan Node.js.",
      p2: "Saya memiliki pengalaman praktis membangun aplikasi web yang tidak hanya fungsional tetapi juga memiliki UI/UX yang baik. Beberapa proyek yang sudah saya kerjakan meliputi website pemesanan cafe, platform booking PlayStation, dan landing page bisnis florist.",
      p3: "Selain kemampuan teknis, saya juga memiliki soft skill kepemimpinan yang kuat. Pengalaman sebagai Produser Drama pada acara Bulan Bahasa melatih saya dalam manajemen waktu dan organisasi tim. Saya juga memiliki sertifikasi dasar AI dari Dicoding Academy.",
      p4: "Saya terbuka untuk diskusi tentang peluang magang maupun kolaborasi proyek.",
    },
    skills: {
      title: "Keahlian Saya",
      subtitle: "Berikut beberapa keahlian yang saya kuasai selama beberapa tahun terakhir",
    },
    work: {
      title: "Proyek Saya",
      subtitle: "Lihat beberapa proyek terbaru saya",
      photography: "Fotografi",
      photographySubtitle: "Jelajahi koleksi fotografi saya",
      live: "Demo",
      code: "Kode",
      share: "Bagikan",
      copied: "Link disalin",
      shareError: "Tidak bisa membagikan sekarang",
    },
    footer: {
      role: "Web Developer & Fotografer",
      rights: "Seluruh hak cipta dilindungi.",
    },
  },
}

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: Dictionary
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const stored = window.localStorage.getItem("portfolio-lang") as Language | null
    if (stored === "en" || stored === "id") {
      setLanguage(stored)
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = language
    window.localStorage.setItem("portfolio-lang", language)
  }, [language])

  const value = useMemo(() => ({ language, setLanguage, t: dictionary[language] }), [language])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}
