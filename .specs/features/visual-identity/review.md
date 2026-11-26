# Review — identidade visual

**Mode:** Local
**Branch:** `main` (à frente de `origin/main` em 2 commits; implementação ainda unstaged)
**Date:** 2026-11-25

## Review Summary

|                 |                                                                                                                                                                                                                                              |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Mode**        | Local                                                                                                                                                                                                                                        |
| **Scope**       | 27 arquivos no diff contra `origin/main` mais o working tree; 2 commits não enviados                                                                                                                                                         |
| **Subagents**   | 6 de 6 — security, requirements, tests, architecture, regression, performance                                                                                                                                                                |
| **Docs loaded** | `visual-identity/spec.md`, `visual-identity/context.md`, `visual-identity/design.md`, `visual-identity/tasks.md`, `CONVENTIONS.md`, `ARCHITECTURE.md`, `TESTING.md`, `STACK.md`, `INTEGRATIONS.md`, `CONCERNS.md`, `AGENTS.md`, `PROJECT.md` |
| **Findings**    | 3 warnings, 0 críticos. 1 warning corrigido na hora (contraste do copyright).                                                                                                                                                                |

### SECURITY (0)

Nenhum.

### CRITICAL (0)

Nenhum.

### PERFORMANCE (0)

Nenhum.

### WARNING (3)

- `components/footer.tsx:20` — copyright em `text-white/80` sobre `#1f6aa0` ficava em ~4,3:1. Corrigido para `text-white` (5,79:1). `design.md` e `tasks.md` atualizados.
- `tests/contact.test.ts:144` — o teste das redes exige a string `SOCIAL`, mas não exige `className={SOCIAL}` nos botões. A constante pode ficar no arquivo e os botões voltarem para o contorno branco sem o teste falhar.
- `AGENTS.md` — o `next dev` inseriu o bloco `nextjs-agent-rules`. Não faz parte da feature. O próprio Next recria o bloco se ele for apagado.

### SUGGESTION (0)

Nenhum com confiança ≥ 80%.

### Requirements

28 critérios WHEN/THEN/SHALL e 5 edge cases do spec passaram no código atual. Sem `SPEC_DEVIATION`.

### Files With No Findings

- `components/header.tsx`, `components/hero.tsx`, `components/section.tsx`, `components/brands.tsx`, `components/about-us.tsx`, `components/testimonials.tsx`, `app/globals.css` — sem achado de segurança, regressão ou performance.

### Highlights

- Security: links externos que restaram mantêm `rel='noopener noreferrer'`.
- Requirements: paleta, logo, rodapé curto, pattern só em marcas e verde só no flutuante batem com o spec.
- Tests: pattern, header e a saída dos links do rodapé têm asserções pareadas.
- Architecture: o rodapé não recria endereço, horário nem telefone.
- Regression: esses dados continuam na faixa de contato e em Onde estamos.
- Performance: o pattern é uma máscara CSS estática que reutiliza `symbol.png`.

### Verificação no navegador

Em 1766 px: logo 80 px, header 112 px, sem rolagem horizontal. Em 360 px: logo 56 px, header 72 px, sem rolagem horizontal. Título de Sobre branco sobre `#2983c2`. Faixa do rodapé 12 px, azul `#2983c2` e vermelho `#d52825`. Botão flutuante `#25d366`. Menu mobile abre e “Onde estamos” leva a `#contact`.
