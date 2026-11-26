export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
).replace(/\/+$/, '')

// Preview Vercel (AD-007) ou flag explícita — produção no servidor do cliente fica indexável
export const isNoIndex =
  process.env.NEXT_PUBLIC_NOINDEX === 'true' ||
  process.env.VERCEL_ENV === 'preview'
