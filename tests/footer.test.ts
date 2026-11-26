import { describe, expect, it } from 'vitest'
import content from '../data/content.json'
import { readSource } from './source-files'

const footer = () => readSource('components/footer.tsx')

describe('rodapé (FT-01)', () => {
  it('fundo secondary-dark, container e logo branco', () => {
    const src = footer()
    expect(src).toMatch(/bg-secondary-dark/)
    expect(src).toContain("className='container")
    expect(src).toContain('/brand/logo-horizontal-white.png')
    expect(src).toContain('content.footer.logoAlt')
  })

  it('endereço, horário e links de contato compartilhados', () => {
    const src = footer()
    expect(src).toContain('formatAddress')
    expect(src).toContain('formatHours')
    expect(src).toContain('defaultWhatsAppUrl')
    expect(src).toContain('phoneHref')
    expect(src).toContain('mailto:')
  })

  it('redes com aria-label do JSON', () => {
    const src = footer()
    expect(src).toContain('social.facebook')
    expect(src).toContain('social.instagram')
    expect(src).toContain('aria-label={social.facebook.label}')
    expect(src).toContain('aria-label={social.instagram.label}')
  })

  it('faixa azul+vermelha de 4 px', () => {
    const src = footer()
    expect(src).toMatch(/h-1/)
    expect(src).toMatch(/(?<![\w:-])bg-secondary(?![\w-])/)
    expect(src).toMatch(/(?<![\w:-])bg-primary(?![\w-])/)
  })

  it('copyright com rights do JSON e sem CNPJ', () => {
    expect(footer()).toContain('content.footer.rights')
    expect(footer()).not.toMatch(/CNPJ|cnpj/)
    expect(content.footer).not.toHaveProperty('cnpj')
    expect(content.footer.rights).toBeTruthy()
    expect(content.footer.logoAlt).toBeTruthy()
  })
})
