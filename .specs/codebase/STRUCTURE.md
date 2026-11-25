# Project Structure

## Directory Tree

```
.
├── app/
│   ├── layout.tsx          # html/body, fonte, metadata/OG, JSON-LD
│   ├── page.tsx            # composição das seções
│   ├── robots.ts  sitemap.ts
│   ├── icon.png  apple-icon.png   # favicons (file convention)
│   └── globals.css         # Tailwind, CSS vars, .container, --header-h, reveal
├── components/
│   ├── header.tsx  hero.tsx  brands.tsx  about-us.tsx
│   ├── testimonials.tsx  contact.tsx  footer.tsx  whatsapp-button.tsx
│   ├── section.tsx  reveal-observer.tsx   # primitiva de seção + animação de entrada
│   ├── forms/contact-form.tsx
│   └── ui/button.tsx       # vendor shadcn
├── data/content.json       # toda a copy
├── lib/                    # utils (cn), whatsapp, hours, address, maps, site (+ *.test.ts)
├── tests/                  # guardas de design: paleta, tema, layout (+ source-files.ts)
├── public/                 # logo-galmar.png, foto-galmar.jpg, assets/brands/*
├── .specs/codebase/        # este mapeamento
├── .github/workflows/ci.yml
├── AGENTS.md  CLAUDE.md    # índice para LLMs
└── next.config.mjs  eslint.config.mjs  components.json  tsconfig.json
```

## Where Things Live

| O quê                                | Onde                                                     |
| ------------------------------------ | -------------------------------------------------------- |
| Ordem das seções                     | `app/page.tsx`                                           |
| Favicon                              | `app/icon.png`, `app/apple-icon.png`                     |
| SEO / metadata / JSON-LD             | `app/layout.tsx`                                         |
| URL do site                          | env `NEXT_PUBLIC_SITE_URL` → `lib/site.ts`               |
| Textos, contatos, marcas, avaliações | `data/content.json`                                      |
| Horário de funcionamento             | `content.contact.info.hoursByDay` + `hoursLabels`        |
| Nota e resumo do Google              | `content.reviews` (`rating` numérico é a fonte)          |
| Logos de marca                       | `public/assets/brands/` + `content.brands.items[].image` |
| Cores de marca                       | `app/globals.css` (`@theme`)                             |
| Links da navegação                   | `content.header.nav`                                     |
| Altura do header / offset de âncora  | `--header-h` em `app/globals.css`                        |
| Container / largura máxima           | `.container` em `app/globals.css`                        |
| Telefone / WhatsApp                  | `content.contact.info.phone`                             |
