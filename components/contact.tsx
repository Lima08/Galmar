import { Clock, Mail, MapPin, Navigation, Phone } from 'lucide-react'
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import Section from '@/components/section'
import { Button } from '@/components/ui/button'
import content from '@/data/content.json'
import { formatAddress } from '@/lib/address'
import { defaultWhatsAppUrl, phoneHref } from '@/lib/contact'
import { formatHours } from '@/lib/hours'
import { buildMapsEmbedUrl, buildMapsSearchUrl } from '@/lib/maps'
import { cn } from '@/lib/utils'

const { address, hoursByDay, hoursLabels, phone, email } = content.contact.info
const formattedAddress = formatAddress(address)
const hours = formatHours(hoursByDay, hoursLabels)
const brand = content.header.brand
const directionsUrl = buildMapsSearchUrl(brand, formattedAddress)
const embedUrl = buildMapsEmbedUrl(brand, formattedAddress)

const CTA = 'min-h-11 px-6 text-base focus-visible:ring-primary-dark'
const OUTLINE =
  'border-2 border-white bg-transparent text-white hover:bg-white/10 hover:text-white focus-visible:bg-white/10 focus-visible:text-white'

export default function Contact() {
  return (
    <Section id='contact' tone='blue'>
      <div className='grid items-stretch gap-10 lg:grid-cols-2 lg:gap-12'>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col gap-4'>
            <div className='inline-block w-fit rounded-lg bg-white/15 px-3 py-1 text-sm text-white'>
              {content.contact.badge}
            </div>
            <h2 className='text-h2 font-bold text-balance'>
              {content.contact.title}
            </h2>
            <p className='max-w-prose text-white/90 md:text-xl'>
              {content.contact.description}
            </p>
          </div>

          <div className='flex flex-col gap-4'>
            <div className='flex items-start gap-4'>
              <MapPin
                className='mt-0.5 h-6 w-6 shrink-0 text-white'
                aria-hidden
              />
              <div>
                <h3 className='text-h3 font-bold text-balance'>
                  {content.contact.info.addressTitle}
                </h3>
                <p className='text-white/90'>{formattedAddress}</p>
              </div>
            </div>
            <div className='flex items-start gap-4'>
              <Phone
                className='mt-0.5 h-6 w-6 shrink-0 text-white'
                aria-hidden
              />
              <div>
                <h3 className='text-h3 font-bold text-balance'>
                  {content.contact.info.phoneTitle}
                </h3>
                <p className='text-white/90'>{phone}</p>
              </div>
            </div>
            <div className='flex items-start gap-4'>
              <Mail
                className='mt-0.5 h-6 w-6 shrink-0 text-white'
                aria-hidden
              />
              <div>
                <h3 className='text-h3 font-bold text-balance'>
                  {content.contact.info.emailTitle}
                </h3>
                <p className='text-white/90'>{email}</p>
              </div>
            </div>
            <div className='flex items-start gap-4'>
              <Clock
                className='mt-0.5 h-6 w-6 shrink-0 text-white'
                aria-hidden
              />
              <div>
                <h3 className='text-h3 font-bold text-balance'>
                  {content.contact.info.clockTitle}
                </h3>
                <p className='text-white/90'>{hours}</p>
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap'>
            <Button
              asChild
              size='lg'
              className={cn(
                CTA,
                'bg-primary text-white hover:bg-primary-dark focus-visible:bg-primary-dark'
              )}>
              <a
                href={defaultWhatsAppUrl}
                target='_blank'
                rel='noopener noreferrer'
                data-track-location='onde-estamos'>
                <FaWhatsapp aria-hidden />
                {content.contact.actions.whatsapp}
              </a>
            </Button>
            <Button
              asChild
              size='lg'
              variant='outline'
              className={cn(CTA, OUTLINE)}>
              <a href={phoneHref} data-track-location='onde-estamos'>
                <Phone aria-hidden />
                {content.contact.actions.call}
              </a>
            </Button>
            <Button
              asChild
              size='lg'
              variant='outline'
              className={cn(CTA, OUTLINE)}>
              <a
                href={directionsUrl}
                target='_blank'
                rel='noopener noreferrer'
                data-track-location='onde-estamos'>
                <Navigation aria-hidden />
                {content.contact.actions.directions}
              </a>
            </Button>
          </div>

          <div className='flex gap-3'>
            <Button asChild size='icon' variant='outline' className={OUTLINE}>
              <a
                href={content.contact.social.facebook.url}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={content.contact.social.facebook.label}>
                <FaFacebookF className='h-4 w-4' aria-hidden />
              </a>
            </Button>
            <Button asChild size='icon' variant='outline' className={OUTLINE}>
              <a
                href={content.contact.social.instagram.url}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={content.contact.social.instagram.label}>
                <FaInstagram className='h-4 w-4' aria-hidden />
              </a>
            </Button>
          </div>
        </div>

        <iframe
          title={content.contact.mapTitle}
          src={embedUrl}
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
          className='min-h-80 w-full rounded-2xl border-0 bg-white/10 lg:min-h-full'
          allowFullScreen
        />
      </div>
    </Section>
  )
}
