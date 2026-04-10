import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ExternalLink, Github, ArrowLeft } from "lucide-react"
import { getProjectBySlug, projects } from "@/lib/projects"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    return {
      title: "Project Not Found | Nur Jagad Muhammad Dani",
      robots: { index: false, follow: false },
    }
  }

  const imageUrl = `https://nurjagadmuhammaddani.vercel.app${encodeURI(project.image)}`
  const pageUrl = `https://nurjagadmuhammaddani.vercel.app/work/${project.slug}`

  return {
    title: `${project.title} | Nur Jagad Muhammad Dani`,
    description: project.description,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.title} | Nur Jagad Muhammad Dani`,
      description: project.description,
      url: pageUrl,
      type: "article",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${project.title} preview image`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Nur Jagad Muhammad Dani`,
      description: project.description,
      images: [imageUrl],
    },
  }
}

export default async function ProjectSharePage({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return (
    <main className="container mx-auto min-h-screen px-4 pb-16 pt-28">
      <div className="mb-6">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm text-muted-foreground hover:bg-secondary"
        >
          <ArrowLeft size={16} />
          <span>Back to Work</span>
        </Link>
      </div>

      <article className="mx-auto max-w-4xl overflow-hidden rounded-3xl border bg-card shadow-sm">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
        </div>

        <div className="p-6 md:p-8">
          <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
          <p className="mt-4 text-muted-foreground">{project.description}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary/90"
            >
              <ExternalLink size={16} />
              <span>Live Demo</span>
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium hover:bg-secondary"
            >
              <Github size={16} />
              <span>Source Code</span>
            </a>
          </div>
        </div>
      </article>
    </main>
  )
}
