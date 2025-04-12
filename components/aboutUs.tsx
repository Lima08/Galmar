import content from '@/data/content.json'
import { CheckCircle } from 'lucide-react'

export default function AboutUs() {
  return (
    <section id='sobre' className='w-full py-12 md:py-24 lg:py-32'>
      <div className='container px-4 md:px-6'>
        <div className='flex flex-col items-center justify-center space-y-4 text-center'>
          <div className='space-y-2'>
            <div className='inline-block rounded-lg bg-teal-100 px-3 py-1 text-sm text-teal-700'>
              {content.sobre.badge}
            </div>
            <h2 className='text-3xl font-bold tracking-tighter md:text-4xl'>
              {content.sobre.title}
            </h2>
            <p className='max-w-[900px] text-muted-foreground md:text-xl'>
              {content.sobre.description}
            </p>
          </div>
        </div>
        <div className='mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3 md:gap-8'>
          {content.features.map((feature, index) => (
            <div
              key={index}
              className='flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm'>
              <div className='rounded-full bg-teal-100 p-3'>
                <CheckCircle className='h-6 w-6 text-teal-600' />
              </div>
              <h3 className='text-xl font-bold'>{feature.title}</h3>
              <p className='text-center text-muted-foreground'>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
