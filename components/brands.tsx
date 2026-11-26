import Image from 'next/image'
import Section from '@/components/section'
import content from '@/data/content.json'

const { badge, title, items } = content.brands

const Logo = ({
  brand,
  decorative = false
}: {
  brand: (typeof items)[number]
  decorative?: boolean
}) => (
  <li className='flex shrink-0 items-center justify-center px-6 md:px-10'>
    <Image
      src={brand.image}
      alt={decorative ? '' : brand.title}
      width={160}
      height={80}
      className='h-12 w-auto object-contain md:h-16'
    />
  </li>
)

export default function Brands() {
  return (
    <Section id='brands' tone='white' pattern>
      <div className='mb-10 flex flex-col items-center gap-4 text-center md:mb-12'>
        <div className='inline-block rounded-lg bg-secondary-bg px-3 py-1 text-sm text-secondary-dark'>
          {badge}
        </div>
        <h2 className='text-h2 font-bold text-balance text-secondary'>
          {title}
        </h2>
      </div>

      <ul className='brands-grid grid grid-cols-2 gap-8 md:grid-cols-4'>
        {items.map((brand) => (
          <Logo key={brand.title} brand={brand} />
        ))}
      </ul>

      <div
        className='brands-marquee overflow-hidden'
        role='region'
        aria-label={title}>
        <ul className='animate-marquee flex w-max items-center'>
          {items.map((brand) => (
            <Logo key={`${brand.title}-a`} brand={brand} />
          ))}
          {items.map((brand) => (
            <Logo key={`${brand.title}-b`} brand={brand} decorative />
          ))}
        </ul>
      </div>
    </Section>
  )
}
