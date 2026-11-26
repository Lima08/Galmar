import ts from 'typescript'
import { describe, expect, it } from 'vitest'
import content from '../data/content.json'
import { readSource, sourceFiles } from './source-files'

// Afirmações não confirmadas pelo cliente (CT-01)
const FORBIDDEN_CLAIMS = [
  /\b2005\b/,
  /ecológic/,
  /biodegradáv/,
  /entrega rápida/,
  /entregamos/,
  /rigorosos testes/,
  /99,9%/,
  /alta qualidade/,
  /mesma loja/,
  /mesmo endereço/
]

const FICTITIOUS_NAMES = ['maria silva', 'joão oliveira', 'ana santos']

// Chaves que guardam dado técnico, não copy (URL, caminho, CEP)
const NON_COPY_KEYS = new Set(['url', 'image', 'src', 'postalCode', 'id'])

const copyValues = (node: unknown, key = ''): string[] => {
  if (typeof node === 'string') return NON_COPY_KEYS.has(key) ? [] : [node]
  if (Array.isArray(node)) return node.flatMap((item) => copyValues(item))
  if (node && typeof node === 'object')
    return Object.entries(node).flatMap(([k, v]) => copyValues(v, k))
  return []
}

const copy = copyValues(content).join('\n').toLowerCase()

interface Review {
  author: string
  rating: number
  text: string
}

const reviewErrors = (items: Review[]) => {
  const authors = items.map((item) => item.author)
  return [
    ...items.flatMap((item, i) => [
      ...(item.author ? [] : [`items[${i}].author vazio`]),
      ...(item.text ? [] : [`items[${i}].text vazio`]),
      ...(Number.isInteger(item.rating) && item.rating >= 1 && item.rating <= 5
        ? []
        : [`items[${i}].rating fora de 1–5 inteiro`])
    ]),
    ...(new Set(authors).size === authors.length ? [] : ['author repetido'])
  ]
}

describe('conteúdo verdadeiro (CT-01, CT-02)', () => {
  it.each(FORBIDDEN_CLAIMS)('não afirma %s', (claim) => {
    expect(copy).not.toMatch(claim)
  })

  it('não confunde dado técnico com afirmação (ex.: 2005 numa URL)', () => {
    const sample = copyValues({ url: 'https://x.com/2005', text: 'Desde 1996' })
    expect(sample.join(' ')).not.toMatch(FORBIDDEN_CLAIMS[0])
  })

  it.each(FICTITIOUS_NAMES)('não publica depoimento fictício de %s', (name) => {
    expect(copy).not.toContain(name)
  })

  it('hero com a proposta aprovada', () => {
    expect(content.hero.title, 'hero.title').toBe(
      'Produtos de limpeza e descartáveis em Campinas desde 1996'
    )
    expect(content.hero.description, 'hero.description').toMatch(
      /casa.*empresa/
    )
    expect(content.hero.description, 'hero.description').toMatch(/WhatsApp/)
    expect(content.hero.description, 'hero.description').toMatch(
      /retire na loja/
    )
  })

  it('exatamente três diferenciais confirmados', () => {
    expect(
      content.features.map((f) => f.title),
      'features[].title'
    ).toEqual(['Desde 1996', 'Varejo e atacado', 'Atendimento pelo WhatsApp'])
  })

  it('título da aba vem do content.json', () => {
    expect(content.meta.title, 'meta.title').toBeTruthy()
  })
})

describe('contato oficial (CT-03, CT-04)', () => {
  const { info, social } = content.contact

  it('telefone e WhatsApp oficiais', () => {
    expect(info.phone, 'contact.info.phone').toBe('(19) 3212-1177')
    expect(info.phone.replace(/\D/g, ''), 'contact.info.phone').toMatch(
      /^\d{10,11}$/
    )
  })

  it('endereço do Perfil da Empresa no Google', () => {
    expect(info.address, 'contact.info.address').toEqual({
      street: 'Av. Jorge Tibiriçá, 1747 – Jardim Santa Eudoxia',
      city: 'Campinas',
      state: 'SP',
      postalCode: '13044-125'
    })
    expect(info.address.postalCode, 'contact.info.address.postalCode').toMatch(
      /^\d{5}-\d{3}$/
    )
  })

  it('horário estruturado por dia, igual ao Google', () => {
    expect(info.hoursByDay, 'contact.info.hoursByDay').toEqual([
      {
        days: 'Segunda a sexta',
        daysShort: 'Seg–Sex',
        opens: '09:00',
        closes: '18:00'
      },
      { days: 'Sábado', daysShort: 'Sáb', opens: '09:00', closes: '13:00' },
      { days: 'Domingo', closed: true }
    ])
    info.hoursByDay
      .flatMap((row) => ('opens' in row ? [row.opens, row.closes] : []))
      .forEach((time) =>
        expect(time, 'contact.info.hoursByDay[].opens/closes').toMatch(
          /^([01]\d|2[0-3]):[0-5]\d$/
        )
      )
  })

  it('rótulos do horário no content.json', () => {
    expect(info.hoursLabels, 'contact.info.hoursLabels').toEqual({
      to: 'às',
      closed: 'fechado',
      separator: ' · '
    })
  })

  it('redes sociais com rótulo e https', () => {
    Object.entries(social).forEach(([network, { label, url }]) => {
      expect(label, `contact.social.${network}.label`).toBeTruthy()
      expect(url, `contact.social.${network}.url`).toMatch(/^https:\/\//)
    })
    expect(social.facebook.url).toBe('https://www.facebook.com/galmarlimpeza')
    expect(social.instagram.url).toBe(
      'https://www.instagram.com/galmarlimpeza/'
    )
  })
})

describe('atalhos de WhatsApp (CT-05)', () => {
  it.each(['default', 'home', 'business'] as const)(
    'mensagem pronta "%s" começa com "Olá! Vim pelo site"',
    (key) => {
      expect(
        content.contact.whatsappMessages[key],
        `contact.whatsappMessages.${key}`
      ).toMatch(/^Olá! Vim pelo site/)
    }
  )

  it('rótulos da faixa de contato e do CTA do header (HC-01, HC-03)', () => {
    expect(content.contactBar, 'contactBar').toEqual({
      whatsapp: 'WhatsApp',
      call: 'Ligar'
    })
    expect(content.header.cta, 'header.cta').toBe('Chamar no WhatsApp')
  })

  it('rótulos dos atalhos do hero', () => {
    expect(content.hero.ctaBusiness, 'hero.ctaBusiness').toBe(
      'Para sua empresa'
    )
    expect(content.hero.ctaHome, 'hero.ctaHome').toBe('Para sua casa')
  })
})

describe('avaliações do Google (CT-06)', () => {
  const { reviews } = content

  it('nota numérica é a única fonte da nota exibida', () => {
    expect(reviews.rating, 'reviews.rating').toBe(5)
    const shown = reviews.rating.toFixed(1).replace('.', ',')
    expect(reviews.title, 'reviews.title').toContain(shown)
  })

  it('resumo verificável sem número exato que envelheça', () => {
    expect(reviews.summary, 'reviews.summary').toMatch(/41 avaliações/i)
    expect(reviews.link, 'reviews.link').toBeTruthy()
  })

  it('itens copiados do Google são válidos', () => {
    expect(reviewErrors(reviews.items as Review[])).toEqual([])
  })

  it('validador de itens recusa dado inválido', () => {
    expect(
      reviewErrors([
        { author: 'Ana P.', rating: 4.5, text: 'Ótimo' },
        { author: 'Ana P.', rating: 5, text: '' }
      ])
    ).toEqual([
      'items[0].rating fora de 1–5 inteiro',
      'items[1].text vazio',
      'author repetido'
    ])
  })

  it('menu chama a seção de "Avaliações"', () => {
    const nav = content.header.nav.find((item) => item.id === 'testimonials')
    expect(nav?.name, 'header.nav[testimonials].name').toBe('Avaliações')
  })
})

describe('estrutura (CT-08)', () => {
  const tsx = sourceFiles
    .filter((file) => file.endsWith('.tsx'))
    .map(readSource)
    .join('\n')

  it.each(content.header.nav.map((item) => item.id))(
    'item de menu "#%s" aponta para um id existente',
    (id) => {
      expect(tsx).toMatch(new RegExp(`(?<![-\\w])id=\\{?['"\`]${id}['"\`]`))
    }
  )
})

const COPY_PROPS = new Set(['alt', 'aria-label', 'title', 'placeholder'])
const HAS_LETTER = /\p{L}/u

// Literal com letra: 'x', `x`, ou template com texto fixo (`Logo ${a}`)
const isLiteralCopy = (node: ts.Node | undefined): boolean => {
  if (!node) return false
  if (ts.isJsxExpression(node)) return isLiteralCopy(node.expression)
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node))
    return HAS_LETTER.test(node.text)
  if (ts.isTemplateExpression(node))
    return [
      node.head.text,
      ...node.templateSpans.map((s) => s.literal.text)
    ].some((part) => HAS_LETTER.test(part))
  return false
}

const nameOf = (name: ts.Node) =>
  ts.isIdentifier(name) || ts.isStringLiteral(name) ? name.text : ''

// Copy literal no código: texto entre tags JSX e alt/aria-label/title/placeholder
const literalHits = (source: string) => {
  const file = ts.createSourceFile(
    'x.tsx',
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX
  )
  const hits: string[] = []
  const visit = (node: ts.Node) => {
    if (ts.isJsxText(node) && HAS_LETTER.test(node.text))
      hits.push(node.text.trim())
    const named =
      ts.isJsxAttribute(node) ||
      ts.isPropertyAssignment(node) ||
      ts.isVariableDeclaration(node)
    if (
      named &&
      COPY_PROPS.has(nameOf(node.name)) &&
      isLiteralCopy(node.initializer)
    )
      hits.push(node.getText(file))
    ts.forEachChild(node, visit)
  }
  visit(file)
  return hits
}

describe('copy só no content.json (CT-07)', () => {
  it.each([
    '<p>Olá</p>',
    '<p>{count} produtos</p>',
    '<p>Ligue (19) 3212-1177</p>',
    '<p>Preço = justo</p>',
    '<p>Olá&nbsp;mundo</p>',
    "<img alt='Logo' />",
    "<button aria-label={'Abrir menu'} />",
    "images: [{ url: x, alt: 'Foto' }]",
    "const title = 'Galmar'"
  ])('detecta copy literal em %s', (sample) => {
    expect(literalHits(sample)).not.toEqual([])
  })

  it.each([
    '<p>{content.hero.title}</p>',
    'items.map((item) => (\n  <li key={item.id}>{item.name}</li>\n))',
    "<span className='sr-only'>{label}</span>",
    "data-title='x'"
  ])('ignora composição só com dados em %s', (sample) => {
    expect(literalHits(sample)).toEqual([])
  })

  it.each(sourceFiles.filter((file) => file.endsWith('.tsx')))(
    '%s não tem texto visível escrito no código',
    (file) => {
      expect(literalHits(readSource(file))).toEqual([])
    }
  )
})
