import { describe, expect, it } from 'vitest'
import { readSource, sourceFiles, themeToken } from './source-files'

// Famílias de cor padrão do Tailwind; neutros (gray/neutral/white) são permitidos
const FORBIDDEN_CLASS =
  /\b(?:bg|text|border|ring|from|to|via|fill|stroke|outline|shadow|divide|decoration|accent|caret|placeholder)-(?:black|slate|zinc|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|navy)\b(?:-\d+)?|-\[(?:#|rgb|hsl|color:)[^\]]*\]/g

// Cor literal fora do @theme (inclui style inline)
const HEX_LITERAL = /#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b(?![\w-])/g

const FORBIDDEN_HEX = ['#000957', '#f87171', '#5aa9e1']

// O @theme é a fonte da paleta; fora dele vale a guarda
const THEME_BLOCK = /@theme \{[\s\S]*?\n\}/

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

const color = (name: string) => themeToken(`color-${name}`)
const brand = {
  primary: color('primary'),
  primaryDark: color('primary-dark'),
  secondary: color('secondary'),
  secondaryDark: color('secondary-dark'),
  secondaryBg: color('secondary-bg')
}

describe('paleta do manual', () => {
  it('expõe as cores oficiais e os tons derivados', () => {
    expect(brand.secondary).toBe('#2983c2')
    expect(brand.secondaryDark).toBe('#1f6aa0')
    expect(brand.primary).toBe('#d52825')
    expect(brand.primaryDark).toBe('#b3211f')
    expect(brand.secondaryBg).toMatch(/^#[0-9a-f]{6}$/)
  })

  it('não contém cores fora do manual', () => {
    const tokens = readSource('app/globals.css')
      .match(THEME_BLOCK)![0]
      .toLowerCase()
    FORBIDDEN_HEX.forEach((hex) => expect(tokens).not.toContain(hex))
  })

  it('garante contraste AA (4,5:1) de texto branco nos fundos de texto pequeno', () => {
    expect(contrast('#ffffff', brand.secondaryDark)).toBeGreaterThanOrEqual(4.5)
    expect(contrast('#ffffff', brand.primary)).toBeGreaterThanOrEqual(4.5)
    expect(contrast('#ffffff', brand.primaryDark)).toBeGreaterThanOrEqual(4.5)
  })

  it('garante contraste ≥ 3:1 do azul da marca em títulos sobre o tint', () => {
    expect(contrast(brand.secondary, brand.secondaryBg)).toBeGreaterThanOrEqual(
      3
    )
  })
})

describe('guarda de cores nos componentes', () => {
  it.each(sourceFiles)('%s não usa cor fora da paleta', (file) => {
    const source = readSource(file).replace(THEME_BLOCK, '')
    const hits = [
      ...(source.match(FORBIDDEN_CLASS) ?? []),
      ...(source.match(HEX_LITERAL) ?? [])
    ]
    expect(hits).toEqual([])
  })
})

const WHATSAPP_COLOR_CLASS =
  /\b(?:hover:bg-whatsapp-dark|bg-whatsapp|text-whatsapp)\b/g

describe('exceções de terceiros (AD-016)', () => {
  it('cores oficiais de terceiros ficam só em tokens nomeados', () => {
    expect(color('whatsapp')).toBe('#25d366')
    expect(color('whatsapp-dark')).toBe('#1ebe5d')

    const css = readSource('app/globals.css')
    expect(css).not.toMatch(/--color-rating\b/)
    expect(css).not.toContain('#eab308')
    expect(css).toMatch(/\/\*[^*]*verde[^*]*botão flutuante[^*]*\*\//i)
  })

  it('classes de cor whatsapp só existem em components/whatsapp-button.tsx', () => {
    const allowed = 'components/whatsapp-button.tsx'
    const hits = sourceFiles.flatMap((file) =>
      (readSource(file).match(WHATSAPP_COLOR_CLASS) ?? []).map(
        (match) => `${file}:${match}`
      )
    )

    expect(hits.filter((hit) => !hit.startsWith(`${allowed}:`))).toEqual([])
    expect(hits).toContain(`${allowed}:bg-whatsapp`)
    expect(hits).toContain(`${allowed}:hover:bg-whatsapp-dark`)

    const button = readSource(allowed)
    expect(button).toContain('text-white')
    expect(button).toContain("data-track-location='flutuante'")
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
      expect(contrast(grayHex(name), brand.secondaryBg)).toBeGreaterThanOrEqual(
        4.5
      )
    }
  )

  it('texto principal em cinza escuro (~#333) do manual', () => {
    expect(grayHex('foreground')).toBe('#333333')
  })
})
