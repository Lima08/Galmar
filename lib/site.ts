type Env = Record<string, string | undefined>

const LOCAL_URL = 'http://localhost:3000'

// Produção = export estático no servidor do cliente (AD-007): exige URL pública
export const resolveSiteUrl = (env: Env) => {
  if (env.NEXT_PUBLIC_SITE_URL)
    return env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, '')
  if (env.VERCEL === '1' && env.VERCEL_URL) return `https://${env.VERCEL_URL}`
  if (env.NODE_ENV === 'production')
    throw new Error(
      'NEXT_PUBLIC_SITE_URL é obrigatório no build de produção (ex.: https://galmar.com.br) — sem ela canonical, sitemap e OG apontariam para localhost'
    )
  return LOCAL_URL
}

// Toda a Vercel é dev/preview (AD-007): só o servidor do cliente é indexável
export const resolveNoIndex = (env: Env) =>
  env.NEXT_PUBLIC_NOINDEX === 'true' || env.VERCEL === '1'

export const siteUrl = resolveSiteUrl(process.env)
export const isNoIndex = resolveNoIndex(process.env)
