# Code Conventions

`components/ui/*` = vendor shadcn (aspas duplas, ignorado pelo Prettier) — não usar como referência.

## Formatação

Aspas simples (TS e JSX), sem `;`, 2 espaços, sem trailing comma, `bracketSameLine`. Fonte: `.prettierrc.json`. Rodar `npm run format`.

## Naming

- Arquivos: kebab-case (`about-us.tsx`, `whatsapp-button.tsx`, `contact-form.tsx`)
- Componentes: PascalCase. Seções = `export default function Hero()`; forms = named export (`export function ContactForm()`)
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
- Cores de marca por token: `bg-primary`, `bg-secondary`, `hover:bg-secondary-dark`, `bg-secondary-bg`, `text-secondary-dark`
- Neutros Tailwind (`gray-*`, `black`, `white`) ok; sem azuis/vermelhos crus
- Mobile-first (`md:`, `lg:`)

## Conteúdo

Todo texto visível em `data/content.json` (`content.<secao>.<campo>`), incluindo placeholders, `alt`, `aria-label`, mensagens e itens de navegação (`content.header.nav`). Telefone/contato só em `content.contact.info`.

## Listas

`.map` com `key` estável (`title`, `name`, `id`), nunca `index` de dado.

## Eventos

Listeners de scroll com `{ passive: true }` e cleanup no retorno do `useEffect`.

## Imagens

`next/image` sempre; `priority` para imagens acima da dobra (logo, hero).

## Comments

Raros, pt-BR.
