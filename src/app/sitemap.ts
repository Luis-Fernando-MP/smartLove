import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://smart-pro.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1
    },
    {
      url: 'https://smart-pro.vercel.app/rooms',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1
    },
    {
      url: 'https://smart-pro.vercel.app/polices',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8
    },
    {
      url: 'https://smart-pro.vercel.app/rooms/reservations',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8
    }
  ]
}
