import Image from 'next/image'
import { Button } from '@/components/ui/button'
import content from '@/data/content.json'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

const { phone } = content.contact.info
const { home, business } = content.contact.whatsappMessages

export default function Hero() {
  return (
    <section className='min-h-screen flex items-center w-full bg-secondary-bg'>
      <div className='container'>
        <div className='grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2'>
          <div className='flex flex-col justify-center space-y-4'>
            <div className='space-y-2'>
              <h1 className='text-display font-bold text-balance'>
                {content.hero.title}
              </h1>
              <p className='max-w-prose text-muted-foreground md:text-xl'>
                {content.hero.description}
              </p>
            </div>
            <div className='flex flex-col gap-2 min-[400px]:flex-row'>
              <Button
                asChild
                size='lg'
                className='bg-secondary-dark hover:bg-secondary-dark/90'>
                <a
                  href={buildWhatsAppUrl(phone, business)}
                  target='_blank'
                  rel='noopener noreferrer'>
                  {content.hero.ctaBusiness}
                </a>
              </Button>
              <Button asChild size='lg' variant='outline'>
                <a
                  href={buildWhatsAppUrl(phone, home)}
                  target='_blank'
                  rel='noopener noreferrer'>
                  {content.hero.ctaHome}
                </a>
              </Button>
            </div>
          </div>
          <div className='flex items-center justify-center'>
            <Image
              src='/foto-galmar.jpg'
              width={500}
              height={400}
              alt={content.hero.imageAlt}
              priority
              className='rounded-lg object-cover shadow-lg'
            />
          </div>
        </div>
      </div>
    </section>
  )
}
