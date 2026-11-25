# State

**Last Updated:** 2026-11-25
**Current Work:** M1 — foundation criado; validando preferências com o usuário antes de /specify

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
**Impact:** F5 escolhe 2–3 candidatas para aprovação; versões WebP 640/1280/1920 px (AD-007). `foto-galmar.jpg` sai do OG image e do JSON-LD (F9).

### AD-011: Logo provisório a partir do PNG até o SVG chegar (2026-11-25)

**Decision:** Pedir ao designer SVG (horizontal colorido, horizontal branco, símbolo). Enquanto isso, gerar PNGs provisórios do `logo-galmar.png` (2480 px): vertical recortado sem margens, horizontal montado conforme slide 4.1 do manual (símbolo + nome lado a lado, sem alterar proporções), versão branca, símbolo isolado, favicon.
**Reason:** Não bloquear o lançamento; logo atual fica com símbolo ~20 px no header.
**Trade-off:** PNG pesa mais e serrilha em telas de alta densidade; montagem horizontal é provisória.
**Impact:** F3 desbloqueada com escopo provisório; troca por SVG é tarefa curta pós-entrega. Os arquivos provisórios ficam em `public/brand/` com nomes estáveis para a troca ser só de arquivo.

---

## Active Blockers

### B-001: Logo em vetor indisponível

**Discovered:** 2026-11-25
**Impact:** Bloqueia F3; afeta F5 e F8. Logo atual (`public/logo-galmar.png`) é vertical com ~25% de margem → símbolo ~20 px no header (manual exige ≥ 80 px).
**Detalhe:** `logo.ai` tem preview PDF vazio (salvo sem compatibilidade PDF); `logo.psd` contém só estudos tipográficos azuis.
**Workaround:** AD-011 — PNGs provisórios gerados do `logo-galmar.png`.
**Resolution:** Designer exporta SVG: horizontal colorido, horizontal branco, símbolo isolado.

### B-002: Dados da empresa pendentes

**Discovered:** 2026-11-25
**Impact:** F2, F6, F8.
**Pendente:** CNPJ/razão social; confirmar endereço (Av. Jorge Tibiriçá, 1747 – Jd. Santa Eudóxia, 13044-125) e horário (Seg–Sex 9h–18h, Sáb 8h–13h); se faz entrega e onde.

### B-003: Domínio e hospedagem indefinidos

**Discovered:** 2026-11-25
**Impact:** F10; sem `NEXT_PUBLIC_SITE_URL` canonical/OG/sitemap apontam para localhost.
**Parcial (AD-007):** dev na Vercel; produção estática no servidor do cliente. Falta: domínio final, tipo de servidor e forma de upload.

---

## Lessons Learned

### L-001: Plano em Claude Docs ficou parcialmente desatualizado

**Context:** O saneamento M0 removeu `store-location.tsx`, `products.tsx`, `store-gallery.tsx` e `components/ui/sheet.tsx`.
**Solution:** F6 recria a seção de localização; F4 reinstala `Sheet` via `npx shadcn@latest add sheet`.
**Prevents:** Seguir o doc citando arquivos que não existem mais.

---

## Deferred Ideas

- [ ] Fotos reais da loja (interior, balcão, fachada sem placa antiga) para hero e Sobre — Captured during: AD-010

- [ ] Blog de dicas + QR code em embalagens — Captured during: avaliação de referências
- [ ] Páginas por marca — Captured during: foundation
- [ ] E2E Playwright para âncoras/menu mobile — Captured during: foundation (CONCERNS.md)

---

## Todos

- [ ] Commitar o saneamento M0 (staged) antes de iniciar F1
- [ ] Avisar cliente: placa da fachada mostra WhatsApp (19) 98167-8444, diferente do oficial
- [ ] Obter link do Perfil da Empresa no Google e selecionar 3–6 avaliações (AD-006)
