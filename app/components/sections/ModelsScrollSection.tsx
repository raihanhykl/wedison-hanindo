'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BsWhatsapp } from 'react-icons/bs'
import Button from '../ui/Button'
import { WHATSAPP_LINKS } from '@/utils/whatsappLinks'
import { trackWhatsAppClick } from '@/utils/analytics'
import { MODEL_SPECS, type ModelSpec } from '@/utils/modelSpecs'

export default function ModelsScrollSection() {
  const [activeModelIndex, setActiveModelIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)

  // Calculate which model should be active based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !stickyRef.current) return

      const container = containerRef.current
      const sticky = stickyRef.current
      const containerTop = container.offsetTop
      const containerHeight = container.scrollHeight
      const viewportHeight = window.innerHeight
      const scrollY = window.scrollY

      // Calculate scroll progress through the container
      const scrollStart = containerTop - viewportHeight
      const scrollEnd = containerTop + containerHeight - viewportHeight * 2
      const scrollRange = scrollEnd - scrollStart

      if (scrollY < scrollStart) {
        setActiveModelIndex(0)
      } else if (scrollY > scrollEnd) {
        setActiveModelIndex(MODEL_SPECS.length - 1)
      } else {
        const progress = (scrollY - scrollStart) / scrollRange
        const index = Math.min(
          Math.floor(progress * MODEL_SPECS.length),
          MODEL_SPECS.length - 1
        )
        setActiveModelIndex(index)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const activeModel = MODEL_SPECS[activeModelIndex]

  // Calculate parallax position based on active model
  const imageX = `${-activeModelIndex * 50}%`

  const specs = [
    { label: 'Battery Capacity', value: activeModel.battery, icon: '🔋' },
    { label: 'Range', value: activeModel.range, icon: '📏' },
    { label: 'Motor Power', value: activeModel.motor, icon: '⚡' },
    { label: 'Max Speed', value: activeModel.maxSpeed, icon: '💨' },
    { label: 'Charging Time', value: activeModel.charging, icon: '🔌' },
    ...(activeModel.superCharge ? [{ label: 'SuperCharge', value: activeModel.superCharge, icon: '⚡' }] : []),
  ]

  return (
    <section id="models" ref={containerRef} className="relative min-h-[500vh] bg-white scroll-mt-20">
      {/* Sticky Container */}
      <div ref={stickyRef} className="sticky top-0 h-screen overflow-hidden">
        <div className="grid lg:grid-cols-2 h-full">
          {/* Left: Motor Images - Parallax Effect */}
          <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
            <motion.div
              style={{ x: imageX }}
              animate={{ x: imageX }}
              transition={{ type: 'spring', stiffness: 100, damping: 30 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {/* All model images in a row */}
              <div className="flex h-full w-[200%]">
                {MODEL_SPECS.map((model, index) => (
                  <motion.div
                    key={model.id}
                    className="w-1/2 h-full flex items-center justify-center px-8"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: activeModelIndex === index ? 1 : 0.3,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="text-center">
                      <div className="text-9xl mb-4">🏍️</div>
                      <p className="text-2xl font-bold text-slate-700">{model.name}</p>
                      <p className="text-sm text-slate-500 mt-2">Model image placeholder</p>
                      {/* Replace with actual image:
                      <Image
                        src={`/images/models/${model.id}-detail.jpg`}
                        alt={model.name}
                        width={800}
                        height={800}
                        className="object-contain"
                      />
                      */}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Model Indicators on Left */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden lg:block">
              <div className="flex flex-col gap-3">
                {MODEL_SPECS.map((model, index) => (
                  <button
                    key={model.id}
                    onClick={() => {
                      // Scroll to specific position
                      const progress = index / MODEL_SPECS.length
                      const container = containerRef.current
                      if (container) {
                        const scrollHeight = container.scrollHeight - window.innerHeight
                        window.scrollTo({
                          top: container.offsetTop + scrollHeight * progress,
                          behavior: 'smooth',
                        })
                      }
                    }}
                    className={`text-left px-4 py-3 rounded-lg backdrop-blur-sm transition-all ${
                      activeModelIndex === index
                        ? 'bg-white/90 text-slate-900 font-semibold shadow-lg scale-105'
                        : 'bg-white/50 text-slate-600 hover:bg-white/70'
                    }`}
                  >
                    <div className="text-sm font-medium">{model.name}</div>
                    <div className="text-xs">{model.price}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Model Details - Changes on Scroll */}
          <div className="bg-white overflow-y-auto">
            <div className="h-full flex items-center">
              <div className="w-full px-8 py-12">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeModel.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-8"
                  >
                    {/* Header */}
                    <div className="text-center lg:text-left">
                      <div className={`inline-block bg-gradient-to-r ${activeModel.gradient} text-white px-4 py-2 rounded-full text-sm font-semibold mb-4`}>
                        {activeModel.badge}
                      </div>
                      <h2 className="text-5xl sm:text-6xl font-bold text-slate-800 mb-4">
                        {activeModel.name}
                      </h2>
                      <p className="text-2xl text-slate-600">
                        {activeModel.price}
                      </p>
                    </div>

                    {/* Key Specs Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      {specs.map((spec, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-slate-50 rounded-xl p-6 border-2 border-slate-200"
                        >
                          <div className="text-3xl mb-2">{spec.icon}</div>
                          <div className="text-sm text-slate-600 mb-1">{spec.label}</div>
                          <div className="text-2xl font-bold text-slate-800">{spec.value}</div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Additional Technical Specs */}
                    {(activeModel.acceleration || activeModel.braking || activeModel.suspension) && (
                      <div className="bg-white rounded-xl p-6 border-2 border-slate-200">
                        <h3 className="text-xl font-bold text-slate-800 mb-4">⚙️ Technical Specifications</h3>
                        <div className="grid md:grid-cols-2 gap-3 text-slate-700">
                          {activeModel.acceleration && (
                            <div>
                              <span className="font-semibold">Acceleration: </span>
                              <span>{activeModel.acceleration}</span>
                            </div>
                          )}
                          {activeModel.braking && (
                            <div>
                              <span className="font-semibold">Braking: </span>
                              <span>{activeModel.braking}</span>
                            </div>
                          )}
                          {activeModel.suspension && (
                            <div>
                              <span className="font-semibold">Suspension: </span>
                              <span>{activeModel.suspension}</span>
                            </div>
                          )}
                          {activeModel.tire && (
                            <div>
                              <span className="font-semibold">Tire: </span>
                              <span>{activeModel.tire}</span>
                            </div>
                          )}
                          {activeModel.groundClearance && (
                            <div>
                              <span className="font-semibold">Ground Clearance: </span>
                              <span>{activeModel.groundClearance}</span>
                            </div>
                          )}
                          {activeModel.weight && (
                            <div>
                              <span className="font-semibold">Weight: </span>
                              <span>{activeModel.weight}</span>
                            </div>
                          )}
                          {activeModel.warranty && (
                            <div>
                              <span className="font-semibold">Warranty: </span>
                              <span>{activeModel.warranty}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Features List */}
                    <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-xl p-8 border-2 border-cyan-200">
                      <h3 className="text-2xl font-bold text-slate-800 mb-4">Key Features</h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {activeModel.features.map((feature, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-center gap-2"
                          >
                            <span className="text-success-green text-xl">✓</span>
                            <span className="text-slate-700">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Pricing & Financing */}
                    <div className="bg-slate-50 rounded-xl p-8 border-2 border-slate-200">
                      <h3 className="text-2xl font-bold text-slate-800 mb-6">💰 Pricing & Financing</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                          <span className="text-slate-600">Harga</span>
                          <span className="text-3xl font-bold text-electric-blue">{activeModel.price}</span>
                        </div>
                        <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                          <span className="text-slate-600">Down Payment</span>
                          <span className="text-xl font-semibold text-slate-800">{activeModel.dp}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600">Cicilan (36 bulan @ 0%)</span>
                          <span className="text-xl font-semibold text-slate-800">{activeModel.monthly}</span>
                        </div>
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        href={WHATSAPP_LINKS[activeModel.whatsappLink as keyof typeof WHATSAPP_LINKS] || WHATSAPP_LINKS.general}
                        onClick={() => trackWhatsAppClick(`model-scroll-${activeModel.id}`)}
                        variant="primary"
                        size="large"
                        className="flex-1"
                      >
                        <BsWhatsapp className="text-2xl" />
                        <span>Chat WhatsApp - Info Lengkap</span>
                      </Button>
                      <Button
                        href="#showroom"
                        variant="outline"
                        size="large"
                        className="flex-1"
                      >
                        <span>📍 Test Drive</span>
                      </Button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Progress Indicator */}
      <div className="fixed bottom-8 right-8 z-30 hidden lg:block">
        <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg">
          <div className="flex flex-col gap-2">
            {MODEL_SPECS.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-8 rounded-full transition-all ${
                  activeModelIndex === index
                    ? 'bg-electric-blue'
                    : 'bg-slate-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
