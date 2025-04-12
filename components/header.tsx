import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import content from '@/data/content.json'
import HamburgerIcon from './icons/hamburger-icon'

export default function Header() {
  return (
    <header className='sticky top-0 z-40 w-full border-b bg-white'>
      <div className='container flex h-[100px] items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Link href='#inicio'>
            <Image
              src='/logo-galmar.png'
              alt={content.header.brand}
              width={150}
              height={50}
              className='object-contain'
            />
          </Link>
        </div>
        <nav className='hidden md:flex items-center gap-6 text-sm'>
          <Link
            href='#inicio'
            className='font-medium transition-colors hover:text-teal-600'>
            {content.header.nav.inicio}
          </Link>
          <Link
            href='#sobre'
            className='font-medium transition-colors hover:text-teal-600'>
            {content.header.nav.sobre}
          </Link>
          <Link
            href='#marcas'
            className='font-medium transition-colors hover:text-teal-600'>
            {content.header.nav.marcas}
          </Link>
          <Link
            href='#depoimentos'
            className='font-medium transition-colors hover:text-teal-600'>
            {content.header.nav.depoimentos}
          </Link>
          <Link
            href='#contato'
            className='font-medium transition-colors hover:text-teal-600'>
            {content.header.nav.contato}
          </Link>
        </nav>
        <Button variant='outline' className='hidden md:inline-flex'>
          {content.header.phone}
        </Button>
        <Button variant='outline' size='icon' className='md:hidden'>
          <span className='sr-only'>Menu</span>
          <HamburgerIcon />
        </Button>
      </div>
    </header>
  )
}
