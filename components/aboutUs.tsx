import content from '@/data/content.json'
import { CheckCircle } from 'lucide-react'

export default function AboutUs() {
  return (
    <section id='about' className='w-full py-12 md:py-24 lg:py-32 bg-black'>
      <div className='container px-4 md:px-6'>
        <div className='flex flex-col items-center justify-center space-y-4 text-center'>
          <div className='space-y-2'>
            <div className='inline-block rounded-lg bg-white/10 px-3 py-1 text-sm text-white'>
              {content.about.badge}
            </div>
            <h2 className='text-3xl font-bold tracking-tighter md:text-4xl text-white'>
              {content.about.title}
            </h2>
            <p className='max-w-[900px] text-gray-400 md:text-xl'>
              {content.about.description}
            </p>
          </div>
        </div>
        <div className='mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3 md:gap-8'>
          {content.features.map((feature, index) => (
            <div
              key={index}
              className='flex flex-col items-center space-y-2 rounded-lg border border-white/10 p-6 shadow-sm bg-white/5'>
              <div className='rounded-full bg-white/10 p-3'>
                <CheckCircle className='h-6 w-6 text-white' />
              </div>
              <h3 className='text-xl font-bold text-white'>{feature.title}</h3>
              <p className='text-center text-gray-400'>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
