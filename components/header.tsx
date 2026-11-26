'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Menu } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import content from '@/data/content.json'
import { defaultWhatsAppUrl } from '@/lib/contact'
import { cn } from '@/lib/utils'

const { nav: navLinks, brand } = content.header

const WhatsAppCta = ({ className }: { className?: string }) => (
  <Button
    asChild
    className={cn(
      'bg-primary text-white hover:bg-primary-dark focus-visible:bg-primary-dark',
      className
    )}>
    <a
      href={defaultWhatsAppUrl}
      target='_blank'
      rel='noopener noreferrer'
      data-track-location='header'>
      <FaWhatsapp aria-hidden />
      {content.header.cta}
    </a>
  </Button>
)

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 h-(--header-h) bg-white transition-shadow duration-300',
        isScrolled && 'shadow-md'
      )}>
      <div className='container flex h-full items-center justify-between gap-4'>
        <a href='#home'>
          <Image
            src='/brand/logo-horizontal.png'
            alt={brand}
            width={594}
            height={180}
            className='h-11 w-auto md:h-12'
            loading='eager'
          />
        </a>

        <nav className='hidden items-center gap-1 rounded-full bg-secondary-bg p-1 lg:flex'>
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className='rounded-full px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-white hover:text-secondary-dark'>
              {link.name}
            </a>
          ))}
        </nav>

        <WhatsAppCta className='hidden lg:inline-flex' />

        <Sheet>
          <SheetTrigger asChild>
            <button
              className='inline-flex size-11 items-center justify-center rounded-md text-gray-700 hover:text-secondary-dark lg:hidden'
              aria-label={content.header.menuOpen}>
              <Menu className='h-6 w-6' />
            </button>
          </SheetTrigger>
          <SheetContent
            side='right'
            aria-describedby={undefined}
            className='flex flex-col gap-6'>
            <SheetTitle>{brand}</SheetTitle>
            <nav className='flex flex-col'>
              {navLinks.map((link) => (
                <SheetClose asChild key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className='flex min-h-11 items-center border-b font-medium text-gray-700 hover:text-secondary-dark'>
                    {link.name}
                  </a>
                </SheetClose>
              ))}
            </nav>
            <WhatsAppCta className='mt-auto' />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
