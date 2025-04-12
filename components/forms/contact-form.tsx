import { Button } from '@/components/ui/button'
import content from '@/data/content.json'

export function ContactForm() {
  return (
    <form className='mt-4 grid gap-4'>
      <div className='grid gap-2'>
        <label htmlFor='name' className='text-sm font-medium leading-none'>
          {content.contato.form.name}
        </label>
        <input
          id='name'
          className='h-10 rounded-md border border-input bg-background px-3 py-2 text-sm'
          placeholder='Seu nome completo'
        />
      </div>
      <div className='grid gap-2'>
        <label htmlFor='email' className='text-sm font-medium leading-none'>
          {content.contato.form.email}
        </label>
        <input
          id='email'
          type='email'
          className='h-10 rounded-md border border-input bg-background px-3 py-2 text-sm'
          placeholder='Seu e-mail'
        />
      </div>
      <div className='grid gap-2'>
        <label htmlFor='phone' className='text-sm font-medium leading-none'>
          {content.contato.form.phone}
        </label>
        <input
          id='phone'
          type='tel'
          className='h-10 rounded-md border border-input bg-background px-3 py-2 text-sm'
          placeholder='(00) 00000-0000'
        />
      </div>
      <div className='grid gap-2'>
        <label htmlFor='message' className='text-sm font-medium leading-none'>
          {content.contato.form.message}
        </label>
        <textarea
          id='message'
          className='min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm'
          placeholder='Digite sua mensagem'
        />
      </div>
      <Button className='bg-teal-600 hover:bg-teal-700'>
        {content.contato.form.button}
      </Button>
    </form>
  )
}
