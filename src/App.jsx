import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SocialDock from './components/SocialDock'
import MobileActionBar from './components/MobileActionBar'
import ScrollProgress from './components/ScrollProgress'
import JsonLd from './components/JsonLd'
import Home from './pages/Home'
import Services from './pages/Services'
import About from './pages/About'
import FAQ from './pages/FAQ'
import Contact from './pages/Contact'
import { buildLocalBusinessSchema, buildWebsiteSchema } from './data/structuredData'

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

export default function App() {
  return (
    <div className="has-mobile-action-bar min-h-screen flex flex-col bg-cream-100">
      <JsonLd data={[buildLocalBusinessSchema(), buildWebsiteSchema()]} />
      <ScrollProgress />
      <ScrollToTop />
      <Navbar />
      <SocialDock />
      <MobileActionBar />
      <main className="flex-grow">
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </PageTransition>
      </main>
      <Footer />
    </div>
  )
}
