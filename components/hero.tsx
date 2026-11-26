import Image from 'next/image'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import content from '@/data/content.json'
import { formatRating } from '@/lib/rating'
import { cn } from '@/lib/utils'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

const { phone } = content.contact.info
const { home, business } = content.contact.whatsappMessages

const CTA = 'min-h-11 px-6 text-base focus-visible:ring-primary-dark'

export default function Hero() {
  return (
    <section className='relative w-full overflow-hidden bg-secondary-bg py-12 md:py-20'>
      <Image
        src='/brand/symbol.png'
        alt=''
        aria-hidden
        width={512}
        height={512}
        className='pointer-events-none absolute -right-24 -bottom-32 w-md opacity-15 lg:-right-16 lg:w-xl'
      />
      <div className='container relative grid items-center gap-10 lg:grid-cols-2 lg:gap-12'>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col gap-4'>
            <h1 className='text-display font-bold text-balance'>
              {content.hero.title}
            </h1>
            <p className='max-w-prose text-lg text-muted-foreground md:text-xl'>
              {content.hero.description}
            </p>
          </div>
          <div className='flex flex-col gap-3 min-[400px]:flex-row'>
            <Button
              asChild
              size='lg'
              className={cn(
                CTA,
                'bg-primary text-white hover:bg-primary-dark focus-visible:bg-primary-dark'
              )}>
              <a
                href={buildWhatsAppUrl(phone, business)}
                target='_blank'
                rel='noopener noreferrer'
                data-track-location='hero'
                data-track-audience='business'>
                {content.hero.ctaBusiness}
              </a>
            </Button>
            <Button
              asChild
              size='lg'
              variant='outline'
              className={cn(
                CTA,
                'border-2 border-primary bg-white text-primary hover:border-primary-dark hover:bg-white hover:text-primary-dark focus-visible:border-primary-dark focus-visible:text-primary-dark'
              )}>
              <a
                href={buildWhatsAppUrl(phone, home)}
                target='_blank'
                rel='noopener noreferrer'
                data-track-location='hero'
                data-track-audience='home'>
                {content.hero.ctaHome}
              </a>
            </Button>
          </div>
          <p className='flex items-center gap-2 text-sm font-medium text-muted-foreground'>
            <Star className='h-4 w-4 fill-current text-secondary' aria-hidden />
            <span>
              {formatRating(content.reviews.rating)} {content.hero.trustRating}
            </span>
            <span aria-hidden>·</span>
            <span>{content.hero.trustSince}</span>
          </p>
        </div>
        {/* WebP pré-gerado (export estático sem otimização em runtime — AD-007) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src='/assets/hero/hero-960.webp'
          srcSet='/assets/hero/hero-640.webp 640w, /assets/hero/hero-960.webp 960w, /assets/hero/hero-1280.webp 1280w'
          sizes='(min-width: 1264px) 576px, (min-width: 1024px) calc(50vw - 56px), 100vw'
          width={1280}
          height={853}
          alt={content.hero.imageAlt}
          fetchPriority='high'
          className='aspect-3/2 w-full rounded-2xl object-cover shadow-lg'
        />
      </div>
    </section>
  )
}
