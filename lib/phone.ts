const BRAZIL_DDI = '55'
const LOCAL_NUMBER_LENGTHS = [10, 11]

// '(19) 3212-1177' | '019 3212-1177' | '+55 19 3212-1177' → '551932121177'
export const toInternationalDigits = (phone: string) => {
  const digits = phone.replace(/\D/g, '').replace(/^0/, '')
  return LOCAL_NUMBER_LENGTHS.includes(digits.length)
    ? `${BRAZIL_DDI}${digits}`
    : digits
}
