# Tech Stack

**Analyzed:** 2026-11-25

## Core

- Framework: Next.js `^15.5.29` (App Router, rota única estática)
- Language: TypeScript `^5` (`strict: true`)
- Runtime: Node 24 (`.nvmrc`; `engines.node >=22.12`, exigido pelo Vitest 5)
- Package manager: npm (`package-lock.json`)

## Frontend

- UI: React `^19`
- Componentes: shadcn/ui (`components.json`) — só `components/ui/button.tsx` instalado; adicionar outros via `npx shadcn@latest add <comp>`
- Styling: Tailwind CSS `^3.4.17` + `tailwindcss-animate`; CSS vars HSL em `app/globals.css`
- Cores de marca: `tailwind.config.ts` — `primary` #d52825 / `primary-dark` #b3211f (hover), `secondary` #2983c2, `secondary-dark` #1f6aa0 (azul de apoio: texto pequeno e fundos com texto branco, AD-015), `secondary-bg` #eaf3fa (tint). Terceiros (AD-016): `whatsapp` #25d366/#1ebe5d, `rating` #eab308. Neutros: `--foreground` #333, `--muted-foreground` #666
- Fonte: Poppins 400/500/700 via `next/font/google` (`--font-poppins` → `fontFamily.sans`); títulos fluidos `text-display`/`text-h2`/`text-h3` (`clamp` com teto)
- Container: `.container` próprio em `app/globals.css` (máx. 79rem = 1200 px de conteúdo; margem 1rem/2rem a partir de 768 px); plugin `container` do Tailwind desligado
- Ícones: `lucide-react`; `react-icons/fa` só para marcas (WhatsApp/Facebook/Instagram)
- State: `useState` local
- Forms: inputs controlados + validação nativa (`required`, `type='email'`)

## Backend

Nenhum. Conteúdo em `data/content.json`.

## SEO

`metadata` + Open Graph em `app/layout.tsx`, JSON-LD `Store`, `app/robots.ts`, `app/sitemap.ts`. Base URL: `NEXT_PUBLIC_SITE_URL` (`lib/site.ts`).

## Development Tools

- Lint: ESLint 9 flat config (`eslint.config.mjs`: `next/core-web-vitals`, `next/typescript`, `prettier`)
- Format: Prettier 3 (`.prettierrc.json`, `.prettierignore`) + `.editorconfig`
- Test: Vitest
- CI: GitHub Actions (`.github/workflows/ci.yml`)
