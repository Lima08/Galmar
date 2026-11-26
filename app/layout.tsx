import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Poppins } from 'next/font/google'
import Analytics from '@/components/analytics'
import CookieBanner from '@/components/cookie-banner'
import content from '@/data/content.json'
import { toOpeningHoursSpecification } from '@/lib/hours'
import { siteUrl } from '@/lib/site'
import { cn } from '@/lib/utils'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-poppins'
})

const { title } = content.meta
const description = content.hero.description
const noIndex = process.env.NEXT_PUBLIC_NOINDEX === 'true'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: '/' },
  robots: noIndex
    ? { index: false, follow: false }
    : { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: content.header.brand,
    title,
    description,
    images: [
      {
        url: '/brand/og.png',
        width: 1200,
        height: 630,
        alt: content.meta.ogImageAlt
      }
    ]
  }
}

const { info, social } = content.contact

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: content.header.brand,
  description,
  url: siteUrl,
  image: `${siteUrl}/brand/og.png`,
  logo: `${siteUrl}/brand/logo-vertical.png`,
  telephone: info.phone,
  email: info.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: info.address.street,
    addressLocality: info.address.city,
    addressRegion: info.address.state,
    postalCode: info.address.postalCode,
    addressCountry: 'BR'
  },
  openingHoursSpecification: toOpeningHoursSpecification(info.hoursByDay),
  sameAs: [social.facebook.url, social.instagram.url]
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang='pt-BR'
      className={cn(
        'scroll-smooth scroll-pt-[calc(var(--header-h)+0.5rem)]',
        poppins.variable
      )}
      data-scroll-behavior='smooth'>
      <body>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd).replace(/</g, '\\u003c')
          }}
        />
        {children}
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  )
}
