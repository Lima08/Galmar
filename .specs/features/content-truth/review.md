# Review — F2 content-truth

**Data:** 2026-11-25 · **Modo:** Local (não commitado na `main`)

|                 |                                                                                                                                                                  |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Mode**        | Local                                                                                                                                                            |
| **Scope**       | 11 arquivos (6 modificados, 5 novos) + docs, 0 commits                                                                                                           |
| **Subagents**   | 6 of 6 — Security, Requirements, Tests, Architecture, Regression, Performance                                                                                    |
| **Docs loaded** | `content-truth/spec.md`, `STATE.md`, `PROJECT.md`, `CONVENTIONS.md`, `ARCHITECTURE.md`, `STRUCTURE.md`, `STACK.md`, `INTEGRATIONS.md`, `TESTING.md`, `AGENTS.md` |
| **Findings**    | 21 (0 SECURITY · 0 CRITICAL · 0 PERFORMANCE · 7 WARNING · 14 SUGGESTION) + 1 FAIL de requisito                                                                   |

Gate verificado também com `lucide-react` 1.77.0 (bump do Dependabot; `node_modules` local estava em 0.454): typecheck, 107 testes e build verdes.

---

## Requisitos

- ❌ **CT-03 AC2** — `components/contact.tsx:12` monta "Campinas **-** SP"; a spec pede "Campinas **–** SP" (a rua já usa "–"). Separador literal no `.tsx`.
- ⚠️ **CT-06 AC2** — AC diz "mais de 40 avaliações no Google"; copy aprovada diz "Mais de 40 avaliações de clientes no Google". Inconsistência da própria spec.
- ⚠️ **CT-06 AC5** — sem teste com item de exemplo (`reviews.items` vazio → teste vácuo).
- ⚠️ **CT-07 AC1** — `app/layout.tsx`: `title` e `alt` do OG literais (pré-existentes; a guarda não pega `alt:` em objeto).
- ⚠️ **CT-08 AC2** — falhas não citam a chave na mensagem.

## WARNING (7)

- `tests/content.test.ts:146` — `LITERAL_TEXT` deixa passar texto ao lado de `{expr}`, com `()`, `=`, `;` ou entidades HTML.
- `tests/content.test.ts:147` — `LITERAL_A11Y` não pega `{'…'}`, template nem `alt:` em objeto.
- `tests/content.test.ts:113` — teste de itens de avaliação é vácuo; branch de cards sem cobertura; nota não inteira e autor duplicado não validados.
- `lib/hours.ts:13-17` — " às " e " · " são copy literal fora do JSON (inconsistente com `closedLabel`).
- `.specs/codebase/INTEGRATIONS.md`, `ARCHITECTURE.md`, `STRUCTURE.md`, `TESTING.md` — citam `whatsappMessage`, telefone antigo; faltam `lib/hours`, `lib/maps`, Google Maps, atalhos do hero.
- `components/testimonials.tsx:44` + `content.json` — nota "5,0" em 3 lugares (title, rating, estrelas fixas `count={5}`): se a nota mudar, o site volta a afirmar algo falso. _(Architecture + Regression + Requirements)_
- `.specs/project/STATE.md` — B-002 ainda cita "Sáb 8h–13h".

## SUGGESTION (14)

- `components/testimonials.tsx:57` — `key={review.author}` pode repetir.
- `components/testimonials.tsx:13` × `contact.tsx:9` — endereço montado em 2 formatos.
- `lib/hours.ts:3` — `export type HoursRow` sem consumidor.
- `lib/hours.ts:2` — `closed: false` renderiza "fechado".
- `lib/hours.test.ts` — faltam `00:00`, `12:00`, `09:05`, lista vazia.
- `data/content.json` — chaves `whatsappMessages.padrao/casa/empresa` em pt-BR (resto em inglês).
- `components/contact.tsx:1-7` — `react-icons/fa` depois dos `@/`.
- `tests/content.test.ts:9` — `'2005'` por substring em todo o JSON (URL/`src` futuro dá falso positivo).
- `tests/content.test.ts:139` — `id='x'` só aspas simples / aceita `data-testid`.
- `data/content.json` — `brands.title` "As Marcas que Representam Qualidade" (Title Case, vago) — revisar em F7.
- `reviews.items` futuro — publicar só primeiro nome + inicial (LGPD/termos Google).
- Performance — manter acesso estático ao JSON em client components (webpack poda chaves não usadas).
- Requisitos — `clockTitle` sobreviveu sem `clock` (nome impreciso).
- JSON-LD `streetAddress` com bairro (F9).

## Files With No Findings

- `components/hero.tsx`, `components/whatsapp-button.tsx`, `lib/maps.ts`, `lib/maps.test.ts`

## Highlights

- **Security:** URLs com `encodeURIComponent`; JSON-LD escapa `<`.
- **Requirements:** copy idêntica às 16 linhas aprovadas; HTML sem nenhum termo proibido.
- **Tests:** horário testado pela string exata; formato `HH:MM` validado.
- **Architecture:** horário estruturado prepara `openingHours` (F9) sem retrabalho.
- **Regression:** nenhuma chave removida ainda referenciada; nenhum import fantasma.
- **Performance:** rota igual (21.1 kB / 124 kB); webpack poda o JSON no bundle do cliente.
