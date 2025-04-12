import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import content from '@/data/content.json'

export default function Hero() {
  return (
    <section className='min-h-screen flex items-center w-full bg-secondary-bg'>
      <div className='container px-4 md:px-8'>
        <div className='grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2'>
          <div className='flex flex-col justify-center space-y-4'>
            <div className='space-y-2'>
              <h1 className='text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl'>
                {content.hero.title}
              </h1>
              <p className='max-w-[600px] text-muted-foreground md:text-xl py12'>
                {content.hero.description}
              </p>
            </div>
            <div className='flex flex-col gap-2 min-[400px]:flex-row'>
              <Button
                size='lg'
                className='bg-secondary hover:bg-secondary-dark k'>
                <a href='#brands'>{content.hero.ctaBrands}</a>
                <ChevronRight className='ml-2 h-4 w-4' />
              </Button>
              <Button asChild size='lg' variant='outline'>
                <a href='#contact'>{content.hero.ctaContact}</a>
              </Button>
            </div>
          </div>
          <div className='flex items-center justify-center'>
            <Image
              src='/foto-galmar.jpg'
              width={500}
              height={400}
              alt='Produtos de limpeza Galmar'
              className='rounded-lg object-cover shadow-lg'
            />
          </div>
        </div>
      </div>
    </section>
  )
}
