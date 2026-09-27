import { EMAIL, PHONE_DISPLAY, POSTAL_CODE, SUGARSMAC_PROFILE_URL } from './contact'
import { faqs } from './faqs'
import { absoluteUrl, DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from './seo'
import { getAllServiceItems } from './services'

const BUSINESS_ID = `${SITE_URL}/#business`
const WEBSITE_ID = `${SITE_URL}/#website`

function postalAddress() {
  return {
    '@type': 'PostalAddress',
    streetAddress: 'Woodland Crescent',
    addressLocality: 'Sylvan Lake',
    addressRegion: 'AB',
    postalCode: POSTAL_CODE,
    addressCountry: 'CA',
  }
}

function serviceEntity(item) {
  return {
    '@type': 'Service',
    name: item.name,
    description: item.schema?.isAddOn
      ? `${item.description} (add-on)`
      : item.description,
    provider: { '@id': BUSINESS_ID },
    areaServed: {
      '@type': 'City',
      name: 'Sylvan Lake',
    },
  }
}

function offerForService(item) {
  const url = absoluteUrl('/services')

  if (item.schema?.offerType === 'AggregateOffer') {
    return {
      '@type': 'AggregateOffer',
      url,
      priceCurrency: 'CAD',
      lowPrice: String(item.schema.lowPrice),
      highPrice: String(item.schema.highPrice),
      offerCount: 2,
      availability: 'https://schema.org/InStock',
      description: item.description,
      itemOffered: serviceEntity(item),
    }
  }

  return {
    '@type': 'Offer',
    url,
    priceCurrency: 'CAD',
    price: String(item.schema.price),
    availability: 'https://schema.org/InStock',
    description: item.schema?.isAddOn
      ? `${item.description} (add-on)`
      : item.description,
    itemOffered: serviceEntity(item),
  }
}

export function buildOfferCatalog() {
  const items = getAllServiceItems()

  return {
    '@type': 'OfferCatalog',
    name: 'Sugaring services',
    itemListElement: items.map((item, index) => ({
      '@type': 'OfferCatalog',
      name: item.name,
      position: index + 1,
      itemListElement: [offerForService(item)],
    })),
  }
}

/** Sitewide LocalBusiness / BeautySalon JSON-LD */
export function buildLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    '@id': BUSINESS_ID,
    name: SITE_NAME,
    alternateName: 'Sugaring by Steph Sylvan Lake',
    description:
      'Natural, gentle sugaring hair removal in Sylvan Lake, Alberta. Organic sugar paste made from sugar, lemon, and water.',
    url: SITE_URL,
    telephone: PHONE_DISPLAY,
    email: EMAIL,
    image: [DEFAULT_OG_IMAGE],
    logo: DEFAULT_OG_IMAGE,
    priceRange: '$15-$65',
    currenciesAccepted: 'CAD',
    paymentAccepted: 'Cash, e-transfer',
    address: postalAddress(),
    areaServed: [
      {
        '@type': 'City',
        name: 'Sylvan Lake',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Central Alberta',
      },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00',
      },
    ],
    sameAs: [
      'https://instagram.com/sugaringbysteph',
      'https://facebook.com/sugaringbysteph',
      SUGARSMAC_PROFILE_URL,
    ],
    hasOfferCatalog: buildOfferCatalog(),
    potentialAction: {
      '@type': 'ReserveAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: absoluteUrl('/contact'),
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform',
        ],
      },
      result: {
        '@type': 'Reservation',
        name: 'Sugaring appointment request',
      },
    },
  }
}

export function buildWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { '@id': BUSINESS_ID },
    inLanguage: 'en-CA',
  }
}

/** FAQPage JSON-LD mirroring visible FAQ content */
export function buildFaqPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/** Services page catalog (standalone, still tied to the business) */
export function buildServicesPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    '@id': `${SITE_URL}/services#catalog`,
    name: 'Sugaring by Steph service menu',
    url: absoluteUrl('/services'),
    provider: { '@id': BUSINESS_ID },
    numberOfItems: getAllServiceItems().length,
    itemListElement: getAllServiceItems().map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: offerForService(item),
    })),
  }
}
