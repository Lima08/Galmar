interface Address {
  street: string
  city: string
  state: string
  postalCode: string
}

export const formatAddress = (
  { street, city, state, postalCode }: Address,
  { withPostalCode = true } = {}
) => {
  const base = `${street}, ${city} – ${state}`
  return withPostalCode ? `${base}, ${postalCode}` : base
}
