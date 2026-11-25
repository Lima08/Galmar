import { describe, expect, it } from 'vitest'
import { toInternationalDigits } from './phone'

describe('toInternationalDigits', () => {
  it.each([
    ['(19) 3212-1177', '551932121177'],
    ['+55 19 3212-1177', '551932121177'],
    ['019 3212-1177', '551932121177'],
    ['(19) 98234-0942', '5519982340942']
  ])('%s → %s', (phone, expected) => {
    expect(toInternationalDigits(phone)).toBe(expected)
  })
})
