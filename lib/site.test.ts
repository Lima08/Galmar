import { afterEach, describe, expect, it, vi } from 'vitest'

const loadSite = async () => {
  vi.resetModules()
  return import('./site')
}

describe('siteUrl', () => {
  afterEach(() => vi.unstubAllEnvs())

  it('remove barra final', async () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://galmar.com.br/')
    expect((await loadSite()).siteUrl).toBe('https://galmar.com.br')
  })

  it('usa fallback quando env vazia', async () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', '')
    expect((await loadSite()).siteUrl).toBe('http://localhost:3000')
  })
})

describe('isNoIndex', () => {
  afterEach(() => vi.unstubAllEnvs())

  it('é true com NEXT_PUBLIC_NOINDEX=true', async () => {
    vi.stubEnv('NEXT_PUBLIC_NOINDEX', 'true')
    vi.stubEnv('VERCEL_ENV', '')
    expect((await loadSite()).isNoIndex).toBe(true)
  })

  it('é true no preview da Vercel', async () => {
    vi.stubEnv('NEXT_PUBLIC_NOINDEX', '')
    vi.stubEnv('VERCEL_ENV', 'preview')
    expect((await loadSite()).isNoIndex).toBe(true)
  })

  it('é false em produção sem flag', async () => {
    vi.stubEnv('NEXT_PUBLIC_NOINDEX', '')
    vi.stubEnv('VERCEL_ENV', 'production')
    expect((await loadSite()).isNoIndex).toBe(false)
  })
})
