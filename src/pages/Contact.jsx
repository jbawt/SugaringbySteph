import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import logo from '../assets/Logo_transparent.webp'
import Seo from '../components/Seo'
import ScrollReveal from '../components/ScrollReveal'
import ReviewCarousel from '../components/ReviewCarousel'
import { FloralDivider, SidebarBotanical, CornerAccent, LeafSprig } from '../components/Botanicals'
import {
  EMAIL,
  EMAIL_MAILTO,
  HOURS,
  LOCATION_FULL,
  PHONE_DISPLAY,
  PHONE_TEL,
} from '../data/contact'
import { pageSeo } from '../data/seo'

const services = [
  'Brazilian',
  'Bikini',
  'Vagacial',
  'Underarms',
  'Full Legs',
  'Half Legs',
  'Full Arms',
  'Half Arms',
  'Back',
  'Stomach',
  'Upper Lip',
  'Chin',
  'Other'
]

export default function Contact() {
  const [searchParams] = useSearchParams()
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    services: [],
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    const fromQuery = searchParams.get('service') || searchParams.get('services')
    if (!fromQuery) return

    const requested = fromQuery
      .split(',')
      .map((item) => item.trim())
      .filter((item) => services.includes(item))

    if (requested.length === 0) return

    setFormState((prev) => ({
      ...prev,
      services: [...new Set([...prev.services, ...requested])],
    }))
  }, [searchParams])

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    })
  }

  const handleServiceToggle = (service) => {
    setFormState((prev) => {
      const selected = prev.services.includes(service)
        ? prev.services.filter((item) => item !== service)
        : [...prev.services, service]
      return { ...prev, services: selected }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')
    setSubmitting(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      // Post to the static detection file so SPA redirects don't swallow the request.
      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString(),
      })

      if (!response.ok) {
        throw new Error(`Form submission failed (${response.status})`)
      }

      setSubmitted(true)
    } catch {
      setSubmitError('Something went wrong sending your request. Please try again or call directly.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="pt-20">
        <Seo {...pageSeo.contact} />
        <section className="py-32 bg-cream-100">
          <div className="page-enter max-w-xl mx-auto px-4 text-center">
            <div className="checkmark-wrap w-20 h-20 mx-auto mb-6 rounded-full bg-gold-100 flex items-center justify-center">
              <svg className="w-10 h-10" viewBox="0 0 52 52" fill="none">
                <circle className="checkmark-circle" cx="26" cy="26" r="24" />
                <path className="checkmark-check" d="M16 26.5l7 7 13.5-14" />
              </svg>
            </div>
            <h1 className="font-script text-4xl text-gold-600 mb-4">Thank You!</h1>
            <p className="text-bronze-500/80 mb-8">
              Your appointment request has been sent. I’ll get back to you within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href={PHONE_TEL} className="btn-primary w-full sm:w-auto">
                Call {PHONE_DISPLAY}
              </a>
              <Link to="/" className="btn-secondary w-full sm:w-auto">
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="pt-20">
      <Seo {...pageSeo.contact} />
      {/* Header */}
      <section className="py-16 bg-cream-200">
        <ScrollReveal className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="section-heading">Request a Sugaring Appointment in Sylvan Lake</h1>
          <FloralDivider className="mb-6" />
          <p className="text-lg text-bronze-500/80 max-w-2xl mx-auto">
            Tell me which services you want and your preferred times, or call directly.
            Not sure what you need?{' '}
            <Link to="/services" className="text-gold-600 font-medium hover:text-gold-700">
              Compare sugaring services and prices
            </Link>
            {' '}or{' '}
            <Link to="/faq" className="text-gold-600 font-medium hover:text-gold-700">
              read the sugaring FAQ
            </Link>
            .
          </p>
        </ScrollReveal>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-cream-50">
        <div className="max-w-6xl mx-auto px-4">
          <ScrollReveal stagger className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <form 
                id="appointment-form"
                name="contact" 
                method="POST" 
                action="/__forms.html"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="card card-static p-8"
              >
                <input type="hidden" name="form-name" value="contact" />
                <input
                  type="hidden"
                  name="subject"
                  value="New appointment request — Sugaring by Steph"
                />
                <p className="hidden">
                  <label>
                    Don't fill this out if you're human: <input name="bot-field" tabIndex={-1} autoComplete="off" />
                  </label>
                </p>
                
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-bronze-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formState.name}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Jane Smith"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-bronze-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="jane@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-bronze-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formState.phone}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  
                  <fieldset>
                    <legend className="block text-sm font-medium text-bronze-700 mb-2">
                      Services Interested In
                    </legend>
                    <p className="text-bronze-500/60 text-sm mb-3">Select all that apply</p>
                    <input
                      type="hidden"
                      name="service"
                      value={formState.services.join(', ')}
                    />
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {services.map((service) => {
                        const checked = formState.services.includes(service)
                        return (
                          <label
                            key={service}
                            className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border cursor-pointer transition-colors duration-200 ${
                              checked
                                ? 'border-gold-500 bg-gold-100/60 text-bronze-700'
                                : 'border-gold-200 bg-cream-50 text-bronze-500 hover:border-gold-400'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => handleServiceToggle(service)}
                              className="rounded border-gold-300 text-gold-600 focus:ring-gold-500 focus:ring-offset-0"
                            />
                            <span className="text-sm">{service}</span>
                          </label>
                        )
                      })}
                    </div>
                  </fieldset>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-bronze-700 mb-2">
                      Preferred Times or Notes
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formState.message}
                      onChange={handleChange}
                      className="input-field resize-none"
                      placeholder="Optional — share preferred days, times, or questions..."
                    />
                  </div>

                  {submitError && (
                    <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2" role="alert">
                      {submitError}
                    </p>
                  )}
                  
                  <button type="submit" className="btn-primary w-full" disabled={submitting}>
                    {submitting ? 'Sending…' : 'Request Appointment'}
                  </button>
                </div>
              </form>
            </div>

            {/* Contact Info */}
            <div className="lg:pl-8">
              <div className="sticky top-28 relative">
                <SidebarBotanical className="hidden lg:block absolute -right-4 top-0 w-24 h-48 opacity-20 pointer-events-none" />
                <h2 className="font-script text-3xl text-gold-600 mb-8">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-bronze-700 mb-1">Phone</h3>
                      <a href={PHONE_TEL} className="text-gold-600 hover:text-gold-700 text-lg">
                        {PHONE_DISPLAY}
                      </a>
                      <p className="text-bronze-500/60 text-sm mt-1">Call anytime</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-bronze-700 mb-1">Email</h3>
                      <a href={EMAIL_MAILTO} className="text-gold-600 hover:text-gold-700 break-all">
                        {EMAIL}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-bronze-700 mb-1">Location</h3>
                      <p className="text-bronze-500/80">{LOCATION_FULL}</p>
                      <p className="text-bronze-500/60 text-sm mt-1">By appointment only</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-bronze-700 mb-1">Hours</h3>
                      <p className="text-bronze-500/80">{HOURS}</p>
                      <p className="text-bronze-500/60 text-sm mt-1">Typically reply within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium text-bronze-700 mb-3">Social Media</h3>
                      <div className="flex flex-wrap gap-2">
                        <a
                          href="https://instagram.com/sugaringbysteph"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-gold-300/70 bg-cream-50 px-3.5 py-2 text-sm font-medium text-gold-700 transition-colors hover:border-gold-500 hover:bg-gold-100"
                        >
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                          </svg>
                          Instagram
                        </a>
                        <a
                          href="https://facebook.com/sugaringbysteph"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-gold-300/70 bg-cream-50 px-3.5 py-2 text-sm font-medium text-gold-700 transition-colors hover:border-gold-500 hover:bg-gold-100"
                        >
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                          </svg>
                          Facebook
                        </a>
                      </div>
                      <p className="text-bronze-500/60 text-sm mt-2">@sugaringbysteph · Follow for updates & tips</p>
                    </div>
                  </div>
                </div>

                <div className="relative mt-12 p-6 bg-cream-100 rounded-2xl border border-gold-200">
                  <CornerAccent position="top-left" className="opacity-25" />
                  <CornerAccent position="bottom-right" className="opacity-25" />
                  <LeafSprig className="hidden sm:block absolute -right-3 -top-8 w-10 h-20 opacity-30 pointer-events-none" />
                  <div className="relative flex items-center gap-4">
                    <img
                      src={logo}
                      alt="Sugaring by Steph"
                      width={64}
                      height={64}
                      loading="lazy"
                      decoding="async"
                      className="w-16 h-16 object-contain flex-shrink-0"
                    />
                    <div>
                      <p className="font-script text-xl text-gold-600">Looking forward to</p>
                      <p className="font-script text-xl text-gold-600">seeing you!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 bg-cream-100">
        <ScrollReveal className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="section-heading">Kind Words</h2>
          <FloralDivider className="mb-10" />
          <ReviewCarousel />
        </ScrollReveal>
      </section>
    </div>
  )
}