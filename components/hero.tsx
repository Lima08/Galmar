import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import content from '@/data/content.json'

export default function Hero() {
  return (
    <section
      className='w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-teal-50 to-teal-100'>
      <div className='container px-4 md:px-6'>
        <div className='grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2'>
          <div className='flex flex-col justify-center space-y-4'>
            <div className='space-y-2'>
              <h1 className='text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl'>
                {content.hero.title}
              </h1>
              <p className='max-w-[600px] text-muted-foreground md:text-xl'>
                {content.hero.description}
              </p>
            </div>
            <div className='flex flex-col gap-2 min-[400px]:flex-row'>
              <Button size='lg' className='bg-teal-600 hover:bg-teal-700'>
                {content.hero.ctaBrands}
                <ChevronRight className='ml-2 h-4 w-4' />
              </Button>
              <Button size='lg' variant='outline'>
                {content.hero.ctaContact}
              </Button>
            </div>
          </div>
          <div className='flex items-center justify-center'>
            <Image
              src='/placeholder.svg?height=550&width=550'
              width={550}
              height={550}
              alt='Produtos de limpeza Galmar'
              className='rounded-lg object-cover'
            />
          </div>
        </div>
      </div>
    </section>
  )
}
