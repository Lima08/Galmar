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

---

## Active Blockers

### B-001: Logo em vetor indisponível

**Discovered:** 2026-11-25
**Impact:** Bloqueia F3; afeta F5 e F8. Logo atual (`public/logo-galmar.png`) é vertical com ~25% de margem → símbolo ~20 px no header (manual exige ≥ 80 px).
**Detalhe:** `logo.ai` tem preview PDF vazio (salvo sem compatibilidade PDF); `logo.psd` contém só estudos tipográficos azuis.
**Workaround:** Recortar o PNG atual e usar a versão vertical temporariamente.
**Resolution:** Designer exporta SVG: horizontal colorido, horizontal branco, símbolo isolado.

### B-002: Dados da empresa pendentes

**Discovered:** 2026-11-25
**Impact:** F2, F6, F8.
**Pendente:** CNPJ/razão social; confirmar endereço (Av. Jorge Tibiriçá, 1747 – Jd. Santa Eudóxia, 13044-125) e horário (Seg–Sex 9h–18h, Sáb 8h–13h); se faz entrega e onde.

### B-003: Domínio e hospedagem indefinidos

**Discovered:** 2026-11-25
**Impact:** F10; sem `NEXT_PUBLIC_SITE_URL` canonical/OG/sitemap apontam para localhost.

---

## Lessons Learned

### L-001: Plano em Claude Docs ficou parcialmente desatualizado

**Context:** O saneamento M0 removeu `store-location.tsx`, `products.tsx`, `store-gallery.tsx` e `components/ui/sheet.tsx`.
**Solution:** F6 recria a seção de localização; F4 reinstala `Sheet` via `npx shadcn@latest add sheet`.
**Prevents:** Seguir o doc citando arquivos que não existem mais.

---

## Deferred Ideas

- [ ] Blog de dicas + QR code em embalagens — Captured during: avaliação de referências
- [ ] Páginas por marca — Captured during: foundation
- [ ] E2E Playwright para âncoras/menu mobile — Captured during: foundation (CONCERNS.md)

---

## Todos

- [ ] Commitar o saneamento M0 (staged) antes de iniciar F1
- [ ] Avisar cliente: placa da fachada mostra WhatsApp (19) 98167-8444, diferente do oficial
- [ ] Validar com o cliente: depoimentos atuais parecem fictícios (ver CONCERNS.md)
