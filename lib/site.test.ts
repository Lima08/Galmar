import { afterEach, describe, expect, it, vi } from 'vitest'

const loadSiteUrl = async () => {
  vi.resetModules()
  return (await import('./site')).siteUrl
}

describe('siteUrl', () => {
  afterEach(() => vi.unstubAllEnvs())

  it('remove barra final', async () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://galmar.com.br/')
    expect(await loadSiteUrl()).toBe('https://galmar.com.br')
  })

  it('usa fallback quando env vazia', async () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', '')
    expect(await loadSiteUrl()).toBe('http://localhost:3000')
  })
})
