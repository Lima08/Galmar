'use client'

import { useState } from 'react'
import { Pause, Play } from 'lucide-react'
import content from '@/data/content.json'

// Pausa o carrossel de marcas (WCAG 2.2.2): marca o container .brands-marquee
export default function MarqueeToggle() {
  const [paused, setPaused] = useState(false)

  const toggle = (button: HTMLButtonElement) => {
    const next = !paused
    button.closest('.brands-marquee')?.setAttribute('data-paused', String(next))
    setPaused(next)
  }

  return (
    <button
      type='button'
      aria-pressed={paused}
      onClick={(event) => toggle(event.currentTarget)}
      className='mx-auto mt-6 flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-medium text-secondary-dark hover:bg-secondary-bg focus-visible:outline-2 focus-visible:outline-secondary-dark'>
      {paused ? (
        <Play className='h-4 w-4' aria-hidden />
      ) : (
        <Pause className='h-4 w-4' aria-hidden />
      )}
      {paused ? content.brands.resume : content.brands.pause}
    </button>
  )
}
