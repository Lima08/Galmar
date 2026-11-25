import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const TONES = {
  white: 'bg-white',
  tint: 'bg-secondary-bg',
  blue: 'bg-secondary-dark text-white'
}

interface SectionProps {
  id: string
  tone?: keyof typeof TONES
  children: ReactNode
}

export default function Section({
  id,
  tone = 'white',
  children
}: SectionProps) {
  return (
    <section id={id} className={cn('w-full py-16 md:py-24', TONES[tone])}>
      <div data-reveal='' className='container'>
        {children}
      </div>
    </section>
  )
}
