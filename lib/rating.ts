const ratingFormat = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1
})

// 5 → '5,0' (nota do Google em pt-BR)
export const formatRating = (rating: number) => ratingFormat.format(rating)
