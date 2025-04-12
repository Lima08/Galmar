import content from '@/data/content.json'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function Brands() {
  return (
    <section id='marcas' className='w-full py-12 md:py-24 lg:py-32 bg-gray-50'>
      <div className='container px-4 md:px-6'>
        <div className='flex flex-col items-center justify-center space-y-4 text-center'>
          <div className='space-y-2'>
            <div className='inline-block rounded-lg bg-teal-100 px-3 py-1 text-sm text-teal-700'>
              {content.marcas.badge}
            </div>
            <h2 className='text-3xl font-bold tracking-tighter md:text-4xl'>
              {content.marcas.title}
            </h2>
            <p className='max-w-[900px] text-muted-foreground md:text-xl'>
              {content.marcas.description}
            </p>
          </div>
        </div>
        <div className='mx-auto grid max-w-6xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3'>
          {content.marcas.items.map((brand, index) => (
            <div
              key={index}
              className='group relative overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md'>
              <div className='aspect-square overflow-hidden flex items-center justify-center p-4'>
                <Image
                  src={brand.logo}
                  alt={brand.title}
                  width={300}
                  height={300}
                  className='object-contain transition-transform group-hover:scale-105'
                />
              </div>
              <div className='p-6'>
                <h3 className='text-xl font-bold'>{brand.title}</h3>
                <p className='text-muted-foreground'>{brand.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className='flex justify-center'>
          <Button size='lg' className='bg-teal-600 hover:bg-teal-700'>
            {content.marcas.button}
          </Button>
        </div>
      </div>
    </section>
  )
}
