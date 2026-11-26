'use client'

import { useSyncExternalStore } from 'react'
import content from '@/data/content.json'
import { clearStoredConsent, hasGaId } from '@/lib/analytics'

const noop = () => () => {}
const clientTrue = () => true
const serverFalse = () => false

// Revoga/altera a escolha de cookies (LGPD art. 8 §5): limpa e reabre o banner
export default function CookiePreferences({
  className
}: {
  className?: string
}) {
  const hydrated = useSyncExternalStore(noop, clientTrue, serverFalse)
  if (!hydrated || !hasGaId()) return null

  return (
    <button type='button' onClick={clearStoredConsent} className={className}>
      {content.cookies.preferences}
    </button>
  )
}
