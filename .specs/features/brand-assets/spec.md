# F3 — Brand Assets Specification

**Roadmap:** M1 / F3 · **Tamanho:** Small · **Depende de:** — · **Desbloqueia:** F4, F5, F8, F9
**Decisões aplicadas:** AD-007 (export estático: imagens pré-otimizadas), AD-011 (logos provisórios em PNG até o SVG chegar — card #12)

## Problem Statement

Só existe `public/logo-galmar.png`: versão vertical, 2480 px, ~25% de margem transparente. No header, a 120×40 px, o símbolo fica com ~20 px (o manual pede ≥ 80 px para o conjunto) e não há versão horizontal, branca nem símbolo isolado. A imagem de compartilhamento (OG) é a foto da fachada, que mostra um WhatsApp antigo. O PNG de 84 KB é servido sem otimização no export estático.

## Proposed Solution

Gerar, a partir do PNG oficial, um kit provisório em `public/brand/` com nomes estáveis — quando o designer entregar os SVGs, troca-se o arquivo e só a extensão nas referências:

| Arquivo                              | Uso                                    | Como                                                          |
| ------------------------------------ | -------------------------------------- | ------------------------------------------------------------- |
| `logo-horizontal.png`                | Header                                 | Símbolo + nome lado a lado, proporções do slide 4.1 do manual |
| `logo-horizontal-white.png`          | Rodapé azul (F8)                       | Mesma peça em branco (versão negativa, slide 4.2/4.6)         |
| `logo-vertical.png`                  | JSON-LD `logo`                         | Versão principal recortada, sem margem                        |
| `symbol.png`                         | Base de ícones e grafismo do hero (F5) | Símbolo sem "desde 1996"                                      |
| `app/icon.png`, `app/apple-icon.png` | Favicon / iOS                          | Do símbolo; Apple com fundo branco                            |
| `public/brand/og.png`                | Compartilhamento                       | 1200×630, azul #2983c2 com logo branco                        |

## Goals

- [x] Header exibe a versão horizontal com o símbolo ≥ 40 px de altura no celular (hoje ~20 px)
- [x] Nenhum asset de marca > 60 KB; OG ≤ 150 KB
- [x] Imagem de compartilhamento sem a foto com WhatsApp antigo

## Out of Scope

| Item                                          | Reason                               |
| --------------------------------------------- | ------------------------------------ |
| SVG definitivo                                | Depende do designer (#12)            |
| Novo layout do header (faixa, menu em pílula) | F4                                   |
| Foto do hero (banco de imagens)               | F5 (AD-010)                          |
| Logo no rodapé                                | F8 (usa `logo-horizontal-white.png`) |

---

## User Stories

### P1: Kit de logos provisório ⭐ MVP

**Acceptance Criteria**:

1. WHEN o kit é gerado THEN SHALL existir em `public/brand/`: `logo-horizontal.png`, `logo-horizontal-white.png`, `logo-vertical.png`, `symbol.png`, todos PNG com fundo transparente
2. WHEN a versão horizontal é montada THEN SHALL manter a proporção de cada peça (sem deformar) e a disposição do manual: símbolo à esquerda, nome com tagline à direita
3. WHEN a versão branca é gerada THEN todos os pixels visíveis SHALL ser brancos, preservando a transparência
4. WHEN `symbol.png` é gerado THEN SHALL NOT conter o texto "desde 1996"
5. WHEN qualquer arquivo do kit é servido THEN SHALL ter ≤ 60 KB

**Independent Test**: `tests/brand.test.ts` lê o cabeçalho PNG (dimensões, canal alfa) e o tamanho de cada arquivo.

### P1: Header com logo legível ⭐ MVP

**Acceptance Criteria**:

1. WHEN o header é renderizado THEN SHALL usar `/brand/logo-horizontal.png` com altura de exibição definida e largura proporcional
2. WHEN a tela é de celular (360 px) THEN o logo SHALL caber no header sem cortar e sem empurrar o botão de menu
3. WHEN o logo é exibido THEN SHALL NOT ter sombra nem filtro (manual 4.1)

### P1: Ícones e imagem de compartilhamento ⭐ MVP

**Acceptance Criteria**:

1. WHEN o site é aberto THEN o favicon (`app/icon.png`, 512×512) SHALL ser o símbolo
2. WHEN salvo na tela inicial do iOS THEN `app/apple-icon.png` (180×180) SHALL ter fundo branco opaco
3. WHEN o link é compartilhado THEN `og:image` SHALL ser `public/brand/og.png` 1200×630, fundo #2983c2, logo branco centralizado com área de proteção
4. WHEN o JSON-LD é gerado THEN `logo` SHALL apontar para `/brand/logo-vertical.png` e `image` para a imagem OG
5. WHEN o kit novo está em uso THEN `public/logo-galmar.png` SHALL ser removido (sem referências)

---

## Requirement Traceability

| Requirement ID | Story                       | Phase   | Status |
| -------------- | --------------------------- | ------- | ------ |
| BA-01          | P1: Kit de logos            | Execute | Done   |
| BA-02          | P1: Header com logo legível | Execute | Done   |
| BA-03          | P1: Ícones e OG             | Execute | Done   |

## Success Criteria

- [x] Gate Build verde
- [x] Inspeção visual das peças contra os slides 4.1, 4.2 e 4.6 do manual
- [x] Header conferido em 360 e 1280 px

## Implementation Notes (2026-11-25)

- Kit gerado do `logo-galmar.png` oficial com ImageMagick: blocos medidos no alfa (símbolo y 514–1306, nome y 1406–1677, tagline y 1729–1793); horizontal = símbolo + bloco do nome escalado para ~0,67 da altura do símbolo, deslocado 26% do topo (medidas do slide 4.1); "desde 1996" removido do `symbol.png` por máscara de pixels cinza na região x 1580–1760, y 1150–1300.
- Tamanhos: horizontal 594×180 (22 KB), branco 20 KB, vertical 465×480 (33 KB), símbolo 512² (23 KB), `icon.png` 21 KB, `apple-icon.png` 7 KB (opaco), `og.png` 1200×630 (86 KB).
- OG em `public/brand/og.png` (e não `app/opengraph-image.png`) para o `alt` vir de `content.meta.ogImageAlt` (CT-07).
- Header: `h-11 md:h-12` → símbolo com 44–48 px (antes ~20 px).
- `public/logo-galmar.png` removido; `foto-galmar.jpg` segue só no hero até a F5.
