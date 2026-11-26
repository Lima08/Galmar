import Image from 'next/image'
import CookiePreferences from '@/components/cookie-preferences'
import content from '@/data/content.json'

const year = new Date().getFullYear()

const FOOTER_LINK =
  'inline-flex min-h-11 items-center font-medium text-white underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-white'

export default function Footer() {
  return (
    <footer className='w-full min-w-0 bg-secondary-dark text-white'>
      <div className='container flex flex-col gap-6 py-10 md:py-12'>
        <a href='#home' className='w-fit'>
          <Image
            src='/brand/logo-horizontal-white.png'
            alt={content.footer.logoAlt}
            width={594}
            height={180}
            className='h-11 w-auto md:h-12'
          />
        </a>

        <div className='flex flex-col gap-2 text-sm text-white sm:flex-row sm:items-center sm:justify-between'>
          <p>
            © {year} {content.footer.rights}
          </p>
          <div className='flex flex-wrap gap-x-6 gap-y-2'>
            <a href='/privacidade/' className={FOOTER_LINK}>
              {content.footer.privacy}
            </a>
            <CookiePreferences className={FOOTER_LINK} />
          </div>
        </div>
      </div>

      <div className='grid h-3 w-full grid-cols-2' aria-hidden>
        <div className='bg-secondary' />
        <div className='bg-primary' />
      </div>
    </footer>
  )
}
