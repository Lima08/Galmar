# Identidade visual da página — Interview Decisions

**Date:** 2026-11-25
**Scope:** Alinhar a página atual da Galmar ao manual de identidade (cores, logo, grafismo e fotos) e tirar do rodapé o que já aparece em “Onde estamos”. Sem catálogo, carrinho ou páginas novas.
**Source:** informal discussion + `Manual de identidade visual.pdf` (Galmar Comercial, fev/2024, 49 páginas). Substitui, nesta feature, o uso de cor de AD-015 nas seções azuis. Revoga o amarelo de AD-016. O verde do WhatsApp permanece só no botão flutuante.

---

## Decisions

### Cor institucional e contraste

- Fundos gráficos e títulos grandes usam as cores do manual: azul `#2983c2` e vermelho `#d52825`. Título grande = ≥ 24 px, ou ≥ 18,66 px em negrito. Branco sobre essas cores passa contraste de texto grande (3:1). Azul sobre branco nesse tamanho também.
- Texto pequeno (abaixo desse corte) em azul sobre branco, ou branco sobre azul, usa o azul de apoio `#1f6aa0` (5,79:1 com branco). O azul oficial com branco fica em 4,10:1 e não serve para texto pequeno.
- A faixa de contato e o corpo do rodapé levam texto pequeno branco, então o fundo deles continua `#1f6aa0`. A faixa de assinatura (azul + vermelho, sem texto) usa `#2983c2` e `#d52825`.
- Seções “Sobre” e “Onde estamos” deixam de ser um bloco inteiro em `#1f6aa0`. O corpo do texto fica em fundo branco ou tint `#eaf3fa`, cor de texto `#333`. O azul oficial aparece no título (grande) e numa faixa ou painel atrás só do título, com texto branco grande.
- Seções claras alternam branco e `#eaf3fa`.
- Hover do botão vermelho: `#b3211f`. O vermelho oficial já passa com branco (5,05:1); o tom escuro é só interação.
- Links e rótulos do menu usam `foreground` / `secondary-dark`. Some `text-gray-700`.
- **Rationale:** o usuário pediu para seguir a recomendação. O manual exige a mesma tonalidade; a tela só escurece o azul onde o texto pequeno falharia contraste.

### Verde do WhatsApp e amarelo das estrelas

- O botão flutuante mantém as cores do WhatsApp: fundo `#25d366`, hover `#1ebe5d`, ícone branco. O token `whatsapp` fica, usado só nesse botão.
- Header, hero, “Onde estamos” e o aceite de cookies continuam vermelho `#d52825`. Não viram verdes.
- Estrelas do hero e das avaliações passam a `#2983c2`. O token `rating` sai. O vermelho fica reservado a botão de marca.
- Ícones de Facebook e Instagram continuam monocromáticos (branco sobre azul, ou `secondary-dark` sobre claro).
- **Rationale:** a recomendação era tirar o verde. O usuário corrigiu: o botão flutuante do WhatsApp conserva o verde oficial do aplicativo. O amarelo das estrelas sai.

### Logo e grafismo

- A partir de `md`, o logo horizontal do header tem 80 px de altura (mínimo do manual). O header cresce para caber esse logo com respiro (cerca de 7 rem). Abaixo de `md`, a altura é 56 px: 80 px mais a faixa de contato consumiria a primeira tela em 360 px.
- A área de proteção escala com o logo (cerca de 25% da altura renderizada). Os 70 px fixos do manual valem para peça impressa e não cabem na tela estreita. Nada encosta no logo.
- O logo aparece no header (versão colorida) e no rodapé (versão branca). Isso é permitido na web. A faixa de assinatura não leva um terceiro logo. Símbolo usado como textura não conta como segunda marca (princípio 2 do manual).
- O símbolo cortado do hero permanece, em azul oficial, com opacidade maior que os 10% atuais (cerca de 16%), sem competir com o texto e sem causar rolagem horizontal.
- O pattern repetido do símbolo aparece uma vez, na seção de marcas, em azul oficial e contraste baixo. Não entra em Sobre, Avaliações nem Onde estamos.
- A faixa de assinatura do rodapé sobe de 4 px para 12 px, metade `#2983c2` e metade `#d52825`, sem texto.
- **Rationale:** o usuário pediu para seguir a recomendação. O mínimo de 80 px vale onde há espaço; no celular a exceção é explícita para não empurrar o conteúdo.

### Rodapé

- Saem endereço, horário, telefone, WhatsApp, e-mail e redes. Esses dados permanecem na faixa de contato e na seção “Onde estamos” (Facebook e Instagram já estão nessa seção).
- Ficam: logo branco apontando para `#home`, copyright, link de privacidade e a faixa de assinatura.
- Não entra CTA novo no rodapé. Header, hero, seção de contato e botão flutuante já cumprem a ação.
- **Rationale:** o usuário pediu para seguir a recomendação. O bloco atual repete “Onde estamos”.

### Foto e peso das duas cores

- A foto atual do hero (Pexels, créditos em `public/assets/hero/CREDITS.md`) permanece. Sem camada de cor por cima e sem foto nova.
- Vermelho é a ação da marca: header, os dois botões do hero (preenchido e contorno), WhatsApp de “Onde estamos” e aceite de cookies. Azul não vira botão. A única ação fora do vermelho é o botão flutuante, nas cores do WhatsApp.
- Ações secundárias na seção de contato (ligar, como chegar) continuam contorno branco sobre o painel, não um segundo botão de marca.
- Azul estrutura: faixa de contato, títulos, estrelas, pattern, metade da assinatura. O peso visual das duas cores vem dessa divisão, não de dois botões competindo.
- Copy existente de `content.json` não é reescrita nesta feature. Texto novo, se surgir, é objetivo, direto e profissional. “Divertida” e “delicada” não são alvo de voz do site.
- **Rationale:** o usuário pediu para seguir a recomendação. O manual trata azul e vermelho como cores iguais; no site cada uma tem um papel para a página não dispersar o clique.

---

## Agent's Discretion

O usuário pediu para seguir as recomendações do agente em todos os ramos. Os números abaixo podem ajustar alguns pixels na implementação, desde que o efeito descrito acima se mantenha.

- Opacidade do símbolo do hero em torno de 16%, e contraste do pattern na seção de marcas, desde que o texto continue legível e não haja rolagem horizontal.
- Altura final do header em `md+` (em torno de 7 rem) e a folga em volta do logo, desde que o logo tenha 80 px de altura a partir de `md` e 56 px abaixo disso.
- Espessura da faixa de assinatura em torno de 12 px, metade azul oficial e metade vermelho, sem texto e sem logo.

---

## Deferred Ideas

- Ensaio fotográfico próprio no lugar da foto de banco — surgiu na avaliação do manual (estilo “pessoa em situação de limpeza”). A foto atual permanece.
- Logo em SVG (bloqueio B-001) — o kit PNG provisório continua.
- Skill permanente de UI para o repositório — o pedido original pedia uma skill; esta feature cobre a página, não um documento de skill.
- Reescrita de tom de voz do `content.json` — fora do escopo visual.

---

## Open Questions

Nenhuma. O usuário delegou as decisões em aberto às recomendações do agente e corrigiu o botão flutuante: ele permanece nas cores do WhatsApp.
