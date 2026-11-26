# Galmar — Guia para agentes

Landing page single-page da Galmar (produtos de limpeza, Campinas-SP). Next.js 16 App Router + React 19 + Tailwind 4 + shadcn/ui. Estático, sem backend. Copy em pt-BR. Ainda não lançado.

## Comandos

```bash
npm install
npm run dev            # localhost:3000
npm run typecheck      # tsc --noEmit
npm run lint           # ESLint flat config
npm run format         # Prettier
npm test               # Vitest
npm run build          # falha em erro de TS (lint só via npm run lint)
```

Gate antes de commit: `npm run typecheck && npm run lint && npm run format:check && npm test`. CI roda o mesmo + build.

## Mapa

| Preciso de…                     | Ler                               |
| ------------------------------- | --------------------------------- |
| Escrever/editar código          | `.specs/codebase/CONVENTIONS.md`  |
| Achar arquivo / onde mora X     | `.specs/codebase/STRUCTURE.md`    |
| Entender composição/fluxo       | `.specs/codebase/ARCHITECTURE.md` |
| Versões/libs                    | `.specs/codebase/STACK.md`        |
| WhatsApp / env / links externos | `.specs/codebase/INTEGRATIONS.md` |
| Validar mudança / testes        | `.specs/codebase/TESTING.md`      |
| Antes de mexer em área frágil   | `.specs/codebase/CONCERNS.md`     |

## Regras essenciais

- Texto visível → `data/content.json`, nunca hardcoded no JSX
- Nova seção: `components/<kebab>.tsx` default export, `<Section id='...' tone=...>` (`components/section.tsx`), registrar em `app/page.tsx` e em `content.header.nav`
- Server Component por padrão; `'use client'` só com state/efeito/evento
- Cores só via tokens Tailwind (`primary`, `secondary`, `secondary-dark`, `secondary-bg`, `whatsapp`) — `tests/palette.test.ts` barra o resto
- `cn()` de `@/lib/utils` para classes condicionais; imports via `@/`
- Lógica pura em `lib/` com teste colocalizado `*.test.ts`
- URLs de WhatsApp só via `buildWhatsAppUrl` (`lib/whatsapp.ts`)
- `components/ui/` é vendor shadcn — adicionar com `npx shadcn@latest add <comp>`, não editar à mão

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
