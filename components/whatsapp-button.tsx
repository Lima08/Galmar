'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'

interface WhatsAppButtonProps {
  phoneNumber: string
  message?: string
}

export default function WhatsAppButton({
  phoneNumber,
  message = 'Olá! Vim pelo site e gostaria de mais informações.'
}: WhatsAppButtonProps) {
  const [isVisible, setIsVisible] = useState(false)

  const formattedPhone = phoneNumber.replace(/\D/g, '')

  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(
    message
  )}`

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1500)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
      clearTimeout(timer)
    }
  }, [])

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      }`}>
      <Link
        href={whatsappUrl}
        target='_blank'
        rel='noopener noreferrer'
        aria-label='Contato via WhatsApp'
        className='flex items-center justify-center w-16 h-16 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110 hover:shadow-xl'>
        <FaWhatsapp className='h-8 w-8' />
      </Link>
    </div>
  )
}
