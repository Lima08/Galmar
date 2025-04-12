'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import content from '@/data/content.json'

export function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const callWhatsApp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const phone = content.contact.info.phone.replace(/\D/g, '')
    const text = `Olá, meu nome é ${name} (email: ${email}).\nMensagem: ${message}`
    const encodedText = encodeURIComponent(text)
    window.open(`https://wa.me/${phone}?text=${encodedText}`, '_blank')
  }

  return (
    <form className='mt-4 grid gap-4 text-black' onSubmit={callWhatsApp}>
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
          className='h-10 rounded-md border border-input bg-background px-3 py-2 text-sm'
          placeholder='Seu nome completo'
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
          className='h-10 rounded-md border border-input bg-background px-3 py-2 text-sm'
          placeholder='Seu e-mail'
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
          className='min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm'
          placeholder='Digite sua mensagem'
        />
      </div>
      <Button type='submit' className='bg-secondary hover:bg-secondary-dark'>
        {content.contact.form.button}
      </Button>
    </form>
  )
}
