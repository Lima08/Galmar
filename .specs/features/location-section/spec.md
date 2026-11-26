# F6 — Location Section Specification

**Roadmap:** M1 / F6 · **Tamanho:** Medium · **Depende de:** F1, F2 ✅
**Decisões aplicadas:** AD-005 (CTA WhatsApp vermelho), AD-009 (seção única sem formulário), AD-014 #3 (mapa embed sem chave), AD-016 (ícones sociais monocromáticos)

## Problem Statement

A seção Contato ainda usa um formulário que só abre o WhatsApp com nome/e-mail/mensagem — passo extra e dados repetidos. Não há mapa nem atalho "Como chegar". O menu ainda diz "Contato" em vez de "Onde estamos".

## Proposed Solution

- Reescrever `components/contact.tsx` como seção final **"Onde estamos"** (`id='contact'`): endereço/CEP, horário, telefone/e-mail, CTAs (WhatsApp, Ligar, Como chegar), redes e mapa embed lazy.
- Remover `components/forms/contact-form.tsx` e `contact.form` do JSON.
- Nav: rótulo **"Onde estamos"**.
- Mapa: `buildMapsEmbedUrl` em `lib/maps.ts` (`maps?q=…&output=embed`, sem chave); "Como chegar" via `buildMapsSearchUrl`.
- Links de WhatsApp/Ligar via `defaultWhatsAppUrl` / `phoneHref` (`lib/contact.ts`).

## Goals

- [x] Sem formulário de contato no site
- [x] Mapa embutido com `loading='lazy'` e título acessível
- [x] CTAs WhatsApp (vermelho), Ligar e Como chegar na seção
- [x] Menu "Onde estamos" → `#contact`

## Out of Scope

| Item                          | Reason      |
| ----------------------------- | ----------- |
| Medição GA4 dos cliques       | F9          |
| URL canônica do Perfil Google | #3 / AD-014 |
| CNPJ no rodapé                | F8 / #13    |

---

## User Stories

### P1: Seção "Onde estamos" sem formulário ⭐ MVP

**Acceptance Criteria**:

1. WHEN a seção é renderizada THEN SHALL usar `<Section id='contact'>` e NÃO incluir formulário nem import de `ContactForm`
2. WHEN o conteúdo é exibido THEN SHALL mostrar endereço com CEP, horário (via `formatHours`), telefone e e-mail a partir de `content.contact.info`
3. WHEN os CTAs são exibidos THEN SHALL haver WhatsApp (`defaultWhatsAppUrl`, vermelho `primary`), Ligar (`phoneHref`) e Como chegar (`buildMapsSearchUrl`), todos com alvo ≥ 44 px e links externos com `rel='noopener noreferrer'`
4. WHEN as redes são exibidas THEN Facebook e Instagram SHALL usar `content.contact.social.*.{url,label}` (rótulo acessível, sem literal no JSX)
5. WHEN o menu é renderizado THEN o item `id='contact'` SHALL chamar-se "Onde estamos"

### P1: Mapa embed lazy ⭐ MVP

**Acceptance Criteria**:

1. WHEN o mapa é renderizado THEN SHALL ser um `<iframe>` com `loading='lazy'`, `title` do JSON e `src` de `buildMapsEmbedUrl` (sem chave de API)
2. WHEN `buildMapsEmbedUrl(name, address)` é chamado THEN SHALL gerar `https://www.google.com/maps?q=<encoded>&output=embed`
3. WHEN o formulário antigo existir no repo THEN `components/forms/contact-form.tsx` e a chave `contact.form` SHALL ser removidos

## Requirement Traceability

| Requirement ID | Story                    | Phase   | Status |
| -------------- | ------------------------ | ------- | ------ |
| LS-01          | P1: Seção sem formulário | Execute | Done   |
| LS-02          | P1: Mapa embed lazy      | Execute | Done   |

## Success Criteria

- [x] Gate Build verde
- [x] Nenhum arquivo sob `components/forms/`
- [x] Testes de source travam CTAs, iframe lazy e ausência de ContactForm

## Implementation Notes (2026-11-25)

- `components/contact.tsx` reescrito (server): info + CTAs + redes + iframe `loading='lazy'`.
- `buildMapsEmbedUrl` em `lib/maps.ts`; "Como chegar" via `buildMapsSearchUrl`.
- Removidos `components/forms/contact-form.tsx` e `contact.form` do JSON.
- Nav: "Onde estamos"; redes oficiais `galmarlimpeza`.
