import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://nurjagadmuhammaddani.vercel.app'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/api/'],
    },
    host: baseUrl,
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
