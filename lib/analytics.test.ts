import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  CONSENT_KEY,
  eventFromHref,
  getStoredConsent,
  setStoredConsent
} from './analytics'

describe('eventFromHref', () => {
  it.each([
    ['https://wa.me/551932121177', 'click_whatsapp'],
    ['tel:+551932121177', 'click_phone'],
    ['https://www.google.com/maps/search/?api=1&query=x', 'click_directions'],
    ['https://example.com', null]
  ] as const)('%s → %s', (href, expected) => {
    expect(eventFromHref(href)).toBe(expected)
  })
})

describe('consentimento em localStorage', () => {
  const memory = new Map<string, string>()

  afterEach(() => {
    memory.clear()
    vi.unstubAllGlobals()
  })

  it('lê e grava accepted/rejected', () => {
    vi.stubGlobal('window', {
      localStorage: {
        getItem: (key: string) => memory.get(key) ?? null,
        setItem: (key: string, value: string) => {
          memory.set(key, value)
        }
      }
    })

    expect(getStoredConsent()).toBeNull()
    setStoredConsent('accepted')
    expect(getStoredConsent()).toBe('accepted')
    expect(memory.get(CONSENT_KEY)).toBe('accepted')
    setStoredConsent('rejected')
    expect(getStoredConsent()).toBe('rejected')
  })
})
