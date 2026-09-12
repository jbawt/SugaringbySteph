import intimateIcon from '../assets/icon-intimate.png'
import bodyIcon from '../assets/icon-body.png'
import faceIcon from '../assets/icon-face.png'

function ServiceIcon({ src, alt }) {
  return (
    <div className="w-20 h-20 mx-auto mb-5 rounded-full border border-gold-400 overflow-hidden group-hover:border-gold-500 transition-colors duration-300">
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  )
}

export function IntimateIcon() {
  return <ServiceIcon src={intimateIcon} alt="" />
}

export function BodyIcon() {
  return <ServiceIcon src={bodyIcon} alt="" />
}

export function FaceIcon() {
  return <ServiceIcon src={faceIcon} alt="" />
}
