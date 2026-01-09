'use client'

import { motion } from 'framer-motion'
import { BsWhatsapp } from 'react-icons/bs'
import Button from '../ui/Button'
import { WHATSAPP_LINKS } from '@/utils/whatsappLinks'
import { trackWhatsAppClick } from '@/utils/analytics'
import type { ModelSpec } from '@/utils/modelSpecs'

interface ModelDetailSectionProps {
  model: ModelSpec
}

export default function ModelDetailSection({ model }: ModelDetailSectionProps) {
  const specs = [
    { label: 'Battery Capacity', value: model.battery, icon: '🔋' },
    { label: 'Range', value: model.range, icon: '📏' },
    { label: 'Motor Power', value: model.motor, icon: '⚡' },
    { label: 'Max Speed', value: model.maxSpeed, icon: '💨' },
    { label: 'Charging Time', value: model.charging, icon: '🔌' },
    ...(model.superCharge ? [{ label: 'SuperCharge', value: model.superCharge, icon: '⚡' }] : []),
  ]

  // Alternate background for visual separation
  const bgClass = model.id === 'edpower' || model.id === 'victory' 
    ? 'bg-white' 
    : 'bg-slate-50'
  
  return (
    <section id={`model-${model.id}`} className={`py-20 ${bgClass} scroll-mt-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className={`inline-block bg-gradient-to-r ${model.gradient} text-white px-4 py-2 rounded-full text-sm font-semibold mb-4`}>
            {model.badge}
          </div>
          <h2 className="text-5xl sm:text-6xl font-bold text-slate-800 mb-4">
            {model.name}
          </h2>
          <p className="text-2xl text-slate-600">
            {model.price}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center text-slate-400">
                  <div className="text-9xl mb-4">🏍️</div>
                  <p className="text-xl font-semibold">{model.name}</p>
                  <p className="text-sm mt-2">Model image placeholder</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Specs & Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Key Specs Grid */}
            <div className="grid grid-cols-2 gap-4">
              {specs.map((spec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
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
            {(model.acceleration || model.braking || model.suspension || model.tire || model.groundClearance || model.weight) && (
              <div className="bg-white rounded-xl p-6 border-2 border-slate-200">
                <h3 className="text-xl font-bold text-slate-800 mb-4">⚙️ Technical Specifications</h3>
                <div className="grid md:grid-cols-2 gap-3 text-slate-700">
                  {model.acceleration && (
                    <div>
                      <span className="font-semibold">Acceleration: </span>
                      <span>{model.acceleration}</span>
                    </div>
                  )}
                  {model.braking && (
                    <div>
                      <span className="font-semibold">Braking: </span>
                      <span>{model.braking}</span>
                    </div>
                  )}
                  {model.suspension && (
                    <div>
                      <span className="font-semibold">Suspension: </span>
                      <span>{model.suspension}</span>
                    </div>
                  )}
                  {model.tire && (
                    <div>
                      <span className="font-semibold">Tire: </span>
                      <span>{model.tire}</span>
                    </div>
                  )}
                  {model.groundClearance && (
                    <div>
                      <span className="font-semibold">Ground Clearance: </span>
                      <span>{model.groundClearance}</span>
                    </div>
                  )}
                  {model.weight && (
                    <div>
                      <span className="font-semibold">Weight: </span>
                      <span>{model.weight}</span>
                    </div>
                  )}
                  {model.warranty && (
                    <div>
                      <span className="font-semibold">Warranty: </span>
                      <span>{model.warranty}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Features List */}
            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-xl p-8 border-2 border-cyan-200">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Key Features</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {model.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-success-green text-xl">✓</span>
                    <span className="text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing & Financing */}
            <div className="bg-slate-50 rounded-xl p-8 border-2 border-slate-200">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">💰 Pricing & Financing</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                  <span className="text-slate-600">Harga</span>
                  <span className="text-3xl font-bold text-electric-blue">{model.price}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                  <span className="text-slate-600">Down Payment</span>
                  <span className="text-xl font-semibold text-slate-800">{model.dp}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Cicilan (36 bulan @ 0%)</span>
                  <span className="text-xl font-semibold text-slate-800">{model.monthly}</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                href={WHATSAPP_LINKS[model.whatsappLink as keyof typeof WHATSAPP_LINKS] || WHATSAPP_LINKS.general}
                onClick={() => trackWhatsAppClick(`model-detail-${model.id}`)}
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
        </div>
      </div>
    </section>
  )
}
