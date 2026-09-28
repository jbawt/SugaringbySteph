/** GA4 helpers. Set VITE_GA_MEASUREMENT_ID (e.g. G-XXXXXXXXXX) in Netlify env. */

export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || ''

export function isAnalyticsEnabled() {
  return Boolean(GA_MEASUREMENT_ID) && typeof window !== 'undefined'
}

export function initAnalytics() {
  if (!isAnalyticsEnabled() || window.__gaInitialized) return

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  // SPA: send page_view manually on route changes
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false,
    anonymize_ip: true,
  })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script)

  window.__gaInitialized = true
}

export function trackPageView(path) {
  if (!isAnalyticsEnabled() || typeof window.gtag !== 'function') return
  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  })
}

export function trackEvent(name, params = {}) {
  if (!isAnalyticsEnabled() || typeof window.gtag !== 'function') return
  window.gtag('event', name, params)
}

/** Contact form success — mark as a key event in GA4 Admin. */
export function trackContactSubmit() {
  trackEvent('generate_lead', {
    method: 'contact_form',
    event_category: 'conversion',
  })
  trackEvent('contact_form_submit', {
    event_category: 'conversion',
  })
}

/** Phone link click — mark as a key event in GA4 Admin. */
export function trackPhoneClick(href = '') {
  trackEvent('phone_click', {
    event_category: 'conversion',
    link_url: href,
  })
}
