# F1 — Design Foundation Specification

**Roadmap:** M1 / F1 · **Tamanho:** Medium · **Depende de:** — · **Desbloqueia:** F4–F8
**Decisões aplicadas:** AD-003 (mobile first + container 1200 px), AD-012 (animações sutis), AD-015 (contraste)

## Problem Statement

As seções do site usam larguras, espaçamentos e cores diferentes entre si. O container vai até 1400 px com padding fixo de 32 px, e cada seção soma `px-4 md:px-6`, `md:px-8`, `max-w-5xl`, `max-w-6xl`, 900 px ou 600 px. Resultado: header, hero e rodapé não alinham (print localhost 2026-11-25). A paleta tem cores fora do manual (#000957, #f87171, #5aa9e1, `bg-black`), e o azul oficial reprova contraste em texto pequeno. Sem uma base comum, cada feature seguinte (F4–F8) reinventaria o padrão.

## Proposed Solution

Uma base visual única, aplicada às seções existentes sem redesenhá-las:

- **Tokens de cor** só do manual + tons derivados para hover e contraste (AD-015)
- **Tipografia** Poppins com escala fluida e teto
- **Container** único: conteúdo de no máximo 1200 px, margens laterais de 16 px (celular) e 32 px (`md:`+)
- **Primitiva de seção**: fundo de ponta a ponta, conteúdo no container, ritmo vertical padrão
- **Animação de entrada** sutil, reutilizável, que respeita `prefers-reduced-motion`
- **Guarda automática** (teste) que impede cores fora da paleta nos componentes

Para o visitante: tudo alinhado na mesma linha vertical em qualquer tela, leitura confortável no celular e em monitores grandes, cores fiéis à marca.

## Goals

- [x] Bordas esquerda/direita do conteúdo de header, todas as seções e rodapé coincidem (±1 px) em 360, 768, 1280, 1920 e 2560 px
- [x] 0 ocorrências de cor fora da paleta em `components/**` e `app/**` (teste automatizado)
- [ ] 0 reprovações de contraste no Lighthouse/axe causadas por tokens da F1

## Out of Scope

| Feature                                        | Reason                                      |
| ---------------------------------------------- | ------------------------------------------- |
| Redesenho de layout/conteúdo de qualquer seção | F4–F8; aqui só troca de primitivas e tokens |
| Altura do hero / remoção de `min-h-screen`     | F5 (`hero-redesign`)                        |
| Faixa de contato, menu em pílula, `Sheet`      | F4                                          |
| Revisão de textos de `content.json`            | F2                                          |
| Logo/ícones/imagens                            | F3                                          |
| Dark mode                                      | Site não tem tema escuro; não há toggle     |
| Carrossel de marcas                            | F7 (usa a animação definida aqui)           |

---

## User Stories

### P1: Paleta oficial com contraste garantido ⭐ MVP

**User Story**: Como dono da marca, quero que o site use só as cores do manual (e tons derivados delas) com contraste acessível, para que a marca fique consistente e legível.

**Why P1**: Objetivo O2 (zero cor fora da paleta) e O4 (acessibilidade ≥ 90).

**Acceptance Criteria**:

1. WHEN a configuração Tailwind é carregada THEN o tema SHALL expor: azul marca `#2983c2`, azul de apoio `#1f6aa0`, tint azul claro para fundos, vermelho `#d52825`, vermelho hover `#b3211f`, branco, e neutros para texto
2. WHEN o tema é carregado THEN SHALL NOT existir `#000957`, `#f87171` nem `#5aa9e1`
3. WHEN texto branco < 24 px (ou < 18,66 px bold) é exibido sobre azul THEN o fundo SHALL ser o azul de apoio (contraste ≥ 4,5:1)
4. WHEN texto pequeno é exibido em azul sobre branco ou tint THEN SHALL usar o azul de apoio
5. WHEN título ≥ 24 px (ou ≥ 18,66 px bold) é exibido em azul THEN pode usar `#2983c2` (≥ 3:1)
6. WHEN botão vermelho recebe hover/foco THEN SHALL usar `#b3211f` e manter anel de foco visível
7. WHEN qualquer arquivo em `components/` (exceto `components/ui/`) ou `app/` contém classes `(bg|text|border|ring|from|to|via|fill|stroke)-(blue|red|sky|indigo|navy|rose|black)-*`, `bg-black`, `text-black` ou hex arbitrário `[#…]` THEN o teste de paleta SHALL falhar indicando arquivo e trecho

**Independent Test**: `npm test` passa com o teste de paleta; inserir `bg-blue-900` num componente faz o teste falhar.

---

### P1: Container e alinhamento únicos ⭐ MVP

**User Story**: Como visitante em qualquer tela, quero que logo, menu, textos e rodapé fiquem alinhados na mesma largura, para que o site pareça organizado e profissional.

**Why P1**: Problema visível no print de 2026-11-25; base de AD-003.

**Acceptance Criteria**:

1. WHEN a largura da viewport é ≥ 1264 px THEN a área de conteúdo SHALL ter exatamente 1200 px, centralizada
2. WHEN a viewport é < 768 px THEN a margem lateral SHALL ser 16 px; WHEN ≥ 768 px THEN SHALL ser 32 px
3. WHEN header, qualquer seção e rodapé são renderizados THEN todos SHALL usar o mesmo container (nenhum `container`/`max-w-*`/`px-*` de largura própria no nível da seção)
4. WHEN a viewport é 320 px THEN SHALL NOT haver rolagem horizontal
5. WHEN um bloco de texto corrido é exibido THEN sua largura SHALL ser limitada a ~65 caracteres (`max-w-prose` ou equivalente)

**Independent Test**: Abrir em 1920 px e 2560 px; régua vertical na borda do logo coincide com a borda do título do hero, dos cards e do texto do rodapé. Em 320 px, `document.documentElement.scrollWidth === innerWidth`.

---

### P1: Primitiva de seção com ritmo vertical ⭐ MVP

**User Story**: Como desenvolvedor das próximas features, quero um componente de seção padrão, para que cada nova seção tenha fundo de ponta a ponta, conteúdo no container e espaçamento consistente sem repetir classes.

**Why P1**: F4–F8 dependem disso; remove duplicação existente (`w-full py-12 md:py-24 lg:py-32` + `container px-…` em 5 arquivos).

**Acceptance Criteria**:

1. WHEN uma seção é criada com a primitiva THEN SHALL renderizar `<section id>` com fundo full-bleed e o conteúdo dentro do container
2. WHEN a primitiva recebe um tom THEN SHALL suportar ao menos: branco, tint azul claro, azul de apoio (texto branco)
3. WHEN renderizada THEN o espaçamento vertical SHALL seguir uma escala única: menor no celular, maior a partir de `md:` (valores definidos no design, sem `lg:py-32` divergente)
4. WHEN as seções atuais (Brands, About, Testimonials, Contact) são migradas THEN SHALL usar a primitiva, e About/Contact SHALL trocar `bg-black` por um tom da paleta
5. WHEN a primitiva é Server Component THEN SHALL NOT exigir `'use client'`

**Independent Test**: Seções existentes renderizam com a primitiva; `grep -n "py-12 md:py-24 lg:py-32" components` retorna vazio.

---

### P1: Tipografia Poppins com escala fluida ⭐ MVP

**User Story**: Como visitante, quero textos legíveis no celular e títulos proporcionais em monitores grandes, para ler com conforto em qualquer tela.

**Why P1**: Manual exige Poppins; títulos atuais crescem até `xl:text-6xl` sem teto relativo à largura.

**Acceptance Criteria**:

1. WHEN o site carrega THEN Poppins SHALL estar disponível nos pesos 400, 500 e 700 (600 entra quando algum componente usar `font-semibold` — review 2026-11-25), com `display: swap`, via `next/font` (sem requisição externa em runtime)
2. WHEN o tema Tailwind é carregado THEN `font-sans` SHALL apontar para Poppins (sem depender de `className` no `<body>` apenas)
3. WHEN texto corrido é exibido THEN o tamanho SHALL ser ≥ 16 px em qualquer viewport
4. WHEN títulos H1/H2/H3 são exibidos THEN SHALL usar tamanhos fluidos (`clamp`) com mínimo legível em 360 px e teto fixo (H1 não cresce além do teto em 2560 px)
5. WHEN títulos quebram linha THEN SHALL usar `text-balance`

**Independent Test**: DevTools → Network sem chamadas a `fonts.googleapis.com`; computed font-size do H1 igual em 1920 e 2560 px; corpo ≥ 16 px em 360 px.

---

### P2: Animação de entrada sutil

**User Story**: Como visitante, quero que as seções surjam suavemente ao rolar, para uma sensação moderna sem distração.

**Why P2**: AD-012; melhora percepção, não bloqueia publicação.

**Acceptance Criteria**:

1. WHEN um bloco marcado entra na viewport pela primeira vez THEN SHALL animar opacidade 0→1 e deslocamento ~16 px→0 em ≤ 600 ms, uma única vez
2. WHEN `prefers-reduced-motion: reduce` está ativo THEN o bloco SHALL aparecer sem animação
3. WHEN JavaScript está desabilitado ou falha THEN todo conteúdo SHALL permanecer visível (nada começa oculto sem JS)
4. WHEN implementado THEN SHALL NOT adicionar dependência de animação (Framer Motion etc.)
5. WHEN conteúdo está acima da dobra no carregamento THEN SHALL NOT animar (evita atraso no LCP)

**Independent Test**: Rolar a página: seções surgem uma vez. Ativar "reduce motion" no SO: nada anima. Desabilitar JS: tudo visível.

---

### P2: Altura do header desacoplada

**User Story**: Como desenvolvedor, quero a altura do header definida num único lugar, para que mudar o header (F4) não quebre o deslocamento das âncoras.

**Why P2**: CONCERNS.md — `scroll-pt-[90px]`, `h-[50px]` e `mt-[80px]` acoplados.

**Acceptance Criteria**:

1. WHEN a altura do header muda THEN SHALL bastar alterar um único valor (variável CSS ou token) para que `scroll-padding-top` e o espaçamento do `<main>` acompanhem
2. WHEN um link de âncora do menu é clicado THEN o título da seção SHALL aparecer logo abaixo do header, sem ficar escondido

**Independent Test**: Alterar o valor único e clicar em cada item do menu: títulos visíveis abaixo do header.

---

### P3: Limpeza de variáveis CSS não usadas

**User Story**: Como desenvolvedor, quero `globals.css` só com o que é usado, para que o tema seja fácil de entender.

**Why P3**: Higiene; sem impacto visual.

**Acceptance Criteria**:

1. WHEN `globals.css` é carregado THEN SHALL NOT conter variáveis `--sidebar-*`, `--chart-*` nem o bloco `.dark`, desde que nenhum arquivo as referencie
2. WHEN removidas THEN `components/ui/button.tsx` SHALL continuar funcionando (variáveis que ele usa permanecem)

**Independent Test**: `grep -rn "sidebar\|chart-\|\.dark" app components` sem resultado; build e visual do botão inalterados.

---

## Edge Cases

- WHEN a viewport é 320 px (menor que o alvo de 360) THEN SHALL NOT haver rolagem horizontal nem texto cortado
- WHEN a viewport é 2560 px ou mais THEN o conteúdo SHALL permanecer em 1200 px e os fundos SHALL ocupar a largura toda
- WHEN o usuário aumenta o zoom do navegador para 200% THEN o layout SHALL reorganizar sem sobreposição
- WHEN uma palavra muito longa (URL, e-mail) aparece num card estreito THEN SHALL quebrar (`break-words`) sem estourar o container
- WHEN o teste de paleta encontra cor proibida em `components/ui/` THEN SHALL ignorar (vendor shadcn)

---

## Requirement Traceability

| Requirement ID | Story                           | Phase   | Status |
| -------------- | ------------------------------- | ------- | ------ |
| DF-01          | P1: Paleta — tokens             | Execute | Done   |
| DF-02          | P1: Paleta — contraste          | Execute | Done   |
| DF-03          | P1: Paleta — teste de guarda    | Execute | Done   |
| DF-04          | P1: Container único             | Execute | Done   |
| DF-05          | P1: Texto ≤ 65 ch               | Execute | Done   |
| DF-06          | P1: Primitiva de seção          | Execute | Done   |
| DF-07          | P1: Migração das seções         | Execute | Done   |
| DF-08          | P1: Poppins 4 pesos + font-sans | Execute | Done   |
| DF-09          | P1: Escala tipográfica fluida   | Execute | Done   |
| DF-10          | P2: Animação de entrada         | Execute | Done   |
| DF-11          | P2: Altura do header única      | Execute | Done   |
| DF-12          | P3: Limpeza do globals.css      | Execute | Done   |

**Coverage:** 12 total, 12 verificados (tasks inline no /execute, 2026-11-25)

---

## Success Criteria

- [x] Gate Full verde: `npm run typecheck && npm run lint && npm run format:check && npm test`
- [x] `npm run build` verde
- [x] Teste de paleta existe e falha com cor proibida
- [x] Alinhamento conferido em 360, 768, 1280, 1920, 2560 px
- [ ] Lighthouse mobile Acessibilidade sem itens de contraste atribuíveis aos tokens
- [x] Nenhum texto/conteúdo alterado (diff de `content.json` vazio nesta feature)

## Assumptions (validar na aprovação)

- Neutros de texto: escala `gray`/`neutral` do Tailwind (permitida em CONVENTIONS.md); corpo em cinza escuro próximo ao do manual (~#333), contraste ≥ 7:1
- Tint azul claro para fundos derivado de #2983c2 (substitui #d4eafd); valor exato no execute
- Nomes de token mantidos quando possível (`secondary.dark` passa a ser #1f6aa0) para minimizar diff

## Implementation Notes (2026-11-25)

- `SPEC_DEVIATION`: container definido em `app/globals.css` (`.container`, máx. 79rem, margens 1rem/2rem) com `corePlugins.container: false`. Reason: no Tailwind 3, `container.padding.md` só vale se `md` estiver em `container.screens`, o que forçaria `max-width: 768px` entre 768–1263 px. Teste ajustado com aprovação do usuário.
- Header não encolhe mais ao rolar (altura fixa `--header-h: 5rem`); continua trocando fundo/sombra.
- Neutros: `--foreground` #333 e `--muted-foreground` #666 (o #737373 dava 4,22:1 no tint).
- Estouro em 320–360 px corrigido: `break-words` global no `body`, `[&>*]:min-w-0` no grid de Contato, `w-full min-w-0` nos campos do formulário.
- Verificação real (Chrome headless/CDP): bordas idênticas em todas as seções — 1280 px: 33–1233; 1920 px: 353–1553; 2560 px: 673–1873; sem rolagem horizontal de 320 a 2560 px; H1 56 px em 1920 e 2560 (teto); corpo 16 px em 360; reveal: 4 blocos ocultos abaixo da dobra → revelados ao rolar; 0 ocultos com reduced-motion e sem JS; âncoras 8 px abaixo do header.
- Testes: 3 arquivos novos em `tests/` (paleta, tema, layout); 54 testes no total.

## Review (2026-11-25)

Ver `review.md`. Corrigidos: título do card de Contato branco sobre branco (CRITICAL), peso 600 da Poppins sem uso, prop `className` especulativa do `Section`, ordem de imports, guarda de layout com falsos negativos (agora recursiva, multilinha, `max-w-*` amplo), guarda de cor ampliada (todas as famílias, hex literal, `[color:…]`), exceções de terceiros em tokens (AD-016), `overflow-wrap:anywhere` global (palavra longa em qualquer grid/flex), H3 com `text-h3` + `text-balance`, `darkMode` e `.text-balance` duplicado removidos, erro claro em `grayHex`, teste estático do reveal, docs do codebase atualizados. Pendentes: Lighthouse/axe real (F10), hover `#b3211f` no botão vermelho (F4), `sr-only` das redes em `content.json` (F6).
