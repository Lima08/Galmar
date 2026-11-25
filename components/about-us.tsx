import { CheckCircle } from 'lucide-react'
import Section from '@/components/section'
import content from '@/data/content.json'

export default function AboutUs() {
  return (
    <Section id='about' tone='blue'>
      <div className='flex flex-col items-center justify-center space-y-4 text-center'>
        <div className='space-y-2'>
          <div className='inline-block rounded-lg bg-white/10 px-3 py-1 text-sm text-white'>
            {content.about.badge}
          </div>
          <h2 className='text-h2 font-bold text-balance text-white'>
            {content.about.title}
          </h2>
          <p className='max-w-prose text-white/90 md:text-xl'>
            {content.about.description}
          </p>
        </div>
      </div>
      <div className='grid grid-cols-1 gap-6 py-12 md:grid-cols-3 md:gap-8'>
        {content.features.map((feature) => (
          <div
            key={feature.title}
            className='flex flex-col items-center space-y-2 rounded-lg border border-white/10 p-6 shadow-xs bg-white/5'>
            <div className='rounded-full bg-white/10 p-3'>
              <CheckCircle className='h-6 w-6 text-white' />
            </div>
            <h3 className='text-h3 font-bold text-balance text-white'>
              {feature.title}
            </h3>
            <p className='text-center text-white/90'>{feature.description}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
