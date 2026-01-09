'use client'

import { motion } from 'framer-motion'
import Card from '../ui/Card'

export default function ProblemSection() {
  const problems = [
    { icon: '❌', text: 'Charging 2-4 JAM', type: 'problem' },
    { icon: '❌', text: 'Delay pagi berangkat', type: 'problem' },
    { icon: '❌', text: 'Range anxiety (takut kehabisan)', type: 'problem' },
    { icon: '❌', text: 'Charging station jarang', type: 'problem' },
    { icon: '❌', text: 'Battery boros di winter', type: 'problem' },
  ]
  
  const competitors = [
    { icon: '⚠️', text: 'Masih sama', type: 'warning' },
    { icon: '⚠️', text: 'Masih sama', type: 'warning' },
    { icon: '⚠️', text: 'Kurang solusi', type: 'warning' },
    { icon: '⚠️', text: 'Network terbatas', type: 'warning' },
    { icon: '⚠️', text: 'Ga jelas garansi', type: 'warning' },
  ]
  
  const solutions = [
    { icon: '✅', text: '15 MENIT penuh 80%', highlight: 'SuperCharge', type: 'solution' },
    { icon: '✅', text: 'Ready instantly, ga terlambat', type: 'solution' },
    { icon: '✅', text: '135km per charge, cukup untuk 5-7 hari', type: 'solution' },
    { icon: '✅', text: '20+ SuperCharge di Jabodetabek + PLN partnership', type: 'solution' },
    { icon: '✅', text: 'Garansi 3 tahun battery, LiFePO4 terbaru', type: 'solution' },
  ]
  
  const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: custom * 0.2,
        duration: 0.6,
        ease: 'easeOut',
      },
    }),
  }
  
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-800 mb-4">
            Masalah Motor Listrik Biasanya...{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">vs Wedison</span>
          </h2>
          <p className="text-xl text-slate-600">
            Kenapa Wedison berbeda dari yang lain?
          </p>
        </motion.div>
        
        {/* Comparison Grid - Desktop */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8">
          {/* Problems Column */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="bg-red-50 rounded-2xl p-8 border-2 border-red-200 h-full">
              <h3 className="text-2xl font-bold text-red-600 mb-6 flex items-center gap-2">
                <span className="text-3xl">⚠️</span>
                Motor Listrik Biasa
              </h3>
              <div className="space-y-4">
                {problems.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 text-slate-700">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-lg">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Competitors Column */}
          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="bg-yellow-50 rounded-2xl p-8 border-2 border-yellow-200 h-full">
              <h3 className="text-2xl font-bold text-yellow-600 mb-6 flex items-center gap-2">
                <span className="text-3xl">🤔</span>
                Kompetitor Lain
              </h3>
              <div className="space-y-4">
                {competitors.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 text-slate-700">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-lg">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Wedison Solutions Column */}
          <motion.div
            custom={2}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-2xl p-8 border-2 border-cyan-300 h-full shadow-xl">
              <h3 className="text-2xl font-bold text-electric-blue mb-6 flex items-center gap-2">
                <span className="text-3xl">⚡</span>
                Solusi Wedison
              </h3>
              <div className="space-y-4">
                {solutions.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-3 text-slate-700"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-lg font-medium">
                      {item.highlight ? (
                        <>
                          <span className="text-electric-blue font-bold">{item.highlight}</span>{' '}
                          {item.text.replace(item.highlight, '')}
                        </>
                      ) : (
                        item.text
                      )}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Mobile Version - Stacked */}
        <div className="lg:hidden space-y-6">
          <Card className="bg-red-50 border-2 border-red-200">
            <h3 className="text-xl font-bold text-red-600 mb-4 flex items-center gap-2">
              <span className="text-2xl">⚠️</span>
              Motor Listrik Biasa
            </h3>
            <div className="space-y-3">
              {problems.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </Card>
          
          <Card className="bg-yellow-50 border-2 border-yellow-200">
            <h3 className="text-xl font-bold text-yellow-600 mb-4 flex items-center gap-2">
              <span className="text-2xl">🤔</span>
              Kompetitor Lain
            </h3>
            <div className="space-y-3">
              {competitors.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </Card>
          
          <Card className="bg-gradient-to-br from-cyan-50 to-teal-50 border-2 border-cyan-300 shadow-xl">
            <h3 className="text-xl font-bold text-electric-blue mb-4 flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              Solusi Wedison
            </h3>
            <div className="space-y-3">
              {solutions.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
        
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="#specs"
            className="inline-block px-6 py-3 text-electric-blue border-2 border-electric-blue rounded-lg font-semibold hover:bg-electric-blue hover:text-white transition-all duration-300"
          >
            Lihat Spesifikasi Lengkap →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
