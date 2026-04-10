import { MetadataRoute } from 'next'
import { projects } from '@/lib/projects'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nurjagadmuhammaddani.vercel.app'

  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    ...projectPages,
  ]
}
