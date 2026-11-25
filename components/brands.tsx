import Image from 'next/image'
import Section from '@/components/section'
import content from '@/data/content.json'

export default function Brands() {
  return (
    <Section id='brands'>
      <div className='flex items-center justify-center mb-10 md:mb-12'>
        <div className='h-px w-16 md:w-24 lg:w-32 bg-secondary'></div>
        <h2 className='mx-4 text-h2 font-bold text-balance text-secondary text-center'>
          {content.brands.title}
        </h2>
        <div className='h-px w-16 md:w-24 lg:w-32 bg-secondary'></div>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12'>
        {content.brands.items.map((brand) => (
          <div key={brand.title} className='flex items-center justify-center'>
            <Image
              src={brand.image}
              alt={brand.title}
              width={160}
              height={80}
              className='max-h-16 md:max-h-20 w-auto object-contain'
            />
          </div>
        ))}
      </div>
    </Section>
  )
}
