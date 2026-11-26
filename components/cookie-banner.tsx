'use client'

import { useSyncExternalStore } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import content from '@/data/content.json'
import {
  getStoredConsent,
  hasGaId,
  setStoredConsent,
  subscribeConsent
} from '@/lib/analytics'

const noop = () => () => {}
const clientTrue = () => true
const serverFalse = () => false

export default function CookieBanner() {
  const hydrated = useSyncExternalStore(noop, clientTrue, serverFalse)
  const stored = useSyncExternalStore(
    subscribeConsent,
    getStoredConsent,
    () => null
  )

  if (!hydrated || !hasGaId() || stored !== null) return null

  const { label, message, accept, reject, policy } = content.cookies

  return (
    <div
      role='region'
      aria-label={label}
      className='fixed inset-x-0 bottom-0 z-50 border-t bg-white p-4 shadow-lg md:p-6'>
      <div className='container flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <p className='max-w-prose text-sm text-muted-foreground'>
          {message}{' '}
          <Link
            href='/privacidade/'
            className='font-medium text-secondary-dark underline underline-offset-2'>
            {policy}
          </Link>
        </p>
        <div className='flex flex-col gap-2 min-[400px]:flex-row'>
          <Button
            type='button'
            variant='outline'
            className='min-h-11'
            onClick={() => setStoredConsent('rejected')}>
            {reject}
          </Button>
          <Button
            type='button'
            className='min-h-11 bg-primary text-white hover:bg-primary-dark focus-visible:bg-primary-dark'
            onClick={() => setStoredConsent('accepted')}>
            {accept}
          </Button>
        </div>
      </div>
    </div>
  )
}
