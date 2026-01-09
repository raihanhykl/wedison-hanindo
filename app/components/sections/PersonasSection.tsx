'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Button from '../ui/Button'
import { WHATSAPP_LINKS } from '@/utils/whatsappLinks'

interface Persona {
  id: string
  title: string
  copy: string
  secondaryCopy: string
}

// Helper function to get personas background image path - supports multiple extensions
const getPersonasImagePath = (): string => {
  // Priority: .jpg > .png > .webp
  // Try .jpg first (most common), then .png, then .webp
  // Will fallback to Unsplash if local image not found (handled by onError)
  return '/images/personas/personas-background.jpg'
}

export default function PersonasSection() {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  
  // Check if image exists and loaded
  useEffect(() => {
    const img = new Image()
    img.src = getPersonasImagePath()
    img.onload = () => {
      setImageLoaded(true)
      setImageError(false)
    }
    img.onerror = () => {
      setImageError(true)
      setImageLoaded(false)
    }
  }, [])
  
  const personas: Persona[] = [
    {
      id: 'professional',
      title: 'Profesional Urban',
      copy: 'Berangkat jam 7, charging selesai sebelum meeting jam 8',
      secondaryCopy: 'Hemat waktu, produktif lebih tinggi',
    },
    {
      id: 'entrepreneur',
      title: 'Young Entrepreneur',
      copy: 'Hemat Rp 10 juta/tahun vs motor bensin, investasi cerdas',
      secondaryCopy: 'ROI lebih cepat dari yang dikira',
    },
    {
      id: 'eco',
      title: 'Eco-Conscious Driver',
      copy: '0 emisi, 0 polusi, setiap km Anda selamatkan udara Jakarta',
      secondaryCopy: 'Join green movement, berkendara dengan purpose',
    },
    {
      id: 'gig',
      title: 'Gig Worker / Delivery Driver',
      copy: '100+ km per charge = lebih banyak orderan, lebih besar earning',
      secondaryCopy: 'Bisnis Anda lebih scalable & profitable',
    },
  ]
  
  return (
    <section id="personas" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-800 mb-4">
            Wedison untuk{' '}
            <span className="text-electric-blue">
              Siapa Saja
            </span>
          </h2>
          <p className="text-xl text-slate-600">
            Motor listrik yang cocok untuk gaya hidup dan bisnis Anda
          </p>
        </motion.div>
        
        {/* Background Image with Overlay Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden min-h-[500px] md:min-h-[600px]"
          style={{
            backgroundImage: `url(${imageError ? 'https://source.unsplash.com/featured/1920x1080/?electric,motorcycle,urban,professional' : getPersonasImagePath()})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Placeholder Badge - hanya muncul jika menggunakan local image path, belum load, dan belum error */}
          {getPersonasImagePath().startsWith('/images/personas/') && !imageLoaded && !imageError && (
            <div className="absolute top-4 left-4 z-20 bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold text-sm shadow-lg border-2 border-yellow-600">
              PLACEHOLDER IMAGE - Upload actual asset
              <div className="text-xs mt-1 opacity-80">Path: {getPersonasImagePath()}</div>
            </div>
          )}
          
          {/* Overlay untuk readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
          
          {/* Content Overlay */}
          <div className="relative z-10 h-full flex flex-col justify-center items-center px-6 py-12 md:py-16">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              {/* Personas List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {personas.map((persona, index) => (
                  <motion.div
                    key={persona.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
                  >
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                      {persona.title}
                    </h3>
                    <p className="text-white/90 text-lg mb-2 leading-relaxed">
                      {persona.copy}
                    </p>
                    <p className="text-white/75 text-sm italic">
                      {persona.secondaryCopy}
                    </p>
                  </motion.div>
                ))}
              </div>
              
              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="pt-8"
              >
                <a
                  href={WHATSAPP_LINKS.general}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-electric-blue text-white font-bold text-lg md:text-xl rounded-full hover:bg-blue-600 transition-all hover:scale-105 shadow-[0_10px_40px_rgba(0,0,0,0.5)] border-4 border-white/80 backdrop-blur-sm"
                >
                  Konsultasi Gratis via WhatsApp
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
