'use client'

import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import content from '@/data/content.json'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

export function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const callWhatsApp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const text = `Olá, meu nome é ${name} (email: ${email}).\nMensagem: ${message}`
    window.open(buildWhatsAppUrl(content.contact.info.phone, text), '_blank')
  }

  return (
    <form className='mt-4 grid gap-4 text-foreground' onSubmit={callWhatsApp}>
      <div className='grid gap-2'>
        <label
          htmlFor='name'
          className='text-sm font-medium leading-none text-secondary-dark'>
          {content.contact.form.name}
        </label>
        <input
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='h-10 w-full min-w-0 rounded-md border border-input bg-background px-3 py-2 text-sm'
          placeholder={content.contact.form.namePlaceholder}
          required
        />
      </div>
      <div className='grid gap-2'>
        <label
          htmlFor='email'
          className='text-sm font-medium leading-none text-secondary-dark'>
          {content.contact.form.email}
        </label>
        <input
          id='email'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='h-10 w-full min-w-0 rounded-md border border-input bg-background px-3 py-2 text-sm'
          placeholder={content.contact.form.emailPlaceholder}
          required
        />
      </div>
      <div className='grid gap-2'>
        <label
          htmlFor='message'
          className='text-sm font-medium leading-none text-secondary-dark'>
          {content.contact.form.message}
        </label>
        <textarea
          id='message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className='min-h-[120px] w-full min-w-0 rounded-md border border-input bg-background px-3 py-2 text-sm'
          placeholder={content.contact.form.messagePlaceholder}
          required
        />
      </div>
      <Button
        type='submit'
        className='bg-secondary-dark hover:bg-secondary-dark/90'>
        {content.contact.form.button}
      </Button>
    </form>
  )
}
