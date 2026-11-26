import Image from 'next/image'
import Link from 'next/link'
import content from '@/data/content.json'

// Header das páginas internas (privacidade, 404): logo + voltar ao início
export default function SimpleHeader() {
  return (
    <header className='border-b bg-white'>
      <div className='container flex h-(--header-h) items-center justify-between gap-4'>
        <Link href='/'>
          <Image
            src='/brand/logo-horizontal.png'
            alt={content.header.brand}
            width={594}
            height={180}
            className='h-11 w-auto md:h-12'
            loading='eager'
          />
        </Link>
        <Link
          href='/'
          className='inline-flex min-h-11 items-center font-medium text-secondary-dark underline-offset-2 hover:underline'>
          {content.privacy.back}
        </Link>
      </div>
    </header>
  )
}
