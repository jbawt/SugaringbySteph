const gold = '#D4AF37'
const bronze = '#8B6914'

function svgBase(className) {
  return {
    className,
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': true,
    focusable: 'false',
  }
}

export function LeafSprig({ className = 'w-16 h-28', flip = false }) {
  return (
    <svg {...svgBase(className)} viewBox="0 0 70 170" fill="none">
      <g transform={flip ? 'scale(-1,1) translate(-70,0)' : undefined}>
        <path
          d="M36 164c-2-28 6-52-2-78-6-20 4-42 2-62"
          stroke={gold}
          strokeWidth="1.15"
          strokeLinecap="round"
        />
        <path
          d="M35 148c-14-6-22-14-14-19 7 3 13 10 15 17"
          stroke={gold}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill={gold}
          fillOpacity="0.18"
        />
        <path
          d="M36 126c12-5 20-12 13-18-6 3-12 9-14 16"
          stroke={gold}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill={gold}
          fillOpacity="0.18"
        />
        <path
          d="M34 104c-13-6-20-13-13-18 6 3 12 9 14 16"
          stroke={gold}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill={gold}
          fillOpacity="0.16"
        />
        <path
          d="M35 82c11-5 18-12 11-17-5 3-10 8-12 15"
          stroke={gold}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill={gold}
          fillOpacity="0.16"
        />
        <path
          d="M34 58c-10-5-16-11-10-16 5 3 9 8 11 14"
          stroke={gold}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill={gold}
          fillOpacity="0.14"
        />
        <circle cx="35" cy="26" r="1.4" fill={gold} />
        <circle cx="48" cy="96" r="1.1" fill={bronze} fillOpacity="0.7" />
        <circle cx="22" cy="70" r="1.1" fill={bronze} fillOpacity="0.7" />
      </g>
    </svg>
  )
}

export function SmallFlower({ className = 'w-6 h-6' }) {
  return (
    <svg {...svgBase(className)} viewBox="0 0 32 32" fill="none">
      <g stroke={gold} strokeWidth="1" strokeLinejoin="round">
        <ellipse cx="16" cy="7.2" rx="2.4" ry="3.6" fill={gold} fillOpacity="0.12" />
        <ellipse cx="16" cy="24.8" rx="2.4" ry="3.6" fill={gold} fillOpacity="0.12" />
        <ellipse cx="7.2" cy="16" rx="3.6" ry="2.4" fill={gold} fillOpacity="0.12" />
        <ellipse cx="24.8" cy="16" rx="3.6" ry="2.4" fill={gold} fillOpacity="0.12" />
        <ellipse cx="9.6" cy="9.6" rx="2.3" ry="3.2" transform="rotate(-45 9.6 9.6)" fill={gold} fillOpacity="0.12" />
        <ellipse cx="22.4" cy="22.4" rx="2.3" ry="3.2" transform="rotate(-45 22.4 22.4)" fill={gold} fillOpacity="0.12" />
      </g>
      <circle cx="16" cy="16" r="2.1" fill={gold} />
      <circle cx="16" cy="16" r="0.7" fill={bronze} />
    </svg>
  )
}

export function HoneycombDots({ className = 'w-8 h-6' }) {
  return (
    <svg {...svgBase(className)} viewBox="0 0 36 22" fill="none">
      <path
        d="M8 2.4 13.2 5.4v6L8 14.4 2.8 11.4v-6L8 2.4Z"
        stroke={gold}
        strokeWidth="0.9"
        fill={gold}
        fillOpacity="0.12"
      />
      <path
        d="M17.5 8.2 22.7 11.2v6L17.5 20.2 12.3 17.2v-6l5.2-3Z"
        stroke={gold}
        strokeWidth="0.9"
        fill={gold}
        fillOpacity="0.1"
      />
      <circle cx="30" cy="6" r="1.3" fill={gold} />
    </svg>
  )
}

export function CurvedBranch({ className = 'w-40 h-40' }) {
  return (
    <svg {...svgBase(className)} viewBox="0 0 180 180" fill="none">
      <path
        d="M12 168c18-8 38-6 52-20 12-12 14-30 28-42 16-14 38-16 54-32 14-14 18-36 22-58"
        stroke={gold}
        strokeWidth="1.15"
        strokeLinecap="round"
      />
      <path d="M28 156c-10-8-16-18-8-22 7 4 12 12 10 20" stroke={gold} strokeWidth="1" strokeLinejoin="round" fill={gold} fillOpacity="0.16" />
      <path d="M50 140c10-6 18-14 10-20-6 4-12 10-12 18" stroke={gold} strokeWidth="1" strokeLinejoin="round" fill={gold} fillOpacity="0.16" />
      <path d="M72 118c-11-6-16-16-8-20 6 4 12 10 10 18" stroke={gold} strokeWidth="1" strokeLinejoin="round" fill={gold} fillOpacity="0.15" />
      <path d="M96 96c10-6 16-14 9-20-6 4-11 10-11 18" stroke={gold} strokeWidth="1" strokeLinejoin="round" fill={gold} fillOpacity="0.15" />
      <path d="M120 74c-10-5-15-14-8-18 5 3 11 9 10 16" stroke={gold} strokeWidth="1" strokeLinejoin="round" fill={gold} fillOpacity="0.14" />
      <g transform="translate(78 128)">
        <ellipse cx="0" cy="-5" rx="2" ry="3.2" stroke={gold} strokeWidth="0.8" fill={gold} fillOpacity="0.12" />
        <ellipse cx="0" cy="5" rx="2" ry="3.2" stroke={gold} strokeWidth="0.8" fill={gold} fillOpacity="0.12" />
        <ellipse cx="-5" cy="0" rx="3.2" ry="2" stroke={gold} strokeWidth="0.8" fill={gold} fillOpacity="0.12" />
        <ellipse cx="5" cy="0" rx="3.2" ry="2" stroke={gold} strokeWidth="0.8" fill={gold} fillOpacity="0.12" />
        <circle cx="0" cy="0" r="1.6" fill={gold} />
      </g>
      <circle cx="148" cy="28" r="1.3" fill={gold} />
      <circle cx="136" cy="46" r="1.1" fill={bronze} fillOpacity="0.75" />
      <path
        d="M154 22 159 25v5.6L154 33.6 149 30.6V25L154 22Z"
        stroke={gold}
        strokeWidth="0.8"
        fill={gold}
        fillOpacity="0.12"
      />
    </svg>
  )
}

export function FloralDivider({ className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`} aria-hidden="true">
      <span className="h-px w-8 sm:w-14 bg-gradient-to-r from-transparent to-gold-500/45" />
      <svg className="w-36 sm:w-48 h-8 text-gold-500" viewBox="0 0 220 36" fill="none">
        <path d="M8 18c28-1 42-8 58-2 10 4 16 2 26 0" stroke={gold} strokeWidth="1.1" strokeLinecap="round" />
        <path d="M38 17c-2-8 4-14 8-8 1 4-2 8-7 9" stroke={gold} strokeWidth="0.9" fill={gold} fillOpacity="0.16" />
        <path d="M56 18c3-8-2-13-7-8-2 4 1 8 6 9" stroke={gold} strokeWidth="0.9" fill={gold} fillOpacity="0.16" />
        <path d="M212 18c-28-1-42-8-58-2-10 4-16 2-26 0" stroke={gold} strokeWidth="1.1" strokeLinecap="round" />
        <path d="M182 17c2-8-4-14-8-8-1 4 2 8 7 9" stroke={gold} strokeWidth="0.9" fill={gold} fillOpacity="0.16" />
        <path d="M164 18c-3-8 2-13 7-8 2 4-1 8-6 9" stroke={gold} strokeWidth="0.9" fill={gold} fillOpacity="0.16" />
        <g transform="translate(110 18)">
          <ellipse cx="0" cy="-6.5" rx="2.1" ry="3.4" stroke={gold} strokeWidth="0.85" fill={gold} fillOpacity="0.14" />
          <ellipse cx="0" cy="6.5" rx="2.1" ry="3.4" stroke={gold} strokeWidth="0.85" fill={gold} fillOpacity="0.14" />
          <ellipse cx="-6.5" cy="0" rx="3.4" ry="2.1" stroke={gold} strokeWidth="0.85" fill={gold} fillOpacity="0.14" />
          <ellipse cx="6.5" cy="0" rx="3.4" ry="2.1" stroke={gold} strokeWidth="0.85" fill={gold} fillOpacity="0.14" />
          <ellipse cx="-4.6" cy="-4.6" rx="2" ry="2.8" transform="rotate(-45)" stroke={gold} strokeWidth="0.8" fill={gold} fillOpacity="0.12" />
          <ellipse cx="4.6" cy="4.6" rx="2" ry="2.8" transform="rotate(-45)" stroke={gold} strokeWidth="0.8" fill={gold} fillOpacity="0.12" />
          <circle cx="0" cy="0" r="2" fill={gold} />
          <circle cx="0" cy="0" r="0.7" fill={bronze} />
        </g>
        <circle cx="24" cy="18" r="1.1" fill={gold} />
        <circle cx="196" cy="18" r="1.1" fill={gold} />
      </svg>
      <span className="h-px w-8 sm:w-14 bg-gradient-to-l from-transparent to-gold-500/45" />
    </div>
  )
}

const cornerClass = {
  'top-left': 'botanical-corner-tl',
  'top-right': 'botanical-corner-tr',
  'bottom-left': 'botanical-corner-bl',
  'bottom-right': 'botanical-corner-br',
}

export function CornerAccent({ position = 'top-right', className = '' }) {
  return (
    <span className={`${cornerClass[position] || cornerClass['top-right']} ${className}`} aria-hidden="true">
      <CurvedBranch className="w-16 h-16 sm:w-20 sm:h-20" />
    </span>
  )
}

export function SidebarBotanical({ className = '' }) {
  return (
    <svg {...svgBase(className)} viewBox="0 0 120 220" fill="none">
      <path
        d="M58 210c-3-36 8-68-2-102-7-24 6-52 4-82"
        stroke={gold}
        strokeWidth="1.15"
        strokeLinecap="round"
      />
      <path d="M56 188c-16-7-24-16-15-22 8 4 15 11 16 20" stroke={gold} strokeWidth="1" fill={gold} fillOpacity="0.16" />
      <path d="M58 160c15-6 23-14 15-21-7 4-14 11-16 19" stroke={gold} strokeWidth="1" fill={gold} fillOpacity="0.16" />
      <path d="M55 132c-14-6-22-14-13-20 7 4 13 10 15 18" stroke={gold} strokeWidth="1" fill={gold} fillOpacity="0.15" />
      <path d="M57 104c13-6 20-13 12-19-6 4-12 10-13 17" stroke={gold} strokeWidth="1" fill={gold} fillOpacity="0.15" />
      <path d="M55 76c-12-5-18-12-11-17 5 3 10 8 12 15" stroke={gold} strokeWidth="1" fill={gold} fillOpacity="0.14" />
      <g transform="translate(78 118)">
        <ellipse cx="0" cy="-5.2" rx="2" ry="3.3" stroke={gold} strokeWidth="0.85" fill={gold} fillOpacity="0.12" />
        <ellipse cx="0" cy="5.2" rx="2" ry="3.3" stroke={gold} strokeWidth="0.85" fill={gold} fillOpacity="0.12" />
        <ellipse cx="-5.2" cy="0" rx="3.3" ry="2" stroke={gold} strokeWidth="0.85" fill={gold} fillOpacity="0.12" />
        <ellipse cx="5.2" cy="0" rx="3.3" ry="2" stroke={gold} strokeWidth="0.85" fill={gold} fillOpacity="0.12" />
        <circle cx="0" cy="0" r="1.7" fill={gold} />
      </g>
      <g transform="translate(36 54)">
        <ellipse cx="0" cy="-4.4" rx="1.7" ry="2.8" stroke={gold} strokeWidth="0.8" fill={gold} fillOpacity="0.12" />
        <ellipse cx="0" cy="4.4" rx="1.7" ry="2.8" stroke={gold} strokeWidth="0.8" fill={gold} fillOpacity="0.12" />
        <ellipse cx="-4.4" cy="0" rx="2.8" ry="1.7" stroke={gold} strokeWidth="0.8" fill={gold} fillOpacity="0.12" />
        <ellipse cx="4.4" cy="0" rx="2.8" ry="1.7" stroke={gold} strokeWidth="0.8" fill={gold} fillOpacity="0.12" />
        <circle cx="0" cy="0" r="1.4" fill={gold} />
      </g>
      <path d="M84 86 90 89.5v7L84 100 78 96.5v-7L84 86Z" stroke={gold} strokeWidth="0.85" fill={gold} fillOpacity="0.12" />
      <circle cx="56" cy="30" r="1.3" fill={gold} />
      <circle cx="72" cy="148" r="1.1" fill={bronze} fillOpacity="0.7" />
    </svg>
  )
}
