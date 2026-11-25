import { describe, expect, it } from 'vitest'
import { buildMapsSearchUrl } from './maps'

describe('buildMapsSearchUrl', () => {
  it('gera busca do Google Maps codificada, sem chave de API', () => {
    expect(
      buildMapsSearchUrl('Galmar', 'Av. Jorge Tibiriçá, 1747 - Campinas')
    ).toBe(
      'https://www.google.com/maps/search/?api=1&query=Galmar%2C%20Av.%20Jorge%20Tibiri%C3%A7%C3%A1%2C%201747%20-%20Campinas'
    )
  })
})
