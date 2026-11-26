import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/footer'
import content from '@/data/content.json'

export const metadata: Metadata = {
  title: `${content.privacy.title} | ${content.header.brand}`,
  description: content.privacy.updated,
  alternates: { canonical: '/privacidade' }
}

export default function PrivacyPage() {
  return (
    <div className='flex min-h-screen flex-col'>
      <header className='border-b bg-white'>
        <div className='container flex h-(--header-h) items-center'>
          <Link
            href='/'
            className='font-medium text-secondary-dark underline-offset-2 hover:underline'>
            {content.privacy.back}
          </Link>
        </div>
      </header>
      <main className='container flex-1 py-12 md:py-16'>
        <h1 className='text-h2 font-bold text-balance text-secondary'>
          {content.privacy.title}
        </h1>
        <p className='mt-2 text-sm text-muted-foreground'>
          {content.privacy.updated}
        </p>
        <div className='mt-10 flex flex-col gap-8'>
          {content.privacy.sections.map((section) => (
            <section key={section.heading} className='flex flex-col gap-2'>
              <h2 className='text-h3 font-bold text-balance'>
                {section.heading}
              </h2>
              <p className='max-w-prose text-muted-foreground'>
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
