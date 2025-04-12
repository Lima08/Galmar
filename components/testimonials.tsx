import content from '@/data/content.json'
import { Star } from 'lucide-react'

export default function Testimonials() {
  return (
    <section id='testimonials' className='w-full py-12 md:py-24 lg:py-32'>
      <div className='container px-4 md:px-6'>
        <div className='flex flex-col items-center justify-center space-y-4 text-center'>
          <div className='space-y-2'>
            <div className='inline-block rounded-lg bg-secondary-light px-3 py-1 text-sm text-secondary-dark'>
              {content.testimonials.badge}
            </div>
            <h2 className='text-3xl font-bold tracking-tighter md:text-4xl text-secondary-dark'>
              {content.testimonials.title}
            </h2>
            <p className='max-w-[900px] text-muted-foreground md:text-xl'>
              {content.testimonials.description}
            </p>
          </div>
        </div>
        <div className='mx-auto grid max-w-6xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3'>
          {content.testimonials.items.map((testimonial, index) => (
            <div
              key={index}
              className='flex flex-col justify-between rounded-lg border bg-white p-6 shadow-sm'>
              <div>
                <div className='flex items-center gap-1 text-yellow-500'>
                  <Star className='h-4 w-4 fill-current' />
                  <Star className='h-4 w-4 fill-current' />
                  <Star className='h-4 w-4 fill-current' />
                  <Star className='h-4 w-4 fill-current' />
                  <Star className='h-4 w-4 fill-current' />
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
      </div>
    </section>
  )
}
