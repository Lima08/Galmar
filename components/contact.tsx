import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from 'lucide-react'
import { Button } from '@/components/ui/button'
import content from '@/data/content.json'
import { ContactForm } from '@/components/forms/contact-form'
import { FaFacebookF, FaInstagram } from 'react-icons/fa'

export default function Contact() {
  return (
    <section id='contact' className='w-full py-12 md:py-24 lg:py-32 bg-black'>
      <div className='container px-4 md:px-6 text-white'>
        <div className='grid gap-6 lg:grid-cols-2 lg:gap-12'>
          <div className='flex flex-col justify-center space-y-4'>
            <div className='space-y-2'>
              <div className='inline-block rounded-lg bg-secondary-light px-3 py-1 text-sm text-secondary-dark'>
                {content.contact.badge}
              </div>
              <h2 className='text-3xl font-bold tracking-tighter md:text-4xl'>
                {content.contact.title}
              </h2>
              <p className='max-w-[600px] text-gray-400 md:text-xl'>
                {content.contact.description}
              </p>
            </div>
            <div className='space-y-4'>
              <div className='flex items-start gap-4'>
                <MapPin className='h-6 w-6 text-secondary' />
                <div>
                  <h3 className='font-bold'>
                    {content.contact.info.addressTitle}
                  </h3>
                  <p className='text-gray-400'>
                    {content.contact.info.address}
                  </p>
                </div>
              </div>
              <div className='flex items-start gap-4'>
                <Phone className='h-6 w-6 text-secondary' />
                <div>
                  <h3 className='font-bold'>
                    {content.contact.info.phoneTitle}
                  </h3>
                  <p className='text-gray-400'>{content.contact.info.phone}</p>
                </div>
              </div>
              <div className='flex items-start gap-4'>
                <Mail className='h-6 w-6 text-secondary' />
                <div>
                  <h3 className='font-bold'>
                    {content.contact.info.emailTitle}
                  </h3>
                  <p className='text-gray-400'>{content.contact.info.email}</p>
                </div>
              </div>
              <div className='flex items-start gap-4'>
                <Clock className='h-6 w-6 text-secondary' />
                <div>
                  <h3 className='font-bold'>
                    {content.contact.info.clockTitle}
                  </h3>
                  <p className='text-gray-400'>{content.contact.info.clock}</p>
                </div>
              </div>
            </div>
            <div className='flex gap-4'>
              <Button asChild size='icon' variant='outline'>
                <a
                  href={content.contact.social.facebook}
                  target='_blank'
                  rel='noopener noreferrer'>
                  <FaFacebookF
                    className='h-4 w-4'
                    style={{ color: '#1877F2' }}
                  />
                  <span className='sr-only'>Facebook</span>
                </a>
              </Button>
              <Button asChild size='icon' variant='outline'>
                <a
                  href={content.contact.social.instagram}
                  target='_blank'
                  rel='noopener noreferrer'>
                  <FaInstagram
                    className='h-4 w-4'
                    style={{ color: '#E1306C' }}
                  />
                  <span className='sr-only'>Instagram</span>
                </a>
              </Button>
            </div>
          </div>
          <div className='rounded-lg border bg-white p-6 shadow-sm'>
            <h3 className='text-xl font-bold'>Envie uma mensagem</h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
