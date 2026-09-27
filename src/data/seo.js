export const SITE_URL = 'https://sugaringbysteph.ca'
export const SITE_NAME = 'Sugaring by Steph'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/opengraph.jpg`

export const pageSeo = {
  home: {
    title: 'Sugaring in Sylvan Lake | Sugaring by Steph',
    description:
      'Natural, gentle sugaring hair removal in Sylvan Lake. Organic sugar paste, Brazilian to facial services. Request your appointment today.',
    path: '/',
  },
  services: {
    title: 'Sugaring Prices & Services | Sylvan Lake',
    description:
      'View sugaring prices in Sylvan Lake: Brazilian, bikini, underarms, legs, arms, face, and more. Transparent rates and professional care.',
    path: '/services',
  },
  about: {
    title: 'Meet Steph | Sugaring by Steph',
    description:
      'Meet Steph, a SugarSMAC-trained sugarist in Sylvan Lake offering natural, comfortable hair removal with a client-focused approach.',
    path: '/about',
  },
  faq: {
    title: 'Sugaring FAQ | Prep, Aftercare & More',
    description:
      'Answers about sugaring vs waxing, pain, hair length, prep, aftercare, results, and booking with Sugaring by Steph in Sylvan Lake.',
    path: '/faq',
  },
  contact: {
    title: 'Request an Appointment | Sugaring by Steph',
    description:
      'Request a sugaring appointment in Sylvan Lake. Call 587-377-1195 or send preferred services and times online.',
    path: '/contact',
  },
}

export function absoluteUrl(path = '/') {
  if (!path || path === '/') return `${SITE_URL}/`
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}
