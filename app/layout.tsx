import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Poppins } from 'next/font/google'
import content from '@/data/content.json'
import { siteUrl } from '@/lib/site'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700']
})

const title = 'Galmar - Produtos de Limpeza em Campinas'
const description = content.hero.description

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  icons: { icon: '/logo-galmar.png' },
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: content.header.brand,
    title,
    description,
    images: [{ url: '/foto-galmar.jpg', alt: 'Produtos de limpeza Galmar' }]
  }
}

const { info, social } = content.contact

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: content.header.brand,
  description,
  url: siteUrl,
  image: `${siteUrl}/foto-galmar.jpg`,
  logo: `${siteUrl}/logo-galmar.png`,
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
  sameAs: [social.facebook, social.instagram]
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang='pt-BR'
      className='scroll-smooth scroll-pt-[90px]'
      data-scroll-behavior='smooth'>
      <body className={poppins.className}>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd).replace(/</g, '\\u003c')
          }}
        />
        {children}
      </body>
    </html>
  )
}
