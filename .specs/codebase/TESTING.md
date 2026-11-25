# Testing Infrastructure

## Test Frameworks

**Unit:** Vitest (ambiente node, sem config — defaults)
**E2E:** nenhum
**Coverage:** não configurado

## Test Organization

Colocalizado: `lib/<modulo>.test.ts` (`whatsapp`, `site`, `hours`, `address`, `maps`) ao lado do módulo. Descrições em pt-BR.

## Test Coverage Matrix

| Code Layer                                                                                                                                | Required Test Type   | Location Pattern  | Run Command   |
| ----------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ----------------- | ------------- |
| Lógica pura (`lib/*.ts`)                                                                                                                  | unit                 | `lib/*.test.ts`   | `npm test`    |
| Seções (`components/*.tsx`)                                                                                                               | none (visual manual) | —                 | `npm run dev` |
| Guardas de design (paleta, contraste, container, `--header-h`, reveal) e de conteúdo (dados oficiais, termos proibidos, copy fora do JSX) | static               | `tests/*.test.ts` | `npm test`    |
| `components/ui/*`                                                                                                                         | none (vendor)        | —                 | —             |

## Parallelism Assessment

| Test Type | Parallel-Safe? | Isolation Model           | Evidence               |
| --------- | -------------- | ------------------------- | ---------------------- |
| unit      | Sim            | funções puras, sem estado | `lib/whatsapp.test.ts` |

## Gate Check Commands

| Gate Level | When to Use           | Command                                                                 |
| ---------- | --------------------- | ----------------------------------------------------------------------- |
| Quick      | Após qualquer edição  | `npm run typecheck && npm test`                                         |
| Full       | Antes de commit       | `npm run typecheck && npm run lint && npm run format:check && npm test` |
| Build      | Antes de merge/deploy | Full + `npm run build` (mesmo que o CI)                                 |

Build falha com erro de TS (flags `ignore*` removidas). Next 16 não roda lint no build — lint só via `npm run lint` (CI).
