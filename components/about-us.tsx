import { CheckCircle } from 'lucide-react'
import Section from '@/components/section'
import content from '@/data/content.json'

export default function AboutUs() {
  return (
    <Section id='about' tone='tint'>
      <div className='flex flex-col items-center gap-4 text-center'>
        <div className='inline-block rounded-lg bg-white px-3 py-1 text-sm text-secondary-dark'>
          {content.about.badge}
        </div>
        <div className='rounded-2xl bg-secondary px-6 py-4 text-white'>
          <h2 className='text-h2 font-bold text-balance'>
            {content.about.title}
          </h2>
        </div>
        <p className='max-w-prose text-foreground md:text-xl'>
          {content.about.description}
        </p>
      </div>
      <div className='grid grid-cols-1 gap-10 pt-12 md:grid-cols-3 md:gap-8'>
        {content.features.map((feature) => (
          <div
            key={feature.title}
            className='flex flex-col items-center gap-3 text-center'>
            <CheckCircle className='h-8 w-8 text-secondary-dark' aria-hidden />
            <h3 className='text-h3 font-bold text-balance text-foreground'>
              {feature.title}
            </h3>
            <p className='max-w-prose text-foreground'>{feature.description}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
