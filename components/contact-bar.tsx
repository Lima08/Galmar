import { Clock, Phone } from 'lucide-react'
import { FaInstagram, FaWhatsapp } from 'react-icons/fa'
import content from '@/data/content.json'
import { defaultWhatsAppUrl, phoneHref, shortHours } from '@/lib/contact'

const { info, social } = content.contact

const LINK =
  'inline-flex min-h-11 items-center gap-2 rounded-md px-2 font-medium transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white'

export default function ContactBar() {
  return (
    <div className='bg-secondary-dark text-sm text-white'>
      <div className='container flex items-center justify-between gap-4'>
        <div className='flex items-center gap-2 md:gap-4'>
          <a
            href={defaultWhatsAppUrl}
            target='_blank'
            rel='noopener noreferrer'
            data-track-location='contact-bar'
            className={LINK}>
            <FaWhatsapp className='h-4 w-4' aria-hidden />
            <span>{content.contactBar.whatsapp}</span>
            <span className='hidden md:inline'>{info.phone}</span>
          </a>
          <a
            href={phoneHref}
            data-track-location='contact-bar'
            className={LINK}>
            <Phone className='h-4 w-4' aria-hidden />
            <span>{content.contactBar.call}</span>
          </a>
        </div>
        <div className='hidden items-center gap-4 md:flex'>
          <span className='inline-flex items-center gap-2'>
            <Clock className='h-4 w-4' aria-hidden />
            {shortHours}
          </span>
          <a
            href={social.instagram.url}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={social.instagram.label}
            className={LINK}>
            <FaInstagram className='h-4 w-4' aria-hidden />
          </a>
        </div>
      </div>
    </div>
  )
}
