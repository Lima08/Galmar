import { describe, expect, it } from 'vitest'
import content from '../data/content.json'
import { defaultWhatsAppUrl, phoneHref, shortHours } from './contact'

describe('links de contato derivados do content.json', () => {
  it('telefone em formato internacional para tel:', () => {
    expect(phoneHref).toBe('tel:+551932121177')
  })

  it('WhatsApp padrão com o mesmo número e a mensagem default', () => {
    expect(defaultWhatsAppUrl).toBe(
      `https://wa.me/551932121177?text=${encodeURIComponent(content.contact.whatsappMessages.default)}`
    )
  })

  it('horário curto da faixa a partir dos dados reais', () => {
    expect(shortHours).toBe('Seg–Sex 9h–18h · Sáb 9h–13h')
  })
})
