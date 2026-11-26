import { describe, expect, it } from 'vitest'
import { readSource } from './source-files'

const bar = () => readSource('components/contact-bar.tsx')
const header = () => readSource('components/header.tsx')

describe('faixa de contato (HC-01, HC-02)', () => {
  it('fica acima do header, no fluxo da página', () => {
    const page = readSource('app/page.tsx')
    expect(page.indexOf('<ContactBar')).toBeGreaterThan(-1)
    expect(page.indexOf('<ContactBar')).toBeLessThan(page.indexOf('<Header'))
  })

  it('links e horário vêm de lib/contact (fonte única, testada em lib/contact.test.ts)', () => {
    expect(bar()).toMatch(/href=\{defaultWhatsAppUrl\}/)
    expect(bar()).toMatch(/href=\{phoneHref\}/)
    expect(bar()).toMatch(/\{shortHours\}/)
  })

  it('texto branco só sobre o azul de apoio (AD-015)', () => {
    expect(bar()).toContain('bg-secondary-dark')
    expect(bar()).not.toMatch(/\bbg-secondary\b(?!-)/)
  })

  it('todos os links da faixa usam o estilo com alvo ≥ 44 px', () => {
    expect(bar()).toMatch(/const LINK =\s*'[^']*\bmin-h-11\b/)
    const links = bar().match(/<a\b/g) ?? []
    const styled = bar().match(/className=\{LINK\}/g) ?? []
    expect(styled.length).toBe(links.length)
  })

  it('links externos com rel seguro e Instagram com rótulo', () => {
    const blank = bar().match(/target='_blank'/g) ?? []
    const rel = bar().match(/rel='noopener noreferrer'/g) ?? []
    expect(rel.length).toBe(blank.length)
    expect(bar()).toContain('aria-label={social.instagram.label}')
  })
})

describe('header (HC-03, HC-05)', () => {
  it('CTA verde de WhatsApp com hover e foco em whatsapp-dark', () => {
    expect(header()).toContain('content.header.cta')
    expect(header()).toContain('bg-whatsapp')
    expect(header()).toMatch(
      /hover:bg-whatsapp-dark[^']*focus-visible:bg-whatsapp-dark|focus-visible:bg-whatsapp-dark[^']*hover:bg-whatsapp-dark/
    )
    expect(header()).toMatch(/href=\{defaultWhatsAppUrl\}/)
    expect(header()).not.toContain('bg-primary')
  })

  it('menu mobile em Sheet: título, itens que fecham o painel e CTA dentro', () => {
    const sheet =
      header().match(/<SheetContent[\s\S]*<\/SheetContent>/)?.[0] ?? ''
    expect(sheet).toContain('<SheetTitle>')
    expect(sheet).toMatch(/<SheetClose asChild[^>]*>\s*<a\s/)
    expect(sheet).toContain('<WhatsAppCta')
  })

  it('botão de menu com rótulo do content.json e alvo ≥ 44 px', () => {
    const trigger =
      header().match(/<SheetTrigger[\s\S]*?<\/SheetTrigger>/)?.[0] ?? ''
    expect(trigger).toMatch(/\bsize-11\b/)
    expect(trigger).toContain('aria-label={content.header.menuOpen}')
  })

  it('sombra correta mesmo se a página abrir já rolada (ex.: /#contact)', () => {
    expect(header()).toMatch(/handleScroll\(\)\s*\n\s*window\.addEventListener/)
  })

  it('logo no mínimo do manual, com folga e alt da marca (VI-03)', () => {
    const logo =
      header().match(
        /<Image[\s\S]*?src='\/brand\/logo-horizontal\.png'[\s\S]*?\/>/
      )?.[0] ?? ''
    expect(logo).toContain('h-14 w-auto md:h-20')
    expect(logo).toContain('width={594}')
    expect(logo).toContain('height={180}')
    expect(logo).toContain('alt={brand}')
    expect(header()).toMatch(/justify-between gap-5/)
    expect(header()).toContain('bg-whatsapp')
  })

  it('menu, botão e link do sheet em text-foreground, sem gray-700 (VI-01)', () => {
    expect(header()).not.toContain('text-gray-700')

    const desktop =
      header().match(/<nav className='hidden[\s\S]*?<\/nav>/)?.[0] ?? ''
    const trigger =
      header().match(/<SheetTrigger[\s\S]*?<\/SheetTrigger>/)?.[0] ?? ''
    const sheetLink =
      header().match(/<SheetClose[\s\S]*?<\/SheetClose>/)?.[0] ?? ''

    for (const el of [desktop, trigger, sheetLink]) {
      expect(el).toContain('text-foreground')
      expect(el).toContain('hover:text-secondary-dark')
    }
  })

  it('altura do header só em --header-h, sem pixel fixo nem md:h no elemento', () => {
    const headerTag = header().match(/<header[\s\S]*?>/)?.[0] ?? ''
    expect(headerTag).toContain('h-(--header-h)')
    expect(headerTag).not.toMatch(/\bmd:h-/)
    expect(header()).not.toMatch(/\bh-\[\d+px\]/)
  })
})
