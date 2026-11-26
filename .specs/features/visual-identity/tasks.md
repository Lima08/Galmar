# Identidade visual da página — Tasks

**Design**: `.specs/features/visual-identity/design.md`
**Spec**: `.specs/features/visual-identity/spec.md`
**Status**: Done

Nenhuma chave de `data/content.json` muda. `components/ui/` não se edita. Faixa de contato, botão flutuante e aceite de cookies não mudam de cor. Não há E2E: a matriz em `.specs/codebase/TESTING.md` cobre seções por inspeção e guardas de design por teste estático em `tests/*.test.ts`. Cada tarefa que altera componente inclui o teste estático que lê esse fonte. Um commit por tarefa, no formato abaixo.

Ferramentas fixadas neste pipeline, sem pergunta ao usuário: nenhuma tarefa chama MCP nem skill externa. A implementação segue `AGENTS.md` e os docs de `.specs/codebase/`.

---

## Execution Plan

Ordem de fase cabe em uma janela de execução. A seta é dependência real (`Depends on`). Fase posterior sem seta a partir da anterior existe só para o teto de ~100k tokens.

```
T1 → T2 → T3 → T4 → T7 → T8 → T9 → T12 → T16 → T17
│         │                        ↑       ↑
│         └──→ T5 ─────────────────────────────┐
├──→ T6 ───────────────────────────────────────┤
├──→ T10 ─────────────────────────→ T12        ├→ T17
├──→ T13 ──────────────────────────────────────┤
├──→ T14 ──────────────────────────────────────┤
└──→ T15 ──────────────────────────────────────┘
T11 ──────────────────────────────→ T16
T9 ────────────────────────────────────────────→ T17
```

### Phase 1: Tokens e altura (Sequential) — **Est. tokens**: ~55k

```
T1 → T2
```

### Phase 2: Pattern na Section (Sequential) — **Est. tokens**: ~55k

```
T2 → T3 → T4
```

### Phase 3: Header e hero (Parallel OK) — **Est. tokens**: ~55k

```
T2 ──→ T5 [P]
T1 ──→ T6 [P]
```

### Phase 4: Onde estamos e rodapé (Parallel OK) — **Est. tokens**: ~55k

Sem dependência de T5/T6. A fase vem depois por orçamento.

```
T1 ──→ T10 [P]
       T11 [P]
```

### Phase 5: Marcas, Sobre e avaliações (Sequential) — **Est. tokens**: ~70k

`tests/sections.test.ts` é compartilhado. Não paralelizar T7–T9.

```
T4 → T7 → T8 → T9
```

### Phase 6: Tom blue sai (Sequential) — **Est. tokens**: ~27k

```
T9 ──┐
     ├→ T12
T10 ─┘
```

### Phase 7: Docs (Parallel OK) — **Est. tokens**: ~63k

```
T1 ──┬→ T13 [P]
     ├→ T14 [P]
     └→ T15 [P]
T11 ─┬→ T16 [P]
T12 ─┘
```

### Phase 8: Gate (Sequential) — **Est. tokens**: ~27k

```
T5 ──┐
T6 ──┤
T9 ──┤
T13 ─┤
T14 ─┼→ T17
T15 ─┤
T16 ─┘
```

---

## Task Breakdown

### T1: Tirar o amarelo e travar o verde no flutuante

**What**: Apaga `--color-rating` e reescreve o comentário do verde para o botão flutuante; o teste de paleta deixa de exigir `#eab308` e passa a exigir que classes `whatsapp` de cor só existam em `components/whatsapp-button.tsx`.
**Where**: `app/globals.css`, `tests/palette.test.ts`
**Depends on**: None
**Reuses**: bloco `@theme` atual; `color()` e `sourceFiles` já usados em `tests/palette.test.ts`
**Requirement**: VI-01, VI-02

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] `--color-secondary: #2983c2`, `--color-secondary-dark: #1f6aa0`, `--color-primary: #d52825`, `--color-primary-dark: #b3211f` e `--color-secondary-bg` continuam no `@theme`
- [x] `--color-whatsapp` continua `#25d366` e `--color-whatsapp-dark` continua `#1ebe5d`; o comentário diz que o verde é só do botão flutuante
- [x] `--color-rating` e o comentário que trata `#eab308` como exceção de AD-016 somem; nenhum hex novo fora do `@theme`
- [x] O `it` de AD-016 não chama `color('rating')`; um caso novo percorre `sourceFiles` e só aceita `bg-whatsapp`, `text-whatsapp` e `hover:bg-whatsapp-dark` em `components/whatsapp-button.tsx`
- [x] O contraste ≥ 4,5:1 de branco segue só em `secondary-dark`, `primary` e `primary-dark`; `secondary` não entra nessa lista
- [x] `components/whatsapp-button.tsx` permanece `bg-whatsapp`, `hover:bg-whatsapp-dark`, ícone branco e `data-track-location='flutuante'`
- [x] Gate: `npm run typecheck && npm test`

**Tests**: static
**Gate**: quick

**Verify**: `npm test -- tests/palette.test.ts` termina 0. `rg --color-rating app/globals.css` não casa. `rg "bg-whatsapp|text-whatsapp|hover:bg-whatsapp-dark" components app` só casa `components/whatsapp-button.tsx`.

**Commit**: `style(visual): tira o amarelo da paleta e reserva o verde ao flutuante`

---

### T2: Uma variável de altura para o logo de 56 px e o de 80 px

**What**: Troca `--header-h` de `5rem` para `4.5rem` no `:root` e adiciona um único override `7rem` em `@media (min-width: 768px)`, dentro de `@layer base`, sem repetir o resto do `:root`.
**Where**: `app/globals.css`, `tests/layout.test.ts`
**Depends on**: T1
**Reuses**: `h-(--header-h)` em `components/header.tsx`, `scroll-pt-[calc(var(--header-h)+0.5rem)]` em `app/layout.tsx`, `h-(--header-h)` em `app/privacidade/page.tsx`
**Requirement**: VI-03

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] Existem exatamente duas ocorrências de `--header-h:`: `4.5rem` no `:root` e `7rem` dentro de `@media (min-width: 768px)`
- [x] O override não copia as outras custom properties do `:root`
- [x] `app/layout.tsx`, `components/header.tsx` e `app/privacidade/page.tsx` não ganham `h-[Npx]` nem `scroll-pt-[Npx]`; a página de privacidade não ganha altura própria
- [x] O `it` que exige `--header-h:` uma vez passa a exigir essas duas declarações e nenhuma terceira
- [x] O `it.each` de altura inclui `app/privacidade/page.tsx` junto de `app/layout.tsx` e `components/header.tsx`
- [x] Sticky, `main` sem `mt-`, container de 79 rem, `<Section>` nos quatro arquivos e reveal permanecem como estão
- [x] Gate: `npm run typecheck && npm test`

**Tests**: static
**Gate**: quick

**Verify**: `npm test -- tests/layout.test.ts` termina 0. O CSS tem `4.5rem` e `7rem` nas duas declarações acima.

**Commit**: `style(visual): cabe o header no logo de 56 px e de 80 px`

---

### T3: Classe estática do pattern do símbolo

**What**: Cria `.brand-pattern` ao lado das regras do marquee, mascarando o alfa de `/brand/symbol.png` em tile de `8rem`, sem hex, sem `animation` e sem `transform`.
**Where**: `app/globals.css`, `tests/sections.test.ts`
**Depends on**: T2
**Reuses**: `public/brand/symbol.png` (o mesmo PNG de `tests/brand.test.ts`); helper `css()` já em `tests/sections.test.ts`
**Requirement**: VI-05

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] A regra usa `mask-image` / `-webkit-mask-image` com `url('/brand/symbol.png')`, `repeat`, `8rem` e `center`
- [x] A regra não contém hex, `animation` nem `transform`, e fica fora de `@media (prefers-reduced-motion)`
- [x] A cor do tile não está no CSS; quem pinta é `bg-secondary` no elemento (T4)
- [x] Um `it` novo lê `app/globals.css` e trava essas ausências e a URL do símbolo
- [x] Os `it` de SP-01 (grid, marquee, reduced-motion) continuam iguais
- [x] Gate: `npm run typecheck && npm test`

**Tests**: static
**Gate**: quick

**Verify**: `npm test -- tests/sections.test.ts` termina 0. A regra `.brand-pattern` está no CSS global e não anima.

**Commit**: `style(visual): adiciona o pattern do símbolo em azul oficial`

---

### T4: Section desenha o pattern atrás do container

**What**: Adiciona `pattern?: boolean` (default `false`) em `Section`. Com `pattern`, a `<section>` fica `relative overflow-hidden` e ganha um irmão `aria-hidden` com `.brand-pattern` antes do `.container`. O tom `blue` permanece até T12, para Sobre e Onde estamos continuarem compilando.
**Where**: `components/section.tsx`, `tests/sections.test.ts`
**Depends on**: T3
**Reuses**: `cn` de `@/lib/utils`; markup atual da `<section>` e do `.container` com `data-reveal=''`
**Requirement**: VI-05

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] `pattern` default `false`. Sem a prop, a `<section>` não ganha `relative` nem `overflow-hidden`
- [x] Com `pattern`, o primeiro filho é `<div aria-hidden className='brand-pattern pointer-events-none absolute inset-0 z-0 bg-secondary opacity-10' />` e o `.container` ganha `relative z-10`
- [x] O pattern não leva `data-reveal`. O `data-reveal=''` continua no `.container`
- [x] `TONES` ainda tem `white`, `tint` e `blue` neste tarefa
- [x] Um `it` lê `components/section.tsx` e trava o markup do pattern, `opacity-10` e a ausência de `data-reveal` nesse div
- [x] Gate: `npm run typecheck && npm test`

**Tests**: static
**Gate**: quick

**Verify**: `npm test -- tests/sections.test.ts` termina 0. `npm run typecheck` termina 0 com Sobre e Onde estamos ainda em `tone='blue'`.

**Commit**: `feat(visual): deixa a Section desenhar o pattern atrás do conteúdo`

---

### T5: Logo do header no mínimo do manual [P]

**What**: Sobe o logo do header para `h-14 w-auto md:h-20`, abre `gap-5` na linha e troca `text-gray-700` por `text-foreground` no menu, no botão do menu e no link do sheet.
**Where**: `components/header.tsx`, `tests/header.test.ts`
**Depends on**: T2
**Reuses**: `content.header.brand`, `defaultWhatsAppUrl`, `h-(--header-h)`, `WhatsAppCta` com `bg-primary` / `hover:bg-primary-dark` / `data-track-location='header'`
**Requirement**: VI-01, VI-03

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] A imagem `/brand/logo-horizontal.png` usa `h-14 w-auto md:h-20`; `width={594}` e `height={180}` permanecem; `alt={brand}` permanece
- [x] A linha do `.container` usa `justify-between gap-5` (1,25 rem)
- [x] Link do menu, botão do menu e link do sheet usam `text-foreground` e hover `text-secondary-dark`; o fonte não contém `text-gray-700`
- [x] O header não ganha `md:h-*` nem `h-[Npx]`; a altura continua só em `--header-h`
- [x] O CTA não usa `bg-whatsapp`
- [x] `tests/header.test.ts` ganha essas exigências e preserva faixa `bg-secondary-dark`, `min-h-11`, CTA `primary-dark` e Sheet
- [x] Gate: `npm run typecheck && npm test`

**Tests**: static
**Gate**: quick

**Verify**: `npm test -- tests/header.test.ts` termina 0. Em inspeção (o projeto não tem E2E): 1280 px mostra o logo a 80 px e o header em `7rem`; 360 px mostra o logo a 56 px, sem rolagem horizontal.

**Commit**: `style(visual): sobe o logo do header ao mínimo do manual`

---

### T6: Símbolo do hero visível e estrela no azul [P]

**What**: Troca a opacidade do símbolo decorativo de `opacity-10` para `opacity-15` e a estrela do selo de `text-rating` para `text-secondary`. A foto e os CTAs ficam como estão.
**Where**: `components/hero.tsx`, `tests/hero.test.ts`
**Depends on**: T1
**Reuses**: `<Image>` de `/brand/symbol.png` e `<img>` dos WebP `hero-640/960/1280.webp`
**Requirement**: VI-02, VI-05, VI-01

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] O `<Image>` de `/brand/symbol.png` tem `opacity-15` e não tem `opacity-10`; permanecem `alt=''`, `aria-hidden`, `pointer-events-none`, `absolute -right-24 -bottom-32 w-md lg:-right-16 lg:w-xl`
- [x] A `<section>` continua `overflow-hidden` e `bg-secondary-bg`; não há máscara nem camada de cor sobre a foto
- [x] A estrela do selo usa `text-secondary`; o arquivo não contém `text-rating`
- [x] Os CTAs continuam `bg-primary` e `border-primary`, com `data-track-location='hero'`
- [x] `tests/hero.test.ts` (grafismo HR-04) exige `opacity-15` e a ausência de `opacity-10`; WebPs, `sizes`, créditos, `formatRating` e CTAs `primary` permanecem
- [x] Gate: `npm run typecheck && npm test`

**Tests**: static
**Gate**: quick

**Verify**: `npm test -- tests/hero.test.ts` termina 0. `rg text-rating components/hero.tsx` não casa. Inspeção em 360 px: símbolo visível, foto igual, sem rolagem horizontal.

**Commit**: `style(visual): deixa o símbolo do hero visível e a estrela no azul`

---

### T7: Pattern só na seção de marcas

**What**: Passa `tone='white'` e `pattern` para a `Section` de marcas. O componente não desenha o tile e não referencia `symbol.png`.
**Where**: `components/brands.tsx`, `tests/sections.test.ts`
**Depends on**: T4
**Reuses**: badge, título, `brands-grid`, `brands-marquee`, `animate-marquee`
**Requirement**: VI-05, VI-01

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] `<Section id='brands' tone='white' pattern>` (ou `pattern={true}`)
- [x] `components/brands.tsx` não contém `symbol.png` nem `brand-pattern`
- [x] Badge `bg-secondary-bg text-secondary-dark` e título `text-h2 text-secondary` permanecem no container
- [x] O `describe` de marcas exige `tone='white'` e `pattern`; o `it` do carrossel (grid, marquee, reduced-motion) não muda
- [x] Gate: `npm run typecheck && npm test`

**Tests**: static
**Gate**: quick

**Verify**: `npm test -- tests/sections.test.ts` termina 0. Só `components/brands.tsx` passa `pattern` para `Section`.

**Commit**: `style(visual): aplica o pattern só na seção de marcas`

---

### T8: Sobre em tint com título no azul oficial

**What**: Tira `tone='blue'` de Sobre. O corpo fica no tint; só o `h2` fica branco sobre um painel `bg-secondary`.
**Where**: `components/about-us.tsx`, `tests/sections.test.ts`
**Depends on**: T7
**Reuses**: grid dos diferenciais; `content.about` e `content.features`
**Requirement**: VI-01

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] `<Section id='about' tone='tint'>`, sem `pattern`
- [x] Ordem no container: badge `rounded-lg bg-white px-3 py-1 text-sm text-secondary-dark`; painel `rounded-2xl bg-secondary px-6 py-4 text-white` só em volta do `h2` `text-h2 font-bold text-balance`; descrição `text-foreground`; `CheckCircle` em `text-secondary-dark`; `h3` e parágrafo em `text-foreground`
- [x] O arquivo não contém `tone='blue'`, `bg-secondary-dark`, `brand-pattern`, `text-white/90` nem `bg-white/5`
- [x] Diferenciais continuam sem `border`, sem `shadow-` e sem `bg-white/5`
- [x] O `describe` de Sobre exige `tone='tint'`, o painel `bg-secondary`, `text-h2`, e a ausência de `bg-secondary-dark` e de `brand-pattern`
- [x] Gate: `npm run typecheck && npm test`

**Tests**: static
**Gate**: quick

**Verify**: `npm test -- tests/sections.test.ts` termina 0. Inspeção: a seção Sobre não é um retângulo `#1f6aa0`; o título é branco sobre `#2983c2`.

**Commit**: `style(visual): tira o bloco azul-escuro de Sobre`

---

### T9: Avaliações no branco e estrela no azul

**What**: Muda avaliações para `tone='white'`, a estrela para `text-secondary` e o badge para `bg-secondary-bg text-secondary-dark`.
**Where**: `components/testimonials.tsx`, `tests/sections.test.ts`
**Depends on**: T8
**Reuses**: `formatRating`, `content.reviews`, CTA `border-primary` com `min-h-11`, grade `items.length > 0`, cards `border bg-white shadow-xs`
**Requirement**: VI-01, VI-02

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] `<Section id='testimonials' tone='white'>`, sem `pattern`
- [x] `Stars` usa `text-secondary`; o arquivo não contém `text-rating` nem `brand-pattern`
- [x] O badge usa `bg-secondary-bg text-secondary-dark`; nota `text-secondary` e summary `text-muted-foreground` ficam
- [x] O `it` que hoje exige `tone='tint'` passa a exigir `tone='white'`, `text-secondary`, ausência de `text-rating` e de `brand-pattern`
- [x] Summary com “41”, CTA `min-h-11` e `border-primary` permanecem
- [x] Gate: `npm run typecheck && npm test`

**Tests**: static
**Gate**: quick

**Verify**: `npm test -- tests/sections.test.ts` termina 0. `rg text-rating components/testimonials.tsx` não casa.

**Commit**: `style(visual): põe avaliações no branco e a estrela no azul`

---

### T10: Onde estamos em tint, com Ligar no azul de apoio [P]

**What**: Tira o retângulo `tone='blue'` de Onde estamos. Título grande no painel `bg-secondary`; Ligar e Como chegar num painel `bg-secondary-dark`; WhatsApp da seção continua `bg-primary` no tint.
**Where**: `components/contact.tsx`, `tests/contact.test.ts`
**Depends on**: T1
**Reuses**: `formatAddress`, `formatHours`, `defaultWhatsAppUrl`, `phoneHref`, `buildMapsSearchUrl`, `buildMapsEmbedUrl`, `content.contact`, CTAs `min-h-11`, `data-track-location='onde-estamos'`
**Requirement**: VI-01, VI-02

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] `<Section id='contact' tone='tint'>`, sem `pattern`
- [x] Badge `bg-white text-secondary-dark`; painel `rounded-2xl bg-secondary px-6 py-4 text-white` só em volta do `h2` `text-h2 font-bold`
- [x] Descrição, endereço, telefone, e-mail e horário em `text-foreground`; ícones `MapPin`, `Phone`, `Mail` e `Clock` em `text-secondary-dark`
- [x] WhatsApp da seção, no tint: `bg-primary`, `hover:bg-primary-dark`; `FaWhatsapp` sem `bg-whatsapp` e sem `text-whatsapp`
- [x] No fonte, `content.contact.actions.whatsapp` aparece antes de `bg-secondary-dark`; o painel `rounded-2xl bg-secondary-dark p-3` contém só Ligar e Como chegar, no `OUTLINE` atual (`border-2 border-white`, `text-white`, `hover:bg-white/10`, `min-h-11`)
- [x] Facebook e Instagram ficam fora desse painel: `border-2 border-secondary-dark text-secondary-dark bg-white hover:bg-secondary-bg`
- [x] Iframe usa `bg-white`
- [x] O arquivo não contém `tone='blue'` nem `brand-pattern`
- [x] `tests/contact.test.ts` estende com `tone='tint'`, `bg-secondary` no título, a ordem WhatsApp → `bg-secondary-dark`, ícone `text-secondary-dark` e ausência de `bg-whatsapp`; `formatAddress`, `formatHours`, phone, email, `min-h-11`, `bg-primary`, redes, mapa lazy e rótulos do JSON permanecem
- [x] Gate: `npm run typecheck && npm test`

**Tests**: static
**Gate**: quick

**Verify**: `npm test -- tests/contact.test.ts` termina 0. Inspeção: a seção não é um retângulo `#1f6aa0`; Ligar e Como chegar são texto branco sobre `#1f6aa0`.

**Commit**: `style(visual): tira o bloco azul-escuro de Onde estamos`

---

### T11: Rodapé curto e faixa de 12 px [P]

**What**: O rodapé fica com logo branco para `#home`, copyright, privacidade e a faixa `h-3`. Saem endereço, horário, telefone, e-mail, WhatsApp, redes e `data-track-location='rodape'`.
**Where**: `components/footer.tsx`, `tests/footer.test.ts`, `tests/conversion.test.ts`
**Depends on**: None
**Reuses**: `bg-secondary-dark`, `.container`, `/brand/logo-horizontal-white.png`, `content.footer.logoAlt`, `content.footer.rights`, `content.footer.privacy`, `new Date().getFullYear()`
**Requirement**: VI-04

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] Ordem: logo em `<a href='#home'>` com `alt={content.footer.logoAlt}` e classe `h-11 w-auto md:h-12`; linha `text-sm text-white` com `© {year} {content.footer.rights}` e `<a href='/privacidade'>`; faixa `flex h-3` `aria-hidden`, metade `bg-secondary` e metade `bg-primary`, sem texto e sem logo
- [x] Miolo em `gap-6 py-10 md:py-12`
- [x] O arquivo não contém `formatAddress`, `formatHours`, `defaultWhatsAppUrl`, `phoneHref`, `mailto:`, `social.facebook`, `social.instagram`, `data-track-location`, `cn`, nem os ícones de contato e de redes
- [x] Sem CNPJ. As chaves de `data/content.json` permanecem
- [x] `tests/footer.test.ts` inverte o `it` de contato e o de redes: esses identificadores ficam ausentes; a faixa exige `h-3`, `bg-secondary` e `bg-primary`; `href='#home'` entra. Fundo, container, logo branco, `logoAlt`, `rights`, sem CNPJ e `/privacidade` permanecem
- [x] `tests/conversion.test.ts` deixa de exigir `data-track-location='rodape'` e passa a exigir que `components/footer.tsx` não contenha `rodape`. `header`, `contact-bar`, `hero`, `onde-estamos`, `flutuante` e a audiência `business` permanecem
- [x] Gate: `npm run typecheck && npm test`

**Tests**: static
**Gate**: quick

**Verify**: `npm test -- tests/footer.test.ts tests/conversion.test.ts` termina 0. `git diff -- data/content.json` vazio. Inspeção: faixa de 12 px, azul à esquerda e vermelho à direita.

**Commit**: `style(visual): encurta o rodapé para não repetir o contato`

---

### T12: Remover o tom blue da Section

**What**: Apaga `blue` do mapa `TONES` depois que Sobre e Onde estamos já usam `tint`. Quem precisa de `#1f6aa0` pinta o próprio painel.
**Where**: `components/section.tsx`, `tests/sections.test.ts`
**Depends on**: T9, T10
**Reuses**: `TONES` de T4, já com `pattern`
**Requirement**: VI-01

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] `TONES` tem só `white: 'bg-white'` e `tint: 'bg-secondary-bg'`
- [x] `components/section.tsx` não contém a chave `blue` nem `bg-secondary-dark`
- [x] `components/about-us.tsx` e `components/contact.tsx` não passam `tone='blue'`
- [x] Um `it` lê `components/section.tsx` e falha se `blue` voltar ao mapa
- [x] O markup de `pattern` de T4 permanece
- [x] Gate: `npm run typecheck && npm test`

**Tests**: static
**Gate**: quick

**Verify**: `npm run typecheck` termina 0. `rg "tone='blue'|blue:" components/section.tsx components/about-us.tsx components/contact.tsx` não casa.

**Commit**: `refactor(visual): remove o tom blue da Section`

---

### T13: Guia de agentes sem o token rating [P]

**What**: Tira `rating` da lista de tokens de cor em `AGENTS.md`.
**Where**: `AGENTS.md`
**Depends on**: T1
**Reuses**: a frase atual de tokens Tailwind
**Requirement**: VI-02

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] A lista de cores cita `primary`, `secondary`, `secondary-dark`, `secondary-bg` e `whatsapp`, e não cita `rating`
- [x] Nenhuma outra regra do arquivo muda
- [x] Gate: `npm run typecheck && npm test`

**Tests**: none
**Gate**: quick

**Verify**: `rg rating AGENTS.md` não casa na lista de tokens.

**Commit**: `docs: tira o token rating do guia de agentes`

---

### T14: Convenções sem o token rating [P]

**What**: Tira `rating` da lista de tokens em `.specs/codebase/CONVENTIONS.md`.
**Where**: `.specs/codebase/CONVENTIONS.md`
**Depends on**: T1
**Reuses**: a seção Styling
**Requirement**: VI-02

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] A lista de tokens não cita `rating`
- [x] A regra de texto pequeno em `secondary-dark` e de `secondary` só em título grande, ícone e fundo grande permanece
- [x] Gate: `npm run typecheck && npm test`

**Tests**: none
**Gate**: quick

**Verify**: `rg rating .specs/codebase/CONVENTIONS.md` não casa na lista de tokens.

**Commit**: `docs: tira o token rating das convenções`

---

### T15: Stack sem o amarelo e com o verde só no flutuante [P]

**What**: Tira `rating` `#eab308` de `.specs/codebase/STACK.md` e registra que `whatsapp` fica só no botão flutuante.
**Where**: `.specs/codebase/STACK.md`
**Depends on**: T1
**Reuses**: o parágrafo de cores de marca
**Requirement**: VI-02

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] O parágrafo mantém `primary` `#d52825`, `primary-dark` `#b3211f`, `secondary` `#2983c2`, `secondary-dark` `#1f6aa0`, `secondary-bg` `#eaf3fa`, `whatsapp` `#25d366` / `#1ebe5d`
- [x] `rating` e `#eab308` somem; a frase diz que o verde é só do botão flutuante
- [x] Gate: `npm run typecheck && npm test`

**Tests**: none
**Gate**: quick

**Verify**: `rg "rating|#eab308" .specs/codebase/STACK.md` não casa.

**Commit**: `docs: reserva o verde do WhatsApp ao botão flutuante`

---

### T16: Arquitetura com tons white e tint e rodapé curto [P]

**What**: Atualiza o tom da `Section` e descreve o rodapé sem bloco de contato.
**Where**: `.specs/codebase/ARCHITECTURE.md`
**Depends on**: T11, T12
**Reuses**: o diagrama e a seção “Seção = componente”
**Requirement**: VI-01, VI-04

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] O texto da primitiva usa `tone='white|tint'`; `blue` sai dessa união
- [x] Uma frase diz que o `Footer` renderiza logo branco, copyright, link de privacidade e a faixa de assinatura, e não chama `formatAddress`, `formatHours`, WhatsApp nem redes
- [x] O nó do diagrama pode continuar “Footer secondary-dark + faixa brand”; `lib/address.ts` e `lib/hours.ts` não passam a apontar para o `Footer`
- [x] Gate: `npm run typecheck && npm test`

**Tests**: none
**Gate**: quick

**Verify**: `rg "white\|tint\|blue" .specs/codebase/ARCHITECTURE.md` não casa. A união `white|tint` está no texto.

**Commit**: `docs: registra os tons white e tint e o rodapé curto`

---

### T17: Gate completo da feature

**What**: Roda o gate de commit do repositório sobre a árvore já alterada pelas tarefas anteriores. Não edita produto nem copy.
**Where**: nenhum arquivo novo
**Depends on**: T5, T6, T9, T13, T14, T15, T16
**Reuses**: comandos de `.specs/codebase/TESTING.md`
**Requirement**: VI-01, VI-02, VI-03, VI-04, VI-05

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] `npm run typecheck && npm run lint && npm run format:check && npm test` termina 0
- [x] `git diff -- data/content.json` vazio
- [x] `components/ui/`, `components/whatsapp-button.tsx`, `components/contact-bar.tsx` e `components/cookie-banner.tsx` sem mudança de cor
- [x] Inspeção manual da página em 360 px e em 1280 px confere os cinco testes independentes da spec (o repositório não tem E2E)

**Tests**: none
**Gate**: full

**Verify**: o comando do gate termina 0. A suíte cobre os casos novos de paleta, layout, header, hero, seções, contato, rodapé e conversão, e não perde os casos que o design marca como estáveis.

**Commit**: nenhum. Esta tarefa só verifica.

---

## Parallel Execution

Tarefas `[P]` sobem juntas, uma por tarefa, só quando as dependências dela já terminaram.

| Tarefa | Paralela com  | Arquivos exclusivos                                                         |
| ------ | ------------- | --------------------------------------------------------------------------- |
| T5     | T6            | `components/header.tsx`, `tests/header.test.ts`                             |
| T6     | T5            | `components/hero.tsx`, `tests/hero.test.ts`                                 |
| T10    | T11           | `components/contact.tsx`, `tests/contact.test.ts`                           |
| T11    | T10           | `components/footer.tsx`, `tests/footer.test.ts`, `tests/conversion.test.ts` |
| T13    | T14, T15, T16 | `AGENTS.md`                                                                 |
| T14    | T13, T15, T16 | `.specs/codebase/CONVENTIONS.md`                                            |
| T15    | T13, T14, T16 | `.specs/codebase/STACK.md`                                                  |
| T16    | T13, T14, T15 | `.specs/codebase/ARCHITECTURE.md`                                           |

Não paralelizar quem divide arquivo: `app/globals.css` (T1 → T2 → T3), `tests/sections.test.ts` e `components/section.tsx` (T3 → T4 → T7 → T8 → T9 → T12). Os testes estáticos leem fonte e não escrevem estado; o limite é o arquivo compartilhado, não o Vitest.

---

## Validação

### Check 1: Granularidade

| Task    | Scope                                                  | Status |
| ------- | ------------------------------------------------------ | ------ |
| T1      | Token no `@theme` + guarda de paleta                   | ✅     |
| T2      | `--header-h` + guarda de layout                        | ✅     |
| T3      | Uma classe CSS + um `it`                               | ✅     |
| T4      | Prop `pattern` + `it` do markup                        | ✅     |
| T5      | Header + `header.test.ts`                              | ✅     |
| T6      | Hero + `hero.test.ts`                                  | ✅     |
| T7      | Brands + `it` de marcas                                | ✅     |
| T8      | About + `describe` de Sobre                            | ✅     |
| T9      | Testimonials + `it` de avaliações                      | ✅     |
| T10     | Contact + `contact.test.ts`                            | ✅     |
| T11     | Footer + dois testes do mesmo comportamento (`rodape`) | ✅     |
| T12     | Remoção de `blue` + `it`                               | ✅     |
| T13–T16 | Um arquivo de doc cada                                 | ✅     |
| T17     | Só o comando de gate                                   | ✅     |

### Check 2: Diagrama × Depends on

| Task | Depends on                     | Diagrama              | Status |
| ---- | ------------------------------ | --------------------- | ------ |
| T1   | None                           | origem                | ✅     |
| T2   | T1                             | T1 → T2               | ✅     |
| T3   | T2                             | T2 → T3               | ✅     |
| T4   | T3                             | T3 → T4               | ✅     |
| T5   | T2                             | T2 → T5               | ✅     |
| T6   | T1                             | T1 → T6               | ✅     |
| T7   | T4                             | T4 → T7               | ✅     |
| T8   | T7                             | T7 → T8               | ✅     |
| T9   | T8                             | T8 → T9               | ✅     |
| T10  | T1                             | T1 → T10              | ✅     |
| T11  | None                           | origem                | ✅     |
| T12  | T9, T10                        | T9 → T12 e T10 → T12  | ✅     |
| T13  | T1                             | T1 → T13              | ✅     |
| T14  | T1                             | T1 → T14              | ✅     |
| T15  | T1                             | T1 → T15              | ✅     |
| T16  | T11, T12                       | T11 → T16 e T12 → T16 | ✅     |
| T17  | T5, T6, T9, T13, T14, T15, T16 | setas para T17        | ✅     |

T5 não depende de T6. T10 não depende de T11. T13–T16 não dependem entre si.

### Check 3: Teste no mesmo tarefa

| Task    | Camada                                                       | Matriz                   | Tests  | Status |
| ------- | ------------------------------------------------------------ | ------------------------ | ------ | ------ |
| T1      | Guarda de paleta (`tests/palette.test.ts`)                   | static                   | static | ✅     |
| T2      | Guarda de `--header-h` (`tests/layout.test.ts`)              | static                   | static | ✅     |
| T3      | Guarda de design (CSS do pattern)                            | static                   | static | ✅     |
| T4      | `Section` + guarda em `tests/sections.test.ts`               | static (maior exigência) | static | ✅     |
| T5      | Header + `tests/header.test.ts`                              | static                   | static | ✅     |
| T6      | Hero + `tests/hero.test.ts`                                  | static                   | static | ✅     |
| T7      | Brands + `tests/sections.test.ts`                            | static                   | static | ✅     |
| T8      | About + `tests/sections.test.ts`                             | static                   | static | ✅     |
| T9      | Testimonials + `tests/sections.test.ts`                      | static                   | static | ✅     |
| T10     | Contact + `tests/contact.test.ts`                            | static                   | static | ✅     |
| T11     | Footer + `tests/footer.test.ts` e `tests/conversion.test.ts` | static                   | static | ✅     |
| T12     | `Section` + guarda em `tests/sections.test.ts`               | static                   | static | ✅     |
| T13–T16 | Documentação                                                 | none                     | none   | ✅     |
| T17     | Nenhum arquivo                                               | none                     | none   | ✅     |

A matriz marca `components/*.tsx` como inspeção visual. Onde a tarefa também edita `tests/*.test.ts`, o tipo exigido sobe para static. Inspeção em 360 px e 1280 px fica em T5, T6, T8, T10, T11 e T17, porque não há E2E.

### Check 4: Orçamento da fase

| Phase | Tasks                | Estimativa        | Status |
| ----- | -------------------- | ----------------- | ------ |
| 1     | 2 médias             | 15+20+20 = 55k    | ✅     |
| 2     | 2 médias             | 15+20+20 = 55k    | ✅     |
| 3     | 2 médias             | 15+20+20 = 55k    | ✅     |
| 4     | 2 médias             | 15+20+20 = 55k    | ✅     |
| 5     | 1 simples + 2 médias | 15+15+20+20 = 70k | ✅     |
| 6     | 1 simples            | 15+12 = 27k       | ✅     |
| 7     | 4 simples            | 15+48 = 63k       | ✅     |
| 8     | 1 simples            | 15+12 = 27k       | ✅     |

---

## Rastreio

| Requirement | Tasks                                      |
| ----------- | ------------------------------------------ |
| VI-01       | T1, T5, T6, T7, T8, T9, T10, T12, T16, T17 |
| VI-02       | T1, T6, T9, T10, T13, T14, T15, T17        |
| VI-03       | T2, T5, T17                                |
| VI-04       | T11, T16, T17                              |
| VI-05       | T3, T4, T6, T7, T17                        |

---

## Next Step

Done. Next recommended step: `/execute` — as 17 tarefas estão granulares, com dependência e gate, e a feature é Large.
