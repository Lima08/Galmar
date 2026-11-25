# External Integrations

Sem backend, API, webhook ou job. Integrações são links de saída.

## WhatsApp

**Service:** `https://wa.me/55<ddd><numero>?text=<encoded>`
**Implementation:** `lib/whatsapp.ts` → `buildWhatsAppUrl(phone, message)` (remove não-dígitos e 0 de tronco; 10–11 dígitos → prefixa DDI 55)
**Usado por:** `components/whatsapp-button.tsx` (mensagem `content.contact.whatsappMessage`), `components/forms/contact-form.tsx` (nome/email/mensagem)
**Configuration:** `content.contact.info.phone` = `(19) 32121177` → `wa.me/551932121177`

## Redes sociais

`components/contact.tsx` + JSON-LD `sameAs`; URLs em `content.contact.social`.

## Google Fonts

`next/font/google` (Poppins), self-hosted no build.

## Env vars

| Var                    | Uso                                                     | Default                 |
| ---------------------- | ------------------------------------------------------- | ----------------------- |
| `NEXT_PUBLIC_SITE_URL` | `metadataBase`, canonical, OG, sitemap, robots, JSON-LD | `http://localhost:3000` |

Exemplo em `.env.example`.
