# F5 — Hero Redesign Specification

**Roadmap:** M1 / F5 · **Tamanho:** Medium · **Depende de:** F1, F2, F3 ✅
**Decisões aplicadas:** AD-003 (mobile first, hero sem `min-h-screen`), AD-005/AD-013 (CTAs de WhatsApp casa/empresa), AD-007 (imagens pré-otimizadas), AD-010 (foto de banco de imagens com créditos), AD-012 (animação sutil)
**Validado com o usuário (2026-11-25):** foto = Pexels 28576636 "Close-up of Cleaning Supplies with Gloves", de Jonathan Borba (licença Pexels, gratuita)

## Problem Statement

O hero ocupa a tela inteira (`min-h-screen`) e, em monitores altos, sobra espaço vazio acima e abaixo do conteúdo. A foto é a placa da fachada, que mostra um WhatsApp antigo. Os atalhos de WhatsApp (F2) usam azul e contorno neutro, sem a hierarquia de CTA da marca, e não há nenhum sinal de confiança perto da ação ("desde 1996", nota no Google).

## Proposed Solution

- **Altura pelo conteúdo:** `py-12 md:py-20`, sem `min-h-screen`; no desktop o bloco fica abaixo de ~720 px.
- **Layout mobile first:** no celular, título → texto → CTAs → selo de confiança → foto (CTA na primeira tela). A partir de `lg`, texto à esquerda e foto à direita.
- **Foto nova** em WebP pré-gerado (640/960/1280 px) com `srcset`/`sizes`, `fetchPriority='high'` (provável LCP). Créditos em `public/assets/hero/CREDITS.md`.
- **CTAs:** "Para sua empresa" vermelho preenchido e "Para sua casa" com contorno vermelho (AD-013), hover/foco em `primary-dark`.
- **Selo de confiança:** "★ 5,0 no Google · Desde 1996", com a nota vinda de `reviews.rating` (mesma fonte da seção de avaliações).
- **Grafismo da marca:** símbolo G grande, cortado, em baixa opacidade no fundo (manual 5.2), decorativo (`alt=''`).

> Ajuste do AD-010: sem camada azul sobre a foto. No layout em duas colunas, a foto fica ao lado do texto e não atrás dele; a cor da marca entra pelo fundo tint + grafismo.

## Goals

- [x] CTA "Para sua empresa" visível sem rolar em 360 × 640
- [x] Hero ≤ 720 px de altura em 1280–2560 px de largura
- [x] Foto com no máximo 60 KB servidos no celular

## Out of Scope

| Item                        | Reason            |
| --------------------------- | ----------------- |
| Fotos reais da loja         | Deferred (AD-010) |
| Medição dos cliques por CTA | F9                |

---

## User Stories

### P1: Hero enxuto e com ação clara ⭐ MVP

**Acceptance Criteria**:

1. WHEN o hero é renderizado THEN SHALL NOT usar `min-h-screen`, e a altura SHALL vir do conteúdo e do padding
2. WHEN a viewport é < 1024 px THEN a ordem SHALL ser título, texto, CTAs, selo, foto
3. WHEN a viewport é ≥ 1024 px THEN SHALL ter duas colunas: texto à esquerda e foto à direita
4. WHEN os CTAs são exibidos THEN "Para sua empresa" SHALL ser vermelho preenchido e "Para sua casa" contorno vermelho, ambos com hover/foco em `primary-dark` e alvo ≥ 44 px
5. WHEN o selo é exibido THEN a nota SHALL vir de `reviews.rating` formatada em pt-BR ("5,0") e os textos de `content.json`

### P1: Foto otimizada e creditada ⭐ MVP

**Acceptance Criteria**:

1. WHEN a foto é carregada THEN SHALL usar `srcset` com 640/960/1280 WebP e `sizes` que entregue a de 640 px no celular
2. WHEN a foto é renderizada THEN SHALL ter `width`/`height` (sem CLS), `fetchPriority='high'` e `alt` vindo do `content.json`
3. WHEN os arquivos são gerados THEN 640 ≤ 60 KB e 1280 ≤ 150 KB
4. WHEN a foto é publicada THEN `public/assets/hero/CREDITS.md` SHALL registrar autor, link e licença
5. WHEN a foto nova está em uso THEN `public/foto-galmar.jpg` SHALL ser removida (sem referências)

### P2: Grafismo da marca

**Acceptance Criteria**:

1. WHEN o hero é renderizado THEN o símbolo SHALL aparecer como decoração (`alt=''`, `aria-hidden`), cortado pela borda e sem atrapalhar a leitura (opacidade baixa, atrás do texto)
2. WHEN a viewport é < 1024 px THEN o grafismo SHALL NOT causar rolagem horizontal

## Requirement Traceability

| Requirement ID | Story                          | Phase   | Status |
| -------------- | ------------------------------ | ------- | ------ |
| HR-01          | P1: Altura e ordem mobile      | Execute | Done   |
| HR-02          | P1: CTAs e selo                | Execute | Done   |
| HR-03          | P1: Foto otimizada e creditada | Execute | Done   |
| HR-04          | P2: Grafismo                   | Execute | Done   |

## Success Criteria

- [x] Gate Build verde
- [x] Medição no navegador: CTA visível em 360×640; altura do hero em 1280/1920/2560; foto de 640 px carregada no celular
- [x] Sem rolagem horizontal de 320 a 2560 px

## Implementation Notes (2026-11-25)

- Foto: WebP 640 (14 KB), 960 (28 KB), 1280 (44 KB), q72; `<img srcSet sizes='(min-width: 1024px) 50vw, 100vw'>`. Em celular 2x o navegador escolhe a de 960 (28 KB) — dentro da meta de 60 KB.
- Medição (CDP): hero 589–590 px de altura em 1280/1920/2560; em 360×640 o CTA "Para sua empresa" termina em 481 px (primeira tela); em 320×568, em 544 px; sem rolagem horizontal de 320 a 2560.
- Grafismo: `/brand/symbol.png` a 10% de opacidade, cortado no canto inferior direito, `w-md lg:w-xl` (escala do Tailwind, sem largura arbitrária).
- `lib/rating.ts` (`formatRating`) passou a ser a única formatação da nota (hero e avaliações).
- `public/foto-galmar.jpg` removida.
