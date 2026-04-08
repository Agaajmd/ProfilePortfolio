import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://agaaaportfolio.vercel.app' // Replace with your actual domain when deploying

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    // Add other routes here if you have more pages later (e.g. /about, /projects)
  ]
}
