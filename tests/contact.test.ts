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

  it('CTAs WhatsApp vermelho, Ligar e Como chegar com alvo ≥ 44 px', () => {
    const src = contact()
    expect(src).toMatch(/const CTA =\s*'[^']*\bmin-h-11\b/)
    expect(src).toContain('defaultWhatsAppUrl')
    expect(src).toContain('phoneHref')
    expect(src).toContain('buildMapsSearchUrl')
    expect(src).toMatch(/(?<![\w:-])bg-primary(?![\w-])/)
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
})
