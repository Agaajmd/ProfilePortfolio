export type ProjectItem = {
  slug: string
  title: string
  description: string
  image: string
  tags: string[]
  liveUrl: string
  githubUrl: string
}

const legacyImageAliases: Record<string, string> = {
  "/WORK/Aegix-Solutions.png": "/WORK/Aegix-solutions.png",
}

export function resolveProjectImagePath(path: string) {
  return legacyImageAliases[path] ?? path
}

export const projects: ProjectItem[] = [
  {
    slug: "aegix-solutions",
    title: "Aegix Solutions",
    description: "A startup that provides IT solutions and services for businesses, including web development, software development, and digital marketing.",
    image: "/WORK/Aegix-solutions.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://aegix-solutions.vercel.app/",
    githubUrl: "https://github.com/agaajmd",
  },
  {
    slug: "aegix-game-station",
    title: "Aegix Game Station",
    description: "A fullstack game station platform with online booking and station management.",
    image: "/WORK/Aegix-Game-Station.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://aga-game-station.vercel.app/",
    githubUrl: "https://github.com/agaajmd",
  },
  {
    slug: "smart learning ecosystem",
    title: "Smart Lerning Ecosystem",
    description: "A system for managing school activities such as attendance, grades, and schedules.",
    image: "/WORK/School-management.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://aegix-sle.vercel.app/",
    githubUrl: "https://github.com/agaajmd",
  },
  {
    slug: "cognisense-ai",
    title: "Cognisense Ai",
    description: "A smart AI solution for accurate stress test level analysis.",
    image: "/WORK/cognisense-ai.png",
    tags: ["Next.js", "TypeScript", "CSS"],
    liveUrl: "https://cognisense-ai.vercel.app/",
    githubUrl: "https://github.com/agaajmd",
  },
  {
    slug: "cafe-order-by-table",
    title: "Cafe Order by Table",
    description: "A system for customer and admin online ordering and table-side payments.",
    image: "/WORK/Afif Cafe.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://afif-coffee.vercel.app/",
    githubUrl: "https://github.com/agaajmd",
  },
  {
    slug: "take-a-riz-store",
    title: "E-Commerce",
    description: "Take A Riz online store.",
    image: "/WORK/Take A RIz.png",
    tags: ["Next.js", "TypeScript", "CSS"],
    liveUrl: "https://take-a-riz-e-commerce.vercel.app/",
    githubUrl: "https://github.com/agaajmd/TakeARizStore",
  },
  {
    slug: "kai-website",
    title: "KAI Website",
    description: "A responsive e-commerce platform built with Next.js and Tailwind CSS.",
    image: "/WORK/kai.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma"],
    liveUrl: "https://kai-access-betaaga.vercel.app/",
    githubUrl: "https://github.com/agaajmd/KAI-ACCESS",
  },
  {
    slug: "manual-book-kai-web",
    title: "Manual Book KAI WEB",
    description: "A documentation web app with structured guides and references.",
    image: "/WORK/manualBook.png",
    tags: ["HTML", "CSS"],
    liveUrl: "https://manual-book-kai-accessagaaa.vercel.app/",
    githubUrl: "https://github.com/agaajmd/manualBook-KAI_ACCESS",
  },
]

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug)
}
