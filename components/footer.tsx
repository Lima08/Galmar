import content from '@/data/content.json'

export default function Footer() {
  return (
    <footer className='w-full border-t bg-white py-6'>
      <div className='container flex flex-col items-center justify-between gap-4 md:flex-row px-4 md:px-6'>
        <p className='text-center text-sm text-muted-foreground md:text-left'>
          {content.footer.text}
        </p>
      </div>
    </footer>
  )
}
