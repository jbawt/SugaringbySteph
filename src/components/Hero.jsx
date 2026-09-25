import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/Logo_transparent.png'
import { LeafSprig, HoneycombDots, SmallFlower } from './Botanicals'

/**
 * @param {{ className?: string }} props
 */
export default function Hero({ className = '' }) {
  const sectionRef = useRef(null)
  const glowRef = useRef(null)
  const rafRef = useRef(0)
  const pointerRef = useRef({ x: 62, y: 38 })
  const [entered, setEntered] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncMotion = () => setReduceMotion(media.matches)
    syncMotion()
    media.addEventListener('change', syncMotion)

    const enterTimer = window.setTimeout(() => setEntered(true), media.matches ? 0 : 40)

    return () => {
      media.removeEventListener('change', syncMotion)
      window.clearTimeout(enterTimer)
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const applyParallax = () => {
    rafRef.current = 0
    const { x, y } = pointerRef.current

    if (glowRef.current) {
      glowRef.current.style.setProperty('--glow-x', `${x}%`)
      glowRef.current.style.setProperty('--glow-y', `${y}%`)
    }

  }

  const handleMouseMove = (event) => {
    if (reduceMotion || !sectionRef.current) return

    const bounds = sectionRef.current.getBoundingClientRect()
    pointerRef.current = {
      x: ((event.clientX - bounds.left) / bounds.width) * 100,
      y: ((event.clientY - bounds.top) / bounds.height) * 100,
    }

    if (!rafRef.current) {
      rafRef.current = window.requestAnimationFrame(applyParallax)
    }
  }

  const reveal = (delay = 'duration-1000') =>
    reduceMotion
      ? 'opacity-100 translate-y-0'
      : `transition-all ${delay} ease-out ${
          entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className={`relative min-h-[100svh] overflow-hidden mesh-gradient-hero ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cream-100 via-cream-50/40 to-gold-100/40 dark:from-cream-100 dark:via-cream-50/50 dark:to-gold-100/20" />
      <div
        ref={glowRef}
        className="hero-parallax-glow pointer-events-none absolute inset-0 z-[1]"
        aria-hidden="true"
      />

      <LeafSprig className="botanical-sway pointer-events-none absolute bottom-10 left-2 z-[2] hidden w-20 h-44 opacity-25 md:block lg:left-8" />
      <LeafSprig
        flip
        className="botanical-sway pointer-events-none absolute bottom-8 right-2 z-[2] hidden w-20 h-44 opacity-20 md:block lg:right-8"
      />
      <HoneycombDots className="pointer-events-none absolute left-10 top-28 z-[2] hidden w-9 h-6 opacity-20 md:block" />

      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-7xl grid-cols-1 items-center gap-6 px-4 pb-16 pt-24 sm:gap-10 sm:px-6 sm:pb-20 sm:pt-28 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pt-24">
        <div className="order-2 flex flex-col lg:order-1 lg:col-span-6 xl:col-span-5">
          <div className="order-2 lg:order-1">
            <div
              className={`mb-6 inline-flex items-center gap-2 rounded-full border border-gold-300/60 bg-cream-50/70 px-3.5 py-1.5 backdrop-blur-md dark:border-gold-300/40 dark:bg-cream-200/70 ${reveal()}`}
              style={{ transitionDelay: entered ? '80ms' : '0ms' }}
            >
              <SmallFlower className="h-4 w-4" />
              <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-bronze-600">
                Natural Hair Removal
              </span>
            </div>

            <h1
              className={`font-script text-[3.15rem] leading-[0.95] text-gold-600 sm:text-6xl lg:text-[4.6rem] xl:text-[5.1rem] ${reveal()}`}
              style={{ transitionDelay: entered ? '180ms' : '0ms' }}
            >
              <span className="sr-only">Sugaring by Steph — </span>
              <span className="bg-gradient-to-r from-bronze-700 via-gold-500 to-gold-600 bg-clip-text text-transparent">
                Smooth Skin,
              </span>
              <span className="mt-1 block bg-gradient-to-r from-gold-600 via-gold-500 to-bronze-500 bg-clip-text text-transparent">
                Naturally
              </span>
            </h1>

            <p
              className={`mt-6 max-w-md text-lg leading-relaxed text-bronze-500/85 sm:text-xl ${reveal()}`}
              style={{ transitionDelay: entered ? '320ms' : '0ms' }}
            >
              Natural. Gentle. Organic.
              <span className="mt-1 block text-base text-bronze-500/70 sm:text-lg">
                The sweet alternative to waxing — refined care for smoother, healthier skin.
              </span>
            </p>
          </div>

          <div
            className={`order-1 mb-8 mt-0 flex flex-col gap-3 sm:flex-row sm:items-center lg:order-2 lg:mb-0 lg:mt-8 ${reveal()}`}
            style={{ transitionDelay: entered ? '460ms' : '0ms' }}
          >
            <Link
              to="/services"
              className="btn-primary hover:scale-105 hover:shadow-lg"
            >
              View Our Services
            </Link>
            <Link
              to="/contact"
              className="btn-secondary hover:scale-105 hover:shadow-lg"
            >
              Book Appointment
            </Link>
          </div>
        </div>

        <div className="relative order-1 flex justify-center lg:order-2 lg:col-span-6 xl:col-span-7 lg:justify-end">
          <div
            className={`relative ${reveal('duration-1000')}`}
            style={{ transitionDelay: entered ? '220ms' : '0ms' }}
          >
            <div className="absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-gold-300/25 via-transparent to-gold-500/10 blur-2xl" />
            <div className="hero-visual-card relative flex h-[14rem] w-[14rem] items-center justify-center rounded-full border border-gold-300/50 bg-cream-50/60 shadow-[0_20px_60px_-24px_rgba(139,105,20,0.28)] backdrop-blur-sm dark:border-gold-300/40 dark:bg-cream-200/50 dark:shadow-[0_20px_60px_-24px_rgba(0,0,0,0.55)] sm:h-[22rem] sm:w-[22rem] lg:h-[28rem] lg:w-[28rem]">
              <div className="flex h-[86%] w-[86%] items-center justify-center overflow-hidden rounded-full border border-gold-200/80 bg-cream-100/80 dark:border-gold-200/50 dark:bg-cream-100/80">
                <img
                  src={logo}
                  alt="Sugaring by Steph"
                  className="hero-logo"
                />
              </div>
            </div>

            <div className="absolute -bottom-1 left-0 max-w-[8.5rem] rounded-xl border border-gold-300/40 bg-cream-50/80 px-2.5 py-1.5 shadow-[0_10px_30px_-16px_rgba(139,105,20,0.35)] backdrop-blur-md dark:border-gold-300/35 dark:bg-cream-200/85 sm:-left-6 sm:bottom-10 sm:max-w-[11.5rem] sm:rounded-2xl sm:px-4 sm:py-3">
              <p className="font-script text-sm leading-tight text-gold-700 sm:text-lg">100% Natural</p>
              <p className="mt-0.5 text-[10px] text-bronze-500/80 sm:text-xs">Sugar, lemon & water</p>
            </div>

            <div className="absolute -right-1 -top-1 rounded-full border border-gold-300/40 bg-cream-50/80 px-2.5 py-1 shadow-md backdrop-blur-md dark:border-gold-300/35 dark:bg-cream-200/85 sm:-right-4 sm:top-8 sm:px-3.5 sm:py-2">
              <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-bronze-600 sm:text-[11px] sm:tracking-[0.16em]">
                4–6 week results
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2">
        <svg className="scroll-indicator h-6 w-6 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
