import { useState } from 'react'

export default function FAQItem({ question, answer, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-gold-200 last:border-b-0">
      <button
        className="w-full py-5 flex items-center justify-between text-left group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-lg text-bronze-700 group-hover:text-gold-600 transition-colors pr-4">
          {question}
        </span>
        <span className={`flex-shrink-0 w-8 h-8 rounded-full bg-gold-100 flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg 
            className="w-5 h-5 text-gold-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 pb-5' : 'max-h-0'
        }`}
      >
        <p className="text-bronze-500/80 leading-relaxed">{answer}</p>
      </div>
    </div>
  )
}
