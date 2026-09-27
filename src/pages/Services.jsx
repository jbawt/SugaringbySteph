import { Link } from 'react-router-dom'
import ServiceCard from '../components/ServiceCard'
import JsonLd from '../components/JsonLd'
import Seo from '../components/Seo'
import ScrollReveal from '../components/ScrollReveal'
import ReviewCarousel from '../components/ReviewCarousel'
import { IntimateIcon, BodyIcon, FaceIcon } from '../components/ServiceIcons'
import { FloralDivider } from '../components/Botanicals'
import { CONTACT_PATH } from '../data/contact'
import { pageSeo } from '../data/seo'
import { serviceCategories as services } from '../data/services'
import { buildServicesPageSchema } from '../data/structuredData'

export default function Services() {
  return (
    <div className="pt-20">
      <Seo {...pageSeo.services} />
      <JsonLd data={buildServicesPageSchema()} />
      {/* Header */}
      <section className="py-16 bg-cream-200">
        <ScrollReveal className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="section-heading">Sugaring Services in Sylvan Lake</h1>
          <FloralDivider className="mb-6" />
          <p className="text-lg text-bronze-500/80 max-w-3xl mx-auto">
            Looking for Brazilian sugaring in Sylvan Lake, or a gentler sugaring vs waxing option
            for natural hair removal near Red Deer and central Alberta? All services use organic
            sugar paste made with just sugar, lemon, and water, kinder to skin than traditional waxing.
          </p>
        </ScrollReveal>
      </section>

      {/* Intimate Services */}
      <section id="intimate" className="py-16 bg-cream-50 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4">
          <ScrollReveal>
            <IntimateIcon />
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-12 bg-gold-300" />
              <h2 className="font-script text-4xl text-gold-600">{services.intimate.title}</h2>
              <div className="h-px w-12 bg-gold-300" />
            </div>
            <p className="text-center text-bronze-500/70 mb-10 max-w-2xl mx-auto">
              {services.intimate.description}. Popular choices include Brazilian sugaring and bikini
              line cleanup for clients across Sylvan Lake and nearby communities.
            </p>
          </ScrollReveal>
          
          <ScrollReveal stagger className="bento-intimate">
            {services.intimate.items.map((service) => (
              <ServiceCard
                key={service.name}
                name={service.name}
                price={service.price}
                description={service.description}
                featured={service.featured}
                className={service.name === 'Brazilian' ? 'bento-span-2-rows' : ''}
              />
            ))}
          </ScrollReveal>

          <ScrollReveal className="mt-12 max-w-3xl mx-auto text-center">
            <p className="font-script text-xl italic text-bronze-600/80">
              “Such a great experience! This was my first time trying sugaring and I’m so glad I finally gave it a try.”
            </p>
            <p className="mt-2 text-sm text-gold-600">— Kendra Vandermeulen</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Body Services */}
      <section id="body" className="py-16 bg-cream-100 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4">
          <ScrollReveal>
            <BodyIcon />
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-12 bg-gold-300" />
              <h2 className="font-script text-4xl text-gold-600">{services.body.title}</h2>
              <div className="h-px w-12 bg-gold-300" />
            </div>
            <p className="text-center text-bronze-500/70 mb-10 max-w-2xl mx-auto">
              {services.body.description}
            </p>
          </ScrollReveal>
          
          <ScrollReveal stagger className="bento-body">
            {[
              ...services.body.items.filter((service) => service.name === 'Full Arms'),
              ...services.body.items.filter((service) => service.name !== 'Full Arms'),
            ].map((service) => (
              <ServiceCard
                key={service.name}
                name={service.name}
                price={service.price}
                description={service.description}
                featured={service.name === 'Full Arms'}
                className={
                  service.name === 'Full Arms'
                    ? 'bento-span-2-rows bento-span-2-cols bento-featured'
                    : service.name === 'Back' || service.name === 'Stomach'
                      ? 'bento-span-2-cols'
                      : ''
                }
              />
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* Face Services */}
      <section id="face" className="py-16 bg-cream-50 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4">
          <ScrollReveal>
            <FaceIcon />
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-12 bg-gold-300" />
              <h2 className="font-script text-4xl text-gold-600">{services.face.title}</h2>
              <div className="h-px w-12 bg-gold-300" />
            </div>
            <p className="text-center text-bronze-500/70 mb-10 max-w-2xl mx-auto">
              {services.face.description}
            </p>
          </ScrollReveal>
          
          <ScrollReveal stagger className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto">
            {services.face.items.map((service) => (
              <ServiceCard
                key={service.name}
                name={service.name}
                price={service.price}
                description={service.description}
              />
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* First Time Info */}
      <section className="py-16 bg-cream-200">
        <ScrollReveal className="max-w-4xl mx-auto px-4">
          <div className="card p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-full bg-gold-100 flex items-center justify-center">
                  <svg className="w-10 h-10 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="text-center md:text-left">
                <h3 className="font-script text-3xl text-gold-600 mb-4">First Time?</h3>
                <p className="text-bronze-500/80 mb-4">
                  If this is your first sugaring experience, here's what you should know:
                </p>
                <ul className="text-bronze-500/70 space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Hair should be at least 1/4 inch long (about 2 weeks of growth)
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Gently exfoliate the area 24-48 hours before your appointment
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Avoid sun exposure and tanning before and after treatment
                  </li>
                </ul>
                <Link to="/faq" className="text-gold-600 font-medium hover:text-gold-700 inline-flex items-center gap-1">
                  Read the sugaring prep & aftercare FAQ
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Reviews */}
      <section className="py-16 bg-cream-50">
        <ScrollReveal className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="section-heading">Kind Words</h2>
          <FloralDivider className="mb-10" />
          <ReviewCarousel />
        </ScrollReveal>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-gold-500 to-gold-600">
        <ScrollReveal className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-script text-4xl text-white mb-4">Ready for Smoother Skin?</h2>
          <p className="text-white/90 mb-8">
            Request your appointment and I’ll confirm a time that works for you
          </p>
          <Link 
            to={CONTACT_PATH} 
            className="inline-flex items-center justify-center px-8 py-4 bg-cream-50 text-gold-700 font-medium rounded-full shadow-lg hover:bg-cream-100 dark:bg-cream-300 dark:text-gold-600 dark:hover:bg-cream-200 transform hover:-translate-y-0.5 transition-all duration-300"
          >
            Request a sugaring appointment
          </Link>
        </ScrollReveal>
      </section>
    </div>
  )
}
