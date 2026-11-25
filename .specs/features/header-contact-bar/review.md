# Review — F4 header-contact-bar

**Data:** 2026-11-25 · **Modo:** Local · **Subagents:** 2 revisores (Requisitos + Testes; Segurança + Arquitetura + Regressão + Performance)

| Dimensão     | Resultado                                                                               |
| ------------ | --------------------------------------------------------------------------------------- |
| Security     | Sem achados (`rel` correto em todo `_blank`; links de dado estático)                    |
| Requirements | 0 FAIL, 3 PARTIAL (foco do CTA, sombra ao abrir rolado, traço fixo no horário curto)    |
| Tests        | 1 MEDIUM (`tests/header.test.ts` deixava passar regressões), 1 LOW                      |
| Architecture | 1 WARNING (`tel:` duplicava a normalização do telefone), 1 WARNING (doc), 2 SUGGESTION  |
| Regression   | Sem achados (sticky × z-index × portal do Sheet ok; vendor `animate-in` vira no-op)     |
| Performance  | +12,1 kB gzip (Radix Dialog) — aceito pelo ganho de acessibilidade; `ContactBar` sem JS |

## Achados e tratamento

| Achado                                                                              | Tratamento                                                                                                                                                                                                                                                |
| ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tel:` com regra própria de DDI, divergente do WhatsApp                             | `lib/phone.ts` (`toInternationalDigits`) usado por `buildWhatsAppUrl` e `phoneHref`; testes com `+55`, `019`, celular                                                                                                                                     |
| `buildWhatsAppUrl(phone, default)` repetido 3×                                      | `lib/contact.ts` (`defaultWhatsAppUrl`, `phoneHref`, `shortHours`) para faixa, header e botão flutuante                                                                                                                                                   |
| `formatHours({ short })` com flag (SRP)                                             | `formatShortHours(rows, separator)` separado; testes de fallback sem `daysShort` e minutos                                                                                                                                                                |
| Testes do header por substring solta                                                | Ancorados: estilo `LINK` em todos os links, `rel` = `_blank`, `aria-label` do Instagram, `SheetTitle`/`SheetClose`/CTA dentro do `SheetContent`, `size-11` + `aria-label` no trigger, links da faixa vindos de `lib/contact` (testado com os dados reais) |
| Foco do CTA sem `primary-dark`                                                      | `focus-visible:bg-primary-dark`                                                                                                                                                                                                                           |
| Sombra ausente ao abrir já rolado                                                   | `handleScroll()` inicial                                                                                                                                                                                                                                  |
| `daysShort: "Dom"` nunca lido                                                       | Removido; "–" entre horários documentado como notação                                                                                                                                                                                                     |
| ARCHITECTURE/INTEGRATIONS/TESTING sem `ContactBar`, CTA, `lib/phone`, `lib/contact` | Atualizados                                                                                                                                                                                                                                               |
| Vendor `Sheet`: "Close" em inglês, alvo ~16 px, sem animação                        | Deferred em STATE (não editar vendor)                                                                                                                                                                                                                     |

Verificação pós-correção (CDP): mesmos resultados — sticky com sombra, alvos 44 px, Sheet com foco preso, Esc devolve foco, item fecha e posiciona a seção.
