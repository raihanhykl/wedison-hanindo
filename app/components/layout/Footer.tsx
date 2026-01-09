'use client'

import { motion } from 'framer-motion'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import { BsWhatsapp, BsInstagram, BsTiktok, BsYoutube, BsLinkedin } from 'react-icons/bs'
import Logo from '../ui/Logo'
import { CONTACT } from '@/utils/constants'
import { WHATSAPP_LINKS } from '@/utils/whatsappLinks'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  const quickLinks = {
    models: [
      { label: 'EdPower', href: '#specs' },
      { label: 'Athena', href: '#specs' },
      { label: 'Victory', href: '#specs' },
      { label: 'Mini', href: '#specs' },
    ],
    company: [
      { label: 'About Wedison', href: '#' },
      { label: 'Blog & News', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Contact', href: '#showroom' },
    ],
    support: [
      { label: 'Service Centers', href: '#showroom' },
      { label: 'Charging Network', href: '#infrastructure' },
      { label: 'Warranty Info', href: '#specs' },
      { label: 'FAQ', href: '#' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
    ],
  }
  
  const socialMedia = [
    { icon: <BsInstagram />, label: 'Instagram', href: 'https://instagram.com/wedison' },
    { icon: <BsTiktok />, label: 'TikTok', href: 'https://tiktok.com/@wedison' },
    { icon: <BsYoutube />, label: 'YouTube', href: 'https://youtube.com/@wedison' },
    { icon: <BsLinkedin />, label: 'LinkedIn', href: 'https://linkedin.com/company/wedison' },
  ]
  
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="mb-2">
              <Logo size="xlarge" showText={false} />
            </div>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Motor listrik pertama dengan SuperCharge technology di Indonesia. 
              Driving the future of sustainable mobility.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <FiMapPin className="text-electric-blue mt-1 flex-shrink-0" />
                <span className="text-slate-400">{CONTACT.showroomAddress}</span>
              </div>
              <div className="flex items-center gap-3">
                <FiPhone className="text-electric-blue flex-shrink-0" />
                <a href={`tel:${CONTACT.phone}`} className="text-slate-400 hover:text-white transition-colors">
                  {CONTACT.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FiMail className="text-electric-blue flex-shrink-0" />
                <a href={`mailto:${CONTACT.email}`} className="text-slate-400 hover:text-white transition-colors">
                  {CONTACT.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <BsWhatsapp className="text-electric-blue flex-shrink-0" />
                <a 
                  href={`https://wa.me/${CONTACT.whatsapp}`}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  WhatsApp Business
                </a>
              </div>
            </div>
          </div>
          
          {/* Quick Links - Models */}
          <div>
            <h4 className="font-bold text-lg mb-4">MODELS</h4>
            <ul className="space-y-2">
              {quickLinks.models.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Newsletter Signup (Optional) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-800 rounded-xl p-6 mb-12"
        >
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h4 className="font-bold text-xl mb-2">Subscribe to Updates</h4>
              <p className="text-slate-400 text-sm">
                Get latest news, promos, & charging tips
              </p>
            </div>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-electric-blue"
              />
              <button className="px-6 py-3 bg-electric-blue text-white font-semibold rounded-lg hover:shadow-lg transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>
        
        {/* Social Media & Legal Links */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Media */}
            <div className="flex items-center gap-4">
              {socialMedia.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="text-slate-400 hover:text-electric-blue transition-colors text-2xl"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            
            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
              {quickLinks.legal.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          
          {/* Copyright */}
          <div className="text-center mt-8 text-sm text-slate-500">
            <p>© {currentYear} PT Wedison Indonesia. All rights reserved.</p>
            <p className="mt-1">Built for better mobility</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
