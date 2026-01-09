'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiCheck, FiPercent, FiCalendar, FiDollarSign } from 'react-icons/fi'
import { BsWhatsapp } from 'react-icons/bs'
import { MODEL_SPECS } from '@/utils/modelSpecs'
import { WHATSAPP_LINKS } from '@/utils/whatsappLinks'
import { trackWhatsAppClick } from '@/utils/analytics'

const FINANCING_BENEFITS = [
  'DP 0% untuk program tertentu',
  'Cicilan hingga 36 bulan',
  'Proses approval cepat',
  'Subsidi pemerintah Rp 8 juta',
]

export default function FinancingSection() {
  // Filter main models only
  const mainModels = MODEL_SPECS.filter((m) => !m.id.includes('-extended'))
  
  const [selectedModel, setSelectedModel] = useState(mainModels[0])
  const [tenure, setTenure] = useState(24)
  const [dpPercent, setDpPercent] = useState(20)

  // Parse price from string
  const parsePrice = (priceStr: string): number => {
    return parseInt(priceStr.replace(/[^0-9]/g, ''))
  }

  // Calculate financing
  const basePrice = parsePrice(selectedModel.price)
  const subsidy = 8000000 // Rp 8 juta subsidy
  const priceAfterSubsidy = basePrice - subsidy
  const dpAmount = (priceAfterSubsidy * dpPercent) / 100
  const loanAmount = priceAfterSubsidy - dpAmount
  const interestRate = 0.08 // 8% per year flat rate
  const totalInterest = loanAmount * interestRate * (tenure / 12)
  const totalPayment = loanAmount + totalInterest
  const monthlyPayment = Math.round(totalPayment / tenure)

  // Monthly savings estimate (average)
  const monthlySavings = 400000 // Rp 400rb average savings
  const netMonthlyCost = monthlyPayment - monthlySavings

  return (
    <section id="financing" className="py-12 md:py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-success-green/20 text-success-green rounded-full text-sm font-semibold mb-4">
            Cicilan Terjangkau
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Cicilan Lebih Murah dari{' '}
            <span className="text-success-green">Biaya BBM Bulanan</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Hitung simulasi cicilan dan lihat berapa yang bisa Anda hemat setiap bulan
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Calculator */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/10"
          >
            <h3 className="text-2xl font-bold mb-6">Kalkulator Cicilan</h3>

            {/* Model Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Pilih Model
              </label>
              <div className="grid grid-cols-2 gap-3">
                {mainModels.map((model) => {
                  const imageMap: Record<string, string> = {
                    'edpower': '/images/models/edpower.png',
                    'athena': '/images/models/athena.png',
                    'victory': '/images/models/victory.png',
                    'mini': '/images/models/mini.png',
                  }
                  const imagePath = imageMap[model.id] || '/images/models/edpower.png'
                  
                  return (
                    <motion.button
                      key={model.id}
                      onClick={() => setSelectedModel(model)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative overflow-hidden rounded-2xl border-2 transition-all ${
                        selectedModel.id === model.id
                          ? 'border-success-green shadow-lg shadow-success-green/30'
                          : 'border-white/20 hover:border-white/40 hover:shadow-md'
                      }`}
                    >
                      {/* Background Image */}
                      <div 
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{ 
                          backgroundImage: `url(${imagePath})`,
                          backgroundSize: '130%',
                          backgroundPosition: 'center 35%',
                        }}
                      />
                      
                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 ${
                        selectedModel.id === model.id
                          ? 'bg-gradient-to-t from-success-green/95 via-success-green/60 to-success-green/30'
                          : 'bg-gradient-to-t from-slate-900/95 via-slate-900/60 to-slate-900/30'
                      }`} />
                      
                      {/* Content */}
                      <div className="relative z-10 p-4 pt-14 md:pt-16 text-left">
                        <div className="text-lg font-bold text-white mb-0.5">
                          {model.name}
                        </div>
                        <div className={`text-sm font-medium ${
                          selectedModel.id === model.id ? 'text-white/90' : 'text-slate-300'
                        }`}>
                          {model.price}
                        </div>
                        
                        {/* Selected Indicator */}
                        {selectedModel.id === model.id && (
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center"
                          >
                            <FiCheck className="text-success-green text-sm" />
                          </motion.div>
                        )}
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            </div>

            {/* DP Slider */}
            <div className="mb-6">
              <label htmlFor="dp-slider" className="block text-sm font-medium text-slate-300 mb-3">
                Down Payment: {dpPercent}% (Rp {dpAmount.toLocaleString('id-ID')})
              </label>
              <input
                id="dp-slider"
                type="range"
                min="0"
                max="50"
                step="5"
                value={dpPercent}
                onChange={(e) => setDpPercent(Number(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-success-green"
                aria-label="Down Payment Percentage"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>0%</span>
                <span>50%</span>
              </div>
            </div>

            {/* Tenure Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Tenor Cicilan
              </label>
              <div className="flex gap-2 flex-wrap">
                {[12, 18, 24, 36].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTenure(t)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      tenure === t
                        ? 'bg-success-green text-white'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {t} bulan
                  </button>
                ))}
              </div>
            </div>

            {/* Subsidy Info */}
            <div className="bg-success-green/20 rounded-xl p-4 mb-6 border border-success-green/30">
              <div className="flex items-center gap-2 mb-2">
                <FiCheck className="text-success-green" />
                <span className="font-semibold text-success-green">Subsidi Pemerintah</span>
              </div>
              <p className="text-sm text-slate-300">
                Potongan Rp 8.000.000 sudah termasuk dalam perhitungan
              </p>
            </div>
          </motion.div>

          {/* Right: Results */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Monthly Payment Card */}
            <div className="bg-gradient-to-br from-success-green to-emerald-600 rounded-3xl p-6 md:p-8 text-center">
              <p className="text-white/80 mb-2">Cicilan per Bulan</p>
              <div className="text-5xl md:text-6xl font-bold mb-2">
                Rp {monthlyPayment.toLocaleString('id-ID')}
              </div>
              <p className="text-white/80">
                untuk {tenure} bulan
              </p>
            </div>

            {/* Comparison */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/10">
              <h4 className="text-lg font-semibold mb-4">Perbandingan Biaya Bulanan</h4>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Cicilan Motor</span>
                  <span className="font-bold text-red-400">Rp {monthlyPayment.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Hemat BBM (estimasi)</span>
                  <span className="font-bold text-success-green">- Rp {monthlySavings.toLocaleString('id-ID')}</span>
                </div>
                <div className="border-t border-white/20 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Biaya Bersih/Bulan</span>
                    <span className={`text-2xl font-bold ${netMonthlyCost <= 0 ? 'text-success-green' : 'text-white'}`}>
                      {netMonthlyCost <= 0 ? 'GRATIS!' : `Rp ${netMonthlyCost.toLocaleString('id-ID')}`}
                    </span>
                  </div>
                </div>
              </div>

              {netMonthlyCost <= 0 && (
                <div className="mt-4 bg-success-green/20 rounded-xl p-4 text-center border border-success-green/30">
                  <p className="text-success-green font-semibold">
                    Penghematan BBM menutupi cicilan Anda!
                  </p>
                </div>
              )}
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-2 gap-4">
              {FINANCING_BENEFITS.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-white/5 rounded-lg px-4 py-3"
                >
                  <FiCheck className="text-success-green flex-shrink-0" />
                  <span className="text-sm text-slate-300">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href={WHATSAPP_LINKS.financing}
              onClick={() => trackWhatsAppClick('financing-section')}
              className="flex items-center justify-center gap-2 w-full px-8 py-4 bg-success-green text-white font-bold text-lg rounded-full hover:bg-green-600 transition-all hover:scale-105 shadow-xl"
            >
              <BsWhatsapp className="text-2xl" />
              <span>Konsultasi Cicilan</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
