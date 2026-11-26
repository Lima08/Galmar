import { existsSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { ROOT, readSource, sourceFiles } from './source-files'

const KB = 1024
const hero = () => readSource('components/hero.tsx')
const size = (path: string) => statSync(join(ROOT, path)).size

describe('hero enxuto e com ação clara (HR-01, HR-02)', () => {
  it('altura pelo conteúdo, sem min-h-screen', () => {
    expect(hero()).not.toMatch(/min-h-screen/)
  })

  it('no celular, CTAs e selo vêm antes da foto (ordem do DOM)', () => {
    expect(hero().indexOf('ctaBusiness')).toBeLessThan(hero().indexOf('<img'))
    expect(hero().indexOf('trustSince')).toBeLessThan(hero().indexOf('<img'))
  })

  it('CTAs com alvo de toque ≥ 44 px', () => {
    expect(hero()).toMatch(/const CTA =\s*'[^']*\bmin-h-11\b/)
  })

  it('CTA empresa preenchido e CTA casa com contorno, ambos em primary-dark no hover/foco', () => {
    const business =
      hero().match(/<Button(?:(?!<Button)[\s\S])*?ctaBusiness/)?.[0] ?? ''
    const home =
      hero().match(/<Button(?:(?!<Button)[\s\S])*?ctaHome/)?.[0] ?? ''
    expect(business).toMatch(/(?<![\w:-])bg-primary(?![\w-])/)
    expect(home).toMatch(/(?<![\w:-])border-primary(?![\w-])/)
    ;[business, home].forEach((cta) => {
      expect(cta).toMatch(/\bCTA\b/)
      expect(cta).toMatch(/hover:[\w-]*primary-dark/)
      expect(cta).toMatch(/focus-visible:[\w-]*primary-dark/)
    })
  })

  it('selo de confiança usa a mesma nota da seção de avaliações', () => {
    expect(hero()).toContain('formatRating(content.reviews.rating)')
  })
})

describe('foto otimizada e creditada (HR-03)', () => {
  const widths = [640, 960, 1280]

  it.each(widths)('hero-%i.webp existe dentro do orçamento', (w) => {
    const path = `public/assets/hero/hero-${w}.webp`
    expect(existsSync(join(ROOT, path)), path).toBe(true)
    expect(size(path)).toBeLessThanOrEqual((w === 640 ? 60 : 150) * KB)
  })

  it('srcset com as 3 larguras, sizes, dimensões e prioridade', () => {
    widths.forEach((w) =>
      expect(hero()).toContain(`/assets/hero/hero-${w}.webp ${w}w`)
    )
    expect(hero()).toContain(
      "sizes='(min-width: 1264px) 576px, (min-width: 1024px) calc(50vw - 56px), 100vw'"
    )
    expect(hero()).toMatch(/width=\{\d+\}/)
    expect(hero()).toMatch(/height=\{\d+\}/)
    expect(hero()).toContain("fetchPriority='high'")
    expect(hero()).toContain('alt={content.hero.imageAlt}')
  })

  it('créditos da foto registrados', () => {
    const credits = readFileSync(
      join(ROOT, 'public/assets/hero/CREDITS.md'),
      'utf8'
    )
    expect(credits).toContain('Jonathan Borba')
    expect(credits).toContain('pexels.com/photo/')
  })

  it('foto antiga da fachada removida e sem referências', () => {
    expect(existsSync(join(ROOT, 'public/foto-galmar.jpg'))).toBe(false)
    expect(sourceFiles.map(readSource).join('\n')).not.toContain('foto-galmar')
  })
})

describe('grafismo da marca (HR-04)', () => {
  it('símbolo decorativo, ignorado por leitores de tela', () => {
    const symbol =
      hero().match(/<Image\s+src='\/brand\/symbol\.png'[\s\S]*?\/>/)?.[0] ?? ''
    expect(symbol).toMatch(/alt=''\s+aria-hidden/)
    expect(symbol).toMatch(/\bopacity-10\b/)
    expect(symbol).toMatch(/\bpointer-events-none\b/)
    expect(hero()).toMatch(/overflow-hidden/)
  })
})
