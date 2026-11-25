# Roadmap

**Milestone atual:** M1 — v1 publicável
**Atualizado:** 2026-11-25

## M0 — Saneamento técnico ✅ (staged, não commitado)

Tooling (ESLint flat, Prettier, Vitest, CI), remoção de shadcn não usado, `lib/whatsapp.ts`, `lib/site.ts`, JSON-LD `Store`, robots/sitemap, telefone em fonte única.

## M1 — v1 publicável

Ordem = dependência. Features com mesmo nível podem rodar em paralelo.

| ID  | Feature              | Escopo                                                                                                                                                         | Depende de | Tamanho | Status     |
| --- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------- | ---------- |
| F1  | `design-foundation`  | Tokens de cor só do manual (remover #000957), Poppins 400/500/600/700, container único 1200 px, padrão de seção mobile first, `max-w-prose`, tipografia fluida | —          | Medium  | ⬜ Todo    |
| F2  | `content-truth`      | `content.json` como fonte única: CNPJ, horário, endereço, links; tom de voz do manual; "desde 1996"; remover promessas não confirmadas; depoimentos reais      | —          | Medium  | ⬜ Todo    |
| F3  | `brand-assets`       | Logo SVG horizontal colorido/branco + símbolo; favicon/apple-icon; OG image 1200×630; foto da loja otimizada                                                   | B-001      | Small   | ⛔ Blocked |
| F4  | `header-contact-bar` | Faixa de contato (WhatsApp + Ligar + horário), header com menu em pílula, CTA vermelho, menu mobile em `Sheet`                                                 | F1, F2     | Large   | ⬜ Todo    |
| F5  | `hero-redesign`      | Altura por conteúdo (≤ ~720 px), foto + overlay azul, símbolo G de fundo, selo "desde 1996", CTA único WhatsApp                                                | F1, F3     | Medium  | ⬜ Todo    |
| F6  | `location-section`   | Seção "Onde estamos": card com endereço/CEP/horário/contatos + Google Maps embed lazy + "Como chegar"; entra no menu                                           | F1, F2     | Medium  | ⬜ Todo    |
| F7  | `sections-polish`    | Marcas, Sobre, Depoimentos, Contato no novo padrão visual; avaliar fusão Contato × Onde estamos                                                                | F1, F2     | Medium  | ⬜ Todo    |
| F8  | `footer`             | Rodapé azul: logo branco, endereço, contatos, horário, redes, CNPJ, ©, faixa azul+vermelha 4 px                                                                | F1, F2, F3 | Small   | ⬜ Todo    |
| F9  | `conversion-seo`     | Mensagens WhatsApp por origem, `openingHours` no JSON-LD, metadata final, medição de cliques                                                                   | F4–F8      | Medium  | ⬜ Todo    |
| F10 | `launch`             | Domínio + `NEXT_PUBLIC_SITE_URL`, deploy, checklist QA (360→2560 px), Lighthouse ≥ 90, Rich Results Test                                                       | F1–F9      | Small   | ⬜ Todo    |

### Critério de saída do M1

- Todas as features ✅ e gate Build verde (`typecheck`, `lint`, `format:check`, `test`, `build`)
- Nenhum bloqueador aberto em STATE.md
- QA manual em 360, 768, 1280, 1920, 2560 px aprovado pelo cliente

## M2 — Pós-lançamento (ideias)

- Blog de dicas de uso (destino de QR codes em embalagens/loja)
- Páginas por marca/linha, sem preço
- Testes E2E de navegação e menu mobile (Playwright)
