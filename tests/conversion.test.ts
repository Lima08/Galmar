import { describe, expect, it } from 'vitest'
import content from '../data/content.json'
import { readSource } from './source-files'

describe('medição e SEO (CS-01, CS-02)', () => {
  it('layout inclui openingHoursSpecification e banner/analytics', () => {
    const layout = readSource('app/layout.tsx')
    expect(layout).toContain('toOpeningHoursSpecification')
    expect(layout).toContain('openingHoursSpecification')
    expect(layout).toContain('CookieBanner')
    expect(layout).toContain('Analytics')
    expect(layout).toContain('isNoIndex')
  })

  it('robots.txt respeita noindex', () => {
    expect(readSource('app/robots.ts')).toContain('isNoIndex')
    expect(readSource('app/robots.ts')).toContain("disallow: '/'")
  })

  it('CTAs principais têm data-track-location', () => {
    expect(readSource('components/header.tsx')).toContain(
      "data-track-location='header'"
    )
    expect(readSource('components/contact-bar.tsx')).toContain(
      "data-track-location='contact-bar'"
    )
    expect(readSource('components/hero.tsx')).toContain(
      "data-track-location='hero'"
    )
    expect(readSource('components/hero.tsx')).toContain(
      "data-track-audience='business'"
    )
    expect(readSource('components/contact.tsx')).toContain(
      "data-track-location='onde-estamos'"
    )
    expect(readSource('components/whatsapp-button.tsx')).toContain(
      "data-track-location='flutuante'"
    )
    expect(readSource('components/footer.tsx')).not.toContain('rodape')
  })

  it('política de privacidade e cookies no JSON', () => {
    expect(content.privacy.title).toBeTruthy()
    expect(content.privacy.sections.length).toBeGreaterThan(0)
    expect(content.cookies.accept).toBeTruthy()
    expect(content.footer.privacy).toBeTruthy()
    expect(readSource('app/privacidade/page.tsx')).toContain('content.privacy')
    expect(readSource('components/footer.tsx')).toContain('/privacidade')
  })

  it('GA só após aceite e ID vazio é no-op', () => {
    const analytics = readSource('components/analytics.tsx')
    expect(analytics).toContain("consent === 'accepted'")
    expect(analytics).toContain('hasGaId')
    expect(readSource('components/cookie-banner.tsx')).toContain('hasGaId')
    expect(readSource('lib/analytics.ts')).toContain('NEXT_PUBLIC_GA_ID')
  })
})

describe('privacidade e banner (LR-09, LR-10, LR-13)', () => {
  const policy = content.privacy.sections
    .map((section) => `${section.heading} ${section.body}`)
    .join(' ')

  it('política cita base legal, mapa embutido e transferência ao Google', () => {
    expect(policy).toMatch(/consentimento/i)
    expect(policy).toMatch(/Google Maps/)
    expect(policy).toMatch(/fora do Brasil/)
    expect(policy).toMatch(/Preferências de cookies/)
    expect(policy).not.toMatch(/anonimizad/)
  })

  it('rodapé oferece "Preferências de cookies" para revogar a escolha', () => {
    expect(content.cookies.preferences).toBe('Preferências de cookies')
    expect(readSource('components/footer.tsx')).toContain('<CookiePreferences')
    const button = readSource('components/cookie-preferences.tsx')
    expect(button).toContain('clearStoredConsent')
    expect(button).toContain('hasGaId')
  })

  it('banner é região rotulada, não diálogo sem foco gerenciado', () => {
    const banner = readSource('components/cookie-banner.tsx')
    expect(banner).toContain("role='region'")
    expect(banner).toContain('aria-label={label}')
    expect(banner).not.toContain("role='dialog'")
    expect(content.cookies.label).toBe('Aviso de cookies')
  })

  it('banner e GA reagem à mudança de escolha (sem subscribe vazio)', () => {
    ;['components/cookie-banner.tsx', 'components/analytics.tsx'].forEach(
      (path) => {
        expect(readSource(path)).toContain('subscribeConsent')
        expect(readSource(path)).not.toMatch(
          /const subscribe = \(\) => \(\) => \{\}/
        )
      }
    )
  })

  it('JSON-LD com telefone E.164 e /privacidade com description própria', () => {
    expect(readSource('app/layout.tsx')).toContain(
      'telephone: `+${toInternationalDigits(info.phone)}`'
    )
    expect(readSource('app/privacidade/page.tsx')).toContain(
      'content.privacy.description'
    )
    expect(content.privacy.description.length).toBeGreaterThan(50)
  })
})
