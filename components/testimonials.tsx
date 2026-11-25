import { ExternalLink, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Section from '@/components/section'
import content from '@/data/content.json'
import { formatAddress } from '@/lib/address'
import { buildMapsSearchUrl } from '@/lib/maps'

interface Review {
  author: string
  rating: number
  text: string
}

const googleUrl = buildMapsSearchUrl(
  content.header.brand,
  formatAddress(content.contact.info.address, { withPostalCode: false })
)
const { badge, title, rating, summary, link } = content.reviews
const ratingLabel = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 1
}).format(rating)
const items: Review[] = content.reviews.items

const Stars = ({ count }: { count: number }) => (
  <div className='flex items-center gap-1 text-rating'>
    {Array.from({ length: count }, (_, i) => (
      <Star key={i} className='h-4 w-4 fill-current' />
    ))}
  </div>
)

export default function Testimonials() {
  return (
    <Section id='testimonials'>
      <div className='flex flex-col items-center justify-center space-y-4 text-center'>
        <div className='inline-block rounded-lg bg-secondary-bg px-3 py-1 text-sm text-secondary-dark'>
          {badge}
        </div>
        <h2 className='text-h2 font-bold text-balance text-secondary'>
          {title}
        </h2>
        <div className='flex items-center gap-2'>
          <span className='text-h3 font-bold'>{ratingLabel}</span>
          <Stars count={Math.round(rating)} />
        </div>
        <p className='max-w-prose text-muted-foreground md:text-xl'>
          {summary}
        </p>
        <Button asChild variant='outline'>
          <a href={googleUrl} target='_blank' rel='noopener noreferrer'>
            {link}
            <ExternalLink className='ml-2 h-4 w-4' />
          </a>
        </Button>
      </div>
      {items.length > 0 && (
        <div className='grid grid-cols-1 gap-6 pt-12 md:grid-cols-2 lg:grid-cols-3'>
          {items.map((review) => (
            <figure
              key={review.author}
              className='flex flex-col gap-4 rounded-lg border bg-white p-6 shadow-xs'>
              <Stars count={review.rating} />
              <blockquote>{review.text}</blockquote>
              <figcaption className='font-medium'>{review.author}</figcaption>
            </figure>
          ))}
        </div>
      )}
    </Section>
  )
}
