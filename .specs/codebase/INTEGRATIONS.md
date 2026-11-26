# External Integrations

Sem backend, API, webhook ou job. Integrações são links de saída.

## WhatsApp

**Service:** `https://wa.me/55<ddd><numero>?text=<encoded>`
**Implementation:** `lib/whatsapp.ts` → `buildWhatsAppUrl(phone, message)`; número normalizado por `lib/phone.ts` (`toInternationalDigits`), também usado no `tel:` (remove não-dígitos e 0 de tronco; 10–11 dígitos → prefixa DDI 55)
**Usado por:** `components/hero.tsx` (atalhos `whatsappMessages.business` / `.home`), `components/contact-bar.tsx`, `components/header.tsx`, `components/whatsapp-button.tsx` e `components/contact.tsx` (`whatsappMessages.default` via `lib/contact.ts`)
**Configuration:** `content.contact.info.phone` = `(19) 3212-1177` (telefone e WhatsApp, mesmo número) → `wa.me/551932121177`; mensagens em `content.contact.whatsappMessages`

## Google Maps

**Service:** busca `https://www.google.com/maps/search/?api=1&query=<nome, endereço>`; embed `https://www.google.com/maps?q=<nome, endereço>&output=embed` (sem chave de API)
**Implementation:** `lib/maps.ts` → `buildMapsSearchUrl`, `buildMapsEmbedUrl`; endereço via `lib/address.ts` → `formatAddress`
**Usado por:** `components/testimonials.tsx` (link "Ver avaliações no Google"); `components/contact.tsx` ("Como chegar" + iframe lazy)

## Redes sociais

`components/contact.tsx` + `contact-bar.tsx` + JSON-LD `sameAs`; rótulo + URL em `content.contact.social.{rede}.{label,url}` (Facebook `galmarlimpeza`, Instagram `galmarlimpeza`).

## Google Fonts

`next/font/google` (Poppins), self-hosted no build.

## Google Analytics 4

**Service:** gtag.js (client-side)
**Implementation:** `lib/analytics.ts` + `components/analytics.tsx` + `components/cookie-banner.tsx`
**Configuration:** `NEXT_PUBLIC_GA_ID` (vazio = sem script/banner). Eventos: `click_whatsapp`, `click_phone`, `click_directions` com `location` (+ `audience` no hero).
**Consent:** só carrega após Aceitar (LGPD); escolha em `localStorage`.

## Env vars

| Var                    | Uso                                                          | Default                 |
| ---------------------- | ------------------------------------------------------------ | ----------------------- |
| `NEXT_PUBLIC_SITE_URL` | `metadataBase`, canonical, OG, sitemap, robots, JSON-LD      | `http://localhost:3000` |
| `NEXT_PUBLIC_GA_ID`    | GA4; vazio = no-op                                           | _(vazio)_               |
| `NEXT_PUBLIC_NOINDEX`  | `true` força noindex; preview Vercel também via `VERCEL_ENV` | _(omitido)_             |

Exemplo em `.env.example`.
