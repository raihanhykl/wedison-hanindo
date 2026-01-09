'use client'

import { motion } from 'framer-motion'
import { BsWhatsapp } from 'react-icons/bs'
import { WHATSAPP_LINKS } from '@/utils/whatsappLinks'
import { trackWhatsAppClick } from '@/utils/analytics'

export default function FloatingWhatsAppButton() {
  const handleClick = () => {
    trackWhatsAppClick('floating-button')
  }

  return (
    <motion.a
      href={WHATSAPP_LINKS.general}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 bg-success-green text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all group"
      aria-label="Chat WhatsApp"
    >
      {/* Pulse Animation */}
      <motion.div
        className="absolute inset-0 bg-success-green rounded-full"
        animate={{
          scale: [1, 1.3, 1.3],
          opacity: [0.8, 0, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeOut',
        }}
      />
      
      {/* WhatsApp Icon */}
      <div className="relative z-10">
        <BsWhatsapp className="text-3xl md:text-4xl" />
      </div>
      
      {/* Tooltip - Desktop Only */}
      <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 hidden md:block opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        <div className="bg-slate-900 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-semibold">
          Chat WhatsApp
          <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-slate-900"></div>
        </div>
      </div>
    </motion.a>
  )
}
