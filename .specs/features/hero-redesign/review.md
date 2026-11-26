# Review — F5 hero-redesign

**Data:** 2026-11-25 · **Modo:** Local · **Subagents:** 1 revisor cobrindo as 6 dimensões (Medium)

| Dimensão     | Resultado                                                                                |
| ------------ | ---------------------------------------------------------------------------------------- |
| Security     | Sem achados                                                                              |
| Requirements | 13/13 PASS (foto conferida: sem marca de terceiro)                                       |
| Tests        | 2 WARNING (falso positivo de `\b` antes de `-`; `aria-hidden` vácuo), 1 SUGGESTION       |
| Architecture | 2 SUGGESTION (`cn()` em vez de template; CTA vermelho repetido 2× — manter até o 3º uso) |
| Regression   | Sem achados (contraste AA em todos os textos; foco `ring-primary-dark` via twMerge)      |
| Performance  | 1 PERFORMANCE (`sizes='50vw'` superestimava a coluna no desktop)                         |

## Achados e tratamento

| Achado                                            | Tratamento                                                                                                                          |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `/\bbg-primary\b/` casava `hover:bg-primary-dark` | Token isolado `(?<![\w:-])bg-primary(?![\w-])`; captura de cada `<Button>` com tempered token; mutação sem `bg-primary` agora falha |
| `aria-hidden` satisfeito pelo `Star`              | Teste ancorado no `<Image src='/brand/symbol.png'>` + `opacity-10` + `pointer-events-none`                                          |
| `sizes`                                           | `(min-width: 1264px) 576px, (min-width: 1024px) calc(50vw - 56px), 100vw`                                                           |
| Selo antes da foto e alvo 44 px sem teste         | Asserções adicionadas                                                                                                               |
| Template string                                   | `cn(CTA, …)`; `aspect-3/2` nativo                                                                                                   |
| AD-010 desatualizado                              | Impact atualizado em STATE                                                                                                          |
| CTA vermelho em hero + header                     | Mantido (2 usos); extrair variante no 3º uso                                                                                        |
