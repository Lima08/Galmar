'use client'

import { useEffect } from 'react'

// Revela [data-reveal] uma vez ao entrar na tela. Sem JS ou com
// prefers-reduced-motion, nada é ocultado.
export default function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const belowFold = [
      ...document.querySelectorAll<HTMLElement>('[data-reveal]')
    ].filter((el) => el.getBoundingClientRect().top > window.innerHeight)

    const observer = new IntersectionObserver(
      (entries) =>
        entries
          .filter((entry) => entry.isIntersecting)
          .forEach(({ target }) => {
            target.setAttribute('data-reveal', 'shown')
            observer.unobserve(target)
          }),
      { rootMargin: '0px 0px -10% 0px' }
    )

    belowFold.forEach((el) => {
      el.setAttribute('data-reveal', 'hidden')
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return null
}
