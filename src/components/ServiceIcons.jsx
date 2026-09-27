import intimateIcon from '../assets/icon-intimate.png'
import bodyIcon from '../assets/icon-body.png'
import faceIcon from '../assets/icon-face.png'

/** Decorative category icons — nearby headings provide the accessible name. */
function ServiceIcon({ src }) {
  return (
    <div
      className="w-20 h-20 mx-auto mb-5 rounded-full border border-gold-400 overflow-hidden group-hover:border-gold-500 transition-colors duration-300"
      aria-hidden="true"
    >
      <img src={src} alt="" className="w-full h-full object-cover" />
    </div>
  )
}

export function IntimateIcon() {
  return <ServiceIcon src={intimateIcon} />
}

export function BodyIcon() {
  return <ServiceIcon src={bodyIcon} />
}

export function FaceIcon() {
  return <ServiceIcon src={faceIcon} />
}
