import { Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function SearchForm() {
  return (
    <form className='relative w-full'>
      <Input
        type='search'
        placeholder='Buscar produtos...'
        className='w-full pl-9'
      />
      <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
      <Button
        type='submit'
        size='sm'
        className='absolute right-1 top-1/2 -translate-y-1/2 bg-secondary hover:bg-secondary-dark'>
        Buscar
      </Button>
    </form>
  )
}
