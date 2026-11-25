# Testing Infrastructure

## Test Frameworks

**Unit:** Vitest (ambiente node, sem config — defaults)
**E2E:** nenhum
**Coverage:** não configurado

## Test Organization

Colocalizado: `lib/<modulo>.test.ts` (`whatsapp`, `site`) ao lado do módulo. Descrições em pt-BR.

## Test Coverage Matrix

| Code Layer                  | Required Test Type   | Location Pattern | Run Command   |
| --------------------------- | -------------------- | ---------------- | ------------- |
| Lógica pura (`lib/*.ts`)    | unit                 | `lib/*.test.ts`  | `npm test`    |
| Seções (`components/*.tsx`) | none (visual manual) | —                | `npm run dev` |
| `components/ui/*`           | none (vendor)        | —                | —             |

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

Build agora falha com erro de TS/lint (flags `ignore*` removidas).
