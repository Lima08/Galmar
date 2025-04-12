import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function StoreGallery() {
  const galleryImages = [
    {
      id: 1,
      src: '/placeholder.svg?height=400&width=600',
      alt: 'Interior da loja',
      caption: 'Nossa loja principal'
    },
    {
      id: 2,
      src: '/placeholder.svg?height=400&width=600',
      alt: 'Produtos em exposição',
      caption: 'Produtos em destaque'
    },
    {
      id: 3,
      src: '/placeholder.svg?height=400&width=600',
      alt: 'Atendimento ao cliente',
      caption: 'Atendimento personalizado'
    },
    {
      id: 4,
      src: '/placeholder.svg?height=400&width=600',
      alt: 'Fachada da loja',
      caption: 'Fachada moderna'
    },
    {
      id: 5,
      src: '/placeholder.svg?height=400&width=600',
      alt: 'Área de demonstração',
      caption: 'Área de demonstração'
    },
    {
      id: 6,
      src: '/placeholder.svg?height=400&width=600',
      alt: 'Equipe de vendas',
      caption: 'Nossa equipe'
    }
  ]

  return (
    <section className='w-full py-10 md:py-12 lg:py-20 bg-gray-50'>
      <div className='container px-4 md:px-6'>
        <div className='flex flex-col items-center text-center mb-10 md:mb-16'>
          <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold text-blue-900 mb-4'>
            Conheça Nossa Loja
          </h2>
          <p className='text-gray-600 max-w-2xl mx-auto'>
            Um ambiente moderno e acolhedor para você encontrar os melhores
            produtos e soluções para suas necessidades.
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className='group relative overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl'>
              <div className='aspect-[4/3] w-full relative'>
                <Image
                  src={image.src || '/placeholder.svg'}
                  alt={image.alt}
                  fill
                  className='object-cover transition-transform duration-500 group-hover:scale-105'
                />
              </div>
              <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                <div className='absolute bottom-0 left-0 right-0 p-4 text-white'>
                  <p className='font-medium'>{image.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='flex justify-center mt-10'>
          <Link
            href='#'
            className='inline-flex items-center gap-2 px-6 py-3 rounded-md bg-blue-900 text-white hover:bg-blue-800 transition-colors'>
            Visite nossa loja
            <ArrowRight className='h-4 w-4' />
          </Link>
        </div>
      </div>
    </section>
  )
}
