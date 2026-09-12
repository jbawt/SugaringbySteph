import { useState } from 'react'
import logo from '../assets/Logo_transparent.png'
import ScrollReveal from '../components/ScrollReveal'
import { FloralDivider, SidebarBotanical, CornerAccent, LeafSprig } from '../components/Botanicals'

const services = [
  'Brazilian',
  'Bikini',
  'Underarms',
  'Full Legs',
  'Half Legs',
  'Full Arms',
  'Half Arms',
  'Back',
  'Stomach',
  'Upper Lip',
  'Chin',
  'Other / Multiple Services'
]

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    })
      .then(() => setSubmitted(true))
      .catch((error) => alert('Error submitting form. Please try again or call directly.'))
  }

  if (submitted) {
    return (
      <div className="pt-20">
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
              Your message has been sent successfully. I'll get back to you within 24 hours.
            </p>
            <a href="/" className="btn-primary">
              Back to Home
            </a>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-16 bg-cream-200">
        <ScrollReveal className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="section-heading">Get in Touch</h1>
          <FloralDivider className="mb-6" />
          <p className="text-lg text-bronze-500/80">
            I'd love to hear from you! Fill out the form below or reach out directly.
          </p>
        </ScrollReveal>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <ScrollReveal stagger className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <form 
                name="contact" 
                method="POST" 
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="card card-static p-8"
              >
                <input type="hidden" name="form-name" value="contact" />
                <p className="hidden">
                  <label>
                    Don't fill this out if you're human: <input name="bot-field" />
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
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formState.phone}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-bronze-700 mb-2">
                      Service Interested In
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formState.service}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option value="">Select a service...</option>
                      {services.map((service) => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-bronze-700 mb-2">
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={handleChange}
                      className="input-field resize-none"
                      placeholder="Tell me about what you're looking for, any questions you have, or your preferred appointment times..."
                    />
                  </div>
                  
                  <button type="submit" className="btn-primary w-full">
                    Send Message
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
                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-bronze-700 mb-1">Phone</h3>
                      <a href="tel:5873771195" className="text-gold-600 hover:text-gold-700 text-lg">
                        587-377-1195
                      </a>
                      <p className="text-bronze-500/60 text-sm mt-1">Call or text anytime</p>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-gold-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-bronze-700 mb-1">Social Media</h3>
                      <div className="space-y-1">
                        <a 
                          href="https://instagram.com/sugaringbysteph" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gold-600 hover:text-gold-700 block"
                        >
                          @sugaringbysteph
                        </a>
                      </div>
                      <p className="text-bronze-500/60 text-sm mt-1">Follow for updates & tips</p>
                    </div>
                  </div>

                  {/* Response Time */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-bronze-700 mb-1">Response Time</h3>
                      <p className="text-bronze-500/80">Typically within 24 hours</p>
                      <p className="text-bronze-500/60 text-sm mt-1">By appointment only</p>
                    </div>
                  </div>
                </div>

                {/* Decorative Element */}
                <div className="relative mt-12 p-6 bg-cream-100 rounded-2xl border border-gold-200">
                  <CornerAccent position="top-left" className="opacity-25" />
                  <CornerAccent position="bottom-right" className="opacity-25" />
                  <LeafSprig className="hidden sm:block absolute -right-3 -top-8 w-10 h-20 opacity-30 pointer-events-none" />
                  <div className="relative flex items-center gap-4">
                    <img
                      src={logo}
                      alt="Sugaring by Steph"
                      className="w-16 h-16 object-contain flex-shrink-0"
                    />
                    <div>
                      <p className="font-script text-xl text-gold-600">Looking forward to</p>
                      <p className="font-script text-xl text-gold-600">hearing from you!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
