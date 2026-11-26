import Image from 'next/image'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import content from '@/data/content.json'
import { formatAddress } from '@/lib/address'
import { defaultWhatsAppUrl, phoneHref } from '@/lib/contact'
import { formatHours } from '@/lib/hours'
import { cn } from '@/lib/utils'

const { info, social } = content.contact
const address = formatAddress(info.address)
const hours = formatHours(info.hoursByDay, info.hoursLabels)
const year = new Date().getFullYear()

const LINK =
  'inline-flex min-h-11 items-center gap-2 rounded-md font-medium text-white/90 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-white'

export default function Footer() {
  return (
    <footer className='w-full bg-secondary-dark text-white'>
      <div className='container flex flex-col gap-10 py-12 md:py-16'>
        <a href='#home' className='w-fit'>
          <Image
            src='/brand/logo-horizontal-white.png'
            alt={content.footer.logoAlt}
            width={594}
            height={180}
            className='h-11 w-auto md:h-12'
          />
        </a>

        <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          <div className='flex items-start gap-3'>
            <MapPin className='mt-0.5 h-5 w-5 shrink-0' aria-hidden />
            <div>
              <p className='font-medium'>{info.addressTitle}</p>
              <p className='text-white/90'>{address}</p>
            </div>
          </div>

          <div className='flex items-start gap-3'>
            <Clock className='mt-0.5 h-5 w-5 shrink-0' aria-hidden />
            <div>
              <p className='font-medium'>{info.clockTitle}</p>
              <p className='text-white/90'>{hours}</p>
            </div>
          </div>

          <div className='flex flex-col gap-3 sm:col-span-2 lg:col-span-1'>
            <a
              href={defaultWhatsAppUrl}
              target='_blank'
              rel='noopener noreferrer'
              data-track-location='rodape'
              className={LINK}>
              <FaWhatsapp className='h-4 w-4' aria-hidden />
              {content.contactBar.whatsapp}
              <span className='hidden sm:inline'>{info.phone}</span>
            </a>
            <a href={phoneHref} data-track-location='rodape' className={LINK}>
              <Phone className='h-4 w-4' aria-hidden />
              {content.contactBar.call}
            </a>
            <a href={`mailto:${info.email}`} className={LINK}>
              <Mail className='h-4 w-4' aria-hidden />
              {info.email}
            </a>
            <div className='flex gap-2 pt-1'>
              <a
                href={social.facebook.url}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={social.facebook.label}
                className={cn(LINK, 'size-11 justify-center')}>
                <FaFacebookF className='h-4 w-4' aria-hidden />
              </a>
              <a
                href={social.instagram.url}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={social.instagram.label}
                className={cn(LINK, 'size-11 justify-center')}>
                <FaInstagram className='h-4 w-4' aria-hidden />
              </a>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-2 border-t border-white/15 pt-6 text-sm text-white/80 sm:flex-row sm:items-center sm:justify-between'>
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

      <div className='flex h-1' aria-hidden>
        <div className='w-1/2 bg-secondary' />
        <div className='w-1/2 bg-primary' />
      </div>
    </footer>
  )
}
