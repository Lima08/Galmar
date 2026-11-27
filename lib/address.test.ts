import { describe, expect, it } from 'vitest'
import { formatAddress } from './address'

const address = {
  street: 'Av. Jorge Tibiriçá, 1747 – Jardim dos Oliveiras',
  city: 'Campinas',
  state: 'SP',
  postalCode: '13044-125'
}

describe('formatAddress', () => {
  it('endereço completo com CEP, separador "–" consistente', () => {
    expect(formatAddress(address)).toBe(
      'Av. Jorge Tibiriçá, 1747 – Jardim dos Oliveiras, Campinas – SP, 13044-125'
    )
  })

  it('sem CEP para buscas no mapa', () => {
    expect(formatAddress(address, { withPostalCode: false })).toBe(
      'Av. Jorge Tibiriçá, 1747 – Jardim dos Oliveiras, Campinas – SP'
    )
  })
})
