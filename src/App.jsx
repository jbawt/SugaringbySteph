import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState, lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SocialDock from './components/SocialDock'
import MobileActionBar from './components/MobileActionBar'
import JsonLd from './components/JsonLd'
import Home from './pages/Home'
import { buildLocalBusinessSchema, buildWebsiteSchema } from './data/structuredData'

const Services = lazy(() => import('./pages/Services'))
const About = lazy(() => import('./pages/About'))
const FAQ = lazy(() => import('./pages/FAQ'))
const Contact = lazy(() => import('./pages/Contact'))
const ScrollProgress = lazy(() => import('./components/ScrollProgress'))

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function PageTransition({ children }) {
  const { pathname } = useLocation()

  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  )
}

function DeferredScrollProgress() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let idleId = 0
    let timeoutId = 0
    const enable = () => setReady(true)

    if (typeof window.requestIdleCallback === 'function') {
      idleId = window.requestIdleCallback(enable, { timeout: 2500 })
    } else {
      timeoutId = window.setTimeout(enable, 1200)
    }

    return () => {
      if (idleId && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId)
      }
      if (timeoutId) window.clearTimeout(timeoutId)
    }
  }, [])

  if (!ready) return null

  return (
    <Suspense fallback={null}>
      <ScrollProgress />
    </Suspense>
  )
}

export default function App() {
  return (
    <div className="has-mobile-action-bar min-h-screen flex flex-col bg-cream-100">
      <JsonLd data={[buildLocalBusinessSchema(), buildWebsiteSchema()]} />
      <DeferredScrollProgress />
      <ScrollToTop />
      <Navbar />
      <SocialDock />
      <MobileActionBar />
      <main className="flex-grow">
        <PageTransition>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </PageTransition>
      </main>
      <Footer />
    </div>
  )
}
