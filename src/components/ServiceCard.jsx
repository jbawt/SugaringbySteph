import { Link } from 'react-router-dom'
import { CornerAccent } from './Botanicals'
import { CONTACT_PATH } from '../data/contact'

export default function ServiceCard({ name, price, description, featured = false, className = '' }) {
  const requestPath = `${CONTACT_PATH}?service=${encodeURIComponent(name)}`

  return (
    <div className={`card relative flex h-full flex-col p-6 ${featured ? 'bento-featured' : ''} ${className}`.trim()}>
      <CornerAccent position="top-right" className="opacity-[0.16]" />
      {featured && (
        <span className="mb-3 inline-block w-fit self-start rounded-full bg-gold-500 px-3 py-1 text-xs font-medium text-white">
          Most Popular
        </span>
      )}
      <h3 className="font-script text-2xl text-gold-600 mb-2">{name}</h3>
      <p className="text-2xl font-semibold text-bronze-700 mb-3">{price}</p>
      {description && (
        <p className="text-bronze-500/70 text-sm mb-4">{description}</p>
      )}
      <Link
        to={requestPath}
        className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-gold-600 hover:text-gold-700 transition-colors"
      >
        Request Appointment
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  )
}
