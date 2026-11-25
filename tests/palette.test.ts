import { describe, expect, it } from 'vitest'
import config from '../tailwind.config'
import { readSource, sourceFiles } from './source-files'

// Famílias de cor padrão do Tailwind; neutros (gray/neutral/white) são permitidos
const FORBIDDEN_CLASS =
  /\b(?:bg|text|border|ring|from|to|via|fill|stroke|outline|shadow|divide|decoration|accent|caret|placeholder)-(?:black|slate|zinc|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|navy)\b(?:-\d+)?|-\[(?:#|rgb|hsl|color:)[^\]]*\]/g

// Cor literal fora do tailwind.config (inclui style inline)
const HEX_LITERAL = /#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b(?![\w-])/g

const FORBIDDEN_HEX = ['#000957', '#f87171', '#5aa9e1']

const luminance = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

const contrast = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

const colors = config.theme.extend.colors

describe('paleta do manual', () => {
  it('expõe as cores oficiais e os tons derivados', () => {
    expect(colors.secondary.DEFAULT).toBe('#2983c2')
    expect(colors.secondary.dark).toBe('#1f6aa0')
    expect(colors.primary.DEFAULT).toBe('#d52825')
    expect(colors.primary.dark).toBe('#b3211f')
    expect(colors.secondary.bg).toMatch(/^#[0-9a-f]{6}$/)
  })

  it('não contém cores fora do manual', () => {
    const tokens = JSON.stringify(colors).toLowerCase()
    FORBIDDEN_HEX.forEach((hex) => expect(tokens).not.toContain(hex))
  })

  it('garante contraste AA (4,5:1) de texto branco nos fundos de texto pequeno', () => {
    expect(contrast('#ffffff', colors.secondary.dark)).toBeGreaterThanOrEqual(
      4.5
    )
    expect(contrast('#ffffff', colors.primary.DEFAULT)).toBeGreaterThanOrEqual(
      4.5
    )
    expect(contrast('#ffffff', colors.primary.dark)).toBeGreaterThanOrEqual(4.5)
  })

  it('garante contraste ≥ 3:1 do azul da marca em títulos sobre o tint', () => {
    expect(
      contrast(colors.secondary.DEFAULT, colors.secondary.bg)
    ).toBeGreaterThanOrEqual(3)
  })
})

describe('guarda de cores nos componentes', () => {
  it.each(sourceFiles)('%s não usa cor fora da paleta', (file) => {
    const source = readSource(file)
    const hits = [
      ...(source.match(FORBIDDEN_CLASS) ?? []),
      ...(source.match(HEX_LITERAL) ?? [])
    ]
    expect(hits).toEqual([])
  })
})

describe('exceções de terceiros (AD-016)', () => {
  it('cores oficiais de terceiros ficam só em tokens nomeados', () => {
    expect(colors.whatsapp).toEqual({ DEFAULT: '#25d366', dark: '#1ebe5d' })
    expect(colors.rating).toBe('#eab308')
  })
})

describe('neutros de texto', () => {
  const css = readSource('app/globals.css')

  const grayHex = (name: string) => {
    const match = css.match(new RegExp(`--${name}: 0 0% ([\\d.]+)%`))
    if (!match)
      throw new Error(`--${name} ausente ou fora do formato "0 0% N%"`)
    const level = Math.round((Number(match[1]) / 100) * 255)
    return `#${level.toString(16).padStart(2, '0').repeat(3)}`
  }

  it.each(['foreground', 'muted-foreground'])(
    '--%s tem contraste AA no branco e no tint',
    (name) => {
      expect(contrast(grayHex(name), '#ffffff')).toBeGreaterThanOrEqual(4.5)
      expect(
        contrast(grayHex(name), colors.secondary.bg)
      ).toBeGreaterThanOrEqual(4.5)
    }
  )

  it('texto principal em cinza escuro (~#333) do manual', () => {
    expect(grayHex('foreground')).toBe('#333333')
  })
})
