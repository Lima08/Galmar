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
    expect(layout).toContain('NEXT_PUBLIC_NOINDEX')
  })

  it('robots.txt respeita NOINDEX', () => {
    expect(readSource('app/robots.ts')).toContain('NEXT_PUBLIC_NOINDEX')
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
    expect(readSource('components/footer.tsx')).toContain(
      "data-track-location='rodape'"
    )
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
