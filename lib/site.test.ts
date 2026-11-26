import { afterEach, describe, expect, it, vi } from 'vitest'
import { resolveNoIndex, resolveSiteUrl } from './site'

describe('resolveSiteUrl (LR-02)', () => {
  it('usa NEXT_PUBLIC_SITE_URL sem barra final', () => {
    expect(
      resolveSiteUrl({ NEXT_PUBLIC_SITE_URL: 'https://galmar.com.br/' })
    ).toBe('https://galmar.com.br')
  })

  it('na Vercel, sem URL explícita, usa a URL do deploy', () => {
    expect(
      resolveSiteUrl({
        NODE_ENV: 'production',
        VERCEL: '1',
        VERCEL_URL: 'galmar-abc.vercel.app'
      })
    ).toBe('https://galmar-abc.vercel.app')
  })

  it('em desenvolvimento/teste cai para localhost', () => {
    expect(resolveSiteUrl({ NODE_ENV: 'development' })).toBe(
      'http://localhost:3000'
    )
  })

  it('build de produção fora da Vercel sem URL falha com mensagem clara', () => {
    expect(() => resolveSiteUrl({ NODE_ENV: 'production' })).toThrow(
      /NEXT_PUBLIC_SITE_URL/
    )
  })
})

describe('resolveNoIndex (LR-03)', () => {
  it.each([
    [{ VERCEL: '1', VERCEL_ENV: 'production' }, true],
    [{ VERCEL: '1', VERCEL_ENV: 'preview' }, true],
    [{ NEXT_PUBLIC_NOINDEX: 'true' }, true],
    [{ NODE_ENV: 'production' }, false]
  ])('%o → %s', (env, expected) => {
    expect(resolveNoIndex(env)).toBe(expected)
  })
})

// Exports do módulo leem o ambiente real (versão anterior deste teste)
describe('siteUrl e isNoIndex exportados', () => {
  const loadSite = async () => {
    vi.resetModules()
    return import('./site')
  }

  afterEach(() => vi.unstubAllEnvs())

  it('siteUrl reflete NEXT_PUBLIC_SITE_URL', async () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://galmar.com.br/')
    expect((await loadSite()).siteUrl).toBe('https://galmar.com.br')
  })

  it('isNoIndex reflete o deploy na Vercel', async () => {
    vi.stubEnv('NEXT_PUBLIC_NOINDEX', '')
    vi.stubEnv('VERCEL', '1')
    expect((await loadSite()).isNoIndex).toBe(true)
  })

  it('isNoIndex é false fora da Vercel sem flag', async () => {
    vi.stubEnv('NEXT_PUBLIC_NOINDEX', '')
    vi.stubEnv('VERCEL', '')
    expect((await loadSite()).isNoIndex).toBe(false)
  })
})
