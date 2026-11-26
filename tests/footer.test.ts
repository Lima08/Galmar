import { describe, expect, it } from 'vitest'
import content from '../data/content.json'
import { readSource } from './source-files'

const footer = () => readSource('components/footer.tsx')

describe('rodapé (FT-01)', () => {
  it('fundo secondary-dark, container e logo branco', () => {
    const src = footer()
    expect(src).toMatch(/bg-secondary-dark/)
    expect(src).toContain("className='container")
    expect(src).toContain('gap-6 py-10 md:py-12')
    expect(src).toContain('/brand/logo-horizontal-white.png')
    expect(src).toContain('content.footer.logoAlt')
    expect(src).toContain('h-11 w-auto md:h-12')
    expect(src).toContain("href='#home'")
  })

  it('não repete endereço, horário nem links de contato', () => {
    const src = footer()
    for (const token of [
      'formatAddress',
      'formatHours',
      'defaultWhatsAppUrl',
      'phoneHref',
      'mailto:',
      'data-track-location',
      'Clock',
      'Mail',
      'MapPin',
      'Phone',
      'FaWhatsapp',
      'lucide-react',
      'react-icons'
    ]) {
      expect(src, token).not.toContain(token)
    }
    expect(src).not.toMatch(/\bcn\b/)
  })

  it('não repete redes sociais', () => {
    const src = footer()
    expect(src).not.toContain('social.facebook')
    expect(src).not.toContain('social.instagram')
    expect(src).not.toContain('FaFacebookF')
    expect(src).not.toContain('FaInstagram')
  })

  it('não desenha a faixa azul e vermelha no fim', () => {
    const src = footer()
    expect(src).not.toContain('grid-cols-2')
    expect(src).not.toMatch(/(?<![\w:-])bg-secondary(?![\w-])/)
    expect(src).not.toMatch(/(?<![\w:-])bg-primary(?![\w-])/)
  })

  it('copyright com rights do JSON e sem CNPJ', () => {
    expect(footer()).toContain('content.footer.rights')
    expect(footer()).not.toMatch(/CNPJ|cnpj/)
    expect(content.footer).not.toHaveProperty('cnpj')
    expect(content.footer.rights).toBeTruthy()
    expect(content.footer.logoAlt).toBeTruthy()
  })

  it('linka a política de privacidade', () => {
    expect(footer()).toContain('/privacidade')
    expect(footer()).toContain('content.footer.privacy')
  })
})
