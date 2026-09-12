import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'
import { FloralDivider, CurvedBranch, LeafSprig, CornerAccent } from '../components/Botanicals'

const values = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Clean & Hygienic',
    description: 'Strict sanitation protocols and single-use supplies for every client'
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    title: 'Natural Products',
    description: 'Organic sugar paste with no chemicals, resins, or artificial ingredients'
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: 'Client-Focused Care',
    description: 'Your comfort and satisfaction are my top priorities'
  },
]

const whySugaring = [
  {
    title: 'Natural Ingredients',
    description: 'The sugar paste I use contains only sugar, lemon juice, and water. No chemicals, no synthetic ingredients—just pure, natural goodness that\'s safe for all skin types.'
  },
  {
    title: 'Gentler on Skin',
    description: 'Unlike wax, sugar paste only adheres to hair, not living skin cells. This means less irritation, less redness, and a more comfortable experience overall.'
  },
  {
    title: 'Better Results',
    description: 'Sugaring removes hair in its natural direction of growth, which leads to less breakage, fewer ingrown hairs, and longer-lasting smoothness.'
  },
]

export default function About() {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-16 bg-cream-200">
        <ScrollReveal className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="section-heading">Meet Steph</h1>
          <FloralDivider />
        </ScrollReveal>
      </section>

      {/* Main About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <ScrollReveal stagger className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Photo Placeholder */}
            <div className="order-2 md:order-1 relative">
              <CurvedBranch className="hidden md:block absolute -bottom-4 -left-6 w-36 h-36 opacity-30 pointer-events-none" />
              <div className="relative aspect-[4/5] rounded-2xl bg-cream-200 border-2 border-gold-200 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gold-100 flex items-center justify-center">
                    <svg className="w-12 h-12 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <p className="text-bronze-500/60 text-sm">
                    Photo coming soon
                  </p>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="order-1 md:order-2">
              <h2 className="font-script text-4xl text-gold-600 mb-6">Hi, I'm Steph!</h2>
              <div className="space-y-4 text-bronze-500/80 leading-relaxed">
                <p>
                  Welcome to Sugaring by Steph! I'm passionate about helping people feel 
                  confident and comfortable in their own skin through natural, gentle hair 
                  removal.
                </p>
                <p>
                  I discovered sugaring after years of dealing with the irritation and 
                  discomfort of traditional waxing. Once I experienced the difference that 
                  sugaring made for my own skin, I knew I had to share this amazing technique 
                  with others.
                </p>
                <p>
                  After completing professional training and certification in the art of 
                  sugaring, I started Sugaring by Steph to offer a more natural, gentle 
                  alternative to traditional hair removal methods.
                </p>
                <p>
                  Whether you're new to sugaring or a longtime fan, I'm here to provide 
                  you with a comfortable, professional experience and results you'll love.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Why I Chose Sugaring */}
      <section className="relative py-16 bg-cream-100 overflow-hidden">
        <LeafSprig className="hidden md:block absolute top-10 left-4 w-16 h-36 opacity-20 pointer-events-none" />
        <LeafSprig flip className="hidden md:block absolute top-10 right-4 w-16 h-36 opacity-20 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4">
          <ScrollReveal>
            <h2 className="section-heading">Why I Chose Sugaring</h2>
            <FloralDivider className="mb-6" />
            <p className="section-subheading">
              After trying many hair removal methods, I fell in love with sugaring for its 
              natural approach and amazing results
            </p>
          </ScrollReveal>
          
          <ScrollReveal stagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whySugaring.map((item) => (
              <div key={item.title} className="card relative p-8">
                <CornerAccent position="bottom-left" className="opacity-[0.15]" />
                <h3 className="font-script text-2xl text-gold-600 mb-4">{item.title}</h3>
                <p className="text-bronze-500/70">{item.description}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <ScrollReveal>
            <h2 className="section-heading">My Promise to You</h2>
            <p className="section-subheading">
              Every client deserves the best experience possible
            </p>
          </ScrollReveal>
          
          <ScrollReveal stagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold-100 flex items-center justify-center text-gold-600">
                  {value.icon}
                </div>
                <h3 className="font-script text-2xl text-gold-600 mb-2">{value.title}</h3>
                <p className="text-bronze-500/70">{value.description}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-gold-500 to-gold-600">
        <ScrollReveal className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-script text-4xl text-white mb-4">Let's Work Together</h2>
          <p className="text-white/90 mb-8">
            I'd love to help you experience the benefits of sugaring
          </p>
          <Link 
            to="/contact" 
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-gold-600 font-medium rounded-full shadow-lg hover:bg-cream-100 transform hover:-translate-y-0.5 transition-all duration-300"
          >
            Get in Touch
          </Link>
        </ScrollReveal>
      </section>
    </div>
  )
}
