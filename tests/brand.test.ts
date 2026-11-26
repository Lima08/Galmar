import { existsSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import content from '../data/content.json'
import { ROOT, readSource, sourceFiles } from './source-files'

const KB = 1024

// Cabeçalho PNG: largura/altura no IHDR; color type 6 = RGBA
const pngInfo = (path: string) => {
  const bytes = readFileSync(join(ROOT, path))
  if (bytes.toString('ascii', 12, 16) !== 'IHDR')
    throw new Error(`${path} não é um PNG válido`)
  return {
    width: bytes.readUInt32BE(16),
    height: bytes.readUInt32BE(20),
    hasAlpha: bytes[25] === 6,
    size: statSync(join(ROOT, path)).size
  }
}

const KIT = [
  'public/brand/logo-horizontal.png',
  'public/brand/logo-horizontal-white.png',
  'public/brand/logo-vertical.png',
  'public/brand/symbol.png'
]

describe('kit de logos provisório (BA-01)', () => {
  it.each(KIT)('%s existe, é transparente e tem ≤ 60 KB', (path) => {
    const info = pngInfo(path)
    expect(info.hasAlpha, path).toBe(true)
    expect(info.size, path).toBeLessThanOrEqual(60 * KB)
  })

  it('versão horizontal é bem mais larga que alta (símbolo + nome lado a lado)', () => {
    const { width, height } = pngInfo('public/brand/logo-horizontal.png')
    expect(width / height).toBeGreaterThan(2.8)
    expect(width / height).toBeLessThan(3.8)
  })

  it('versão branca tem as mesmas dimensões da colorida', () => {
    const color = pngInfo('public/brand/logo-horizontal.png')
    const white = pngInfo('public/brand/logo-horizontal-white.png')
    expect([white.width, white.height]).toEqual([color.width, color.height])
  })

  it('símbolo é quadrado (base dos ícones)', () => {
    const { width, height } = pngInfo('public/brand/symbol.png')
    expect(width).toBe(height)
  })
})

describe('ícones e compartilhamento (BA-03)', () => {
  it.each([
    ['app/icon.png', 512, 512],
    ['app/apple-icon.png', 180, 180],
    ['public/brand/og.png', 1200, 630]
  ])('%s tem %ix%i', (path, width, height) => {
    const info = pngInfo(path)
    expect([info.width, info.height]).toEqual([width, height])
  })

  it('ícone da Apple é opaco (iOS pinta transparência de preto)', () => {
    expect(pngInfo('app/apple-icon.png').hasAlpha).toBe(false)
  })

  it('imagem de compartilhamento tem ≤ 150 KB', () => {
    expect(pngInfo('public/brand/og.png').size).toBeLessThanOrEqual(150 * KB)
  })
})

describe('uso no código (BA-02, BA-03)', () => {
  const code = sourceFiles.map(readSource).join('\n')

  it('header usa a versão horizontal', () => {
    expect(readSource('components/header.tsx')).toContain(
      '/brand/logo-horizontal.png'
    )
  })

  it('rodapé usa a versão horizontal branca', () => {
    expect(readSource('components/footer.tsx')).toContain(
      '/brand/logo-horizontal-white.png'
    )
  })

  it('JSON-LD aponta para o logo vertical', () => {
    expect(readSource('app/layout.tsx')).toContain('/brand/logo-vertical.png')
  })

  it('logo antigo removido e sem referências', () => {
    expect(existsSync(join(ROOT, 'public/logo-galmar.png'))).toBe(false)
    expect(code).not.toContain('logo-galmar.png')
  })

  it('OG aponta para a imagem da marca com as dimensões reais do arquivo', () => {
    const layout = readSource('app/layout.tsx')
    const openGraph = layout.match(/openGraph: \{[\s\S]*?\n  \}/)?.[0] ?? ''
    const { width, height } = pngInfo('public/brand/og.png')
    expect(openGraph).toContain("url: '/brand/og.png'")
    expect(openGraph).toContain(`width: ${width}`)
    expect(openGraph).toContain(`height: ${height}`)
    expect(openGraph).not.toContain('foto-galmar')
  })
})

describe('logos das marcas revendidas (LR-05)', () => {
  it.each(content.brands.items.map((item) => item.image))(
    '%s tem ≤ 30 KB e no máximo 2× a altura exibida (160 px)',
    (image) => {
      const info = pngInfo(`public${image}`)
      expect(info.size).toBeLessThanOrEqual(30 * KB)
      expect(info.height).toBeLessThanOrEqual(160)
    }
  )
})
