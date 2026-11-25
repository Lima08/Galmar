# Codebase Concerns

**Analysis Date:** 2026-11-25 (revisado após saneamento)

## Pendências (rastreadas em issues)

**Domínio de produção indefinido:**

- Impact: sem `NEXT_PUBLIC_SITE_URL` no deploy, sitemap/robots/OG/canonical apontam para `localhost:3000`
- Files: `lib/site.ts`, `.env.example`
- Fix: definir env no provedor de deploy quando o domínio existir (#8)

**Vulnerabilidade transitiva `postcss` (<=8.5.22) dentro de `next`:**

- Fix: aguardar patch do Next; `npm audit fix --force` faria downgrade — não usar (#9)

**Depoimentos genéricos:** avatar cinza e 5 estrelas fixas; conteúdo parece placeholder. Validar depoimentos reais com o cliente (#10).

## Fragile Areas

- Offset `scroll-pt-[90px]` (layout) acoplado à altura do header (`h-[50px]` + padding) e ao `mt-[80px]` do `<main>` — mudar header exige ajustar os três
- `content.json` sem schema runtime; erros de chave pegos só por `tsc`/build (agora bloqueante)

## Test Coverage Gaps

Sem E2E: navegação por âncora e menu mobile verificados só manualmente (#11).
