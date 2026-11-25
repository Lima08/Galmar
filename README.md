# Galmar

Landing page da **Galmar — Produtos de Limpeza e Descartáveis**, em Campinas-SP.

Site institucional estático, de página única: marcas representadas, sobre a empresa, depoimentos e contato. O contato é feito pelo WhatsApp, direto do formulário ou pelo botão flutuante.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 3 · shadcn/ui

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

## Scripts

| Script                 | O quê                                     |
| ---------------------- | ----------------------------------------- |
| `npm run dev`          | servidor de desenvolvimento               |
| `npm run build`        | build de produção (falha em erro TS/lint) |
| `npm run start`        | serve o build                             |
| `npm run typecheck`    | `tsc --noEmit`                            |
| `npm run lint`         | ESLint (flat config)                      |
| `npm run format`       | Prettier (escreve)                        |
| `npm run format:check` | Prettier (verifica)                       |
| `npm test`             | Vitest                                    |

Antes de commitar: `npm run typecheck && npm run lint && npm run format:check && npm test`. O CI (`.github/workflows/ci.yml`) roda essas mesmas checagens e o build em todo push na `main` e em todo PR.

## Editando conteúdo

Toda a copy fica em **`data/content.json`**: textos, menu, telefone, endereço, redes sociais, marcas e depoimentos. Para alterar um texto, não é preciso mexer em componente.

- **Logos de marca:** arquivo em `public/assets/brands/` + item em `brands.items` (`"image": "/assets/brands/<arquivo>"`)
- **Telefone/WhatsApp:** `contact.info.phone`, usado no botão flutuante e no formulário (o DDI 55 é adicionado automaticamente)
- **Cores da marca:** `tailwind.config.ts` (`primary`, `secondary`)
- **Favicon:** `app/icon.png` (512px) e `app/apple-icon.png` (180px)

## Estrutura

```
app/            layout (SEO, JSON-LD), página, robots, sitemap, ícones
components/     uma seção por arquivo + forms/ + ui/ (shadcn)
data/           content.json
lib/            utilitários (cn, WhatsApp, URL do site) e testes
public/         imagens
```

Detalhes em `.specs/codebase/STRUCTURE.md`.

## Deploy

Decisão AD-007 (`.specs/project/STATE.md`):

- **Preview/dev:** Vercel, com `noindex`
- **Produção:** site estático (`output: 'export'` → pasta `out/`) publicado no servidor do cliente. Isso entra na F10 do roadmap.

Checklist de produção:

1. Definir `NEXT_PUBLIC_SITE_URL` com o domínio final antes do build
2. Configurar no servidor os headers de segurança (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, HSTS), porque com export estático o `next.config` não os aplica
3. Conferir `/robots.txt`, `/sitemap.xml`, o preview de compartilhamento e o Rich Results Test

## Planejamento

- `.specs/project/PROJECT.md`: visão, objetivos e restrições da v1
- `.specs/project/ROADMAP.md`: milestones e features (M1 = v1 publicável)
- `.specs/project/STATE.md`: decisões, bloqueios e pendências
- Issues: [GitHub](https://github.com/Lima08/Galmar/issues) · [Project](https://github.com/users/Lima08/projects/7)

## Documentação

- `AGENTS.md`: guia para agentes de IA (o `CLAUDE.md` importa ele)
- `.specs/codebase/`: stack, arquitetura, convenções, estrutura, testes, integrações e pontos de atenção
