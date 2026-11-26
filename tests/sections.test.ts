import { describe, expect, it } from 'vitest'
import content from '../data/content.json'
import { readSource, sourceFiles } from './source-files'

const brands = () => readSource('components/brands.tsx')
const about = () => readSource('components/about-us.tsx')
const reviews = () => readSource('components/testimonials.tsx')
const section = () => readSource('components/section.tsx')
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
    expect(brands()).toContain('max-w-full min-w-0 overflow-hidden')
    expect(brands()).toContain('animate-marquee')
    expect(css()).toMatch(/@keyframes marquee/)
    expect(css()).toMatch(
      /@media \(prefers-reduced-motion: no-preference\)[\s\S]*?\.animate-marquee/
    )
    expect(css()).toMatch(
      /min-width: 768px\) and \(prefers-reduced-motion: no-preference\)/
    )
  })

  it('pattern só nesta seção, no branco, sem tile próprio', () => {
    const src = brands()
    expect(src).toMatch(
      /<Section\s+id='brands'\s+tone='white'\s+pattern(?:\s|>|=\{true\})/
    )
    expect(src).not.toContain('symbol.png')
    expect(src).not.toContain('brand-pattern')
    expect(src).toContain(
      'inline-block rounded-lg bg-secondary-bg px-3 py-1 text-sm text-secondary-dark'
    )
    expect(src).toContain('text-h2 font-bold text-balance text-secondary')

    const patterned = sourceFiles.filter((file) =>
      /<Section\b[^>]*\bpattern\b/.test(readSource(file).replace(/\s+/g, ' '))
    )
    expect(patterned).toEqual(['components/brands.tsx'])

    for (const file of [
      'components/about-us.tsx',
      'components/testimonials.tsx',
      'components/contact.tsx'
    ]) {
      const other = readSource(file)
      expect(other).not.toContain('brand-pattern')
      expect(other).not.toMatch(/<Section\b[^>]*\bpattern\b/)
    }
  })
})

describe('sobre — sem cards decorativos (SP-02)', () => {
  it('tint com título no painel azul, diferenciais sem border/shadow de card', () => {
    const src = about()
    expect(src).toMatch(/<Section\s+id='about'\s+tone='tint'>/)
    expect(src).not.toMatch(/\bpattern\b/)
    expect(src).not.toContain("tone='blue'")
    expect(src).not.toContain('bg-secondary-dark')
    expect(src).not.toContain('brand-pattern')
    expect(src).not.toContain('text-white/90')
    expect(src).not.toMatch(/\bborder\b/)
    expect(src).not.toMatch(/\bshadow-/)
    expect(src).not.toMatch(/bg-white\/5/)
    expect(src).toContain('content.features.map')

    const badge =
      'inline-block rounded-lg bg-white px-3 py-1 text-sm text-secondary-dark'
    const panel = 'rounded-2xl bg-secondary px-6 py-4 text-white'
    const title = 'text-h2 font-bold text-balance'
    expect(src).toContain(badge)
    expect(src).toContain(panel)
    expect(src).toContain(title)

    const badgeAt = src.indexOf(badge)
    const panelAt = src.indexOf(panel)
    const titleAt = src.indexOf(title)
    const descriptionAt = src.indexOf('content.about.description')
    const featuresAt = src.indexOf('content.features.map')
    expect(badgeAt).toBeLessThan(panelAt)
    expect(panelAt).toBeLessThan(titleAt)
    expect(titleAt).toBeLessThan(descriptionAt)
    expect(descriptionAt).toBeLessThan(featuresAt)

    const panelBlock = src.slice(panelAt, descriptionAt)
    expect(panelBlock).toContain('</div>')
    expect(panelBlock).not.toContain('content.about.description')
    expect(src).toMatch(
      /<p\b[^>]*\btext-foreground\b[^>]*>\s*\{content\.about\.description\}/
    )

    expect(src).toMatch(/<CheckCircle\b[^>]*\btext-secondary-dark\b/)
    expect(src).toMatch(/<h3\b[^>]*\btext-foreground\b/)
    expect(src).toMatch(
      /<p\b[^>]*\btext-foreground\b[^>]*>\{feature\.description\}/
    )
  })
})

describe('avaliações — padrão visual (SP-03)', () => {
  it('tone white, estrela no azul, formatRating, CTA ≥ 44 px e primary outline', () => {
    const src = reviews()
    expect(src).toMatch(/<Section\s+id='testimonials'\s+tone='white'>/)
    expect(src).not.toMatch(/\bpattern\b/)
    expect(src).not.toContain('brand-pattern')
    expect(src).not.toContain('text-rating')
    expect(src).toContain('flex items-center gap-1 text-secondary')
    expect(src).toContain(
      'inline-block rounded-lg bg-secondary-bg px-3 py-1 text-sm text-secondary-dark'
    )
    expect(src).toContain('text-muted-foreground')
    expect(src).toContain('formatRating')
    expect(src).toMatch(/const CTA =\s*'[^']*\bmin-h-11\b/)
    expect(src).toMatch(/(?<![\w:-])border-primary(?![\w-])/)
    expect(src).toMatch(/items\.length > 0/)
  })

  it('summary com as 41 avaliações confirmadas', () => {
    expect(content.reviews.summary).toMatch(/41/)
  })
})

describe('pattern do símbolo (VI-05)', () => {
  it('máscara estática do PNG, sem cor, hex, animação nem reduced-motion', () => {
    const flat = css().replace(/\s+/g, ' ')
    const outsideReduced = flat.replace(
      /@media[^{]*prefers-reduced-motion[^{]*\{(?:[^{}]*\{[^{}]*\})*[^{}]*\}/g,
      ''
    )
    const rule = outsideReduced.match(/\.brand-pattern \{([^}]*)\}/)
    expect(rule).not.toBeNull()
    const body = rule![1]

    expect(body).toContain("mask-image: url('/brand/symbol.png');")
    expect(body).toContain('mask-repeat: repeat;')
    expect(body).toContain('mask-size: 8rem;')
    expect(body).toContain('mask-position: center;')
    expect(body).toContain("-webkit-mask-image: url('/brand/symbol.png');")
    expect(body).toContain('-webkit-mask-repeat: repeat;')
    expect(body).toContain('-webkit-mask-size: 8rem;')
    expect(body).toContain('-webkit-mask-position: center;')

    expect(body).not.toMatch(/#[0-9a-fA-F]{3,8}/)
    expect(body).not.toMatch(/\banimation\b/)
    expect(body).not.toMatch(/\btransform\b/)
    expect(body).not.toMatch(/\b(?:background|color)\b/)
  })
})

describe('Section desenha o pattern (VI-05)', () => {
  it('pattern é opt-in, atrás do container e fora do data-reveal', () => {
    const flat = section().replace(/\s+/g, ' ')

    expect(flat).toMatch(/pattern\?: boolean/)
    expect(flat).toMatch(/pattern = false/)

    expect(flat).toMatch(/white: 'bg-white'/)
    expect(flat).toMatch(/tint: 'bg-secondary-bg'/)

    expect(flat).toMatch(/pattern && 'relative overflow-hidden'/)
    expect(flat).not.toMatch(/'w-full py-16 md:py-24 relative overflow-hidden'/)

    const patternDiv = flat.match(
      /<div aria-hidden className='brand-pattern pointer-events-none absolute inset-0 z-0 bg-secondary opacity-10' \/>/
    )
    expect(patternDiv).not.toBeNull()
    expect(patternDiv![0]).not.toContain('data-reveal')
    expect(patternDiv![0]).toContain('opacity-10')
    expect(flat.indexOf(patternDiv![0])).toBeLessThan(
      flat.indexOf("data-reveal=''")
    )
    expect(flat).toMatch(
      /\{pattern && \( <div aria-hidden className='brand-pattern pointer-events-none absolute inset-0 z-0 bg-secondary opacity-10' \/>/
    )

    expect(flat).toMatch(
      /data-reveal='' className=\{cn\('container', pattern && 'relative z-10'\)\}/
    )
  })
})

describe('Section sem o tom blue (VI-01)', () => {
  it('o mapa TONES não volta a ter blue', () => {
    const src = section()
    const flat = src.replace(/\s+/g, ' ')

    expect(flat).toMatch(
      /const TONES = \{ white: 'bg-white', tint: 'bg-secondary-bg' \}/
    )
    expect(src).not.toMatch(/\bblue\b/)
    expect(src).not.toContain('bg-secondary-dark')
  })
})

describe('carrossel de marcas acessível (LR-06)', () => {
  const css = () => readSource('app/globals.css').replace(/\s+/g, ' ')

  it('pausa com hover, foco ou botão (WCAG 2.2.2)', () => {
    expect(css()).toMatch(
      /\.brands-marquee:hover \.animate-marquee,\s*\.brands-marquee:focus-within \.animate-marquee,\s*\.brands-marquee\[data-paused='true'\] \.animate-marquee \{ animation-play-state: paused; \}/
    )
  })

  it('botão Pausar/Retomar com rótulos do content.json e aria-pressed', () => {
    const toggle = readSource('components/marquee-toggle.tsx')
    expect(toggle).toContain("'use client'")
    expect(toggle).toContain('aria-pressed')
    expect(toggle).toContain('content.brands.pause')
    expect(toggle).toContain('content.brands.resume')
    expect(toggle).toMatch(/\bmin-h-11\b/)
    expect(brands()).toContain('<MarqueeToggle')
    expect(content.brands.pause).toBe('Pausar animação')
    expect(content.brands.resume).toBe('Retomar animação')
  })

  it('cópia do loop fora da árvore de acessibilidade', () => {
    expect(brands()).toMatch(
      /<li[^>]*aria-hidden=\{decorative \|\| undefined\}/
    )
  })
})
