import type Lenis from '@studio-freight/lenis'

let instance: Lenis | null = null

export function registerLenis(lenis: Lenis) {
  instance = lenis
}

export function scrollTo(target: string, offset = -96) {
  if (instance) {
    instance.scrollTo(target, { offset, duration: 1.4 })
  } else {
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
  }
}
