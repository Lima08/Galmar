# Project Structure

## Directory Tree

```
.
├── app/
│   ├── layout.tsx          # html/body, fonte, metadata/OG, JSON-LD
│   ├── page.tsx            # composição das seções
│   ├── robots.ts  sitemap.ts
│   ├── icon.png  apple-icon.png   # favicons (file convention)
│   └── globals.css         # Tailwind + CSS vars shadcn
├── components/
│   ├── header.tsx  hero.tsx  brands.tsx  about-us.tsx
│   ├── testimonials.tsx  contact.tsx  footer.tsx  whatsapp-button.tsx
│   ├── forms/contact-form.tsx
│   └── ui/button.tsx       # vendor shadcn
├── data/content.json       # toda a copy
├── lib/                    # utils.ts (cn), whatsapp.ts (+ .test.ts), site.ts
├── public/                 # logo-galmar.png, foto-galmar.jpg, assets/brands/*
├── .specs/codebase/        # este mapeamento
├── .github/workflows/ci.yml
├── AGENTS.md  CLAUDE.md    # índice para LLMs
└── next.config.mjs  tailwind.config.ts  eslint.config.mjs  components.json  tsconfig.json
```

## Where Things Live

| O quê                                 | Onde                                                     |
| ------------------------------------- | -------------------------------------------------------- |
| Ordem das seções                      | `app/page.tsx`                                           |
| Favicon                               | `app/icon.png`, `app/apple-icon.png`                     |
| SEO / metadata / JSON-LD              | `app/layout.tsx`                                         |
| URL do site                           | env `NEXT_PUBLIC_SITE_URL` → `lib/site.ts`               |
| Textos, contatos, marcas, depoimentos | `data/content.json`                                      |
| Logos de marca                        | `public/assets/brands/` + `content.brands.items[].image` |
| Cores de marca                        | `tailwind.config.ts`                                     |
| Links da navegação                    | `content.header.nav`                                     |
| Offset de scroll do header            | `app/layout.tsx` (`scroll-pt-[90px]` no `<html>`)        |
| Telefone / WhatsApp                   | `content.contact.info.phone`                             |
