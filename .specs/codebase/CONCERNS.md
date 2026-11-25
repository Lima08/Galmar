# Codebase Concerns

**Analysis Date:** 2026-11-25 (revisado após saneamento)

## Pendências (rastreadas em issues)

**Domínio de produção indefinido:**

- Impact: sem `NEXT_PUBLIC_SITE_URL` no deploy, sitemap/robots/OG/canonical apontam para `localhost:3000`
- Files: `lib/site.ts`, `.env.example`
- Fix: definir env no provedor de deploy quando o domínio existir (#2)

**Vulnerabilidade transitiva `postcss` (<=8.5.22) dentro de `next`:**

- Fix: aguardar patch do Next; `npm audit fix --force` faria downgrade — não usar (#9)

## Fragile Areas

- `content.json` sem schema runtime formal; `tests/content.test.ts` valida dados oficiais, formatos e termos proibidos, e `tsc` pega chaves erradas

## Test Coverage Gaps

Sem E2E: navegação por âncora e menu mobile verificados só manualmente (#11).
