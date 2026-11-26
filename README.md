# Galmar

Landing page da **Galmar — Produtos de Limpeza e Descartáveis**, em Campinas-SP.

Site institucional estático, de página única: marcas representadas, sobre a empresa, avaliações e contato via WhatsApp.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · shadcn/ui

## Requisitos

- Node.js `>=22.12` (versão de referência em `.nvmrc`: 24)
- npm

## Rodando localmente

```bash
nvm use                      # opcional
npm install
cp .env.example .env.local   # opcional em dev
npm run dev                  # http://localhost:3000
```

## Variáveis de ambiente

| Variável               | Obrigatória      | Uso                                                                                                                                       |
| ---------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Sim, em produção | URL pública sem barra final. Alimenta canonical, Open Graph, JSON-LD, `sitemap.xml` e `robots.txt`. Sem ela, usa `http://localhost:3000`. |
| `NEXT_PUBLIC_GA_ID`    | Não              | ID do GA4 (`G-…`). Vazio = sem medição nem banner de cookies.                                                                             |
| `NEXT_PUBLIC_NOINDEX`  | Preview          | `true` força noindex. No preview da Vercel (`VERCEL_ENV=preview`) o noindex é automático.                                                 |

## Scripts

| Script                 | O quê                           |
| ---------------------- | ------------------------------- |
| `npm run dev`          | servidor de desenvolvimento     |
| `npm run build`        | build estático → pasta `out/`   |
| `npm run start`        | serve a pasta `out/` localmente |
| `npm run typecheck`    | `tsc --noEmit`                  |
| `npm run lint`         | ESLint (flat config)            |
| `npm run format`       | Prettier (escreve)              |
| `npm run format:check` | Prettier (verifica)             |
| `npm test`             | Vitest                          |

Antes de commitar: `npm run typecheck && npm run lint && npm run format:check && npm test`. O CI (`.github/workflows/ci.yml`) roda essas mesmas checagens e o build em todo push na `main` e em todo PR.

## Editando conteúdo

Toda a copy fica em **`data/content.json`**: textos, menu, telefone, endereço, redes sociais, marcas e avaliações. Para alterar um texto, não é preciso mexer em componente.

- **Logos de marca:** arquivo em `public/assets/brands/` + item em `brands.items`
- **Telefone/WhatsApp:** `contact.info.phone` (o DDI 55 é adicionado automaticamente)
- **Cores da marca:** `@theme` em `app/globals.css` (`primary`, `secondary`)
- **Favicon:** `app/icon.png` (512px) e `app/apple-icon.png` (180px)

## Estrutura

```
app/            layout (SEO, JSON-LD), página, privacidade/, robots, sitemap, ícones
components/     uma seção por arquivo + ui/ (shadcn)
data/           content.json
lib/            utilitários (cn, WhatsApp, URL do site) e testes
public/         imagens + _headers (hosts estáticos)
out/            build estático (gerado; não versionar)
```

Detalhes em `.specs/codebase/STRUCTURE.md`.

## Deploy

Decisão AD-007 (`.specs/project/STATE.md`):

- **Preview/dev:** Vercel — `noindex` automático em preview
- **Produção:** `npm run build` → publicar o conteúdo de `out/` no servidor do cliente

### Produção (servidor do cliente)

1. Definir `NEXT_PUBLIC_SITE_URL` (e opcionalmente `NEXT_PUBLIC_GA_ID`) no ambiente de build
2. `npm ci && npm run build`
3. Enviar o conteúdo de `out/` ao document root
4. Configurar headers de segurança (ver `public/_headers` ou nginx/Apache):
   - `X-Content-Type-Options: nosniff`
   - `X-Frame-Options: DENY`
   - `Referrer-Policy: strict-origin-when-cross-origin`
   - HSTS (só com HTTPS)
5. Conferir `/robots.txt`, `/sitemap.xml`, preview OG e [Rich Results Test](https://search.google.com/test/rich-results)

### QA (manual)

Checklist completo em `.specs/features/launch/spec.md`: viewports 360→2560, Lighthouse mobile ≥ 90, JSON-LD, OG.

## Planejamento

- `.specs/project/PROJECT.md`: visão, objetivos e restrições da v1
- `.specs/project/ROADMAP.md`: milestones e features (M1 = v1 publicável)
- `.specs/project/STATE.md`: decisões, bloqueios e pendências
- Issues: [GitHub](https://github.com/Lima08/Galmar/issues) · [Project](https://github.com/users/Lima08/projects/7)

## Documentação

- `AGENTS.md`: guia para agentes de IA (o `CLAUDE.md` importa ele)
- `.specs/codebase/`: stack, arquitetura, convenções, estrutura, testes, integrações e pontos de atenção
