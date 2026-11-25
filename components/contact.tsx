import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { FaFacebookF, FaInstagram } from 'react-icons/fa'
import { ContactForm } from '@/components/forms/contact-form'
import Section from '@/components/section'
import { Button } from '@/components/ui/button'
import content from '@/data/content.json'
import { formatAddress } from '@/lib/address'
import { formatHours } from '@/lib/hours'

const { address, hoursByDay, hoursLabels } = content.contact.info
const formattedAddress = formatAddress(address)
const hours = formatHours(hoursByDay, hoursLabels)

export default function Contact() {
  return (
    <Section id='contact' tone='blue'>
      <div className='grid gap-6 lg:grid-cols-2 lg:gap-12'>
        <div className='flex flex-col justify-center space-y-4'>
          <div className='space-y-2'>
            <div className='inline-block rounded-lg bg-secondary-bg px-3 py-1 text-sm text-secondary-dark'>
              {content.contact.badge}
            </div>
            <h2 className='text-h2 font-bold text-balance'>
              {content.contact.title}
            </h2>
            <p className='max-w-prose text-white/90 md:text-xl'>
              {content.contact.description}
            </p>
          </div>
          <div className='space-y-4'>
            <div className='flex items-start gap-4'>
              <MapPin className='h-6 w-6 text-white' />
              <div>
                <h3 className='text-h3 font-bold text-balance'>
                  {content.contact.info.addressTitle}
                </h3>
                <p className='text-white/90'>{formattedAddress}</p>
              </div>
            </div>
            <div className='flex items-start gap-4'>
              <Phone className='h-6 w-6 text-white' />
              <div>
                <h3 className='text-h3 font-bold text-balance'>
                  {content.contact.info.phoneTitle}
                </h3>
                <p className='text-white/90'>{content.contact.info.phone}</p>
              </div>
            </div>
            <div className='flex items-start gap-4'>
              <Mail className='h-6 w-6 text-white' />
              <div>
                <h3 className='text-h3 font-bold text-balance'>
                  {content.contact.info.emailTitle}
                </h3>
                <p className='text-white/90'>{content.contact.info.email}</p>
              </div>
            </div>
            <div className='flex items-start gap-4'>
              <Clock className='h-6 w-6 text-white' />
              <div>
                <h3 className='text-h3 font-bold text-balance'>
                  {content.contact.info.clockTitle}
                </h3>
                <p className='text-white/90'>{hours}</p>
              </div>
            </div>
          </div>
          <div className='flex gap-4'>
            <Button asChild size='icon' variant='outline'>
              <a
                href={content.contact.social.facebook.url}
                target='_blank'
                rel='noopener noreferrer'>
                <FaFacebookF className='h-4 w-4 text-secondary-dark' />
                <span className='sr-only'>
                  {content.contact.social.facebook.label}
                </span>
              </a>
            </Button>
            <Button asChild size='icon' variant='outline'>
              <a
                href={content.contact.social.instagram.url}
                target='_blank'
                rel='noopener noreferrer'>
                <FaInstagram className='h-4 w-4 text-secondary-dark' />
                <span className='sr-only'>
                  {content.contact.social.instagram.label}
                </span>
              </a>
            </Button>
          </div>
        </div>
        <div className='rounded-lg border bg-white p-6 text-foreground shadow-xs'>
          <h3 className='text-h3 font-bold text-balance'>
            {content.contact.form.title}
          </h3>
          <ContactForm />
        </div>
      </div>
    </Section>
  )
}
