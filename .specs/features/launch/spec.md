# F10 — Launch Specification

**Roadmap:** M1 / F10 · **Tamanho:** Small · **Depende de:** F1–F9 ✅
**Decisões aplicadas:** AD-007 (export estático + preview Vercel noindex), AD-014 #2/#16 (domínio/hospedagem com alternativa documentada)

## Problem Statement

O `next.config` ainda não exporta estático; o preview na Vercel depende de env manual para `noindex`; falta checklist de QA/upload para o servidor do cliente.

## Proposed Solution

- `output: 'export'` + `images.unoptimized: true`
- `isNoIndex` = `NEXT_PUBLIC_NOINDEX=true` **ou** `VERCEL_ENV=preview`
- Scripts/`README` para build → `out/` → servir/upload
- Checklist QA (viewports, Lighthouse, Rich Results) na spec

## Goals

- [x] Build gera pasta `out/`
- [x] Preview Vercel noindex sem env manual
- [x] Checklist de lançamento documentado
- [x] Gate Build verde

## Out of Scope

| Item                       | Reason                       |
| -------------------------- | ---------------------------- |
| Domínio final / DNS        | #2 — cliente                 |
| Upload real no servidor    | #16 — credenciais do cliente |
| Lighthouse/Rich Results CI | Manual no checklist          |

---

## User Stories

### P1: Export estático pronto para publicar ⭐ MVP

**Acceptance Criteria**:

1. WHEN `next.config.mjs` é carregado THEN SHALL ter `output: 'export'` e `images.unoptimized: true`
2. WHEN `npm run build` conclui THEN SHALL existir `out/index.html` e `out/privacidade/index.html` (ou equivalente estático)
3. WHEN `VERCEL_ENV=preview` OU `NEXT_PUBLIC_NOINDEX=true` THEN metadata e `robots.txt` SHALL bloquear indexação
4. WHEN o README descreve o deploy THEN SHALL incluir: env de produção, build → `out/`, headers de segurança, checklist QA

## Requirement Traceability

| Requirement ID | Story                | Phase   | Status |
| -------------- | -------------------- | ------- | ------ |
| LN-01          | P1: Export + noindex | Execute | Done   |

## Success Criteria

- [x] Gate Build verde com `out/` gerado
- [x] Teste de source/config cobre export e `isNoIndex`

## QA Checklist (manual)

- [ ] Viewports 360, 768, 1280, 1920, 2560 — sem rolagem horizontal; CTA WhatsApp no hero no celular
- [ ] Lighthouse mobile ≥ 90 (Performance, Acessibilidade, SEO)
- [ ] Rich Results Test no JSON-LD da home
- [ ] `/robots.txt` e `/sitemap.xml` com `NEXT_PUBLIC_SITE_URL` de produção
- [ ] Preview OG (WhatsApp/Facebook) com `og.png`
- [ ] Upload de `out/` no servidor + headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, HSTS)

## Implementation Notes (2026-11-25)

- `next.config.mjs`: `output: 'export'`, `images.unoptimized: true`.
- `isNoIndex` em `lib/site.ts` (`NEXT_PUBLIC_NOINDEX` ou `VERCEL_ENV=preview`).
- `sitemap.ts`/`robots.ts`: `export const dynamic = 'force-static'`.
- `npm start` → `serve out`; CI verifica artefatos em `out/`.
- `public/_headers` para hosts estáticos; checklist QA manual na spec.
