import { describe, expect, it } from 'vitest'
import { formatHours } from './hours'

const labels = { to: 'às', closed: 'fechado', separator: ' · ' }

const week = [
  { days: 'Segunda a sexta', opens: '09:00', closes: '18:00' },
  { days: 'Sábado', opens: '09:00', closes: '13:00' },
  { days: 'Domingo', closed: true }
]

describe('formatHours', () => {
  it('monta o texto de exibição a partir da estrutura por dia', () => {
    expect(formatHours(week, labels)).toBe(
      'Segunda a sexta: 9h às 18h · Sábado: 9h às 13h · Domingo: fechado'
    )
  })

  it('usa os rótulos recebidos (copy vem do content.json)', () => {
    expect(
      formatHours(week, { to: 'a', closed: 'sem expediente', separator: ' | ' })
    ).toBe(
      'Segunda a sexta: 9h a 18h | Sábado: 9h a 13h | Domingo: sem expediente'
    )
  })

  it.each([
    ['00:00', '12:00', '0h às 12h'],
    ['09:05', '12:45', '9h05 às 12h45'],
    ['08:30', '23:59', '8h30 às 23h59']
  ])('formata %s–%s como "%s"', (opens, closes, expected) => {
    expect(formatHours([{ days: 'Dia', opens, closes }], labels)).toBe(
      `Dia: ${expected}`
    )
  })

  it('lista vazia gera texto vazio', () => {
    expect(formatHours([], labels)).toBe('')
  })
})
