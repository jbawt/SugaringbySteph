import { Link } from 'react-router-dom'
import {
  CONTACT_PATH,
  EMAIL,
  HOURS,
  LOCATION_FULL,
  PHONE_DISPLAY,
  PHONE_TEL,
  EMAIL_MAILTO,
} from '../data/contact'

/**
 * Plain-prose business summary for AI snippets and citeable facts.
 */
export default function BusinessSummary({ className = '' }) {
  return (
    <section className={`py-16 bg-cream-50 ${className}`.trim()} aria-labelledby="about-this-business">
      <div className="mx-auto max-w-3xl px-4">
        <h2 id="about-this-business" className="section-heading">
          About this business
        </h2>
        <div className="mt-8 space-y-4 text-base leading-relaxed text-bronze-500/85 sm:text-lg">
          <p>
            Sugaring by Steph is a sugaring hair removal studio in Sylvan Lake, Alberta,
            run by Steph. She uses a natural sugar paste made from sugar, lemon, and water
            for Brazilian, bikini, body, and face services.
          </p>
          <p>
            The studio is on {LOCATION_FULL}. Hours are {HOURS}. To book,{' '}
            <Link to={CONTACT_PATH} className="text-gold-600 font-medium hover:text-gold-700">
              request an appointment online
            </Link>
            , call{' '}
            <a href={PHONE_TEL} className="text-gold-600 font-medium hover:text-gold-700">
              {PHONE_DISPLAY}
            </a>
            , or email{' '}
            <a href={EMAIL_MAILTO} className="text-gold-600 font-medium hover:text-gold-700">
              {EMAIL}
            </a>
            . Payment is cash or e-transfer only.
          </p>
        </div>
      </div>
    </section>
  )
}
