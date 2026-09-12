import { CornerAccent } from './Botanicals'

export default function ServiceCard({ name, price, description, featured = false }) {
  return (
    <div className={`card relative p-6 ${featured ? 'ring-2 ring-gold-500' : ''}`}>
      <CornerAccent position="top-right" className="opacity-[0.16]" />
      {featured && (
        <span className="inline-block px-3 py-1 text-xs font-medium text-gold-600 bg-gold-100 rounded-full mb-3">
          Most Popular
        </span>
      )}
      <h3 className="font-script text-2xl text-gold-600 mb-2">{name}</h3>
      <p className="text-2xl font-semibold text-bronze-700 mb-3">{price}</p>
      {description && (
        <p className="text-bronze-500/70 text-sm">{description}</p>
      )}
    </div>
  )
}
