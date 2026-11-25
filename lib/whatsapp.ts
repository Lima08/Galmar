import { toInternationalDigits } from './phone'

export const buildWhatsAppUrl = (phone: string, message: string) =>
  `https://wa.me/${toInternationalDigits(phone)}?text=${encodeURIComponent(message)}`
