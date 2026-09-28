import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/Logo_nav.webp'
import ThemeToggle from './ThemeToggle'
import { CONTACT_PATH, PHONE_DISPLAY, PHONE_TEL } from '../data/contact'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact', href: CONTACT_PATH },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="navbar-glass fixed top-0 left-0 right-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Sugaring by Steph"
              width={64}
              height={64}
              decoding="async"
              className="h-16 w-16 object-contain"
            />
            <div className="hidden sm:block">
              <span className="font-script text-2xl text-gold-600">Sugaring</span>
              <span className="font-script text-xl text-bronze-500 ml-1">by Steph</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'nav-link-active' : ''}`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <a 
              href={PHONE_TEL} 
              className="hidden lg:flex items-center gap-2 text-gold-600 hover:text-gold-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="font-medium">{PHONE_DISPLAY}</span>
            </a>

            <Link
              to={CONTACT_PATH}
              className="hidden md:inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 shadow-md shadow-gold-500/20 transition-colors"
            >
              Request Appointment
            </Link>

            <ThemeToggle className="hidden md:inline-flex" />

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="md:hidden p-2 rounded-lg text-bronze-500 hover:bg-gold-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gold-200">
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-gold-100 text-gold-600' 
                        : 'text-bronze-500 hover:bg-gold-50'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
              <a 
                href={PHONE_TEL} 
                className="flex items-center gap-2 px-4 py-3 text-gold-600 font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {PHONE_DISPLAY}
              </a>
              <Link
                to={CONTACT_PATH}
                onClick={() => setMobileMenuOpen(false)}
                className="mx-4 mt-1 btn-primary text-center"
              >
                Request Appointment
              </Link>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-sm font-medium text-bronze-500">Theme</span>
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
