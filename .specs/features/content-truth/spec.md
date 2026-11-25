# F2 — Content Truth Specification

**Roadmap:** M1 / F2 · **Tamanho:** Medium · **Depende de:** — · **Desbloqueia:** F4–F9
**Decisões aplicadas:** AD-004 (telefone = WhatsApp), AD-006/AD-014 (avaliações Google), AD-013 (casa + empresa), AD-016 (copy de terceiros)
**Validado com o usuário (2026-11-25):** diferenciais confirmados = **atacado para empresas** e **atendimento pelo WhatsApp**; **sem entrega** e **sem linha ecológica**; direção do hero = "Tradição + localidade"

## Problem Statement

O `data/content.json` publica afirmações falsas ou não confirmadas: "Desde 2005" (a empresa é de 1996), "ecológicas"/"biodegradáveis", "entrega rápida em toda Campinas", "rigorosos testes de qualidade", sábado às 8h (o real é 9h). Também traz três depoimentos fictícios. Publicar isso fere o objetivo O2 (nada inventado), pode infringir o CDC e contradiz o tom "confiável" do manual. Não há nenhuma verificação automática do conteúdo; um erro de chave ou um dado errado só aparece no navegador.

## Proposed Solution

Reescrever o conteúdo com fatos confirmados e no tom de voz do manual (prático, objetivo, profissional, respeitoso), e ligar os componentes atuais às novas chaves **sem redesenhar layout** (F5–F7 fazem isso). Para o visitante:

- Hero com proposta clara: produtos de limpeza e descartáveis em Campinas desde 1996, para casa e empresa
- Dois atalhos de WhatsApp com mensagem pronta: "Para sua empresa" e "Para sua casa"
- Diferenciais reais no "Sobre": desde 1996, varejo e atacado, atendimento pelo WhatsApp
- Prova social verificável: nota 5,0 no Google com link para as avaliações, no lugar dos depoimentos inventados
- Horário certo e dados de contato iguais em todo o site

Um teste de conteúdo garante a estrutura e barra o retorno das afirmações removidas.

## Goals

- [x] 0 afirmações não confirmadas no conteúdo publicado (teste automatizado com lista de termos proibidos)
- [x] 100% do texto visível vindo de `data/content.json` (0 strings de copy em `.tsx`)
- [x] Dados de contato idênticos aos do Perfil da Empresa no Google (endereço, telefone, horário)

## Out of Scope

| Feature                                                | Reason                                                  |
| ------------------------------------------------------ | ------------------------------------------------------- |
| Layout do hero, atalhos em cartões, selo visual        | F5 (`hero-redesign`)                                    |
| Faixa de contato e menu novo                           | F4                                                      |
| Seção "Onde estamos", mapa, remoção do formulário      | F6 (o formulário segue funcionando até lá)              |
| Visual da seção de avaliações                          | F7 — aqui só o conteúdo e a ligação mínima              |
| `openingHours` no JSON-LD, mensagens por origem no GA4 | F9 (o horário já fica estruturado para isso)            |
| Textos reais das avaliações do Google                  | Dependem de cópia manual (#10); entram como dado depois |
| CNPJ / razão social                                    | Pendente com o cliente (#13); rodapé sem CNPJ na v1     |

---

## User Stories

### P1: Conteúdo verdadeiro ⭐ MVP

**User Story**: Como dono da Galmar, quero que o site só afirme o que é verdade, para não perder confiança nem correr risco legal.

**Why P1**: O2 e decisão AD-006; bloqueia a publicação.

**Acceptance Criteria**:

1. WHEN o conteúdo é carregado THEN SHALL NOT conter: "2005", "ecológic", "biodegradáv", "entrega rápida", "entregamos", "rigorosos testes", "99,9%", "alta qualidade", "mesma loja", "mesmo endereço"
2. WHEN o ano de fundação aparece THEN SHALL ser 1996
3. WHEN os diferenciais (`features`) são exibidos THEN SHALL ser exatamente três fatos confirmados: desde 1996; varejo e atacado (casa e empresa); atendimento pelo WhatsApp
4. WHEN o hero é exibido THEN o título SHALL ser "Produtos de limpeza e descartáveis em Campinas desde 1996" e o subtítulo SHALL mencionar casa e empresa, as marcas, pedido pelo WhatsApp e retirada na loja
5. WHEN a meta-descrição (`<meta name="description">`, OG) é gerada THEN SHALL refletir o novo subtítulo, sem as afirmações proibidas

**Independent Test**: `npm test` (teste de conteúdo); busca por cada termo proibido em `data/content.json` e no HTML gerado (`npm run build` → `.next/server/app/index.html`) retorna vazio.

---

### P1: Dados de contato oficiais ⭐ MVP

**User Story**: Como cliente, quero o telefone, o endereço e o horário corretos, para ligar, mandar mensagem ou ir à loja sem surpresa.

**Why P1**: Dado errado = cliente perdido; O5.

**Acceptance Criteria**:

1. WHEN o telefone é exibido THEN SHALL ser "(19) 3212-1177" e o link de WhatsApp SHALL usar `551932121177`
2. WHEN o endereço é exibido THEN SHALL ser "Av. Jorge Tibiriçá, 1747 – Jardim Santa Eudoxia, Campinas – SP, 13044-125"
3. WHEN o horário é exibido THEN SHALL ser: segunda a sexta 9h–18h; sábado 9h–13h; domingo fechado
4. WHEN o horário é armazenado THEN SHALL estar estruturado por dia (dias, abertura, fechamento) **e** com o texto de exibição derivado dessa estrutura — uma única fonte (prepara F9)
5. WHEN um link externo de rede social é armazenado THEN SHALL ser `https://`

**Independent Test**: Teste de conteúdo compara os valores; inspeção visual da seção Contato.

---

### P1: Atalhos de WhatsApp para casa e empresa ⭐ MVP

**User Story**: Como visitante (morador ou comprador de empresa), quero um atalho que já abra o WhatsApp com a mensagem certa, para pedir sem pensar no que escrever.

**Why P1**: AD-013; principal ação de conversão (O1).

**Acceptance Criteria**:

1. WHEN o conteúdo é carregado THEN SHALL existir mensagens prontas `casa`, `empresa` e `padrao` (botão flutuante), cada uma iniciando com "Olá! Vim pelo site" e indicando o interesse
2. WHEN o visitante clica em "Para sua empresa" no hero THEN SHALL abrir `wa.me/551932121177` com a mensagem `empresa` em nova aba
3. WHEN o visitante clica em "Para sua casa" no hero THEN SHALL abrir `wa.me/551932121177` com a mensagem `casa` em nova aba
4. WHEN os links são gerados THEN SHALL usar `buildWhatsAppUrl` (`lib/whatsapp.ts`), nunca URL montada à mão
5. WHEN o hero é renderizado THEN os botões atuais "Conheça Nossas Marcas" / "Entre em Contato" SHALL ser substituídos pelos dois atalhos (mesmo estilo atual; visual final em F5)

**Independent Test**: Clicar nos dois botões no `npm run dev`; a URL aberta contém o número e a mensagem certa.

---

### P1: Avaliações reais no lugar dos depoimentos fictícios ⭐ MVP

**User Story**: Como visitante, quero ver uma prova de reputação que eu possa conferir, para confiar na loja.

**Why P1**: AD-006/AD-014; depoimento inventado não pode ser publicado.

**Acceptance Criteria**:

1. WHEN o conteúdo é carregado THEN SHALL NOT existir os depoimentos "Maria Silva", "João Oliveira", "Ana Santos" nem qualquer item com avatar/estrelas fixas sem fonte
2. WHEN a seção de avaliações é exibida THEN SHALL mostrar a nota "5,0", o texto "Mais de 40 avaliações de clientes no Google" (copy aprovada) e um link "Ver avaliações no Google" (nova aba, `rel='noopener noreferrer'`)
3. WHEN o link é gerado THEN SHALL apontar para a busca do Google Maps por nome + endereço da Galmar (sem chave de API)
4. WHEN a lista `reviews` estiver vazia THEN a seção SHALL renderizar só o resumo da nota e o link, sem cards vazios
5. WHEN `reviews` tiver itens (cópia manual futura) THEN cada item SHALL ter `author`, `rating` (1–5) e `text`, e o card SHALL exibir as estrelas conforme `rating`
6. WHEN o item de menu da seção é exibido THEN o rótulo SHALL ser "Avaliações" (id da seção mantido)

**Independent Test**: Seção exibe resumo + link com `reviews: []`; com um item de exemplo no teste, o componente renderiza autor, nota e texto.

---

### P2: Todo texto visível no `content.json`

**User Story**: Como desenvolvedor, quero toda a copy em um só arquivo, para que o cliente/dev altere textos sem caçar strings no JSX.

**Why P2**: Regra do AGENTS.md; hoje há "Facebook"/"Instagram" escritos no JSX.

**Acceptance Criteria**:

1. WHEN os componentes são renderizados THEN SHALL NOT haver texto visível ou de acessibilidade (`sr-only`, `aria-label`, `alt`) literal em `.tsx`, exceto composições com dados do JSON
2. WHEN o teste de conteúdo roda THEN SHALL falhar se houver texto literal entre tags JSX em `app/` ou `components/` (exceto `components/ui/`)

**Independent Test**: Teste estático de JSX passa; inserir `<span>Olá</span>` num componente faz falhar.

---

### P2: Estrutura do conteúdo validada

**User Story**: Como desenvolvedor, quero um teste que valide o `content.json`, para pegar dado errado antes do build e do cliente.

**Why P2**: CONCERNS.md — "`content.json` sem schema runtime".

**Acceptance Criteria**:

1. WHEN `npm test` roda THEN SHALL validar: telefone com 10–11 dígitos, CEP no formato `00000-000`, horários `HH:MM`, URLs `https://`, mensagens de WhatsApp não vazias, `rating` entre 1 e 5, itens de navegação apontando para ids existentes
2. WHEN uma chave obrigatória faltar ou mudar de tipo THEN o teste SHALL falhar com mensagem que aponte a chave

**Independent Test**: Apagar `contact.info.phone` faz o teste falhar citando a chave.

---

## Edge Cases

- WHEN a contagem de avaliações do Google crescer THEN o texto "mais de 40" SHALL continuar verdadeiro sem edição (não exibir número exato)
- WHEN `reviews` tiver um item com `rating` fora de 1–5 THEN o teste de conteúdo SHALL falhar
- WHEN a mensagem de WhatsApp tiver acentos, quebra de linha ou "&" THEN o link SHALL codificá-la corretamente (já coberto por `lib/whatsapp.test.ts`)
- WHEN JavaScript estiver desabilitado THEN os atalhos do hero SHALL continuar funcionando (são links `<a href>`, não handlers)

---

## Requirement Traceability

| Requirement ID | Story                                         | Phase   | Status |
| -------------- | --------------------------------------------- | ------- | ------ |
| CT-01          | P1: Conteúdo verdadeiro — termos proibidos    | Execute | Done   |
| CT-02          | P1: Conteúdo verdadeiro — hero e diferenciais | Execute | Done   |
| CT-03          | P1: Contato oficial — telefone/endereço       | Execute | Done   |
| CT-04          | P1: Contato oficial — horário estruturado     | Execute | Done   |
| CT-05          | P1: Atalhos WhatsApp casa/empresa             | Execute | Done   |
| CT-06          | P1: Avaliações Google no lugar dos fictícios  | Execute | Done   |
| CT-07          | P2: Zero copy literal em `.tsx`               | Execute | Done   |
| CT-08          | P2: Validação estrutural do conteúdo          | Execute | Done   |

**Coverage:** 8 total, 8 verificados (tasks inline no /execute, 2026-11-25)

---

## Success Criteria

- [x] Gate Build verde (`typecheck`, `lint`, `format:check`, `test`, `build`)
- [x] HTML gerado sem nenhum termo proibido
- [x] Botões do hero abrem o WhatsApp com a mensagem certa (verificado no navegador)
- [x] Nenhuma mudança de layout além da troca dos botões do hero e da seção de avaliações

## Copy proposta (validar na aprovação)

| Chave                | Texto                                                                                                                                                                                             |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `hero.title`         | Produtos de limpeza e descartáveis em Campinas desde 1996                                                                                                                                         |
| `hero.description`   | Para sua casa ou sua empresa, com as marcas que você conhece. Peça pelo WhatsApp e retire na loja.                                                                                                |
| `hero.ctaBusiness`   | Para sua empresa                                                                                                                                                                                  |
| `hero.ctaHome`       | Para sua casa                                                                                                                                                                                     |
| `about.title`        | Há quase 30 anos cuidando da limpeza de Campinas                                                                                                                                                  |
| `about.description`  | Desde 1996, a Galmar vende produtos de limpeza, higiene e descartáveis para casas e empresas de Campinas e região, no varejo e no atacado. Atendimento direto, marcas de confiança e preço justo. |
| `features[0]`        | **Desde 1996** — Quase 30 anos atendendo casas e empresas de Campinas e região.                                                                                                                   |
| `features[1]`        | **Varejo e atacado** — Do produto para sua casa ao volume que sua empresa precisa.                                                                                                                |
| `features[2]`        | **Atendimento pelo WhatsApp** — Tire dúvidas, faça seu pedido e retire na loja.                                                                                                                   |
| `reviews.title`      | Avaliado com nota 5,0 no Google                                                                                                                                                                   |
| `reviews.summary`    | Mais de 40 avaliações de clientes no Google                                                                                                                                                       |
| `reviews.link`       | Ver avaliações no Google                                                                                                                                                                          |
| `whatsapp.empresa`   | Olá! Vim pelo site e gostaria de um orçamento para minha empresa.                                                                                                                                 |
| `whatsapp.casa`      | Olá! Vim pelo site e gostaria de informações sobre produtos para minha casa.                                                                                                                      |
| `whatsapp.padrao`    | Olá! Vim pelo site e gostaria de mais informações.                                                                                                                                                |
| `contact.info.hours` | Segunda a sexta: 9h às 18h · Sábado: 9h às 13h · Domingo: fechado (derivado de `hoursByDay`)                                                                                                      |

**Ajuste aprovado (2026-11-25):** a Galmar mudou de endereço desde 1996 — nenhum texto afirma "mesma loja" ou "mesmo endereço".

## Implementation Notes (2026-11-25)

- `data/content.json` reescrito: hero, about, features, `reviews` (substitui `testimonials`), `contact.info.hoursByDay` + `closedLabel`, `contact.social.{rede}.{label,url}`, `contact.whatsappMessages.{padrao,casa,empresa}`; menu "Avaliações".
- Novos `lib/hours.ts` (`formatHours`) e `lib/maps.ts` (`buildMapsSearchUrl`), com testes colocalizados.
- `components/testimonials.tsx` reescrito para avaliações (resumo 5,0 + link Google; cards só quando `reviews.items` tiver dados). Id `testimonials` mantido.
- Hero: atalhos "Para sua empresa"/"Para sua casa" via `buildWhatsAppUrl` (links `<a>`, funcionam sem JS).
- `tests/content.test.ts`: termos proibidos, dados oficiais, horário, mensagens, avaliações, ids do menu, zero copy literal em `.tsx` (verificado por mutação).
- Verificação: HTML gerado sem nenhum termo proibido; 3 links `wa.me/551932121177` com as mensagens certas; link do Google Maps; horário "Segunda a sexta: 9h às 18h · Sábado: 9h às 13h · Domingo: fechado"; capturas em 390 e 1280 px.
- Fora do escopo, intacto: textos da seção Contato ("Entre em contato conosco") e o formulário — F6.

## Review (2026-11-25)

Ver `review.md`. Corrigidos: separador do endereço (`lib/address.ts` → "Campinas – SP"), nota numérica única (`reviews.rating: 5`, texto e estrelas derivados; teste de coerência com o título), rótulos do horário no JSON (`hoursLabels`), `whatsappMessages.{default,home,business}`, título e `alt` do OG no JSON (`meta.title`, `hero.imageAlt`), `alt` das marcas sem "Logo" literal, CT-07 com parser TypeScript (texto JSX + alt/aria-label/title/placeholder literais, sem falsos positivos de código), validador de avaliações testado com fixture, termos proibidos só sobre copy (fora de URL/caminho/CEP), mensagens de falha citam a chave, casos de borda do horário, ordem de imports, docs do codebase. CT-06 AC2 alinhado à copy aprovada.
