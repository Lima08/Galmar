import { describe, expect, it } from 'vitest'
import config from '../tailwind.config'

const CLAMP_WITH_REM_CAP = /^clamp\([\d.]+rem, .+, [\d.]+rem\)$/

describe('tipografia', () => {
  it('usa Poppins (via next/font) como fonte padrão', () => {
    expect(config.theme.extend.fontFamily.sans[0]).toBe('var(--font-poppins)')
  })

  it.each(['display', 'h2', 'h3'] as const)(
    'título %s tem tamanho fluido com teto em rem',
    (token) => {
      const [size] = config.theme.extend.fontSize[token]
      expect(size).toMatch(CLAMP_WITH_REM_CAP)
    }
  )
})
