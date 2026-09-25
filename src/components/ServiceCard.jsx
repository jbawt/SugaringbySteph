import { CornerAccent } from './Botanicals'

export default function ServiceCard({ name, price, description, featured = false, className = '' }) {
  return (
    <div className={`card relative flex h-full flex-col justify-center p-6 ${featured ? 'bento-featured' : ''} ${className}`.trim()}>
      <CornerAccent position="top-right" className="opacity-[0.16]" />
      {featured && (
        <span className="mb-3 inline-block w-fit self-start rounded-full bg-gold-500 px-3 py-1 text-xs font-medium text-white">
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
