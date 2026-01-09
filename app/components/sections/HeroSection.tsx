'use client'

import { motion } from 'framer-motion'
import { BsWhatsapp } from 'react-icons/bs'
import { FiMapPin, FiChevronDown } from 'react-icons/fi'
import Button from '../ui/Button'
import { WHATSAPP_LINKS } from '@/utils/whatsappLinks'
import { trackWhatsAppClick } from '@/utils/analytics'

// This section has been moved below the new HeroSlider
// Keeping it as a secondary CTA section
export default function HeroSection() {
  const stats = [
    { icon: '⚡', label: '15 menit charge', value: '10-80%' },
    { icon: '🔋', label: 'Range', value: '135 km' },
    { icon: '💨', label: 'Emisi', value: '0%' },
  ]
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }
  
  return (
    <section id="hero-cta" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Background Image/Video Placeholder */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/20 via-slate-900/80 to-slate-900/90 z-10" />
        {/* Placeholder for hero image - replace with actual image */}
        <div className="w-full h-full bg-slate-800 flex items-center justify-center">
          <div className="text-slate-600 text-center">
            <div className="text-8xl mb-4">⚡</div>
            <p className="text-xl">Hero Background Image/Video</p>
            <p className="text-sm mt-2">Replace with actual Wedison motor image</p>
          </div>
        </div>
      </div>
      
      {/* Animated Charging Indicator */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 right-1/4 z-10 text-6xl"
      >
        ⚡
      </motion.div>
      
      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center lg:text-left"
      >
        <div className="max-w-3xl">
          {/* Primary Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            <span className="text-6xl sm:text-7xl lg:text-8xl">⚡</span>
            <br />
            Charge 10-80% dalam{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              15 Menit?
            </span>
          </motion.h1>
          
          {/* Sub-headline */}
          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-2xl text-slate-300 mb-10 leading-relaxed"
          >
            Dari 10% ke 80%, sekali minum kopi udah full battery. SuperCharge Technology{' '}
            <span className="text-secondary-teal font-semibold">pertama di kelasnya.</span>
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <Button
              href={WHATSAPP_LINKS.hero}
              onClick={() => trackWhatsAppClick('hero')}
              variant="primary"
              size="large"
              className="text-lg"
            >
              <BsWhatsapp className="text-2xl" />
              <span>Chat WhatsApp - Info Lengkap</span>
            </Button>
            
            <Button
              href="#showroom"
              variant="outline"
              size="large"
              className="text-lg border-white text-white hover:bg-white hover:text-slate-900"
            >
              <FiMapPin className="text-xl" />
              <span>Lihat Showroom Pondok Indah</span>
            </Button>
          </motion.div>
          
          {/* Stats Overlay */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-6 justify-center lg:justify-start"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-md rounded-xl px-6 py-4 border border-white/20"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{stat.icon}</span>
                  <div>
                    <div className="text-white font-bold text-xl">{stat.value}</div>
                    <div className="text-slate-300 text-sm">{stat.label}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center gap-2 text-white/70">
          <span className="text-sm">Scroll untuk lihat lebih</span>
          <FiChevronDown className="text-2xl" />
        </div>
      </motion.div>
    </section>
  )
}
