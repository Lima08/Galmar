import { Star } from 'lucide-react'
import Section from '@/components/section'
import content from '@/data/content.json'

export default function Testimonials() {
  return (
    <Section id='testimonials'>
      <div className='flex flex-col items-center justify-center space-y-4 text-center'>
        <div className='space-y-2'>
          <div className='inline-block rounded-lg bg-secondary-bg px-3 py-1 text-sm text-secondary-dark'>
            {content.testimonials.badge}
          </div>
          <h2 className='text-h2 font-bold text-balance text-secondary'>
            {content.testimonials.title}
          </h2>
          <p className='max-w-prose text-muted-foreground md:text-xl'>
            {content.testimonials.description}
          </p>
        </div>
      </div>
      <div className='grid grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3'>
        {content.testimonials.items.map((testimonial) => (
          <div
            key={testimonial.name}
            className='flex flex-col justify-between rounded-lg border bg-white p-6 shadow-sm'>
            <div>
              <div className='flex items-center gap-1 text-rating'>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className='h-4 w-4 fill-current' />
                ))}
              </div>
              <p className='mt-4'>{testimonial.content}</p>
            </div>
            <div className='mt-6 flex items-center gap-4'>
              <div className='rounded-full bg-gray-100 p-1'>
                <div className='h-8 w-8 rounded-full bg-gray-300' />
              </div>
              <div>
                <p className='font-medium'>{testimonial.name}</p>
                <p className='text-sm text-muted-foreground'>
                  {testimonial.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
