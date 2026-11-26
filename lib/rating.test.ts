import { describe, expect, it } from 'vitest'
import { formatRating } from './rating'

describe('formatRating', () => {
  it.each([
    [5, '5,0'],
    [4.8, '4,8'],
    [4.75, '4,8']
  ])('%d → "%s"', (rating, expected) => {
    expect(formatRating(rating)).toBe(expected)
  })
})
