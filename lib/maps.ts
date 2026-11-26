const mapsQuery = (name: string, address: string) =>
  encodeURIComponent(`${name}, ${address}`)

export const buildMapsSearchUrl = (name: string, address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${mapsQuery(name, address)}`

// Embed sem chave (AD-014 #3): maps?q=…&output=embed
export const buildMapsEmbedUrl = (name: string, address: string) =>
  `https://www.google.com/maps?q=${mapsQuery(name, address)}&output=embed`
