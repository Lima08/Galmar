import content from '@/data/content.json'
import Image from 'next/image'

export default function Brands() {
  return (
    <section id='brands' className='w-full py-10 md:py-12 lg:py-20'>
      <div className='container px-4 md:px-6'>
        <div className='flex items-center justify-center mb-10 md:mb-12'>
          <div className='h-px w-16 md:w-24 lg:w-32 bg-secondary'></div>
          <h2 className='mx-4 text-xl md:text-2xl lg:text-3xl font-bold text-secondary-dark text-center'>
            {content.brands.title}
          </h2>
          <div className='h-px w-16 md:w-24 lg:w-32 bg-secondary-dark'></div>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12'>
          {content.brands.items.map((brand) => (
            <div key={brand.title} className='flex items-center justify-center'>
              <Image
                src={brand.image || '/placeholder.svg'}
                alt={`Logo ${brand.title}`}
                width={160}
                height={80}
                className='max-h-16 md:max-h-20 w-auto object-contain'
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
