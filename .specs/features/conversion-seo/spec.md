# F9 — Conversion & SEO Specification

**Roadmap:** M1 / F9 · **Tamanho:** Medium · **Depende de:** F4–F8 ✅
**Decisões aplicadas:** AD-007 (noindex no preview), AD-008 (GA4 + Consent Mode / banner LGPD), AD-013 (audience nos CTAs do hero), AD-014 #1 (GA_ID vazio = no-op)

## Problem Statement

Não há medição de cliques, o JSON-LD não expõe horário de funcionamento, o preview pode ser indexado, e não existe aviso de cookies nem política de privacidade para LGPD.

## Proposed Solution

- GA4 só após aceite (`NEXT_PUBLIC_GA_ID`; vazio = no-op), banner LGPD, eventos `click_whatsapp` / `click_phone` / `click_directions` com `location` (+ `audience` no hero).
- `openingHoursSpecification` no JSON-LD a partir de `hoursByDay` (+ `dayOfWeek`).
- Metadata robots + `robots.txt` com `NEXT_PUBLIC_NOINDEX=true` no preview.
- Página `/privacidade` + link no banner e no rodapé.

## Goals

- [x] GA4 pós-consentimento com eventos de clique
- [x] openingHours no JSON-LD
- [x] Preview noindex
- [x] Banner + /privacidade
- [x] Gate Build verde

## Out of Scope

| Item                    | Reason   |
| ----------------------- | -------- |
| Domínio / upload `out/` | F10      |
| ID real do GA4          | #1 / env |

---

## User Stories

### P1: Medição com consentimento ⭐ MVP

**Acceptance Criteria**:

1. WHEN `NEXT_PUBLIC_GA_ID` está vazio THEN SHALL NOT carregar gtag nem quebrar a página
2. WHEN o visitante ainda não escolheu THEN SHALL mostrar banner com Aceitar / Recusar e link para `/privacidade`
3. WHEN Aceitar THEN SHALL persistir a escolha, carregar GA4 e esconder o banner
4. WHEN Recusar THEN SHALL persistir a escolha, NÃO carregar GA4 e esconder o banner
5. WHEN um link com `data-track-location` é clicado e o consentimento foi aceito THEN SHALL enviar o evento correspondente (`click_whatsapp` | `click_phone` | `click_directions`) com `location` (e `audience` se presente)

### P1: SEO estruturado e preview ⭐ MVP

**Acceptance Criteria**:

1. WHEN o JSON-LD é gerado THEN SHALL incluir `openingHoursSpecification` derivado de `hoursByDay` (só dias abertos)
2. WHEN `NEXT_PUBLIC_NOINDEX=true` THEN metadata e `robots.txt` SHALL bloquear indexação
3. WHEN a política é aberta THEN `/privacidade` SHALL renderizar o texto de `content.privacy` e o rodapé linkar para ela

## Requirement Traceability

| Requirement ID | Story                     | Phase   | Status |
| -------------- | ------------------------- | ------- | ------ |
| CS-01          | P1: Medição+consentimento | Execute | Done   |
| CS-02          | P1: SEO + privacidade     | Execute | Done   |

## Success Criteria

- [x] Gate Build verde
- [x] Testes cobrem openingHours, consent helpers, data-track nos CTAs e página de privacidade

## Implementation Notes (2026-11-25)

- GA4: `components/analytics.tsx` + `cookie-banner.tsx`; `NEXT_PUBLIC_GA_ID` vazio = no-op; consent em `localStorage` (`galmar-cookie-consent`).
- Eventos via `data-track-location` / `data-track-audience` (hero).
- JSON-LD: `toOpeningHoursSpecification` + `dayOfWeek` no content.
- Preview: `NEXT_PUBLIC_NOINDEX=true` em metadata e robots.txt.
- `/privacidade` + link no rodapé e no banner.
