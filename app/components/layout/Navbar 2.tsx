'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiPhone } from 'react-icons/fi'
import { BsWhatsapp } from 'react-icons/bs'
import Button from '../ui/Button'
import Logo from '../ui/Logo'
import { WHATSAPP_LINKS } from '@/utils/whatsappLinks'
import { CONTACT } from '@/utils/constants'
import { trackWhatsAppClick } from '@/utils/analytics'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const handleWhatsAppClick = () => {
    trackWhatsAppClick('navbar')
  }
  
  const navLinks = [
    { label: 'Models', href: '#specs' },
    { label: 'SuperCharge', href: '#infrastructure' },
    { label: 'Showroom', href: '#showroom' },
    { label: 'Testimonial', href: '#testimonials' },
  ]
  
  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center"
            >
              <Logo size="large" />
            </motion.div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`font-medium transition-colors hover:text-electric-blue ${
                    isScrolled ? 'text-slate-700' : 'text-white'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
            
            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* Phone Number - Desktop Only */}
              <a
                href={`tel:${CONTACT.phone}`}
                className="hidden lg:flex items-center gap-2 text-sm font-medium hover:text-electric-blue transition-colors"
              >
                <FiPhone className={isScrolled ? 'text-electric-blue' : 'text-white'} />
                <span className={isScrolled ? 'text-slate-700' : 'text-white'}>
                  {CONTACT.phone}
                </span>
              </a>
              
              {/* WhatsApp Button */}
              <Button
                href={WHATSAPP_LINKS.general}
                onClick={handleWhatsAppClick}
                variant="primary"
                size="small"
                className="hidden md:inline-flex"
              >
                <BsWhatsapp className="text-xl" />
                <span>WhatsApp</span>
              </Button>
              
              {/* Mobile WhatsApp Button */}
              <a
                href={WHATSAPP_LINKS.general}
                onClick={handleWhatsAppClick}
                className="md:hidden bg-electric-blue p-3 rounded-full text-white hover:scale-110 transition-transform"
              >
                <BsWhatsapp className="text-xl" />
              </a>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`md:hidden p-2 rounded-lg ${
                  isScrolled ? 'text-slate-700' : 'text-white'
                }`}
              >
                {isMobileMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>
      
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween' }}
            className="fixed inset-0 z-40 bg-white md:hidden"
          >
            <div className="flex flex-col h-full pt-24 px-6">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-4 text-2xl font-semibold text-slate-800 border-b border-slate-200 hover:text-electric-blue transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8"
              >
                <a href={`tel:${CONTACT.phone}`} className="flex items-center gap-3 text-lg mb-4">
                  <FiPhone className="text-electric-blue text-xl" />
                  <span>{CONTACT.phone}</span>
                </a>
                
                <Button
                  href={WHATSAPP_LINKS.general}
                  onClick={handleWhatsAppClick}
                  variant="primary"
                  size="large"
                  fullWidth
                >
                  <BsWhatsapp className="text-2xl" />
                  <span>Chat WhatsApp</span>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
