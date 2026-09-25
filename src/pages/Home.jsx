import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import ScrollReveal from '../components/ScrollReveal'
import { IntimateIcon, BodyIcon, FaceIcon } from '../components/ServiceIcons'
import { FloralDivider, CornerAccent } from '../components/Botanicals'

const benefits = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    title: '100% Natural',
    description: 'Made with just sugar, lemon, and water'
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: 'Less Painful',
    description: 'Gentler on skin than traditional waxing'
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Longer Lasting',
    description: 'Results that last 4-6 weeks'
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'No Ingrown Hairs',
    description: 'Hair removed in natural direction'
  },
]

const featuredServices = [
  { name: 'Intimate', price: 'From $50', link: '/services#intimate', icon: <IntimateIcon /> },
  { name: 'Body', price: 'From $25', link: '/services#body', icon: <BodyIcon /> },
  { name: 'Face', price: 'From $15', link: '/services#face', icon: <FaceIcon /> },
]

export default function Home() {
  return (
    <div>
      <Hero />

      {/* Intro Section */}
      <section className="py-20 bg-white">
        <ScrollReveal className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="section-heading">The Sweet Alternative to Waxing</h2>
          <FloralDivider className="mb-8" />
          <p className="text-lg text-bronze-500/80 leading-relaxed">
            Sugaring is an ancient hair removal technique using a simple paste made from sugar, 
            lemon juice, and water. Unlike waxing, sugaring paste only adheres to hair—not 
            skin—making it gentler and less painful. Experience smooth, beautiful skin the 
            natural way.
          </p>
        </ScrollReveal>
      </section>

      {/* Featured Services */}
      <section className="py-20 bg-cream-100">
        <div className="max-w-6xl mx-auto px-4">
          <ScrollReveal>
            <h2 className="section-heading">Our Services</h2>
            <FloralDivider className="mb-6" />
            <p className="section-subheading">
              Professional sugaring services tailored to your needs
            </p>
          </ScrollReveal>
          
          <ScrollReveal stagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
              <Link 
                key={service.name}
                to={service.link}
                className="card relative p-8 text-center group"
              >
                <CornerAccent position="top-right" className="opacity-20" />
                {service.icon}
                <h3 className="font-script text-3xl text-gold-600 mb-2">{service.name}</h3>
                <p className="text-bronze-500 font-medium">{service.price}</p>
                <span className="inline-flex items-center mt-4 text-gold-600 group-hover:gap-2 transition-all">
                  Learn More 
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <ScrollReveal>
            <h2 className="section-heading">Why Choose Sugaring?</h2>
            <FloralDivider className="mb-6" />
            <p className="section-subheading">
              Discover the benefits of this ancient, natural hair removal method
            </p>
          </ScrollReveal>
          
          <ScrollReveal stagger className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold-100 flex items-center justify-center text-gold-600">
                  {benefit.icon}
                </div>
                <h3 className="font-script text-xl text-gold-600 mb-2">{benefit.title}</h3>
                <p className="text-sm text-bronze-500/70">{benefit.description}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 bg-cream-200">
        <ScrollReveal className="max-w-4xl mx-auto px-4 text-center">
          <svg className="w-12 h-12 mx-auto mb-6 text-gold-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <blockquote className="text-2xl md:text-3xl font-script text-bronze-700 mb-6 italic">
            "I was nervous to try sugaring for the first time, but Steph made me feel so 
            comfortable. The results are amazing and it's so much gentler than waxing!"
          </blockquote>
          <p className="text-gold-600 font-medium">— Happy Client</p>
        </ScrollReveal>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gold-500 to-gold-600">
        <ScrollReveal className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-script text-4xl md:text-5xl text-white mb-4">
            Ready to Experience the Difference?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Book your appointment today and discover smoother, healthier skin
          </p>
          <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-white text-gold-600 font-medium rounded-full shadow-lg hover:bg-cream-100 transform hover:-translate-y-0.5 transition-all duration-300">
            Book Your Appointment
          </Link>
        </ScrollReveal>
      </section>
    </div>
  )
}
