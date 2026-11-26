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

export const getStoredConsent = (): Consent | null => {
  if (typeof window === 'undefined') return null
  const value = window.localStorage.getItem(CONSENT_KEY)
  return value === 'accepted' || value === 'rejected' ? value : null
}

export const setStoredConsent = (consent: Consent) => {
  window.localStorage.setItem(CONSENT_KEY, consent)
}

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
