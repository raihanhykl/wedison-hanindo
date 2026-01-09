'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiMinus } from 'react-icons/fi'
import { BsWhatsapp } from 'react-icons/bs'
import { WHATSAPP_LINKS } from '@/utils/whatsappLinks'
import { trackWhatsAppClick } from '@/utils/analytics'

interface FAQItem {
  question: string
  answer: string
  category: string
}

const FAQ_ITEMS: FAQItem[] = [
  {
    category: 'Baterai',
    question: 'Apa jaminan untuk baterai?',
    answer: 'Baterai Wedison dilindungi garansi 3 tahun. Kami menggunakan baterai LiFePO4 berkualitas tinggi yang aman dan tahan lama, dengan masa pakai hingga 2000+ siklus pengisian.',
  },
  {
    category: 'Baterai',
    question: 'Bagaimana cara menjaga baterai dalam kondisi baik?',
    answer: 'Hindari mengisi daya hingga 100% atau mengosongkan hingga 0% secara rutin. Idealnya jaga level baterai antara 20-80%. Simpan di tempat sejuk dan hindari paparan panas berlebih. Gunakan charger resmi Wedison.',
  },
  {
    category: 'Pengisian Daya',
    question: 'Berapa lama waktu mengisi baterai hingga penuh?',
    answer: 'Dengan charger standar di rumah, pengisian penuh membutuhkan 2-4 jam tergantung model. Dengan teknologi SuperCharge di stasiun kami, hanya butuh 15 menit untuk mengisi dari 10% ke 80%.',
  },
  {
    category: 'Pengisian Daya',
    question: 'Di mana saya bisa mengisi daya?',
    answer: 'Anda bisa mengisi daya di rumah dengan charger standar, atau di stasiun SuperCharge Wedison yang tersebar di berbagai lokasi strategis. Lokasi stasiun bisa dicek melalui aplikasi Wedison.',
  },
  {
    category: 'Performa',
    question: 'Apakah kuat untuk naik tanjakan dan boncengan?',
    answer: 'Ya! Motor Wedison dilengkapi motor BLDC bertenaga yang mampu menanjak hingga 15 derajat dengan boncengan. Torsi instan dari motor listrik memberikan akselerasi yang responsif.',
  },
  {
    category: 'Garansi & Layanan',
    question: 'Bagaimana dengan garansi dan layanan servis?',
    answer: 'Garansi baterai 3 tahun dan motor 2 tahun. Untuk servis dan perbaikan, Anda bisa mengunjungi Experience Center kami atau menghubungi layanan pelanggan. Biaya maintenance jauh lebih rendah karena tidak perlu ganti oli, busi, atau filter.',
  },
  {
    category: 'Pembelian',
    question: 'Apakah ada subsidi pemerintah?',
    answer: 'Ya! Pemerintah memberikan subsidi hingga Rp 8 juta untuk pembelian motor listrik baru. Syaratnya memiliki KTP Indonesia dan belum pernah menerima subsidi motor listrik sebelumnya. Tim kami akan membantu prosesnya.',
  },
  {
    category: 'Pembelian',
    question: 'Apakah bisa cicilan? Berapa DP minimalnya?',
    answer: 'Bisa! Kami bekerja sama dengan Kredivo dan leasing lainnya untuk cicilan hingga 36 bulan. DP mulai dari 10% dengan cicilan terjangkau mulai Rp 400rb/bulan untuk model Bees.',
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-12 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-electric-blue/10 text-electric-blue rounded-full text-sm font-semibold mb-4">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
            Pertanyaan yang{' '}
            <span className="text-electric-blue">Sering Ditanya</span>
          </h2>
          <p className="text-lg text-slate-600">
            Jawaban untuk pertanyaan umum seputar motor listrik Wedison
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="border-2 border-slate-200 rounded-2xl overflow-hidden hover:border-electric-blue/30 transition-colors"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-start justify-between gap-4 p-5 md:p-6 text-left bg-white hover:bg-slate-50 transition-colors"
              >
                <div className="flex-1">
                  <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-600 text-xs font-medium rounded mb-2">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-semibold text-slate-800 pr-8">
                    {item.question}
                  </h3>
                </div>
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    openIndex === index
                      ? 'bg-electric-blue text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {openIndex === index ? (
                    <FiMinus className="text-lg" />
                  ) : (
                    <FiPlus className="text-lg" />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 md:px-6 pb-5 md:pb-6">
                      <p className="text-slate-600 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-slate-600 mb-4">
            Masih punya pertanyaan lain?
          </p>
          <a
            href={WHATSAPP_LINKS.general}
            onClick={() => trackWhatsAppClick('faq-section')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-success-green text-white font-semibold rounded-full hover:bg-green-600 transition-all hover:scale-105 shadow-lg"
          >
            <BsWhatsapp className="text-xl" />
            <span>Tanya Langsung via WhatsApp</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
