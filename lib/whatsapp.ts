const BRAZIL_DDI = '55'
const LOCAL_NUMBER_LENGTHS = [10, 11]

export function buildWhatsAppUrl(phone: string, message: string) {
  const digits = phone.replace(/\D/g, '').replace(/^0/, '')
  const number = LOCAL_NUMBER_LENGTHS.includes(digits.length)
    ? `${BRAZIL_DDI}${digits}`
    : digits
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}
