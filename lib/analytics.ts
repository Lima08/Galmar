export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? ''
export const CONSENT_KEY = 'galmar-cookie-consent'

export type Consent = 'accepted' | 'rejected'

export type TrackLocation =
  'header' | 'contact-bar' | 'hero' | 'onde-estamos' | 'flutuante' | 'rodape'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export const hasGaId = () => GA_ID.length > 0

// Armazenamento pode estar bloqueado (cookies desativados, modo restrito):
// nunca lançar — sem acesso conta como "sem escolha" (LR-07)
const storage = () => {
  try {
    return typeof window === 'undefined' ? null : window.localStorage
  } catch {
    return null
  }
}

const listeners = new Set<() => void>()
const notify = () => listeners.forEach((listener) => listener())

export const subscribeConsent = (listener: () => void) => {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export const getStoredConsent = (): Consent | null => {
  try {
    const value = storage()?.getItem(CONSENT_KEY)
    return value === 'accepted' || value === 'rejected' ? value : null
  } catch {
    return null
  }
}

export const setStoredConsent = (consent: Consent) => {
  try {
    storage()?.setItem(CONSENT_KEY, consent)
  } catch {
    // escolha vale só nesta visita
  }
  notify()
}

export const clearStoredConsent = () => {
  try {
    storage()?.removeItem(CONSENT_KEY)
  } catch {
    // nada a limpar
  }
  window.gtag?.('consent', 'update', { analytics_storage: 'denied' })
  notify()
}

// Consent Mode v2 (AD-008, LR-08): tudo negado por padrão; o script só roda
// após o aceite, que libera apenas a medição — anúncios seguem negados
export const buildGtagInit = (gaId: string) =>
  [
    'window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}',
    "gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied'});",
    "gtag('js',new Date());",
    "gtag('consent','update',{analytics_storage:'granted'});",
    `gtag('config','${gaId}');`
  ].join('')

export const eventFromHref = (href: string) => {
  if (href.includes('wa.me') || href.includes('whatsapp.com'))
    return 'click_whatsapp' as const
  if (href.startsWith('tel:')) return 'click_phone' as const
  if (href.includes('google.com/maps') || href.includes('maps.google'))
    return 'click_directions' as const
  return null
}

export const trackEvent = (
  name: string,
  params: Record<string, string | undefined>
) => {
  if (!hasGaId() || typeof window === 'undefined' || !window.gtag) return
  const cleaned = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value != null && value !== '')
  )
  window.gtag('event', name, cleaned)
}
