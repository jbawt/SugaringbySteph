import { useEffect, useState } from 'react'

const reviews = [
  {
    name: 'Nicôle Ginette',
    quote:
      "Okay, I HAVE to give this girl a shoutout because she is absolutely amazing! She has just started her own sugaring business, and let me tell you—she is good at what she does! From the second you walk in, she makes you feel so comfortable and relaxed, and she is honestly just the sweetest person. She takes her time, pays attention to detail, and you can tell she genuinely cares about making sure you leave happy. And the results?! So good! I couldn't be happier. If you've been thinking about trying sugaring, go see her! Support this amazing new small business because she deserves all the success coming her way. Five stars isn't even enough! I'll definitely be back!",
  },
  {
    name: 'Kendra Vandermeulen',
    quote:
      "Such a great experience! This was my first time trying sugaring and I'm so glad I finally gave it a try. She was so welcoming, professional, and made me feel completely comfortable throughout the whole appointment. She took the time to explain everything and made the process so easy. I'm super happy with the results and will definitely be back! Highly recommend!",
  },
  {
    name: 'Soobin Yang',
    quote:
      'Steph made me feel so comfortable and welcoming, and the sugaring experience was such a breeze with her! I would highly recommend. We had great conversations, she is so easy to chat with!',
  },
]

const AUTO_ROTATE_MS = 8000

export default function ReviewCarousel() {
  const [index, setIndex] = useState(0)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduceMotion(media.matches)
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (reduceMotion) return undefined

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % reviews.length)
    }, AUTO_ROTATE_MS)

    return () => window.clearInterval(timer)
  }, [reduceMotion, index])

  const goTo = (nextIndex) => {
    setIndex((nextIndex + reviews.length) % reviews.length)
  }

  const review = reviews[index]

  return (
    <div className="review-carousel relative mx-auto max-w-4xl">
      <svg
        className="mx-auto mb-6 h-12 w-12 text-gold-400"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>

      <div className="review-carousel-track relative" aria-live="polite">
        {reviews.map((item, i) => (
          <blockquote
            key={item.name}
            className={`review-slide px-2 text-center transition-opacity duration-500 ${
              i === index ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
            }`}
            aria-hidden={i !== index}
          >
            <p className="font-script text-xl italic leading-relaxed text-bronze-700 sm:text-2xl md:text-[1.65rem]">
              &ldquo;{item.quote}&rdquo;
            </p>
            <footer className="mt-6">
              <p className="font-medium text-gold-600">— {item.name}</p>
            </footer>
          </blockquote>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          className="rounded-full border border-gold-300/70 p-2 text-gold-600 transition-colors hover:bg-gold-100"
          aria-label="Previous review"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex items-center gap-2">
          {reviews.map((item, i) => (
            <button
              key={item.name}
              type="button"
              onClick={() => goTo(i)}
              className={`h-2.5 rounded-full transition-all ${
                i === index ? 'w-7 bg-gold-500' : 'w-2.5 bg-gold-300 hover:bg-gold-400'
              }`}
              aria-label={`Show review from ${item.name}`}
              aria-current={i === index}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(index + 1)}
          className="rounded-full border border-gold-300/70 p-2 text-gold-600 transition-colors hover:bg-gold-100"
          aria-label="Next review"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <p className="sr-only">
        Review {index + 1} of {reviews.length}: {review.name}
      </p>
    </div>
  )
}
