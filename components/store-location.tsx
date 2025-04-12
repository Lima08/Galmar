import Image from 'next/image'
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export default function StoreLocation() {
  const storeInfo = {
    address: 'Rua José Fabio Raphael',
    city: 'Campinas',
    state: 'SP',
    country: 'Brasil',
    phone: '(19) 9999-9999',
    hours: 'Segunda a Sexta: 9h às 18h | Sábado: 9h às 13h'
  }

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${storeInfo.address}, ${storeInfo.city}, ${storeInfo.state}, ${storeInfo.country}`
  )}`

  return (
    <section className='w-full py-10 md:py-12 lg:py-20'>
      <div className='container px-4 md:px-6'>
        <div className='flex flex-col items-center text-center mb-10 md:mb-16'>
          <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold text-blue-900 mb-4'>
            Nossa Localização
          </h2>
          <p className='text-gray-600 max-w-2xl mx-auto'>
            Visite nossa loja física e conheça todos os nossos produtos e
            serviços. Estamos em um local de fácil acesso.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-start'>
          <div className='lg:col-span-1 bg-white rounded-lg shadow-md p-6'>
            <h3 className='text-xl font-semibold text-blue-900 mb-6'>
              Informações de Contato
            </h3>

            <div className='space-y-4'>
              <div className='flex items-start'>
                <MapPin className='h-5 w-5 text-blue-900 mt-1 mr-3 flex-shrink-0' />
                <div>
                  <p className='font-medium'>Endereço:</p>
                  <p className='text-gray-600'>
                    {storeInfo.address}, {storeInfo.city}, {storeInfo.state},{' '}
                    {storeInfo.country}
                  </p>
                </div>
              </div>

              <div className='flex items-start'>
                <Phone className='h-5 w-5 text-blue-900 mt-1 mr-3 flex-shrink-0' />
                <div>
                  <p className='font-medium'>Telefone:</p>
                  <p className='text-gray-600'>{storeInfo.phone}</p>
                </div>
              </div>

              <div className='flex items-start'>
                <Clock className='h-5 w-5 text-blue-900 mt-1 mr-3 flex-shrink-0' />
                <div>
                  <p className='font-medium'>Horário de Funcionamento:</p>
                  <p className='text-gray-600'>{storeInfo.hours}</p>
                </div>
              </div>
            </div>

            <div className='mt-8'>
              <Link
                href={googleMapsUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-900 text-white hover:bg-blue-800 transition-colors w-full justify-center'>
                Ver no Google Maps
                <ExternalLink className='h-4 w-4' />
              </Link>
            </div>
          </div>

          <div className='lg:col-span-2 rounded-lg overflow-hidden shadow-md'>
            <div className='relative aspect-[16/9] w-full'>
              <Image
                src='/placeholder.svg?height=500&width=800'
                alt={`Localização da loja em ${storeInfo.address}, ${storeInfo.city}`}
                fill
                className='object-cover'
              />

              <div className='absolute inset-0 flex flex-col items-center justify-center bg-black/30 text-white'>
                <MapPin className='h-12 w-12 mb-2' />
                <p className='font-semibold text-lg mb-4'>
                  Rua José Fabio Raphael, Campinas, SP
                </p>
                <Link
                  href={googleMapsUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='px-6 py-3 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors flex items-center gap-2'>
                  Ver no Google Maps
                  <ExternalLink className='h-4 w-4' />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
