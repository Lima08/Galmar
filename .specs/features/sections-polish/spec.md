# F7 — Sections Polish Specification

**Roadmap:** M1 / F7 · **Tamanho:** Medium · **Depende de:** F1, F2 ✅
**Decisões aplicadas:** AD-006 (avaliações Google), AD-012 (carrossel CSS + reduced-motion), AD-016 (token `rating`)

## Problem Statement

Marcas, Sobre e Avaliações ainda usam layouts pré-F1: título Title Case vago nas marcas, grid estático (sem o carrossel do AD-012), cards com borda no Sobre (sem interação) e Avaliações sem o ritmo visual das seções novas (badge/CTA/fundo).

## Proposed Solution

- **Marcas:** badge + título objetivo; carrossel CSS em loop lento; grid estático com `prefers-reduced-motion`.
- **Sobre:** manter `tone='blue'`; diferenciais em grid limpo (sem card/borda/sombra).
- **Avaliações:** `tone='tint'`; selo de nota reforçado; CTA outline `primary` ≥ 44 px; cards só quando `items.length > 0`.
- Copy: `brands.title` deixa Title Case vago; `reviews.summary` cita as 41 avaliações confirmadas.

## Goals

- [x] Carrossel de marcas CSS com reduced-motion → grid
- [x] Sobre sem cards decorativos
- [x] Avaliações no padrão badge + selo + CTA brand
- [x] Gate Build verde

## Out of Scope

| Item                         | Reason       |
| ---------------------------- | ------------ |
| Textos reais das avaliações  | #10 / AD-014 |
| Otimizar peso dos PNGs marca | F3/F10       |
| Contato / rodapé             | F6 ✅ / F8   |

---

## User Stories

### P1: Marcas com carrossel e copy clara ⭐ MVP

**Acceptance Criteria**:

1. WHEN a seção Marcas é renderizada THEN SHALL usar `<Section id='brands'>` com badge e título de `content.brands`
2. WHEN `prefers-reduced-motion: no-preference` THEN os logos SHALL rolar em loop CSS contínuo (sem lib de animação)
3. WHEN `prefers-reduced-motion: reduce` THEN SHALL exibir grid estático (sem animação)
4. WHEN o título é exibido THEN SHALL NOT usar Title Case vago ("As Marcas que Representam Qualidade")

### P1: Sobre sem cards decorativos ⭐ MVP

**Acceptance Criteria**:

1. WHEN os diferenciais são renderizados THEN SHALL ser grid com ícone + título + texto, SEM `border`/`shadow`/`rounded-lg` de card
2. WHEN a seção é renderizada THEN SHALL manter `tone='blue'` e copy de `about` + `features`

### P1: Avaliações no padrão visual ⭐ MVP

**Acceptance Criteria**:

1. WHEN a seção é renderizada THEN SHALL usar `tone='tint'`, badge, título, nota via `formatRating`, estrelas `text-rating` e CTA com `min-h-11` + estilo primary outline
2. WHEN `reviews.items` está vazio THEN SHALL NOT renderizar grid de cards
3. WHEN há itens THEN cada card SHALL mostrar estrelas, texto e autor (já coberto em F2; manter)

## Requirement Traceability

| Requirement ID | Story                 | Phase   | Status |
| -------------- | --------------------- | ------- | ------ |
| SP-01          | P1: Marcas carrossel  | Execute | Done   |
| SP-02          | P1: Sobre limpo       | Execute | Done   |
| SP-03          | P1: Avaliações padrão | Execute | Done   |

## Success Criteria

- [x] Gate Build verde
- [x] Testes de source para carrossel, ausência de card no Sobre e CTA/tint em Avaliações

## Implementation Notes (2026-11-25)

- Marcas: badge + título "Marcas que você encontra na loja"; carrossel CSS 40s (`.brands-marquee` / `.animate-marquee`); grid estático no celular e com `prefers-reduced-motion`.
- Sobre: diferenciais sem border/shadow; ícone + título + texto.
- Avaliações: `tone='tint'`, CTA outline primary `min-h-11`, summary "41 avaliações".
