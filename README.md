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
public/         imagens + .htaccess (Apache) + _headers (Cloudflare/Netlify)
out/            build estático (gerado; não versionar)
```

Detalhes em `.specs/codebase/STRUCTURE.md`.

## Deploy

Decisão AD-007 (`.specs/project/STATE.md`):

- **Preview/dev:** Vercel — `noindex` automático em qualquer deploy da Vercel
- **Produção:** `npm run build` → publicar o conteúdo de `out/` no servidor do cliente

### Produção (servidor do cliente)

1. Definir `NEXT_PUBLIC_SITE_URL` (obrigatória — sem ela o build falha) e opcionalmente `NEXT_PUBLIC_GA_ID`
2. `npm ci && npm run build`
3. Enviar o conteúdo de `out/` ao document root
4. Headers de segurança, 404 e sem listagem de diretório:
   - **Apache:** já vem em `out/.htaccess` (gerado de `public/.htaccess`; requer `mod_headers` e `AllowOverride All`)
   - **Cloudflare Pages / Netlify:** `out/_headers`
   - **nginx:** no `server {}`:

     ```nginx
     root /var/www/galmar;
     index index.html;
     error_page 404 /404.html;
     gzip on;
     gzip_types text/css application/javascript application/json image/svg+xml text/xml;
     location / { try_files $uri $uri/ =404; }
     location /_next/static/ { add_header Cache-Control "public, max-age=31536000, immutable"; }
     add_header X-Content-Type-Options "nosniff" always;
     add_header X-Frame-Options "DENY" always;
     add_header Referrer-Policy "strict-origin-when-cross-origin" always;
     add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
     add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
     add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com; img-src 'self' data: https://*.google-analytics.com https://*.googletagmanager.com; frame-src https://www.google.com; style-src 'self' 'unsafe-inline'; font-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'" always;
     ```

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
