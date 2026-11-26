# F8 — Footer Specification

**Roadmap:** M1 / F8 · **Tamanho:** Small · **Depende de:** F1, F2, F3 ✅
**Decisões aplicadas:** AD-011 (logo branco), AD-014 #13 (CNPJ omitido até chegar), AD-015 (fundo `secondary-dark`)

## Problem Statement

O rodapé é só uma linha de copyright em fundo branco — sem logo, endereço, contatos, horário, redes nem a faixa azul+vermelha do manual.

## Proposed Solution

Rodapé `bg-secondary-dark` com `.container`: logo branco, endereço/CEP, horário, telefone/e-mail/WhatsApp, redes, ©; faixa inferior 4 px azul+vermelha. Sem CNPJ até o dado oficial.

## Goals

- [x] Logo branco + dados de contato no rodapé
- [x] Faixa azul+vermelha de 4 px
- [x] Sem CNPJ inventado
- [x] Gate Build verde

## Out of Scope

| Item        | Reason       |
| ----------- | ------------ |
| CNPJ        | #13 / AD-014 |
| Eventos GA4 | F9           |

---

## User Stories

### P1: Rodapé completo ⭐ MVP

**Acceptance Criteria**:

1. WHEN o rodapé é renderizado THEN SHALL usar `bg-secondary-dark`, `.container` e `logo-horizontal-white.png` com `alt` do JSON
2. WHEN o conteúdo é exibido THEN SHALL mostrar endereço (com CEP), horário (`formatHours`), telefone, e-mail e links WhatsApp/`tel:` via `lib/contact`
3. WHEN as redes são exibidas THEN SHALL usar `content.contact.social` com `aria-label` e `rel='noopener noreferrer'`
4. WHEN o rodapé termina THEN SHALL haver faixa de 4 px (`h-1`) com metade `bg-secondary` e metade `bg-primary`
5. WHEN o copyright é exibido THEN SHALL incluir o ano e o texto de `content.footer.rights`
6. WHEN CNPJ não está em `content.json` THEN SHALL NOT inventar nem exibir CNPJ

## Requirement Traceability

| Requirement ID | Story               | Phase   | Status |
| -------------- | ------------------- | ------- | ------ |
| FT-01          | P1: Rodapé completo | Execute | Done   |

## Success Criteria

- [x] Gate Build verde
- [x] Teste de source cobre logo branco, faixa e ausência de CNPJ

## Implementation Notes (2026-11-25)

- `components/footer.tsx`: fundo `secondary-dark`, logo branco, endereço/horário/WhatsApp/Ligar/e-mail/redes, ©, faixa `h-1` secondary+primary.
- CNPJ omitido (AD-014 #13). Links via `lib/contact`.
