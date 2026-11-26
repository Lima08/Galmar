# Code Conventions

`components/ui/*` = vendor shadcn (aspas duplas, ignorado pelo Prettier) — não usar como referência.

## Formatação

Aspas simples (TS e JSX), sem `;`, 2 espaços, sem trailing comma, `bracketSameLine`. Fonte: `.prettierrc.json`. Rodar `npm run format`.

## Naming

- Arquivos: kebab-case (`about-us.tsx`, `whatsapp-button.tsx`, `contact-bar.tsx`)
- Componentes: PascalCase. Seções = `export default function Hero()`
- Props: `interface XxxProps` acima do componente
- Handlers: verbo camelCase (`callWhatsApp`, `handleScroll`, `closeMenu`)
- Constantes estáticas fora do componente (`whatsappUrl`, `SHOW_DELAY_MS`)
- IDs de seção em inglês; copy em pt-BR

## Imports

- Alias `@/` (`@/components/ui/button`, `@/data/content.json`, `@/lib/...`)
- Ordem: `next/*`, libs externas, `@/` internos
- Tipos com `import type` / `type` inline (`import { useState, type FormEvent } from 'react'`)

## Styling

- Tailwind inline; condicional com `cn()`
- Cores só por token (`primary`, `primary-dark`, `secondary`, `secondary-dark`, `secondary-bg`, `whatsapp`); texto em `foreground`/`muted-foreground`
- Texto pequeno em azul ou texto branco sobre azul → `secondary-dark` (contraste AA); `secondary` só em títulos ≥ 24 px, ícones e fundos grandes
- Neutros `gray-*` e `white` ok; proibidos: `black`, famílias de cor do Tailwind, hex literal e `[#…]`/`[color:…]` — guardado por `tests/palette.test.ts`
- Sem classe montada dinamicamente (`bg-${cor}-500`): o Tailwind não gera e a guarda não detecta
- Mobile-first (`md:`, `lg:`); largura só pelo `.container` (sem `max-w-*`/`px-*` próprios em seção; `max-w-prose` para texto corrido)
- Seção nova: `<Section id tone>` (`components/section.tsx`); títulos `text-display`/`text-h2`/`text-h3` + `text-balance`

## Conteúdo

Todo texto visível em `data/content.json` (`content.<secao>.<campo>`), incluindo placeholders, `alt`, `aria-label`, mensagens e itens de navegação (`content.header.nav`). Telefone/contato só em `content.contact.info`.

## Listas

`.map` com `key` estável (`title`, `name`, `id`), nunca `index` de dado.

## Eventos

Listeners de scroll com `{ passive: true }` e cleanup no retorno do `useEffect`.

## Imagens

`next/image` por padrão (logos, ícones). Exceção: fotos com WebP pré-gerado em várias larguras (export estático sem otimização em runtime, AD-007) usam `<img srcSet sizes width height>` com `eslint-disable-next-line @next/next/no-img-element` e comentário do motivo — ex.: hero. No Next 16 `priority` está deprecado: LCP com `fetchPriority='high'`, demais acima da dobra com `loading='eager'`. Créditos de fotos de banco em `CREDITS.md` ao lado dos arquivos.

## Comments

Raros, pt-BR.
