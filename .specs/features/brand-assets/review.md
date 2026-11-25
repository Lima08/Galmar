# Review — F3 brand-assets

**Data:** 2026-11-25 · **Modo:** Local · **Subagents:** 1 revisor cobrindo as 6 dimensões (mudança Small: 3 linhas de código + assets + 1 teste)

| Dimensão     | Resultado                                                              |
| ------------ | ---------------------------------------------------------------------- |
| Security     | Sem achados                                                            |
| Requirements | 13/13 critérios BA PASS (peças inspecionadas visualmente)              |
| Tests        | 1 WARNING, 1 SUGGESTION                                                |
| Architecture | 1 SUGGESTION (doc)                                                     |
| Regression   | Sem referências a `logo-galmar.png`; `foto-galmar.jpg` só no hero (F5) |
| Performance  | Sem achados (horizontal 22 KB; OG só para crawlers); 1 SUGGESTION      |

## Achados e tratamento

- **WARNING** `tests/brand.test.ts` — teste do OG passava por acaso (o JSON-LD já contém `/brand/og.png`). **Corrigido:** isola o bloco `openGraph` e confere `url`, `width` e `height` contra o IHDR real; mutação para a foto faz falhar.
- **SUGGESTION** `components/header.tsx` — `priority` deprecado no Next 16 e o logo não é o LCP. **Corrigido:** `loading='eager'`.
- **SUGGESTION** `tests/brand.test.ts` — `pngInfo` sem checar assinatura. **Corrigido:** valida o chunk `IHDR`.
- **SUGGESTION** `STRUCTURE.md`/spec — "trocar pelo SVG sem mudar o nome" é impreciso (extensão muda). **Corrigido.**

## Highlight

Versão branca estritamente binária, ícone Apple opaco de fato, OG exatamente em #2983c2.
