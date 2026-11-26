import { describe, expect, it } from 'vitest'
import content from '../data/content.json'
import { readSource } from './source-files'

const contact = () => readSource('components/contact.tsx')

describe('seção Onde estamos (LS-01)', () => {
  it('usa Section id=contact e não tem formulário', () => {
    expect(contact()).toMatch(/<Section\s+id='contact'/)
    expect(contact()).not.toMatch(
      /ContactForm|contact\.form|forms\/contact-form/
    )
  })

  it('mostra endereço, horário, telefone e e-mail do JSON', () => {
    expect(contact()).toContain('formatAddress(address)')
    expect(contact()).toContain('formatHours(hoursByDay, hoursLabels)')
    expect(contact()).toContain('{phone}')
    expect(contact()).toContain('{email}')
  })

  it('CTA WhatsApp verde, Ligar e Como chegar com alvo ≥ 44 px', () => {
    const src = contact()
    expect(src).toMatch(/const CTA =\s*'[^']*\bmin-h-11\b/)
    expect(src).toContain('defaultWhatsAppUrl')
    expect(src).toContain('phoneHref')
    expect(src).toContain('buildMapsSearchUrl')
    expect(src).toContain('bg-whatsapp')
    expect(src).not.toContain('bg-primary')
    expect(src).toContain('content.contact.actions.whatsapp')
    expect(src).toContain('content.contact.actions.call')
    expect(src).toContain('content.contact.actions.directions')
  })

  it('redes com URL e rótulo do JSON', () => {
    const src = contact()
    expect(src).toContain('content.contact.social.facebook.url')
    expect(src).toContain('content.contact.social.facebook.label')
    expect(src).toContain('content.contact.social.instagram.url')
    expect(src).toContain('content.contact.social.instagram.label')
  })

  it('menu chama a seção de "Onde estamos"', () => {
    const nav = content.header.nav.find((item) => item.id === 'contact')
    expect(nav?.name, 'header.nav[contact].name').toBe('Onde estamos')
  })
})

describe('mapa embed lazy (LS-02)', () => {
  it('iframe com loading lazy, title do JSON e embed helper', () => {
    const src = contact()
    expect(src).toMatch(/<iframe[\s\S]*loading='lazy'/)
    expect(src).toContain('title={content.contact.mapTitle}')
    expect(src).toContain('buildMapsEmbedUrl')
    expect(src).toContain('src={embedUrl}')
  })

  it('content.json não tem contact.form', () => {
    expect(content.contact).not.toHaveProperty('form')
    expect(content.contact.mapTitle).toBeTruthy()
    expect(content.contact.actions).toEqual({
      whatsapp: 'WhatsApp',
      call: 'Ligar',
      directions: 'Como chegar'
    })
  })

  it('iframe com fundo branco opaco', () => {
    const iframe = contact().match(/<iframe[\s\S]*?\/>/)?.[0] ?? ''
    expect(iframe).toMatch(/(?<![\w:-])bg-white(?![\w/-])/)
    expect(iframe).not.toContain('bg-white/10')
  })
})

describe('Onde estamos no tint (VI-01, VI-02)', () => {
  it('seção em tint, sem pattern e sem o retângulo blue', () => {
    const src = contact()
    expect(src).toMatch(/<Section id='contact' tone='tint'>/)
    expect(src).not.toContain("tone='blue'")
    expect(src).not.toContain('brand-pattern')
    expect(src).not.toMatch(/\bpattern\b/)
  })

  it('badge claro e título branco só no painel bg-secondary', () => {
    const src = contact()
    expect(src).toContain('bg-white text-secondary-dark')

    const titlePanel =
      src.match(
        /<div className='rounded-2xl bg-secondary px-6 py-4 text-white'>([\s\S]*?)<\/div>/
      )?.[1] ?? ''
    expect(titlePanel).toContain('text-h2 font-bold')
    expect(titlePanel).toContain('{content.contact.title}')
    expect(titlePanel).not.toContain('badge')
    expect(titlePanel).not.toContain('description')
    expect(titlePanel).not.toContain('actions')
  })

  it('corpo em foreground e ícones de contato em secondary-dark', () => {
    const src = contact()
    expect(src).toContain('text-foreground')
    expect(src).not.toContain('text-white/90')

    for (const name of ['MapPin', 'Mail', 'Clock']) {
      const tag = src.match(new RegExp(`<${name}[\\s\\S]*?/>`))?.[0] ?? ''
      expect(tag, name).toContain('text-secondary-dark')
    }

    const infoPhone = src.match(/<Phone[\s\S]*?\/>/)?.[0] ?? ''
    expect(infoPhone).toContain('text-secondary-dark')
  })

  it('WhatsApp verde no tint, antes do painel de Ligar e Como chegar', () => {
    const src = contact()
    const whatsappAt = src.indexOf('content.contact.actions.whatsapp')
    const darkAt = src.indexOf('bg-secondary-dark')
    expect(whatsappAt).toBeGreaterThan(-1)
    expect(darkAt).toBeGreaterThan(whatsappAt)

    expect(src).toContain('hover:bg-whatsapp-dark')
    expect(src).toContain('bg-whatsapp')

    const panelAt = src.indexOf('rounded-2xl bg-secondary-dark p-3')
    const socialAt = src.indexOf('content.contact.social.facebook')
    expect(panelAt).toBeGreaterThan(whatsappAt)
    const panel = src.slice(panelAt, socialAt)
    expect(panel).toContain('rounded-2xl bg-secondary-dark p-3')
    expect(panel).toContain('content.contact.actions.call')
    expect(panel).toContain('content.contact.actions.directions')
    expect(panel).not.toContain('whatsapp')
    expect(panel).toContain('OUTLINE')
    expect(src).toMatch(/const CTA =\s*'[^']*\bmin-h-11\b/)
    expect(src).toMatch(
      /const OUTLINE =\s*'[^']*border-2 border-white[^']*text-white[^']*hover:bg-white\/10/
    )
  })

  it('redes fora do painel escuro, com ícone secondary-dark', () => {
    const src = contact()
    const darkAt = src.indexOf('bg-secondary-dark')
    const facebookAt = src.indexOf('content.contact.social.facebook')
    const instagramAt = src.indexOf('content.contact.social.instagram')
    expect(facebookAt).toBeGreaterThan(darkAt)
    expect(instagramAt).toBeGreaterThan(darkAt)
    expect(src).toContain(
      'border-2 border-secondary-dark text-secondary-dark bg-white hover:bg-secondary-bg'
    )
  })
})
