# Review geral — M1 (F1–F10 + visual-identity)

**Data:** 2026-11-25 · **Escopo:** `main` @ db1ff4a · **Gates:** typecheck, lint, format:check, 246 testes, build estático — verdes

F1–F5 já tinham review próprio (ver `review.md` de cada feature). F6–F10 e visual-identity foram revisadas agora por 2 revisores (F6–F8; F9, F10, visual-identity e prontidão de lançamento). Critérios de F7/F8 alterados de propósito pela visual-identity aparecem como _superseded_, não FAIL.

## Bloqueantes para publicar

| #   | Achado                                                                                                                                                           | Onde                                                 | Feature |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | ------- |
| 1   | `/privacidade` quebra em Apache/nginx sem rewrite: export gera `privacidade.html` **e** a pasta `privacidade/` → 301 + listagem/403. Teste aceita as duas formas | `next.config.mjs`, `tests/launch.test.ts`            | F10     |
| 2   | Build de produção sem `NEXT_PUBLIC_SITE_URL` publica canonical/sitemap/OG/JSON-LD com `localhost` sem falhar                                                     | `lib/site.ts`                                        | F10     |
| 3   | Headers só em `public/_headers` (Netlify/Cloudflare); servidor do cliente sem `.htaccess`/nginx, sem CSP, HSTS e `ErrorDocument 404`                             | `public/`, README                                    | F10     |
| 4   | Logos das marcas sem otimização: 3,1 MB (Flash 10630×7087 px, 1,44 MB) para exibir a 64 px                                                                       | `public/assets/brands/`                              | F7      |
| 5   | Carrossel de marcas sem pausa (WCAG 2.2.2, A) e cópia do loop exposta ao leitor de tela                                                                          | `app/globals.css`, `components/brands.tsx`           | F7      |
| 6   | `localStorage` sem try/catch no render: armazenamento bloqueado derruba a página                                                                                 | `lib/analytics.ts`                                   | F9      |
| 7   | Consent Mode v2 ausente (AD-008), sem forma de revogar consentimento; política não cita o Maps embutido, base legal nem transferência ao Google                  | `components/analytics.tsx`, `content.json` (privacy) | F9      |
| 8   | Deploy de produção da Vercel indexável (só `preview` recebe noindex)                                                                                             | `lib/site.ts`                                        | F10     |
| 9   | Checklist de QA do F10 não executado (viewports, Lighthouse, Rich Results, OG)                                                                                   | `launch/spec.md`                                     | F10     |

## Recomendados

- 404 próprio em pt-BR (`app/not-found.tsx`) e link "Pular para o conteúdo" — issue #27
- `mailto:` no e-mail; botões de redes com 44 px; testes de `rel`/`referrerPolicy` (F6)
- Banner de cookies: `role='region'` ou foco gerenciado; telefone E.164 no JSON-LD; description de `/privacidade` (F9)
- Specs F7/F8 marcando critérios _superseded_ pela visual-identity
- `cn()` sem efeito em `testimonials.tsx`; `interface LogoProps` em `brands.tsx`; tipo `TrackLocation` sem uso
- Ano do © congelado no build (documentar rebuild anual)

## Externas (cliente/terceiros)

Domínio, DNS e tipo de servidor (#2, #16, B-003) · ID do GA4 (#1) · CNPJ (#13, B-002) · Logo SVG (#12, B-001) · avaliações reais do GMN (#10) · fotos reais da loja (#15) · aviso da placa (#14) · QA aprovado pelo cliente.

## Issues

- Fechadas: #17–#21 (F1–F5, com review próprio e achados corrigidos) e #9 (`npm audit`: 0 vulnerabilidades no Next 16).
- Mantidas abertas: #22–#26 (F6–F10, bloqueantes acima), #27 e todas as externas.
