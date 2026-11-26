import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/footer'
import SimpleHeader from '@/components/simple-header'
import { Button } from '@/components/ui/button'
import content from '@/data/content.json'
import { defaultWhatsAppUrl } from '@/lib/contact'

export const metadata: Metadata = {
  title: `${content.notFound.title} | ${content.header.brand}`
}

export default function NotFound() {
  return (
    <div className='flex min-h-screen flex-col'>
      <SimpleHeader />
      <main
        id='conteudo'
        className='container flex flex-1 flex-col items-start gap-6 py-16 md:py-24'>
        <h1 className='text-h2 font-bold text-balance text-secondary'>
          {content.notFound.title}
        </h1>
        <p className='max-w-prose text-lg text-muted-foreground'>
          {content.notFound.message}
        </p>
        <div className='flex flex-col gap-3 min-[400px]:flex-row'>
          <Button
            asChild
            size='lg'
            className='min-h-11 bg-primary text-white hover:bg-primary-dark focus-visible:bg-primary-dark'>
            <Link href='/'>{content.notFound.home}</Link>
          </Button>
          <Button
            asChild
            size='lg'
            variant='outline'
            className='min-h-11 border-2 border-primary text-primary hover:border-primary-dark hover:text-primary-dark'>
            <a
              href={defaultWhatsAppUrl}
              target='_blank'
              rel='noopener noreferrer'>
              {content.header.cta}
            </a>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  )
}
