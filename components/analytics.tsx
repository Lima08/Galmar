'use client'

import { useEffect, useSyncExternalStore } from 'react'
import Script from 'next/script'
import {
  GA_ID,
  eventFromHref,
  getStoredConsent,
  hasGaId,
  trackEvent
} from '@/lib/analytics'

const subscribe = () => () => {}
const clientTrue = () => true
const serverFalse = () => false

export default function Analytics() {
  const hydrated = useSyncExternalStore(subscribe, clientTrue, serverFalse)
  const consent = useSyncExternalStore(subscribe, getStoredConsent, () => null)
  const enabled = hydrated && hasGaId() && consent === 'accepted'

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (getStoredConsent() !== 'accepted') return
      const anchor = (event.target as Element | null)?.closest?.('a')
      if (!anchor) return
      const location = anchor.dataset.trackLocation
      if (!location) return
      const name = eventFromHref(anchor.href)
      if (!name) return
      trackEvent(name, {
        location,
        audience: anchor.dataset.trackAudience
      })
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  if (!enabled) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy='afterInteractive'
      />
      <Script id='ga4-init' strategy='afterInteractive'>
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
      </Script>
    </>
  )
}
