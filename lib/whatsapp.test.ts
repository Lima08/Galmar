import { describe, expect, it } from 'vitest'
import { buildWhatsAppUrl } from './whatsapp'

describe('buildWhatsAppUrl', () => {
  it('prefixa DDI 55 em número formatado sem DDI', () => {
    expect(buildWhatsAppUrl('(19) 3212-1177', 'oi')).toBe(
      'https://wa.me/551932121177?text=oi'
    )
  })

  it('não duplica DDI já presente', () => {
    expect(buildWhatsAppUrl('+55 19 3212-1177', 'oi')).toBe(
      'https://wa.me/551932121177?text=oi'
    )
  })

  it('codifica a mensagem', () => {
    expect(buildWhatsAppUrl('1932121177', 'Olá, tudo?\nok')).toBe(
      'https://wa.me/551932121177?text=Ol%C3%A1%2C%20tudo%3F%0Aok'
    )
  })
})

describe('buildWhatsAppUrl — DDD 55 e prefixo 0', () => {
  it('prefixa DDI em número local com DDD 55', () => {
    expect(buildWhatsAppUrl('(55) 99999-1234', 'oi')).toBe(
      'https://wa.me/5555999991234?text=oi'
    )
  })

  it('remove 0 de tronco antes de prefixar DDI', () => {
    expect(buildWhatsAppUrl('019 3212-1177', 'oi')).toBe(
      'https://wa.me/551932121177?text=oi'
    )
  })
})
