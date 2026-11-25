'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import content from '@/data/content.json'
import { defaultWhatsAppUrl } from '@/lib/contact'
import { cn } from '@/lib/utils'

const SHOW_DELAY_MS = 1500
const SCROLL_THRESHOLD_PX = 300

export default function WhatsAppButton() {
  const [delayElapsed, setDelayElapsed] = useState(false)
  const [scrolledPast, setScrolledPast] = useState(false)

  useEffect(() => {
    const handleScroll = () =>
      setScrolledPast(window.scrollY > SCROLL_THRESHOLD_PX)

    window.addEventListener('scroll', handleScroll, { passive: true })
    const timer = setTimeout(() => setDelayElapsed(true), SHOW_DELAY_MS)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timer)
    }
  }, [])

  const isVisible = delayElapsed || scrolledPast

  return (
    <div
      className={cn(
        'fixed bottom-6 right-6 z-50 transition-all duration-300',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      )}>
      <Link
        href={defaultWhatsAppUrl}
        target='_blank'
        rel='noopener noreferrer'
        aria-label={content.contact.whatsappLabel}
        className='flex items-center justify-center w-16 h-16 rounded-full bg-whatsapp text-white shadow-lg hover:bg-whatsapp-dark transition-all duration-300 hover:scale-110 hover:shadow-xl'>
        <FaWhatsapp className='h-8 w-8' />
      </Link>
    </div>
  )
}
