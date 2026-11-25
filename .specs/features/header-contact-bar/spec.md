# F4 — Header & Contact Bar Specification

**Roadmap:** M1 / F4 · **Tamanho:** Large · **Depende de:** F1, F2 ✅ · **Desbloqueia:** F9
**Decisões aplicadas:** AD-003 (mobile first, container 1200), AD-004 (telefone = WhatsApp), AD-005 (CTA vermelho único), AD-015 (texto branco pequeno só sobre `secondary-dark`), AD-016
**Referência:** Limpeza Pura — contato no topo com ícone + rótulo + número, menu em pílula; evitar header poluído (busca, e-mail, lista)

## Problem Statement

O header não mostra nenhum contato: telefone e WhatsApp só aparecem no fim da página e no botão flutuante. O menu é uma lista simples sem ação principal, e o menu mobile é um bloco que abre sem foco gerenciado, sem fechar com Esc e sem bloquear a rolagem do fundo. O cliente pediu o contato visível no topo (referência Limpeza Pura), sem a poluição daquele header.

## Proposed Solution

1. **Faixa de contato** (`components/contact-bar.tsx`), acima do header, fundo `secondary-dark` com texto branco: WhatsApp e Ligar (mesmo número), horário resumido e Instagram. No celular, só dois botões de toque: "WhatsApp" e "Ligar".
2. **Header `sticky`** logo abaixo: logo, menu em pílula (desktop) e CTA vermelho "Chamar no WhatsApp". A faixa rola junto com a página e sai de vista; o header gruda no topo.
3. **Menu mobile em `Sheet`** (shadcn, Radix Dialog): painel lateral com foco preso, Esc fecha, fundo não rola, CTA de WhatsApp no fim.

### Design (inline)

```
┌ ContactBar (fluxo normal, bg secondary-dark, ~40px) ─────────────────────┐
│ [WA] WhatsApp (19) 3212-1177 · [☎] Ligar · Seg–Sex 9h–18h · Sáb 9h–13h  [IG] │  ← desktop
│ [WA WhatsApp]                                   [☎ Ligar]                 │  ← mobile
└──────────────────────────────────────────────────────────────────────────┘
┌ Header (sticky top-0, h --header-h, bg branco) ──────────────────────────┐
│ [logo]          ( Início  Marcas  Sobre  Avaliações  Contato )  [CTA WA] │  ← desktop
│ [logo]                                                         [☰]       │  ← mobile → Sheet
└──────────────────────────────────────────────────────────────────────────┘
```

- `sticky` elimina o acoplamento `fixed` + `mt` no `<main>`: a altura do header fica só em `--header-h` (header e `scroll-padding-top`).
- Horário curto derivado da mesma fonte (`hoursByDay` + rótulo curto por linha `daysShort`), via `formatShortHours` (só dias abertos).
- Links de contato só via `buildWhatsAppUrl` e `tel:` montado de `contact.info.phone`.
- Hover do CTA vermelho em `primary-dark` (#b3211f) via classe no uso — sem editar o vendor `components/ui/button.tsx`.

## Goals

- [x] WhatsApp e Ligar alcançáveis com 1 toque no topo, em 360 px, sem rolar
- [x] Header com no máximo 3 grupos (logo, menu, CTA) — sem busca, e-mail ou lista
- [x] Menu mobile acessível: foco preso, Esc fecha, fundo travado, `aria` corretos

## Out of Scope

| Item                                              | Reason                            |
| ------------------------------------------------- | --------------------------------- |
| Rótulo "Onde estamos" e seção nova de localização | F6                                |
| Mensagem de WhatsApp por origem no GA4            | F9 (aqui as mensagens existentes) |
| Logo SVG                                          | #12                               |

---

## User Stories

### P1: Faixa de contato ⭐ MVP

**User Story**: Como visitante, quero ver e tocar no WhatsApp e no telefone logo ao abrir o site, para falar com a loja sem procurar.

**Acceptance Criteria**:

1. WHEN a página carrega THEN a faixa SHALL aparecer acima do header com: link WhatsApp (`wa.me/551932121177` + mensagem `default`, nova aba), link `tel:+551932121177`, horário curto e link do Instagram
2. WHEN a viewport é < 768 px THEN a faixa SHALL mostrar só "WhatsApp" e "Ligar", cada um com área de toque ≥ 44 × 44 px
3. WHEN a viewport é ≥ 768 px THEN SHALL mostrar o número "(19) 3212-1177", o horário "Seg–Sex 9h–18h · Sáb 9h–13h" e o Instagram
4. WHEN o visitante rola a página THEN a faixa SHALL sair de vista naturalmente (fluxo normal) e o header SHALL permanecer no topo
5. WHEN o texto é exibido THEN SHALL ser branco sobre `secondary-dark` (contraste ≥ 4,5:1) e vir de `content.json`

### P1: Header com menu e CTA ⭐ MVP

**User Story**: Como visitante no desktop, quero o menu e um botão claro de contato no topo, para navegar ou falar com a loja de qualquer ponto.

**Acceptance Criteria**:

1. WHEN a viewport é ≥ 1024 px THEN o header SHALL exibir logo, menu em pílula (fundo `secondary-bg`, cantos totalmente arredondados) e CTA "Chamar no WhatsApp" vermelho
2. WHEN o CTA recebe hover/foco THEN SHALL usar `primary-dark` (#b3211f) e anel de foco visível
3. WHEN o visitante rola THEN o header SHALL ficar `sticky` no topo, com sombra após rolar
4. WHEN um item do menu é clicado THEN a seção SHALL aparecer logo abaixo do header (offset por `--header-h`)
5. WHEN a altura do header muda THEN SHALL bastar alterar `--header-h` (nenhuma margem compensatória no `<main>`)

### P1: Menu mobile acessível ⭐ MVP

**User Story**: Como visitante no celular, quero um menu que abra em painel, feche fácil e não me deixe perdido, para navegar com uma mão.

**Acceptance Criteria**:

1. WHEN o botão de menu é tocado THEN SHALL abrir um painel lateral (`Sheet`) com os itens do menu e o CTA de WhatsApp no fim
2. WHEN o painel está aberto THEN o foco SHALL ficar preso nele, Esc SHALL fechar e o fundo SHALL NOT rolar
3. WHEN um item é tocado THEN o painel SHALL fechar e a página SHALL rolar até a seção
4. WHEN fechado THEN o foco SHALL voltar ao botão de menu
5. WHEN o botão de menu é renderizado THEN SHALL ter `aria-label` vindo de `content.json` e área ≥ 44 × 44 px

---

## Edge Cases

- WHEN a viewport é 320 px THEN faixa e header SHALL caber sem rolagem horizontal
- WHEN JavaScript está desabilitado THEN os links da faixa e do CTA SHALL funcionar (são `<a href>`); o menu mobile pode não abrir, mas as seções seguem alcançáveis rolando
- WHEN `prefers-reduced-motion` está ativo THEN o `Sheet` SHALL abrir sem animação de deslize
- WHEN a página abre com âncora (`/#contact`) THEN o título SHALL ficar visível abaixo do header

---

## Tasks (inline)

1. **Conteúdo e horário curto** → `data/content.json` (`contactBar`, `header.cta`, `hoursByDay[].daysShort`), `lib/hours.ts` (`formatShortHours`) + testes → verify: `npm test`
2. **ContactBar** → `components/contact-bar.tsx`, `app/page.tsx` → verify: links no HTML gerado, 360/1280 px
3. **Header sticky + pílula + CTA** → `components/header.tsx`, `app/page.tsx`, `tests/layout.test.ts` → verify: âncoras, alinhamento
4. **Sheet mobile** → `npx shadcn@latest add sheet`, `components/header.tsx` → verify: foco, Esc, scroll lock (CDP)
5. **Verificação** → gate Build, capturas 320/360/768/1280/1920, contraste

## Requirement Traceability

| Requirement ID | Story                              | Phase   | Status |
| -------------- | ---------------------------------- | ------- | ------ |
| HC-01          | P1: Faixa — links e conteúdo       | Execute | Done   |
| HC-02          | P1: Faixa — mobile/desktop         | Execute | Done   |
| HC-03          | P1: Header — pílula + CTA          | Execute | Done   |
| HC-04          | P1: Header — sticky + `--header-h` | Execute | Done   |
| HC-05          | P1: Menu mobile acessível          | Execute | Done   |

## Success Criteria

- [x] Gate Build verde
- [x] HTML gerado com `wa.me/551932121177` e `tel:+551932121177` na faixa e no CTA
- [x] Capturas 320/360/768/1280/1920 sem rolagem horizontal e com alinhamento do container
- [x] Menu mobile verificado no navegador (abre, Esc fecha, foco volta)

## Implementation Notes (2026-11-25)

- `SPEC_DEVIATION`: menu em pílula + CTA a partir de **1024 px** (não 768). Reason: em 768 px o conteúdo (logo ~158 + pílula ~520 + CTA ~200) passa dos 704 px úteis; tablet usa o `Sheet`.
- `Sheet` instalado via `npx shadcn@latest add sheet` (+ `@radix-ui/react-dialog`). Vendor traz `sr-only` "Close" em inglês e classes `animate-in` sem plugin (Tailwind 4 sem `tailwindcss-animate`) → painel abre sem deslizar. Não editado (regra do vendor); ver Deferred em STATE.
- `content.header.menuClose` removido (o `Sheet` fecha pelo próprio botão, Esc ou clique fora).
- Verificação (CDP): header `sticky` com sombra após rolar; faixa com alvos 114×44 e 74×44 px em 360 px; Sheet abre com foco dentro e rolagem travada, Esc fecha e devolve o foco ao botão, tocar item fecha e posiciona a seção 8 px abaixo do header; sem rolagem horizontal de 320 a 2560 px; `tel:+551932121177` e horário curto "Seg–Sex 9h–18h · Sáb 9h–13h" no HTML.
