import content from '../data/content.json'
import { formatShortHours } from './hours'
import { toInternationalDigits } from './phone'
import { buildWhatsAppUrl } from './whatsapp'

// Links de contato derivados do content.json, compartilhados entre faixa, header e botão flutuante
const { info, whatsappMessages } = content.contact

export const defaultWhatsAppUrl = buildWhatsAppUrl(
  info.phone,
  whatsappMessages.default
)
export const phoneHref = `tel:+${toInternationalDigits(info.phone)}`
export const shortHours = formatShortHours(
  info.hoursByDay,
  info.hoursLabels.separator
)
