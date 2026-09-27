import { Link, useLocation } from 'react-router-dom'
import { CONTACT_PATH, PHONE_DISPLAY, PHONE_TEL } from '../data/contact'

export default function MobileActionBar() {
  const { pathname } = useLocation()
  const onContact = pathname === CONTACT_PATH

  return (
    <div className="mobile-action-bar" role="navigation" aria-label="Quick actions">
      <a href={PHONE_TEL} className="mobile-action-bar-btn mobile-action-bar-call">
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        <span>Call</span>
        <span className="sr-only">{PHONE_DISPLAY}</span>
      </a>
      {onContact ? (
        <a href="#appointment-form" className="mobile-action-bar-btn mobile-action-bar-request">
          Request
        </a>
      ) : (
        <Link to={CONTACT_PATH} className="mobile-action-bar-btn mobile-action-bar-request">
          Request Appointment
        </Link>
      )}
    </div>
  )
}
