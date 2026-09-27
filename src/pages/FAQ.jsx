import { useState } from 'react'
import { Link } from 'react-router-dom'
import FAQItem from '../components/FAQItem'
import JsonLd from '../components/JsonLd'
import Seo from '../components/Seo'
import ScrollReveal from '../components/ScrollReveal'
import { FloralDivider } from '../components/Botanicals'
import { faqs } from '../data/faqs'
import { pageSeo } from '../data/seo'
import { buildFaqPageSchema } from '../data/structuredData'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  const handleToggle = (index) => {
    setOpenIndex((current) => (current === index ? null : index))
  }

  return (
    <div className="pt-20">
      <Seo {...pageSeo.faq} />
      <JsonLd data={buildFaqPageSchema()} />
      {/* Header */}
      <section className="py-16 bg-cream-200">
        <ScrollReveal className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="section-heading">Sugaring FAQ for Sylvan Lake</h1>
          <FloralDivider className="mb-6" />
          <p className="text-lg text-bronze-500/80 max-w-2xl mx-auto">
            Everything you need to know about sugaring vs waxing, prep, aftercare, and booking
            with Sugaring by Steph
          </p>
        </ScrollReveal>
      </section>

      {/* FAQ List */}
      <section className="py-16 bg-cream-50">
        <ScrollReveal className="max-w-3xl mx-auto px-4">
          <div className="card card-static p-6 md:p-8">
            {faqs.map((faq, index) => (
              <FAQItem 
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 bg-cream-100">
        <ScrollReveal className="max-w-4xl mx-auto px-4 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="font-script text-3xl text-gold-600 mb-4">Still Have Questions?</h2>
          <p className="text-bronze-500/80 mb-8">
            I'm happy to answer any questions you might have about sugaring or my services.
            You can also{' '}
            <Link to="/services" className="text-gold-600 font-medium hover:text-gold-700">
              view sugaring prices and services
            </Link>
            .
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/contact" className="btn-primary">
              Request a sugaring appointment
            </Link>
            <Link to="/services" className="btn-secondary">
              Browse sugaring services
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  )
}
