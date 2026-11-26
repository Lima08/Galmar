import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/site'

const noIndex = process.env.NEXT_PUBLIC_NOINDEX === 'true'

export default function robots(): MetadataRoute.Robots {
  if (noIndex) {
    return { rules: { userAgent: '*', disallow: '/' } }
  }

  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${siteUrl}/sitemap.xml`
  }
}
