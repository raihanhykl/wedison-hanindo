'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiMapPin } from 'react-icons/fi'

// Helper function to get smart home charging background image path - supports multiple extensions
const getHomeChargingImagePath = (): string => {
  // Priority: .webp > .jpg > .png
  // Will fallback to Unsplash if local image not found (handled by onError)
  // User uploaded .webp, so we use that
  return '/images/infrastructure/smart-home-charging.webp'
}

export default function InfrastructureSection() {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  // Check if image exists and loaded
  useEffect(() => {
    const imagePath = getHomeChargingImagePath()
    const img = new Image()
    img.src = imagePath
    
    // Handle cached images
    if (img.complete && img.naturalWidth > 0 && img.naturalHeight > 0) {
      setImageLoaded(true)
      setImageError(false)
      return
    }
    
    img.onload = () => {
      setImageLoaded(true)
      setImageError(false)
    }
    img.onerror = () => {
      setImageError(true)
      setImageLoaded(false)
    }
  }, [])

  const benefits = [
    'Unified charging experience',
    'Loyalty points & rewards',
    'Priority allocation untuk Wedison users',
    'Easy payment via mobile app',
    '24/7 charging availability',
  ]
  
  const homeChargingBenefits = [
    'Gratis instalasi home charger (type: 3.3kW)',
    'Works dengan: AC socket (220V), or direct installation',
    'Smart scheduling: Charge di jam-jam rendah tarif',
    'Estimated cost: Rp 3,000 per 100km (vs Rp 15,000 bensin)',
  ]
  
  const homeChargingSteps = [
    'Pesan instalasi via WhatsApp',
    'Teknisi survey rumah (free)',
    'Install dalam 2-3 hari',
    'Connect ke app, mulai charging schedule',
    'Enjoy 24/7 charging at home!',
  ]
  
  return (
    <section id="infrastructure" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-800 mb-4">
            Wedison{' '}
            <span className="text-electric-blue">
              SuperCharge Network
            </span>
          </h2>
          <p className="text-xl text-slate-600">
            Charging infrastructure terluas untuk motor listrik di Indonesia
          </p>
        </motion.div>
        
        {/* Map Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-slate-100 rounded-2xl p-8 shadow-lg">
            <div className="aspect-video bg-slate-200 rounded-xl flex items-center justify-center">
              <div className="text-center text-slate-600">
                <FiMapPin className="text-6xl mx-auto mb-4 text-electric-blue" />
                <p className="text-xl font-semibold mb-2">SuperCharge Network Map</p>
                <p className="text-sm">Peta lokasi charging station Wedison</p>
                <p className="text-xs mt-2 text-slate-500">
                  Replace with actual Google Maps embed showing all charging stations
                </p>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Network Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-2xl p-8 md:p-12 border-2 border-cyan-200">
            <h3 className="text-3xl font-bold text-slate-800 mb-6 text-center">
              SuperCharge Network Benefits
            </h3>
            <p className="text-lg text-slate-700 text-center mb-8 max-w-3xl mx-auto">
              Kami berkomitmen untuk membangun infrastruktur charging terbaik di Indonesia untuk mendukung perjalanan Anda.
            </p>
            
            {/* Benefits Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 bg-white rounded-lg p-4"
                >
                  <span className="text-slate-700">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Home Charging */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div 
            className="relative rounded-2xl p-8 md:p-12 overflow-hidden"
            style={{
              backgroundImage: `url(${imageError ? 'https://source.unsplash.com/featured/1920x1080/?electric,charger,home,wall,charging,station' : getHomeChargingImagePath()})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            {/* Placeholder Badge - hanya muncul jika menggunakan local image path dan belum load */}
            {getHomeChargingImagePath().startsWith('/images/infrastructure/') && !imageLoaded && !imageError && (
              <div className="absolute top-4 left-4 z-20 bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold text-sm shadow-lg border-2 border-yellow-600">
                PLACEHOLDER IMAGE - Upload actual asset
                <div className="text-xs mt-1 opacity-80">Path: {getHomeChargingImagePath()}</div>
              </div>
            )}
            
            {/* Hidden img tag untuk error handling dan load detection */}
            <img
              src={getHomeChargingImagePath()}
              alt=""
              className="hidden"
              onError={(e) => {
                setImageError(true)
                setImageLoaded(false)
              }}
              onLoad={(e) => {
                // Check if image is actually loaded (for cached images)
                const target = e.target as HTMLImageElement
                if (target.complete && target.naturalWidth > 0 && target.naturalHeight > 0) {
                  setImageLoaded(true)
                  setImageError(false)
                }
              }}
            />
            
            {/* Overlay untuk readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/80" />
            
            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-white mb-6 text-center">
                Smart Home Charging
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Benefits */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                  <h4 className="text-xl font-semibold text-white mb-4">Benefits:</h4>
                  <div className="space-y-4">
                    {homeChargingBenefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-4"
                      >
                        <div className="flex-shrink-0 w-8 h-8 bg-electric-blue text-white rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <span className="text-white">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Setup Process */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                  <h4 className="text-xl font-semibold text-white mb-4">Setup Process:</h4>
                  <div className="space-y-4">
                    {homeChargingSteps.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-4"
                      >
                        <div className="flex-shrink-0 w-8 h-8 bg-electric-blue text-white rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <span className="text-white">{step}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
