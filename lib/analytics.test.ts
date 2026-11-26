import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  CONSENT_KEY,
  buildGtagInit,
  clearStoredConsent,
  eventFromHref,
  getStoredConsent,
  setStoredConsent,
  subscribeConsent
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

describe('consentimento resiliente e revogável (LR-07, LR-09)', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('armazenamento bloqueado não lança erro e conta como "sem escolha"', () => {
    vi.stubGlobal('window', {
      get localStorage() {
        throw new DOMException('blocked', 'SecurityError')
      }
    })
    expect(getStoredConsent()).toBeNull()
    expect(() => setStoredConsent('accepted')).not.toThrow()
    expect(() => clearStoredConsent()).not.toThrow()
  })

  it('assinantes são avisados ao gravar e ao limpar a escolha', () => {
    const memory = new Map<string, string>()
    vi.stubGlobal('window', {
      localStorage: {
        getItem: (key: string) => memory.get(key) ?? null,
        setItem: (key: string, value: string) => void memory.set(key, value),
        removeItem: (key: string) => void memory.delete(key)
      }
    })
    const listener = vi.fn()
    const unsubscribe = subscribeConsent(listener)

    setStoredConsent('accepted')
    clearStoredConsent()
    expect(listener).toHaveBeenCalledTimes(2)
    expect(getStoredConsent()).toBeNull()

    unsubscribe()
    setStoredConsent('rejected')
    expect(listener).toHaveBeenCalledTimes(2)
  })
})

describe('Consent Mode v2 (LR-08)', () => {
  it('nega tudo por padrão e só libera analytics após aceite', () => {
    const script = buildGtagInit('G-TEST')
    const defaultCall = script.indexOf("gtag('consent','default'")
    const updateCall = script.indexOf("gtag('consent','update'")
    const configCall = script.indexOf("gtag('config','G-TEST'")
    expect(defaultCall).toBeGreaterThan(-1)
    expect(defaultCall).toBeLessThan(updateCall)
    expect(updateCall).toBeLessThan(configCall)
    expect(script).toMatch(
      /'default',\{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied'\}/
    )
    expect(script).toMatch(/'update',\{analytics_storage:'granted'\}/)
    expect(script).not.toContain('anonymize_ip')
  })
})
