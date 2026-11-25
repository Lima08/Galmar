'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import content from '@/data/content.json'
import { cn } from '@/lib/utils'

const { nav: navLinks, menuOpen, menuClose } = content.header

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 h-(--header-h) transition-all duration-300',
        isScrolled ? 'bg-white shadow-md' : 'bg-white/80 backdrop-blur-xs'
      )}>
      <div className='container flex h-full items-center justify-between'>
        <a href='#home'>
          <Image
            src='/brand/logo-horizontal.png'
            alt={content.header.brand}
            width={594}
            height={180}
            className='h-11 w-auto md:h-12'
            loading='eager'
          />
        </a>
        <nav className='hidden md:flex items-center space-x-8'>
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className='text-gray-700 hover:text-secondary-dark font-medium transition-colors relative group'>
              {link.name}
              <span className='absolute left-0 bottom-0 h-0.5 w-0 bg-secondary-dark transition-all duration-300 group-hover:w-full' />
            </a>
          ))}
        </nav>

        <button
          className='md:hidden text-gray-700 hover:text-secondary-dark'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? menuClose : menuOpen}
          aria-expanded={isMenuOpen}>
          {isMenuOpen ? (
            <X className='h-6 w-6' />
          ) : (
            <Menu className='h-6 w-6' />
          )}
        </button>

        {isMenuOpen && (
          <nav className='md:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4 px-4 flex flex-col space-y-4'>
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={closeMenu}
                className='text-gray-700 hover:text-secondary-dark font-medium py-2 transition-colors'>
                {link.name}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
