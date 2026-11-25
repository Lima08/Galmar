# Galmar

Landing page da Galmar — produtos de limpeza em Campinas-SP.

Next.js 15 (App Router) · React 19 · Tailwind CSS 3 · shadcn/ui

## Rodando

```bash
npm install
cp .env.example .env.local   # opcional: NEXT_PUBLIC_SITE_URL
npm run dev
```

## Scripts

| Script                 | O quê                |
| ---------------------- | -------------------- |
| `npm run dev`          | servidor de dev      |
| `npm run build`        | build de produção    |
| `npm run typecheck`    | `tsc --noEmit`       |
| `npm run lint`         | ESLint (flat config) |
| `npm run format`       | Prettier (escreve)   |
| `npm run format:check` | Prettier (verifica)  |
| `npm test`             | Vitest               |

## Conteúdo

Toda a copy (textos, contatos, marcas, depoimentos) fica em `data/content.json`.

## Documentação

- `AGENTS.md` — guia para agentes/LLMs
- `.specs/codebase/` — stack, arquitetura, convenções, estrutura, testes, integrações e pontos de atenção
