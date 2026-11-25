import { describe, expect, it } from 'vitest'
import config from '../tailwind.config'
import { readSource, sourceFiles } from './source-files'

const tsxFiles = sourceFiles.filter((file) => file.endsWith('.tsx'))

// Larguras próprias competem com o container único (DF-04); max-w-prose é DF-05
const OWN_WIDTH =
  /\bmax-w-(?!prose\b|none\b|full\b)[\w[\].-]+|\bw-\[\d+(?:px|rem)\]/g
// Mesma tag JSX (até o `>`), inclusive cn() multilinha
const CONTAINER_WITH_PADDING = /\bcontainer\b[^>]*?\bpx-\d/g

describe('container único', () => {
  it('conteúdo máximo de 1200 px (1264 px com margens de 32 px)', () => {
    const css = readSource('app/globals.css')
    const flat = css.replace(/\s+/g, ' ')

    expect(config.corePlugins).toEqual({ container: false })
    expect(flat).toMatch(
      /\.container \{[^}]*max-width: 79rem;[^}]*padding-inline: 1rem;/
    )
    expect(flat).toMatch(
      /@media \(min-width: 768px\) \{ \.container \{ padding-inline: 2rem; \} \}/
    )
  })

  it.each(tsxFiles)('%s não define largura nem margem própria', (file) => {
    const source = readSource(file)
    const offending = [
      ...(source.match(OWN_WIDTH) ?? []),
      ...(source.match(CONTAINER_WITH_PADDING) ?? [])
    ]
    expect(offending).toEqual([])
  })
})

describe('primitiva de seção', () => {
  it.each(['brands.tsx', 'about-us.tsx', 'testimonials.tsx', 'contact.tsx'])(
    '%s usa <Section>',
    (file) => {
      const source = readSource(`components/${file}`)
      expect(source).toMatch(/<Section\b/)
      expect(source).not.toMatch(/<section\b/)
    }
  )
})

describe('altura do header em um único lugar', () => {
  it('define --header-h uma vez no CSS global', () => {
    expect(readSource('app/globals.css').match(/--header-h:/g)).toHaveLength(1)
  })

  it.each(['app/layout.tsx', 'app/page.tsx', 'components/header.tsx'])(
    '%s usa var(--header-h) e nenhuma altura fixa',
    (path) => {
      const source = readSource(path)
      expect(source).toContain('var(--header-h)')
      expect(source).not.toMatch(/(?:scroll-pt|mt|h)-\[\d+px\]/)
    }
  )
})

describe('globals.css sem variáveis não usadas', () => {
  it('não tem --sidebar-*, --chart-* nem bloco .dark', () => {
    const css = readSource('app/globals.css')
    expect(css).not.toMatch(/--sidebar-|--chart-|^\s*\.dark\s*\{/m)
  })
})

describe('animação de entrada degrada com segurança (DF-10)', () => {
  const flat = readSource('app/globals.css').replace(/\s+/g, ' ')

  it('só oculta [data-reveal] dentro de prefers-reduced-motion: no-preference', () => {
    const outsideMedia = flat.replace(
      /@media \(prefers-reduced-motion: no-preference\) \{(?:[^{}]*\{[^{}]*\})*[^{}]*\}/,
      ''
    )
    expect(flat).toMatch(
      /@media \(prefers-reduced-motion: no-preference\) \{ \[data-reveal='hidden'\] \{ opacity: 0;/
    )
    expect(outsideMedia).not.toContain('data-reveal')
  })

  it('Section renderiza o conteúdo visível por padrão', () => {
    expect(readSource('components/section.tsx')).toContain("data-reveal=''")
  })
})
