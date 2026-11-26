import { describe, expect, it } from 'vitest'
import content from '../data/content.json'
import { readSource } from './source-files'

const brands = () => readSource('components/brands.tsx')
const about = () => readSource('components/about-us.tsx')
const reviews = () => readSource('components/testimonials.tsx')
const css = () => readSource('app/globals.css')

describe('marcas — carrossel (SP-01)', () => {
  it('badge + título do JSON, sem Title Case vago', () => {
    expect(brands()).toContain('content.brands')
    expect(brands()).toContain('{badge}')
    expect(brands()).toContain('{title}')
    expect(content.brands.badge).toBe('Marcas')
    expect(content.brands.title).toBe('Marcas que você encontra na loja')
    expect(content.brands.title).not.toMatch(/As Marcas que Representam/)
  })

  it('carrossel CSS com reduced-motion → grid', () => {
    expect(brands()).toContain('brands-grid')
    expect(brands()).toContain('brands-marquee')
    expect(brands()).toContain('animate-marquee')
    expect(css()).toMatch(/@keyframes marquee/)
    expect(css()).toMatch(
      /@media \(prefers-reduced-motion: no-preference\)[\s\S]*?\.animate-marquee/
    )
    expect(css()).toMatch(
      /min-width: 768px\) and \(prefers-reduced-motion: no-preference\)/
    )
  })
})

describe('sobre — sem cards decorativos (SP-02)', () => {
  it('diferenciais sem border/shadow de card', () => {
    const src = about()
    expect(src).toMatch(/<Section\s+id='about'\s+tone='blue'/)
    expect(src).not.toMatch(/\bborder\b/)
    expect(src).not.toMatch(/\bshadow-/)
    expect(src).not.toMatch(/bg-white\/5/)
    expect(src).toContain('content.features.map')
  })
})

describe('avaliações — padrão visual (SP-03)', () => {
  it('tone tint, formatRating, CTA ≥ 44 px e primary outline', () => {
    const src = reviews()
    expect(src).toMatch(/<Section\s+id='testimonials'\s+tone='tint'/)
    expect(src).toContain('formatRating')
    expect(src).toMatch(/const CTA =\s*'[^']*\bmin-h-11\b/)
    expect(src).toMatch(/(?<![\w:-])border-primary(?![\w-])/)
    expect(src).toMatch(/items\.length > 0/)
  })

  it('summary com as 41 avaliações confirmadas', () => {
    expect(content.reviews.summary).toMatch(/41/)
  })
})
