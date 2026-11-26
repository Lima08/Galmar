import Image from 'next/image'
import content from '@/data/content.json'

const year = new Date().getFullYear()

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
          <a
            href='/privacidade'
            className='font-medium text-white underline-offset-2 hover:text-white hover:underline'>
            {content.footer.privacy}
          </a>
        </div>
      </div>

      <div className='grid h-3 w-full grid-cols-2' aria-hidden>
        <div className='bg-secondary' />
        <div className='bg-primary' />
      </div>
    </footer>
  )
}
