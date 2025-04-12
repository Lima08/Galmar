'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import content from '@/data/content.json'
import HamburgerIcon from './icons/hamburger-icon'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const navLinks = [
    { name: 'Início', id: 'home' },
    { name: 'Marcas', id: 'brands' },
    { name: 'Sobre Nós', id: 'about' },
    { name: 'Depoimentos', id: 'testimonials' },
    { name: 'Contato', id: 'contact' }
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false)
    const section = document.getElementById(sectionId)
    if (section) {
      const headerOffset = 90
      const elementPosition =
        section.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white shadow-md py-2'
          : 'bg-white/80 backdrop-blur-sm py-4'
      )}>
      <div className='container flex h-[50px] items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Link href='#home'>
            <Image
              src='/logo-galmar.png'
              alt={content.header.brand}
              width={120}
              height={40}
              className='object-contain'
            />
          </Link>
        </div>
        <nav className='hidden md:flex items-center space-x-8'>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className='text-gray-700 hover:text-blue-900 font-medium transition-colors relative group'>
              {link.name}
              <span className='absolute left-0 bottom-0 h-0.5 w-0 bg-blue-900 transition-all duration-300 group-hover:w-full'></span>
            </button>
          ))}
        </nav>

        {/* Botão do menu mobile */}
        <button
          className='md:hidden text-gray-700 hover:text-blue-900'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}>
          {isMenuOpen ? (
            <X className='h-6 w-6' />
          ) : (
            <Menu className='h-6 w-6' />
          )}
        </button>

        {isMenuOpen && (
          <div className='md:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4 px-4 flex flex-col space-y-4'>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className='text-gray-700 hover:text-blue-900 font-medium py-2 transition-colors text-left'>
                {link.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
