import { ExternalLink, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Section from '@/components/section'
import content from '@/data/content.json'
import { formatAddress } from '@/lib/address'
import { formatRating } from '@/lib/rating'
import { buildMapsSearchUrl } from '@/lib/maps'
import { cn } from '@/lib/utils'

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
const ratingLabel = formatRating(rating)
const items: Review[] = content.reviews.items

const CTA =
  'min-h-11 border-2 border-primary bg-white px-6 text-base text-primary hover:border-primary-dark hover:bg-white hover:text-primary-dark focus-visible:border-primary-dark focus-visible:text-primary-dark focus-visible:ring-primary-dark'

const Stars = ({ count }: { count: number }) => (
  <div className='flex items-center gap-1 text-rating' aria-hidden>
    {Array.from({ length: count }, (_, i) => (
      <Star key={i} className='h-5 w-5 fill-current' />
    ))}
  </div>
)

export default function Testimonials() {
  return (
    <Section id='testimonials' tone='tint'>
      <div className='flex flex-col items-center gap-4 text-center'>
        <div className='inline-block rounded-lg bg-white px-3 py-1 text-sm text-secondary-dark'>
          {badge}
        </div>
        <h2 className='text-h2 font-bold text-balance text-secondary'>
          {title}
        </h2>
        <div className='flex items-center gap-3'>
          <span className='text-h2 font-bold text-secondary'>
            {ratingLabel}
          </span>
          <Stars count={Math.round(rating)} />
        </div>
        <p className='max-w-prose text-muted-foreground md:text-xl'>
          {summary}
        </p>
        <Button asChild variant='outline' className={cn(CTA)}>
          <a href={googleUrl} target='_blank' rel='noopener noreferrer'>
            {link}
            <ExternalLink className='h-4 w-4' aria-hidden />
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
