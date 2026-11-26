# Identidade visual da página — Specification

**Tamanho:** Large · **Depende de:** F1–F8 ✅ · **Substitui:** o bloco de contato do F8, o `tone='blue'` de Sobre (SP-02) e o amarelo de AD-016
**Decisões:** `.specs/features/visual-identity/context.md`

## Problem Statement

A página usa os hex do manual (`#2983c2`, `#d52825`), mas o visitante vê outro azul: Sobre, Onde estamos, a faixa de contato e o rodapé são um bloco em `#1f6aa0`. O logo do header tem 44–48 px (o manual pede 80 px), o grafismo do símbolo quase não aparece e a faixa azul+vermelha tem 4 px. O rodapé repete endereço, horário e contatos que já estão em Onde estamos. O amarelo das estrelas não pertence à marca.

## Proposed Solution

A mesma página, com a cor do manual nas áreas grandes e o azul de apoio só onde o texto pequeno precisa de contraste. O botão flutuante continua verde. Estrelas, títulos e o pattern ficam no azul oficial. O header mostra o logo a 80 px a partir de `md`. O rodapé fica só com logo, copyright, privacidade e a faixa de assinatura.

Para o visitante: a Galmar se reconhece pelo azul e pelo vermelho do manual, o clique principal continua vermelho, e o rodapé não repete a seção de contato.

## Goals

- [ ] Sobre e Onde estamos não são mais um retângulo full-bleed em `#1f6aa0`
- [ ] Logo do header com 80 px de altura a partir de `md`, e 56 px abaixo disso
- [ ] Rodapé sem endereço, horário, telefone, e-mail, WhatsApp nem redes
- [ ] Estrelas em `#2983c2`; verde do WhatsApp só no botão flutuante
- [ ] `npm test` verde, com os testes que descreviam o visual antigo atualizados

## Out of Scope

| Item                                     | Reason                                                    |
| ---------------------------------------- | --------------------------------------------------------- |
| Catálogo, preço, carrinho, páginas novas | Fora do escopo da entrevista                              |
| Foto nova ou camada de cor sobre o hero  | Foto Pexels atual permanece (`CREDITS.md`)                |
| Logo SVG                                 | B-001; o kit PNG provisório continua                      |
| Reescrita de copy em `content.json`      | Escopo visual. Texto novo, se surgir, é objetivo e direto |
| Skill de UI no repositório               | A feature cobre a página, não um documento de skill       |
| CNPJ no rodapé                           | AD-014 #13; continua omitido                              |

---

## User Stories

### P1: Cor do manual onde o texto aguenta ⭐ MVP

**User Story**: Como dono da marca, quero ver o azul `#2983c2` e o vermelho `#d52825` nas áreas grandes, para que a página bata com o manual sem texto pequeno ilegível.

**Why P1**: É a queixa principal. O hex já existe; a aplicação é que está errada.

**Acceptance Criteria**:

1. WHEN o tema carrega THEN SHALL manter `--color-secondary: #2983c2`, `--color-secondary-dark: #1f6aa0`, `--color-primary: #d52825`, `--color-primary-dark: #b3211f` e `--color-secondary-bg` em tint claro derivado do azul
2. WHEN a faixa de contato ou o corpo do rodapé é renderizado THEN o fundo SHALL ser `bg-secondary-dark`, porque o texto ali é pequeno e branco
3. WHEN Sobre é renderizada THEN SHALL NOT usar `tone='blue'` nem pintar a seção inteira com `bg-secondary-dark`. O corpo (badge, descrição, diferenciais) SHALL ficar em `tone='tint'` com texto `foreground` / `secondary-dark`. O título (`text-h2`, negrito) SHALL ficar em branco sobre um painel `bg-secondary`
4. WHEN Onde estamos é renderizada THEN o fundo da seção SHALL ser `tone='tint'` e o endereço, horário, telefone, e-mail e redes SHALL usar texto `foreground` / ícone `secondary-dark`. O título SHALL ficar em branco sobre um painel `bg-secondary`
5. WHEN Ligar e Como chegar são exibidos THEN SHALL continuar contorno branco com texto branco, alvo ≥ 44 px, sobre `bg-secondary-dark` (texto pequeno branco não vai para `#2983c2`, que dá 4,10:1). O botão WhatsApp dessa seção SHALL continuar `bg-primary`
6. WHEN o ritmo das seções claras é lido de cima para baixo THEN SHALL ser: hero `bg-secondary-bg`, marcas branco, Sobre tint, avaliações branco, Onde estamos tint
7. WHEN um item de menu, o botão do menu ou um link do sheet é renderizado THEN SHALL NOT usar `text-gray-700`. A cor SHALL ser `text-foreground`, com hover `text-secondary-dark`
8. WHEN texto branco pequeno é colocado sobre `#2983c2` THEN o teste de paleta SHALL continuar exigindo ≥ 4,5:1 nos fundos de texto pequeno (`secondary-dark`, `primary`, `primary-dark`)

**Independent Test**: `npm test` na paleta, no header e nas seções. Inspecionar Sobre e Onde estamos: o retângulo da seção não é azul-escuro; o título é branco sobre `#2983c2`.

---

### P1: WhatsApp verde só no flutuante, estrelas no azul ⭐ MVP

**User Story**: Como visitante, quero reconhecer o atalho flutuante como WhatsApp e ver as estrelas na cor da marca, para que o verde não se espalhe pela página.

**Why P1**: Correção explícita do usuário sobre o botão flutuante, e remoção do amarelo fora do manual.

**Acceptance Criteria**:

1. WHEN o botão flutuante é renderizado THEN SHALL usar `bg-whatsapp` e `hover:bg-whatsapp-dark`, com ícone branco, e SHALL manter `data-track-location='flutuante'`
2. WHEN o tema carrega THEN `--color-whatsapp` SHALL ser `#25d366` e `--color-whatsapp-dark` SHALL ser `#1ebe5d`
3. WHEN qualquer arquivo em `components/` ou `app/` que não seja `components/whatsapp-button.tsx` é lido THEN SHALL NOT referenciar `whatsapp` como classe de cor (`bg-whatsapp`, `text-whatsapp`, `hover:bg-whatsapp-dark`)
4. WHEN header, hero, Onde estamos ou o banner de cookies mostram a ação principal THEN SHALL continuar `bg-primary` / contorno `border-primary`. Esses controles SHALL NOT usar `bg-whatsapp`
5. WHEN as estrelas do hero ou das avaliações são renderizadas THEN SHALL usar `text-secondary`. SHALL NOT existir `text-rating` em `components/` nem `app/`
6. WHEN o tema carrega THEN SHALL NOT existir `--color-rating`

**Independent Test**: Busca por `text-rating` e `bg-whatsapp` no fonte. O flutuante é o único verde; as estrelas são azul `#2983c2`.

---

### P1: Logo no mínimo do manual ⭐ MVP

**User Story**: Como dono da marca, quero o logo do header legível no tamanho do manual, para que a marca não apareça encolhida.

**Why P1**: O manual fixa redução máxima de 80 px. O header está em 44–48 px.

**Acceptance Criteria**:

1. WHEN a viewport é ≥ 768 px THEN a imagem `/brand/logo-horizontal.png` no header SHALL ter 80 px de altura (`md:h-20`) e largura automática
2. WHEN a viewport é < 768 px THEN essa imagem SHALL ter 56 px de altura (`h-14`)
3. WHEN o header é renderizado THEN a folga entre o logo e o próximo item SHALL ser ≥ 1,25 rem (25% de 80 px). Nada encosta no logo
4. WHEN a altura do header muda THEN SHALL continuar um único custom property `--header-h`, usado por `header.tsx` e por `scroll-pt` em `app/layout.tsx`. O valor base cabe no logo de 56 px; um override em `@media (min-width: 768px)` cabe no logo de 80 px com respiro (em torno de 7 rem). SHALL NOT haver altura fixa em pixel (`h-[Npx]`) no header nem no `scroll-pt`
5. WHEN o logo do header é lido THEN o `alt` SHALL continuar `content.header.brand`

**Independent Test**: Em 1280 px o logo do header mede 80 px de altura e o header acompanha `--header-h`. Em 360 px o logo mede 56 px e não há rolagem horizontal.

---

### P1: Rodapé sem repetir Onde estamos ⭐ MVP

**User Story**: Como visitante, quero um rodapé curto, para que endereço e telefone não apareçam de novo depois que eu já vi Onde estamos.

**Why P1**: Pedido direto. Os dados continuam na faixa de contato e na seção.

**Acceptance Criteria**:

1. WHEN o rodapé é renderizado THEN SHALL usar `bg-secondary-dark`, `.container` e `/brand/logo-horizontal-white.png` com `alt` de `content.footer.logoAlt`. O logo SHALL apontar para `#home`
2. WHEN o rodapé é renderizado THEN SHALL NOT conter `formatAddress`, `formatHours`, `defaultWhatsAppUrl`, `phoneHref`, `mailto:`, `social.facebook` nem `social.instagram`
3. WHEN o copyright é exibido THEN SHALL incluir o ano corrente e `content.footer.rights`, e SHALL NOT exibir CNPJ
4. WHEN a política é linkada THEN SHALL apontar para `/privacidade` com o texto `content.footer.privacy`
5. WHEN a faixa de assinatura é renderizada THEN SHALL ter 12 px de altura (`h-3`), sem texto e sem logo, metade `bg-secondary` e metade `bg-primary`
6. WHEN não há mais clique de WhatsApp ou telefone no rodapé THEN `components/footer.tsx` SHALL NOT declarar `data-track-location='rodape'`. Os eventos existentes em header, faixa, hero, Onde estamos e flutuante SHALL permanecer

**Independent Test**: O teste de fonte do rodapé não encontra endereço nem redes. A faixa mede 12 px, azul oficial à esquerda e vermelho à direita.

---

### P1: Grafismo do manual, uma vez ⭐ MVP

**User Story**: Como visitante, quero ver o símbolo da Galmar como textura, para que a página não pareça um template sem marca.

**Why P1**: O manual usa o símbolo cortado e o pattern como a cara da identidade. Hoje o símbolo do hero está a 10% de opacidade.

**Acceptance Criteria**:

1. WHEN o hero é renderizado THEN o símbolo decorativo SHALL continuar `aria-hidden`, fora do fluxo, sem provocar rolagem horizontal, e SHALL usar opacidade maior que `opacity-10` (em torno de 16%). A foto SHALL continuar os WebP atuais (`hero-640/960/1280.webp`), sem camada de cor por cima
2. WHEN a seção de marcas é renderizada THEN SHALL mostrar o pattern repetido do símbolo em azul oficial, decorativo, com contraste baixo o bastante para o título e os logos continuarem legíveis. Sobre, avaliações e Onde estamos SHALL NOT usar esse pattern
3. WHEN `prefers-reduced-motion` está ativo THEN o pattern e o símbolo SHALL NOT animar e SHALL NOT criar rolagem horizontal

**Independent Test**: Hero mostra o símbolo visível atrás do conteúdo e a mesma foto. Marcas tem o pattern; as outras seções não.

---

## Edge Cases

- WHEN o texto branco tem menos de 24 px (ou menos de 18,66 px em negrito) e o fundo é azul THEN o fundo SHALL ser `#1f6aa0`, não `#2983c2`
- WHEN a viewport é 320 px THEN SHALL NOT haver rolagem horizontal (logo de 56 px, pattern e símbolo cortado inclusos)
- WHEN a página de privacidade usa `--header-h` THEN SHALL herdar a mesma altura do header, sem valor próprio
- WHEN o carrossel de marcas está em reduced-motion THEN o pattern permanece estático e o grid atual (SP-01) continua funcionando
- WHEN um teste antigo exige `tone='blue'` em Sobre, faixa `h-1`, contato dentro do rodapé ou token `rating` THEN esse teste SHALL ser atualizado para estes critérios, não o contrário

---

## Requirement Traceability

| Requirement ID | Story                   | Phase    | Status   |
| -------------- | ----------------------- | -------- | -------- |
| VI-01          | P1: Cor do manual       | In Tasks | In Tasks |
| VI-02          | P1: WhatsApp e estrelas | In Tasks | In Tasks |
| VI-03          | P1: Logo no mínimo      | In Tasks | In Tasks |
| VI-04          | P1: Rodapé curto        | In Tasks | In Tasks |
| VI-05          | P1: Grafismo            | In Tasks | In Tasks |

**Coverage:** 5 total, 5 mapped to tasks, 0 unmapped

---

## Success Criteria

- [ ] Os cinco critérios independentes acima passam por inspeção da página em 360 px e em 1280 px
- [ ] `npm run typecheck && npm run lint && npm run format:check && npm test` verdes
- [ ] Nenhuma chave de marketing em `content.json` foi reescrita
- [ ] Endereço, horário, telefone, e-mail e redes continuam alcançáveis pela faixa de contato ou por Onde estamos
