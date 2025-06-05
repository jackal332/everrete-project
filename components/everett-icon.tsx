"use client"

interface EverettIconProps {
  size?: number
  className?: string
}

export function EverettIcon({ size = 40, className = "" }: EverettIconProps) {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer ring */}
        <circle cx="20" cy="20" r="18" fill="url(#everettGradient)" stroke="#8B4513" strokeWidth="2" />

        {/* Inner design */}
        <path d="M12 20 L16 16 L20 20 L24 16 L28 20 L24 24 L20 20 L16 24 Z" fill="#8B4513" opacity="0.8" />

        {/* Center E */}
        <text x="20" y="26" textAnchor="middle" fill="#8B4513" fontSize="16" fontWeight="bold" fontFamily="serif">
          E
        </text>

        <defs>
          <linearGradient id="everettGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="50%" stopColor="#DEB887" />
            <stop offset="100%" stopColor="#CD853F" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
