'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  className?: string
  size?: 'small' | 'medium' | 'large' | 'xlarge'
  showText?: boolean
}

export default function Logo({ className = '', size = 'medium', showText = false }: LogoProps) {
  const [imageError, setImageError] = useState(false)

  const sizeClasses = {
    small: 'h-10 w-10',
    medium: 'h-16 w-16',       // Increased from h-12 w-12
    large: 'h-24 w-24',        // Increased from h-16 w-16 (96px)
    xlarge: 'h-32 w-32',       // Increased from h-20 w-20 (128px)
  }

  const textSizes = {
    small: 'text-lg',
    medium: 'text-xl',
    large: 'text-2xl',
    xlarge: 'text-3xl',
  }

  const imageSizes = {
    small: 40,
    medium: 64,                // Increased from 48
    large: 96,                 // Increased from 64
    xlarge: 128,               // Increased from 80
  }

  // Try multiple formats - priority: .png > .svg > .webp > .jpg
  const getLogoPath = (): string => {
    // Try different formats
    const formats = ['/images/logo/wedison-logo.png', '/images/logo/wedison-logo.svg', '/images/logo/wedison-logo.webp', '/images/logo/wedison-logo.jpg']
    // Return first format (will check if exists via onError)
    return formats[0]
  }

  // Try multiple formats - priority: .png > .svg > .webp > .jpg
  // For SVG, we need to handle it differently (can't use Next.js Image for SVG)
  const logoPath = '/images/logo/wedison-logo.png'

  // Default to center alignment unless overridden by className
  const defaultJustify = className.includes('justify') ? '' : 'justify-center'
  return (
    <Link href="/" className={`flex items-center ${defaultJustify} ${className}`}>
      {/* Logo Image */}
      <div className={`relative ${sizeClasses[size]} flex-shrink-0 flex items-center justify-center overflow-hidden`}>
        {!imageError ? (
          <Image
            src={logoPath}
            alt="Wedison Logo"
            width={imageSizes[size]}
            height={imageSizes[size]}
            className="object-contain w-full h-full"
            priority
            onError={() => setImageError(true)}
          />
        ) : (
          // Fallback: Mountain W shape using CSS/SVG
          <div className="w-full h-full flex items-center justify-center">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Mountain W shape */}
              <path
                d="M10 80 L25 30 L40 60 L55 20 L70 60 L85 30 L90 80 Z"
                fill="url(#mountainGradient)"
                stroke="#06B6D4"
                strokeWidth="2"
              />
              <defs>
                <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#22C55E" />
                  <stop offset="100%" stopColor="#16A34A" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        )}
      </div>
      
      {/* Logo Text */}
      {showText && (
        <span className={`font-bold ${textSizes[size]} text-secondary-teal`}>
          WEDISON
        </span>
      )}
    </Link>
  )
}
