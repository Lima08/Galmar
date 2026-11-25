# Review — F1 design-foundation

**Data:** 2026-11-25 · **Modo:** Local (não commitado na `main`)

|                 |                                                                                                                                                                                                  |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Mode**        | Local                                                                                                                                                                                            |
| **Scope**       | 17 arquivos (12 modificados, 5 novos), 0 commits                                                                                                                                                 |
| **Subagents**   | 6 of 6 — Security, Requirements, Tests, Architecture, Regression, Performance                                                                                                                    |
| **Docs loaded** | `design-foundation/spec.md`, `STATE.md`, `PROJECT.md`, `CONVENTIONS.md`, `ARCHITECTURE.md`, `STRUCTURE.md`, `STACK.md`, `CONCERNS.md`, `TESTING.md`, `INTEGRATIONS.md`, `AGENTS.md`, `CLAUDE.md` |
| **Findings**    | 18 em 13 arquivos (0 SECURITY · 1 CRITICAL · 1 PERFORMANCE · 9 WARNING · 7 SUGGESTION)                                                                                                           |

---

## CRITICAL (1)

- `components/contact.tsx:81` — **Título do card do formulário branco sobre branco (1:1).** O card `bg-white` herda `text-white` do `<Section tone='blue'>`. Pré-existente (o container antigo tinha `text-white`), mas mantido pela migração e contradiz a meta "0 reprovações de contraste" marcada como cumprida. **Fix:** `text-foreground` no card.

## PERFORMANCE (1)

- `app/layout.tsx:10` — **Peso 600 da Poppins pré-carregado sem uso** (`font-semibold`: 0 ocorrências). ~7,9 KB extra no caminho crítico. **Fix:** carregar 400/500/700 agora; incluir 600 quando F4+ usar (exige ajustar DF-08). `display: 'swap'` é o default do `next/font` (redundante, inofensivo).

## WARNING (9)

- `components/section.tsx:6,12` — **API especulativa:** tom `tint` e prop `className` sem consumidor; `className` vai para o container interno (surpreendente). Remover até F4–F8 precisarem. _(Architecture + Regression)_
- `components/brands.tsx:1`, `about-us.tsx:1`, `testimonials.tsx:1` — **Ordem de imports:** `@/components/section` inserido antes de `next/*`/libs externas (CONVENTIONS §Imports).
- `tests/layout.test.ts:10-14` — **Guarda de layout com falsos negativos:** `CLASS_NAMES` corta no primeiro `}`; `CONTAINER_WITH_PADDING` não atravessa quebra de linha (formato que o Prettier gera em `cn(...)`); `OWN_WIDTH` não pega `max-w-2xl`, `max-w-screen-*`, `max-w-[75rem]`, `w-[1200px]`; varredura não recursiva (ignora `components/forms/` e `app/`). **Fix:** varrer fonte inteiro com `listSourceFiles`, regex com `[\s\S]`, ampliar padrão.
- `components/about-us.tsx`, `testimonials.tsx`, `contact.tsx` (grids/flex) — **Edge case "palavra longa" só parcial:** `break-words` não reduz min-content de itens flex/grid; só o grid de Contato tem `min-w-0`. Funciona com o conteúdo atual.
- `components/about-us.tsx`, `contact.tsx` — **DF-09 parcial:** H3 sem `text-balance`; os 4 H3 de info de contato sem `text-h3`.
- Goal "0 cor fora da paleta" — **parcial:** `text-yellow-500` (estrelas), `bg-green-500/600` (WhatsApp), hex inline `#1877F2`/`#E1306C` (contact.tsx). Cores de terceiros: documentar como exceção ou trocar.
- `.specs/codebase/STACK.md` — cita `secondary-dark #000957` (agora proibido pelo teste) e Poppins 400/700.
- `.specs/codebase/ARCHITECTURE.md`, `STRUCTURE.md`, `CONCERNS.md`, `AGENTS.md` — padrão de seção antigo, sem `Section`/`RevealObserver`/`tests/`; acoplamento `scroll-pt-[90px]` já resolvido ainda listado.
- `.specs/codebase/CONVENTIONS.md` / `TESTING.md` — "`black` ok" contradiz o teste de paleta; `tests/` não documentado.

## SUGGESTION (7)

- `tailwind.config.ts:6` — `darkMode: ['class']` órfão após remover `.dark`.
- `app/globals.css:21-25` — `.text-balance` customizado duplica utilitário nativo do Tailwind 3.4 (agora usado em 5 lugares).
- `tests/palette.test.ts` (`grayHex`) — falha com `NaN` em vez de mensagem clara se o formato `0 0% N%` mudar.
- `tests/palette.test.ts:83` — brechas conhecidas (classe dinâmica, `[color:#...]`, `style` inline); decidir allowlist ou ampliar.
- `components/reveal-observer.tsx` / `globals.css` — teste estático barato: `hidden` só dentro de `no-preference`; `section.tsx` emite `data-reveal=''`.
- `components/ui/button.tsx` (variante default) — hover `primary/90`, não `#b3211f` (DF-02 P1.6); sem botão vermelho hoje — tratar em F4.
- `components/contact.tsx:65,74` — `sr-only` "Facebook"/"Instagram" hardcoded (pré-existente; copy deveria ir para `content.json`).

---

## Files With No Findings

- `app/page.tsx`, `components/header.tsx`, `components/hero.tsx`, `components/footer.tsx`, `components/forms/contact-form.tsx`, `tests/theme.test.ts`

## Highlights

- **Security:** links externos com `rel='noopener noreferrer'`; `RevealObserver` só seta atributos com literais.
- **Requirements:** 22 de 26 ACs PASS; `content.json` intocado; SPEC_DEVIATION do container bem justificado.
- **Tests:** contraste WCAG calculado a partir dos tokens reais — pegou o `#737373` no tint.
- **Architecture:** `--header-h` único + teste elimina a área frágil registrada em CONCERNS.
- **Regression:** nenhum import fantasma; remoções de `--sidebar-*`/`--chart-*` seguras.
- **Performance:** reveal com CLS 0, LCP intocado, IntersectionObserver com cleanup correto.
