'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  gradient?: string
}

export default function Card({ children, className = '', hover = true, gradient }: CardProps) {
  const baseClasses = 'rounded-xl p-6 transition-all duration-300'
  const hoverClasses = hover ? 'hover:shadow-2xl hover:-translate-y-2' : ''
  const gradientStyle = gradient ? { background: gradient } : {}
  
  return (
    <motion.div
      className={`${baseClasses} ${hoverClasses} ${className}`}
      style={gradientStyle}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}
