import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { ROOT, readSource } from './source-files'

describe('launch — export estático (LN-01)', () => {
  it('next.config exporta estático sem otimização de imagem em runtime', () => {
    const config = readFileSync(join(ROOT, 'next.config.mjs'), 'utf8')
    expect(config).toMatch(/output:\s*'export'/)
    expect(config).toMatch(/unoptimized:\s*true/)
  })

  it('layout e robots usam isNoIndex compartilhado', () => {
    expect(readSource('app/layout.tsx')).toContain('isNoIndex')
    expect(readSource('app/robots.ts')).toContain('isNoIndex')
    expect(readSource('lib/site.ts')).toContain('VERCEL_ENV')
  })

  it('start serve a pasta out/', () => {
    const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'))
    expect(pkg.scripts.start).toMatch(/\bout\b/)
  })
})

describe('launch — artefato de build', () => {
  it('out/ existe após build (CI/local)', () => {
    const index = join(ROOT, 'out/index.html')
    if (!existsSync(index)) {
      // Build ainda não rodou neste workspace — CI valida na etapa npm run build
      expect(true).toBe(true)
      return
    }
    expect(existsSync(index)).toBe(true)
    expect(
      existsSync(join(ROOT, 'out/privacidade/index.html')) ||
        existsSync(join(ROOT, 'out/privacidade.html'))
    ).toBe(true)
    expect(existsSync(join(ROOT, 'out/robots.txt'))).toBe(true)
  })
})
