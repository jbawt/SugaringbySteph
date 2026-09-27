import { useEffect, useRef } from 'react'

function shouldShowImmediately() {
  if (typeof window === 'undefined') return true
  if (window.__PRERENDER__) return true
  if (navigator.webdriver) return true
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function useScrollReveal({
  threshold = 0.12,
  rootMargin = '0px 0px -40px 0px',
} = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const show = () => element.classList.add('is-visible')

    if (shouldShowImmediately() || typeof IntersectionObserver === 'undefined') {
      show()
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show()
          observer.unobserve(element)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return ref
}
