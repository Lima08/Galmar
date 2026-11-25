# Galmar — Site institucional v1

**Plano de referência:** [Galmar — Plano de refatoração do site](https://claude.ai/artifact/5f2G2Y65U5vxfCKgbEvFA9)
**Manual de marca:** `../Manual de identidade visual.pdf` (fora do repo)
**Atualizado:** 2026-11-25

## Visão

Landing page single-page da Galmar Comercial (produtos de limpeza doméstica e industrial, higiene e descartáveis, Campinas-SP, desde 1996). A v1 publicada deve parecer moderna e profissional, seguir 100% o manual de identidade visual e transformar visitante em conversa no WhatsApp.

## Objetivos da v1

| #   | Objetivo     | Critério mensurável                                                                          |
| --- | ------------ | -------------------------------------------------------------------------------------------- |
| O1  | Converter    | CTA WhatsApp visível sem rolar em 360×640; presente em header, hero, Onde estamos, flutuante |
| O2  | Profissional | Zero cor fora da paleta; logo ≥ 80 px; sem placeholder ou conteúdo inventado publicado       |
| O3  | Moderno      | Container único 1200 px, hero sem `min-h-screen`, grafismos do manual                        |
| O4  | Encontrável  | Lighthouse mobile ≥ 90 (Performance, Acessibilidade, SEO); JSON-LD válido                    |
| O5  | Confiável    | Dados de contato de uma fonte só (`data/content.json`), sem divergência                      |

## Restrições

- **Sem backend, banco ou CMS.** Todo conteúdo em `data/content.json`; mudança = commit + deploy.
- **Mobile first.** Classes sem prefixo = celular (360 px); `md:`/`lg:` só ampliam.
- **Largura máxima.** Container único de 1200 px; fundos full-bleed; texto ≤ ~65 ch.
- **Identidade visual.** Azul `#2983c2`, vermelho `#d52825`, branco; Poppins; logo sem sombra/deformação; área de proteção.
- **Sem e-commerce.** Sem catálogo, preço, carrinho, login (decisão do cliente).
- Stack existente: Next.js 16 App Router, React 19, Tailwind 4, shadcn/ui (ver `.specs/codebase/STACK.md`).

## Dados oficiais confirmados

| Campo             | Valor                                                                   | Fonte           |
| ----------------- | ----------------------------------------------------------------------- | --------------- |
| Telefone/WhatsApp | +55 (19) 3212-1177 (mesmo número)                                       | Usuário         |
| Endereço          | Av. Jorge Tibiriçá, 1747 – Jardim Santa Eudoxia, Campinas-SP, 13044-125 | GMN             |
| Horário           | Seg–Sex 9h–18h · Sáb 9h–13h · Dom fechado                               | GMN             |
| Avaliações Google | 5,0 ★, 41 avaliações (2026-11-25)                                       | GMN             |
| Fundação          | 1996                                                                    | Manual de marca |
| Cores             | #2983c2 / #d52825 / branco                                              | Manual de marca |
| Fonte             | Poppins                                                                 | Manual de marca |

## Referências de UX

- **limpezapura.com.br** — contato no topo (ícone + rótulo + número), menu em pílula, hero com foto + overlay de cor da marca. Evitar header poluído e CTAs de cores diferentes.
- **baraodalimpeza.com.br** — card de loja com Google Maps embutido e endereço completo. Evitar seções repetidas e telefones sem contexto.

## Fora de escopo (v1)

Blog/QR code, páginas por marca, formulário com persistência, newsletter, analytics com backend próprio.
