import { Link } from 'react-router-dom'
import FAQItem from '../components/FAQItem'
import ScrollReveal from '../components/ScrollReveal'

const faqs = [
  {
    question: 'What is sugaring?',
    answer: 'Sugaring is an ancient hair removal technique that uses a paste made from just three natural ingredients: sugar, lemon juice, and water. The paste is applied to the skin and then flicked off, removing hair from the root. Unlike waxing, the paste only adheres to hair—not living skin cells—making it a gentler, more natural alternative.',
    defaultOpen: true
  },
  {
    question: 'How is sugaring different from waxing?',
    answer: 'There are several key differences: Sugaring paste is 100% natural and water-soluble, while wax often contains resins and chemicals. Sugar paste is applied at body temperature, so there\'s no risk of burns. Most importantly, sugar only sticks to hair, not skin, which means less irritation and discomfort. Sugaring also removes hair in its natural direction of growth, reducing breakage and ingrown hairs.'
  },
  {
    question: 'Does sugaring hurt?',
    answer: 'While any hair removal method that removes hair from the root will involve some discomfort, most clients find sugaring to be significantly less painful than waxing. Because the sugar paste doesn\'t adhere to living skin cells and removes hair in its natural direction of growth, the sensation is generally much more tolerable. The more regularly you sugar, the finer and sparser your hair becomes, making each session more comfortable.'
  },
  {
    question: 'How long does my hair need to be?',
    answer: 'For best results, hair should be at least 1/4 inch long, which is typically about 2-3 weeks of growth after shaving. If hair is too short, the sugar paste won\'t be able to grip it effectively. If it\'s too long (over 1/2 inch), I may need to trim it before we begin.'
  },
  {
    question: 'How should I prepare for my appointment?',
    answer: 'Gently exfoliate the treatment area 24-48 hours before your appointment to help remove dead skin cells and allow for better hair removal. Avoid sun exposure, tanning beds, and apply no lotions or oils to the area on the day of your appointment. If you\'re getting a Brazilian, wearing loose, comfortable clothing is recommended.'
  },
  {
    question: 'How long do results last?',
    answer: 'Most clients enjoy smooth skin for 4-6 weeks after sugaring. With regular appointments, you may notice that hair grows back finer and sparser over time, which can extend the time between sessions. For best results, I recommend scheduling appointments every 4-5 weeks.'
  },
  {
    question: 'Is sugaring safe for sensitive skin?',
    answer: 'Yes! Sugaring is actually ideal for sensitive skin. The paste is made from 100% natural ingredients with no chemicals, fragrances, or dyes. Because it doesn\'t stick to living skin cells, there\'s minimal irritation. Many clients who experience redness and bumps from waxing find that sugaring works much better for their sensitive skin.'
  },
  {
    question: 'Can I get sugared while pregnant?',
    answer: 'Yes, sugaring is generally safe during pregnancy. However, pregnancy can make skin more sensitive, so please let me know if you\'re pregnant when booking so I can take extra care. Some areas may be more sensitive than usual due to increased blood flow. Always consult with your healthcare provider if you have any concerns.'
  },
  {
    question: 'What areas can be sugared?',
    answer: 'Sugaring can be done on almost any area of the body where you have unwanted hair. I offer services for intimate areas (Brazilian, bikini), body areas (legs, arms, underarms, back, stomach), and facial areas (upper lip, chin). If you\'re unsure whether sugaring is right for a specific area, feel free to ask!'
  },
  {
    question: 'What should I do after my appointment?',
    answer: 'After sugaring, avoid hot baths, saunas, swimming, and intense exercise for 24-48 hours. Don\'t apply any products with fragrances or harsh chemicals to the treated area. Avoid sun exposure and tanning. Gently exfoliate 2-3 times per week starting 48 hours after your appointment to prevent ingrown hairs. Moisturize daily with a gentle, fragrance-free lotion.'
  },
]

export default function FAQ() {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-16 bg-cream-200">
        <ScrollReveal className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="section-heading">Frequently Asked Questions</h1>
          <div className="gold-divider mb-6" />
          <p className="text-lg text-bronze-500/80">
            Everything you need to know about sugaring
          </p>
        </ScrollReveal>
      </section>

      {/* FAQ List */}
      <section className="py-16 bg-white">
        <ScrollReveal className="max-w-3xl mx-auto px-4">
          <div className="card card-static p-6 md:p-8">
            {faqs.map((faq, index) => (
              <FAQItem 
                key={index}
                question={faq.question}
                answer={faq.answer}
                defaultOpen={faq.defaultOpen}
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
            I'm happy to answer any questions you might have about sugaring or my services
          </p>
          <Link to="/contact" className="btn-primary">
            Contact Me
          </Link>
        </ScrollReveal>
      </section>
    </div>
  )
}
