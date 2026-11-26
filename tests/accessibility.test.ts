import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import content from '../data/content.json'
import { ROOT, readSource } from './source-files'

describe('pular para o conteúdo (LR-12)', () => {
  it('primeiro elemento do body é o link de pular, visível ao receber foco', () => {
    const layout = readSource('app/layout.tsx')
    const body = layout.slice(layout.indexOf('<body'))
    const firstTag = body.match(/<body[^>]*>\s*(<[^\s>]+)/)?.[1]
    expect(firstTag).toBe('<a')
    expect(body).toContain("href='#conteudo'")
    expect(body).toMatch(/sr-only[^']*focus:not-sr-only/)
    expect(body).toContain('{content.a11y.skipToContent}')
    expect(content.a11y.skipToContent).toBe('Pular para o conteúdo')
  })

  it.each(['app/page.tsx', 'app/privacidade/page.tsx', 'app/not-found.tsx'])(
    '%s tem <main id="conteudo">',
    (path) => {
      expect(readSource(path)).toMatch(/<main[^>]*id='conteudo'/)
    }
  )
})

describe('página 404 própria em pt-BR (LR-11)', () => {
  it('usa textos do content.json, link para o início e CTA de WhatsApp', () => {
    const page = readSource('app/not-found.tsx')
    expect(page).toContain('content.notFound.title')
    expect(page).toContain('content.notFound.message')
    expect(page).toContain("href='/'")
    expect(page).toContain('defaultWhatsAppUrl')
    expect(content.notFound.title).toBe('Página não encontrada')
  })

  it('o export gera out/404.html sem o texto padrão em inglês', () => {
    const page = join(ROOT, 'out/404.html')
    if (!existsSync(page)) return
    const html = readFileSync(page, 'utf8')
    expect(html).not.toContain('This page could not be found')
    expect(html).toContain(content.notFound.title)
  })
})
