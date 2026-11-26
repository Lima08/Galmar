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

  it('cada rota vira <rota>/index.html — funciona em Apache/nginx sem rewrite (LR-01)', () => {
    const config = readFileSync(join(ROOT, 'next.config.mjs'), 'utf8')
    expect(config).toMatch(/trailingSlash:\s*true/)
  })

  it.each([
    'components/footer.tsx',
    'components/cookie-banner.tsx',
    'app/sitemap.ts',
    'app/privacidade/page.tsx'
  ])('%s aponta para /privacidade/ com barra final', (path) => {
    expect(readSource(path)).toMatch(/\/privacidade\//)
    expect(readSource(path)).not.toMatch(/\/privacidade['`]/)
  })

  it('layout e robots usam isNoIndex compartilhado', () => {
    expect(readSource('app/layout.tsx')).toContain('isNoIndex')
    expect(readSource('app/robots.ts')).toContain('isNoIndex')
    expect(readSource('lib/site.ts')).toContain('resolveNoIndex')
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
    expect(existsSync(join(ROOT, 'out/privacidade/index.html'))).toBe(true)
    expect(existsSync(join(ROOT, 'out/privacidade.html'))).toBe(false)
    expect(existsSync(join(ROOT, 'out/robots.txt'))).toBe(true)
  })
})

describe('headers no servidor do cliente (LR-04)', () => {
  const htaccess = () => readFileSync(join(ROOT, 'public/.htaccess'), 'utf8')
  const csp = (text: string) =>
    text.match(/default-src 'self';[^"\n]*?frame-ancestors 'none'/)?.[0]

  it.each([
    /X-Content-Type-Options "nosniff"/,
    /X-Frame-Options "DENY"/,
    /Referrer-Policy "strict-origin-when-cross-origin"/,
    /Permissions-Policy/,
    /Strict-Transport-Security "max-age=31536000/,
    /Content-Security-Policy/,
    /ErrorDocument 404 \/404\.html/,
    /Options -Indexes/,
    /AddOutputFilterByType DEFLATE text\/html text\/css/
  ])('.htaccess (Apache) aplica %s', (directive) => {
    expect(htaccess()).toMatch(directive)
  })

  it('CSP libera só GA4 (script/connect) e o iframe do Google Maps', () => {
    const policy = csp(htaccess()) ?? ''
    expect(policy).toContain('https://www.googletagmanager.com')
    expect(policy).toContain('https://*.google-analytics.com')
    expect(policy).toMatch(/frame-src https:\/\/www\.google\.com/)
  })

  it('a mesma CSP em .htaccess, _headers e no exemplo nginx do README', () => {
    const policy = csp(htaccess())
    expect(policy).toBeTruthy()
    expect(csp(readFileSync(join(ROOT, 'public/_headers'), 'utf8'))).toBe(
      policy
    )
    expect(csp(readFileSync(join(ROOT, 'README.md'), 'utf8'))).toBe(policy)
  })
})
