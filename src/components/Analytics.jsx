import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  initAnalytics,
  isAnalyticsEnabled,
  trackPageView,
  trackPhoneClick,
} from '../lib/analytics'

/**
 * Loads GA4 (async gtag), tracks SPA page views, and conversion clicks on tel: links.
 * No-ops when VITE_GA_MEASUREMENT_ID is unset.
 */
export default function Analytics() {
  const location = useLocation()

  useEffect(() => {
    if (!isAnalyticsEnabled()) return
    initAnalytics()
    trackPageView(`${location.pathname}${location.search}`)
  }, [location.pathname, location.search])

  useEffect(() => {
    if (!isAnalyticsEnabled()) return undefined

    const onClick = (event) => {
      const link = event.target.closest?.('a[href^="tel:"]')
      if (!link) return
      trackPhoneClick(link.getAttribute('href') || '')
    }

    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  return null
}
