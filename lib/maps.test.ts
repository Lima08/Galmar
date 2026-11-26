import { describe, expect, it } from 'vitest'
import { buildMapsEmbedUrl, buildMapsSearchUrl } from './maps'

const address = 'Av. Jorge Tibiriçá, 1747 - Campinas'
const encoded =
  'Galmar%2C%20Av.%20Jorge%20Tibiri%C3%A7%C3%A1%2C%201747%20-%20Campinas'

describe('buildMapsSearchUrl', () => {
  it('gera busca do Google Maps codificada, sem chave de API', () => {
    expect(buildMapsSearchUrl('Galmar', address)).toBe(
      `https://www.google.com/maps/search/?api=1&query=${encoded}`
    )
  })
})

describe('buildMapsEmbedUrl', () => {
  it('gera embed do Google Maps sem chave de API', () => {
    expect(buildMapsEmbedUrl('Galmar', address)).toBe(
      `https://www.google.com/maps?q=${encoded}&output=embed`
    )
  })
})
