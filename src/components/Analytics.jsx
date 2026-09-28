import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  initAnalytics,
  isAnalyticsEnabled,
  trackPageView,
  trackPhoneClick,
} from '../lib/analytics'

function scheduleIdle(fn, timeout = 4000) {
  if (typeof window.requestIdleCallback === 'function') {
    const id = window.requestIdleCallback(fn, { timeout })
    return () => window.cancelIdleCallback?.(id)
  }
  const id = window.setTimeout(fn, 2000)
  return () => window.clearTimeout(id)
}

/**
 * Loads GA4 after first paint / idle so it does not compete with LCP.
 * Tracks SPA page views and tel: conversion clicks.
 * No-ops when VITE_GA_MEASUREMENT_ID is unset.
 */
export default function Analytics() {
  const location = useLocation()

  useEffect(() => {
    if (!isAnalyticsEnabled()) return undefined

    let cancelled = false
    let cancelIdle = () => {}

    const boot = () => {
      if (cancelled) return
      initAnalytics()
      trackPageView(`${location.pathname}${location.search}`)
    }

    // Wait for window load, then idle — keeps gtag off the LCP critical path.
    if (document.readyState === 'complete') {
      cancelIdle = scheduleIdle(boot)
    } else {
      const onLoad = () => {
        cancelIdle = scheduleIdle(boot)
      }
      window.addEventListener('load', onLoad, { once: true })
      return () => {
        cancelled = true
        window.removeEventListener('load', onLoad)
        cancelIdle()
      }
    }

    return () => {
      cancelled = true
      cancelIdle()
    }
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
