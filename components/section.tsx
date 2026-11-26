import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const TONES = {
  white: 'bg-white',
  tint: 'bg-secondary-bg'
}

interface SectionProps {
  id: string
  tone?: keyof typeof TONES
  pattern?: boolean
  children: ReactNode
}

export default function Section({
  id,
  tone = 'white',
  pattern = false,
  children
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'w-full py-16 md:py-24',
        pattern && 'relative overflow-hidden',
        TONES[tone]
      )}>
      {pattern && (
        <div
          aria-hidden
          className='brand-pattern pointer-events-none absolute inset-0 z-0 bg-secondary opacity-10'
        />
      )}
      <div
        data-reveal=''
        className={cn('container', pattern && 'relative z-10')}>
        {children}
      </div>
    </section>
  )
}
