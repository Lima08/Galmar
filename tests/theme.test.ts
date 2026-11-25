import { describe, expect, it } from 'vitest'
import { themeToken } from './source-files'

const CLAMP_WITH_REM_CAP = /^clamp\([\d.]+rem, .+, [\d.]+rem\)$/

describe('tipografia', () => {
  it('usa Poppins (via next/font) como fonte padrão', () => {
    expect(themeToken('font-sans')).toMatch(/^var\(--font-poppins\),/)
  })

  it.each(['display', 'h2', 'h3'] as const)(
    'título %s tem tamanho fluido com teto em rem',
    (token) => {
      expect(themeToken(`text-${token}`)).toMatch(CLAMP_WITH_REM_CAP)
    }
  )
})
