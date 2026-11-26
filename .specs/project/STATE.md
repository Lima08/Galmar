# State

**Last Updated:** 2026-11-25
**Current Work:** M1 — F1–F9 ✅; próximo: F10 `launch`

---

## Recent Decisions

### AD-001: Site single-page, sem e-commerce (2026-11-25)

**Decision:** Sem catálogo, preço, carrinho ou blog na v1.
**Reason:** Pedido do cliente; foco em contato.
**Trade-off:** Sem tráfego de busca por produto.
**Impact:** Conversão = clique no WhatsApp/telefone/rota.

### AD-002: Sem backend; conteúdo em `data/content.json` (2026-11-25)

**Decision:** Todo dado e texto no código.
**Reason:** Restrição do projeto.
**Trade-off:** Alteração de conteúdo exige commit + deploy.
**Impact:** Formulário só abre o WhatsApp; nada é gravado.

### AD-003: Mobile first + container único de 1200 px (2026-11-25)

**Decision:** Base 360 px; `md:`/`lg:` ampliam; header, seções e rodapé com o mesmo container de 1200 px; hero sem `min-h-screen`.
**Reason:** Público majoritariamente mobile; desalinhamento e vazio em telas grandes (print localhost 2026-11-25).
**Impact:** F1 define o padrão antes de qualquer seção.

### AD-004: Telefone e WhatsApp = +55 (19) 3212-1177 (2026-11-25)

**Decision:** Um número só para ligar e para o WhatsApp.
**Reason:** Confirmado pelo usuário.
**Impact:** `content.contact.info.phone` é a fonte única (já aplicado no M0).

### AD-005: CTA principal único — WhatsApp, vermelho #d52825 (2026-11-25)

**Decision:** Mesmo rótulo e cor em header, hero, Onde estamos e botão flutuante. Azul para elementos estruturais.
**Reason:** Referência Limpeza Pura dispersa a ação com CTAs de cores diferentes.

### AD-006: Depoimentos = avaliações reais do Google (2026-11-25)

**Decision:** Substituir os 3 depoimentos fictícios por 3–6 avaliações reais do Perfil da Empresa no Google (nome, nota, texto), com link "Ver todas no Google". Copiadas para `content.json` (sem API).
**Reason:** Depoimento inventado prejudica confiança e pode infringir o CDC.
**Trade-off:** Atualização manual quando surgirem avaliações novas.
**Impact:** F2 (conteúdo) e F7 (layout da seção). Precisa do link do perfil no Google.

### AD-007: Dev/preview na Vercel; produção como site estático no servidor do cliente (2026-11-25)

**Decision:** Vercel só para desenvolvimento/preview. Produção = `next build` com `output: 'export'` (pasta `out/`) publicada no servidor do cliente.
**Reason:** Escolha do usuário.
**Trade-off:** Sem otimização de imagem em runtime, sem Vercel Analytics em produção, sem middleware/rotas dinâmicas.
**Impact:**

- `next.config.mjs`: `output: 'export'` + `images.unoptimized: true` → imagens pré-otimizadas (WebP, tamanhos certos) no repo (F3/F5)
- `robots.ts`/`sitemap.ts` continuam (geram arquivos estáticos); `NEXT_PUBLIC_SITE_URL` por ambiente
- Preview da Vercel com `noindex` para não competir com o domínio real
- Medição de cliques (F9) precisa de ferramenta só client-side (ex.: GA4)
- F10 ganha passo de build estático + upload e teste do `out/` no servidor

### AD-008: Medição com Google Analytics 4 + aviso de cookies (2026-11-25)

**Decision:** GA4 client-side com eventos `click_whatsapp`, `click_phone`, `click_directions` (parâmetro `location`: header, hero, onde-estamos, flutuante, rodapé). Banner de consentimento LGPD: GA só carrega após aceite (Consent Mode v2).
**Reason:** Grátis, funciona em site estático, integra com Google Ads/Perfil da Empresa.
**Trade-off:** Banner de cookies na tela; quem recusa não é medido.
**Impact:** F9 inclui banner + Consent Mode; `NEXT_PUBLIC_GA_ID` por ambiente (vazio no preview Vercel). Precisa política de privacidade simples (página ou modal).

### AD-009: Contato e localização viram uma seção só, sem formulário (2026-11-25)

**Decision:** Seção final "Onde estamos" (`id='contact'`): mapa + endereço/CEP/horário + botões WhatsApp, Ligar e Como chegar + redes sociais. Remove `components/forms/contact-form.tsx` e as chaves `contact.form` do `content.json`.
**Reason:** O formulário só abria o WhatsApp — passo extra e dados repetidos.
**Trade-off:** Visitante sem ideia do que escrever recebe só a mensagem padrão.
**Impact:** F6 absorve a seção Contato; F7 não trata mais Contato; menu fica Início, Marcas, Sobre, Avaliações, Onde estamos.

### AD-010: Foto do hero de banco de imagens com licença livre (2026-11-25)

**Decision:** Foto horizontal de Unsplash/Pexels (produtos de limpeza/higiene), com camada azul #2983c2 por cima. Registrar autor + URL + licença em `public/assets/hero/CREDITS.md`.
**Reason:** Rapidez; a única foto real (`foto-galmar.jpg`) mostra a placa com WhatsApp antigo.
**Trade-off:** Menos autêntica que foto real. Trocar por fotos reais quando houver (Deferred).
**Impact:** Aplicado na F5: Pexels 28576636 (Jonathan Borba), WebP 640/960/1280 (14/28/44 KB), créditos em `public/assets/hero/CREDITS.md`; sem camada azul sobre a foto (layout em duas colunas, foto ao lado do texto — cor da marca no fundo tint + grafismo). `foto-galmar.jpg` removida.

### AD-011: Logo provisório a partir do PNG até o SVG chegar (2026-11-25)

**Decision:** Pedir ao designer SVG (horizontal colorido, horizontal branco, símbolo). Enquanto isso, gerar PNGs provisórios do `logo-galmar.png` (2480 px): vertical recortado sem margens, horizontal montado conforme slide 4.1 do manual (símbolo + nome lado a lado, sem alterar proporções), versão branca, símbolo isolado, favicon.
**Reason:** Não bloquear o lançamento; logo atual fica com símbolo ~20 px no header.
**Trade-off:** PNG pesa mais e serrilha em telas de alta densidade; montagem horizontal é provisória.
**Impact:** F3 desbloqueada com escopo provisório; troca por SVG é tarefa curta pós-entrega. Os arquivos provisórios ficam em `public/brand/` com nomes estáveis para a troca ser só de arquivo.

### AD-012: Animações sutis, CSS puro (2026-11-25)

**Decision:** Fade + subida de ~16 px na entrada das seções ao rolar (uma vez, via IntersectionObserver ou `animation-timeline` com fallback), hover suave em botões/cards, carrossel de marcas em loop lento. Sem Framer Motion. Tudo desligado com `prefers-reduced-motion: reduce`.
**Reason:** Equilibra "moderno" e "formal/respeitoso" do manual sem pesar no celular.
**Impact:** F1 define utilitários/keyframes no Tailwind; seções só aplicam a classe.

### AD-013: Público duplo — casa e empresa, com atalhos (2026-11-25)

**Decision:** Hero com título geral ("Produtos de limpeza e descartáveis em Campinas desde 1996" — copy final em F2) e dois atalhos: "Para sua casa" e "Para sua empresa". Cada um abre o WhatsApp com mensagem própria (`content.json`: `whatsappMessages.casa`, `whatsappMessages.empresa`).
**Reason:** Galmar atende doméstico e industrial, varejo e entregas (manual 1.1).
**Trade-off:** Hero com 2 ações; refina AD-005: ambos são CTA de WhatsApp vermelho — "empresa" preenchido, "casa" contorno vermelho (ordem a validar com dados do GA4).
**Impact:** F2 (copy e mensagens), F5 (layout dos atalhos), F9 (parâmetro `audience` nos eventos GA4).

### AD-014: Pendências externas não bloqueiam a v1 — cada uma tem alternativa (2026-11-25)

**Decision:** Todo dado que depende de cliente/terceiro tem card no GitHub e um caminho alternativo. O código lê tudo de `content.json`; quando o dado chegar, a troca é só de conteúdo/arquivo.
**Reason:** Pedido do usuário: seguir sem esperar o cliente.

| Card | Pendência                         | Alternativa na v1                                                                                                                                                                                                                                                                       |
| ---- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| #13  | CNPJ, horário, entrega, redes     | Endereço e telefone confirmados pelo GMN (print 2026-11-25). Horário confirmado no GMN: Seg–Sex 9h–18h, Sáb 9h–13h, Dom fechado (corrigido na F2). CNPJ omitido do rodapé até chegar (site não vende online). Promessa de entrega removida (Galmar não entrega; copy: "retire na loja") |
| #10  | Avaliações reais do Google        | Selo "5,0 ★ no Google · mais de 40 avaliações" + link "Ver avaliações no Google". Textos entram quando o usuário copiar 3–6 avaliações do GMN (Google bloqueia leitura automática). Sem `aggregateRating` no JSON-LD (Google não aceita avaliação autodeclarada de LocalBusiness)       |
| #3   | Conexão com GMN (URL do perfil)   | Links "Ver no Google"/"Como chegar" via URL de busca do Maps por nome + endereço; mapa embutido via `maps?q=<endereço>&output=embed` (sem chave)                                                                                                                                        |
| #15  | Fotos                             | Hero: banco de imagens (AD-010). Fotos do GMN só se forem do proprietário e baixadas manualmente; foto da fachada atual fica fora (placa com WhatsApp antigo). Street View não pode ser usado                                                                                           |
| #12  | Logo SVG                          | PNGs provisórios (AD-011)                                                                                                                                                                                                                                                               |
| #1   | GTM/GA4                           | Implementar com `NEXT_PUBLIC_GA_ID` vazio = no-op; liga ao preencher a env                                                                                                                                                                                                              |
| #2   | DNS e domínio                     | Desenvolver com a URL da Vercel; `NEXT_PUBLIC_SITE_URL` definido no lançamento                                                                                                                                                                                                          |
| #16  | Hospedagem no servidor do cliente | Só afeta F10; build estático testado localmente (`npx serve out`)                                                                                                                                                                                                                       |
| #14  | Placa da fachada                  | Só comunicação com o cliente; nada no código                                                                                                                                                                                                                                            |

**Impact:** Nenhuma feature de F1 a F9 fica bloqueada. F10 depende de #2 e #16.

### AD-015: Azul de apoio derivado só para texto pequeno (contraste AA) (2026-11-25)

**Decision:** #2983c2 segue como azul da marca (fundos grandes, títulos ≥ 24 px ou ≥ 18,66 px bold, ícones, logo). Para texto pequeno em azul, e para fundos azuis que levam texto branco pequeno (faixa de contato, rodapé, hover de botão azul), usa o tom derivado #1f6aa0 (5,79:1 com branco). Hover do vermelho: #b3211f.
**Reason:** #2983c2 × branco = 4,1:1, abaixo do WCAG AA (4,5:1) para texto normal; meta O4 (Lighthouse a11y ≥ 90). Vermelho #d52825 × branco = 5,05:1 passa.
**Trade-off:** Faixa de contato e rodapé ficam um pouco mais escuros que o azul do manual.
**Impact:** F1 define os tokens; #000957 (navy fora do manual) é removido e os títulos passam a #2983c2.

### AD-016: Cores de terceiros como exceção documentada (2026-11-25)

**Decision:** Verde do WhatsApp (#25d366/#1ebe5d) e amarelo das estrelas (#eab308) ficam, como tokens nomeados `whatsapp` e `rating`. Ícones de Facebook/Instagram em `secondary-dark` (monocromático). Nenhuma outra cor fora da paleta.
**Reason:** Reconhecimento imediato do botão de WhatsApp; review da F1 apontou cores cruas fora da guarda.
**Impact:** `tests/palette.test.ts` proíbe todas as famílias de cor do Tailwind e hex literal; exceções só via token.

---

## Active Blockers

### B-001: Logo em vetor indisponível

**Discovered:** 2026-11-25
**Impact:** Bloqueia F3; afeta F5 e F8. Logo atual (`public/logo-galmar.png`) é vertical com ~25% de margem → símbolo ~20 px no header (manual exige ≥ 80 px).
**Card:** #12
**Detalhe:** `logo.ai` tem preview PDF vazio (salvo sem compatibilidade PDF); `logo.psd` contém só estudos tipográficos azuis.
**Workaround:** AD-011 aplicado na F3 — kit provisório em `public/brand/` (trocar arquivos quando o SVG chegar).
**Resolution:** Designer exporta SVG: horizontal colorido, horizontal branco, símbolo isolado.

### B-002: Dados da empresa pendentes

**Discovered:** 2026-11-25
**Card:** #13 · **Alternativa:** AD-014
**Impact:** F2, F6, F8.
**Confirmado (GMN, 2026-11-25):** endereço Av. Jorge Tibiriçá, 1747 – Jardim Santa Eudoxia, Campinas-SP, 13044-125; telefone (19) 3212-1177; nota 5,0 com 41 avaliações; categoria "Fornecedor de produtos de limpeza".
**Confirmado (redes, 2026-11-25):** Instagram `/galmarlimpeza/`, Facebook `/galmarlimpeza`.
**Pendente:** CNPJ/razão social; confirmar endereço (Av. Jorge Tibiriçá, 1747 – Jd. Santa Eudóxia, 13044-125) e horário (Seg–Sex 9h–18h, Sáb 9h–13h — confirmados no GMN); entrega: não faz (copy usa "retire na loja").

### B-003: Domínio e hospedagem indefinidos

**Discovered:** 2026-11-25
**Impact:** F10; sem `NEXT_PUBLIC_SITE_URL` canonical/OG/sitemap apontam para localhost.
**Cards:** #2, #16
**Parcial (AD-007):** dev na Vercel; produção estática no servidor do cliente. Falta: domínio final, tipo de servidor e forma de upload.

---

## Lessons Learned

### L-001: Plano em Claude Docs ficou parcialmente desatualizado

**Context:** O saneamento M0 removeu `store-location.tsx`, `products.tsx`, `store-gallery.tsx` e `components/ui/sheet.tsx`.
**Solution:** F6 recria a seção de localização; F4 reinstala `Sheet` via `npx shadcn@latest add sheet`.
**Prevents:** Seguir o doc citando arquivos que não existem mais.

---

### L-002: `container.padding` por breakpoint no Tailwind 3 exige o breakpoint em `container.screens`

**Context:** F1 — margem de 32 px a partir de `md` nunca era aplicada.
**Problem:** Incluir `md` em `container.screens` também fixa `max-width: 768px` naquele intervalo (largura em degraus).
**Solution:** `.container` próprio em `globals.css` + `corePlugins.container: false`.
**Prevents:** Container com margem errada; testes que validam config em vez de comportamento — medir no navegador (script CDP).

### L-003: `pkill -f "<padrão>"` mata o próprio shell quando o padrão está na linha de comando

**Solution:** Liberar porta com `fuser -k <porta>/tcp`.

---

## Deferred Ideas

- [ ] `components/ui/sheet.tsx` (vendor): `sr-only` "Close" em inglês, alvo de fechar ~16 px (WCAG 2.5.8 pede ≥ 24) e classes `animate-in` sem plugin no Tailwind 4 — avaliar `tw-animate-css` (conferir reduced-motion) e botão de fechar próprio pt-BR `size-11` — Captured during: F4

- [x] `sr-only`/"aria-label" Facebook/Instagram via `content.json` — Done in F6
- [ ] Lighthouse/axe real (contraste, performance) — Captured during: review F1 (F10)

- [ ] Fotos reais da loja (interior, balcão, fachada sem placa antiga) para hero e Sobre — Captured during: AD-010

- [ ] Blog de dicas + QR code em embalagens — Captured during: avaliação de referências
- [ ] Páginas por marca — Captured during: foundation
- [ ] E2E Playwright para âncoras/menu mobile — Captured during: foundation (CONCERNS.md)

---

## Todos

- [ ] Copiar 3–6 avaliações do GMN (nome, nota, texto) para `content.json` — #10
- [ ] Baixar fotos do GMN enviadas pelo proprietário, se houver — #15
