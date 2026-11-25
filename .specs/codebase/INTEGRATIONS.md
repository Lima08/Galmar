# External Integrations

Sem backend, API, webhook ou job. Integrações são links de saída.

## WhatsApp

**Service:** `https://wa.me/55<ddd><numero>?text=<encoded>`
**Implementation:** `lib/whatsapp.ts` → `buildWhatsAppUrl(phone, message)` (remove não-dígitos e 0 de tronco; 10–11 dígitos → prefixa DDI 55)
**Usado por:** `components/hero.tsx` (atalhos `whatsappMessages.business` / `.home`), `components/whatsapp-button.tsx` (`whatsappMessages.default`), `components/forms/contact-form.tsx` (nome/email/mensagem)
**Configuration:** `content.contact.info.phone` = `(19) 3212-1177` (telefone e WhatsApp, mesmo número) → `wa.me/551932121177`; mensagens em `content.contact.whatsappMessages`

## Google Maps

**Service:** `https://www.google.com/maps/search/?api=1&query=<nome, endereço>` (sem chave de API)
**Implementation:** `lib/maps.ts` → `buildMapsSearchUrl(name, address)`; endereço via `lib/address.ts` → `formatAddress`
**Usado por:** `components/testimonials.tsx` (link "Ver avaliações no Google"); F6 reutiliza para "Como chegar"

## Redes sociais

`components/contact.tsx` + JSON-LD `sameAs`; rótulo + URL em `content.contact.social.{rede}.{label,url}`.

## Google Fonts

`next/font/google` (Poppins), self-hosted no build.

## Env vars

| Var                    | Uso                                                     | Default                 |
| ---------------------- | ------------------------------------------------------- | ----------------------- |
| `NEXT_PUBLIC_SITE_URL` | `metadataBase`, canonical, OG, sitemap, robots, JSON-LD | `http://localhost:3000` |

Exemplo em `.env.example`.
