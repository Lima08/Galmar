import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from 'lucide-react'
import { Button } from '@/components/ui/button'
import content from '@/data/content.json'
import { ContactForm } from '@/components/forms/contact-form'

export default function Contact() {
  return (
    <section id='contato' className='w-full py-12 md:py-24 lg:py-32 bg-teal-50'>
      <div className='container px-4 md:px-6'>
        <div className='grid gap-6 lg:grid-cols-2 lg:gap-12'>
          <div className='flex flex-col justify-center space-y-4'>
            <div className='space-y-2'>
              <div className='inline-block rounded-lg bg-teal-100 px-3 py-1 text-sm text-teal-700'>
                {content.contato.badge}
              </div>
              <h2 className='text-3xl font-bold tracking-tighter md:text-4xl'>
                {content.contato.title}
              </h2>
              <p className='max-w-[600px] text-muted-foreground md:text-xl'>
                {content.contato.description}
              </p>
            </div>
            <div className='space-y-4'>
              <div className='flex items-start gap-4'>
                <MapPin className='h-6 w-6 text-teal-600' />
                <div>
                  <h3 className='font-bold'>
                    {content.contato.info.addressTitle}
                  </h3>
                  <p className='text-muted-foreground'>
                    {content.contato.info.address}
                  </p>
                </div>
              </div>
              <div className='flex items-start gap-4'>
                <Phone className='h-6 w-6 text-teal-600' />
                <div>
                  <h3 className='font-bold'>
                    {content.contato.info.phoneTitle}
                  </h3>
                  <p className='text-muted-foreground'>
                    {content.contato.info.phone}
                  </p>
                </div>
              </div>
              <div className='flex items-start gap-4'>
                <Mail className='h-6 w-6 text-teal-600' />
                <div>
                  <h3 className='font-bold'>
                    {content.contato.info.emailTitle}
                  </h3>
                  <p className='text-muted-foreground'>
                    {content.contato.info.email}
                  </p>
                </div>
              </div>
              <div className='flex items-start gap-4'>
                <Clock className='h-6 w-6 text-teal-600' />
                <div>
                  <h3 className='font-bold'>
                    {content.contato.info.clockTitle}
                  </h3>
                  <p className='text-muted-foreground'>
                    {content.contato.info.clock}
                  </p>
                </div>
              </div>
            </div>
            <div className='flex gap-4'>
              <Button size='icon' variant='outline'>
                <Facebook className='h-4 w-4' />
                <span className='sr-only'>Facebook</span>
              </Button>
              <Button size='icon' variant='outline'>
                <Instagram className='h-4 w-4' />
                <span className='sr-only'>Instagram</span>
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
