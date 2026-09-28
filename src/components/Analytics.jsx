import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  initAnalytics,
  isAnalyticsEnabled,
  trackPageView,
  trackPhoneClick,
} from '../lib/analytics'

/**
 * Loads GA4 after first interaction (or a 10s fallback) so LCP/TBT aren't
 * competing with gtag in lab tests. Tracks SPA page views + tel: clicks.
 */
export default function Analytics() {
  const location = useLocation()

  // Defer first GA load until engagement (or timeout).
  useEffect(() => {
    if (!isAnalyticsEnabled()) return undefined
    if (window.__gaInitialized) return undefined

    let cancelled = false
    let timeoutId = 0

    const boot = () => {
      if (cancelled || window.__gaInitialized) return
      cleanup()
      initAnalytics()
      trackPageView(`${window.location.pathname}${window.location.search}`)
    }

    const onInteract = () => boot()

    const cleanup = () => {
      window.removeEventListener('scroll', onInteract)
      window.removeEventListener('pointerdown', onInteract)
      window.removeEventListener('keydown', onInteract)
      if (timeoutId) window.clearTimeout(timeoutId)
    }

    window.addEventListener('scroll', onInteract, { once: true, passive: true })
    window.addEventListener('pointerdown', onInteract, { once: true, passive: true })
    window.addEventListener('keydown', onInteract, { once: true })
    timeoutId = window.setTimeout(boot, 10000)

    return () => {
      cancelled = true
      cleanup()
    }
  }, [])

  // SPA page views after GA is ready.
  useEffect(() => {
    if (!isAnalyticsEnabled()) return
    if (!window.__gaInitialized) return
    trackPageView(`${location.pathname}${location.search}`)
  }, [location.pathname, location.search])

  useEffect(() => {
    if (!isAnalyticsEnabled()) return undefined

    const onClick = (event) => {
      const link = event.target.closest?.('a[href^="tel:"]')
      if (!link) return
      initAnalytics()
      trackPhoneClick(link.getAttribute('href') || '')
    }

    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  return null
}
