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
    category: 'Penghematan',
    question: 'Berapa lama balik modal kalau beli motor listrik?',
    answer: 'Dengan penghematan rata-rata Rp 400rb-500rb per bulan untuk pengemudi aktif, balik modal dalam 12-18 bulan tergantung model yang dipilih. Untuk ojol driver yang jalan 1000km+/bulan, bisa lebih cepat lagi.',
  },
  {
    category: 'Penggunaan',
    question: 'Bisa untuk ojol full-time nggak?',
    answer: 'Sangat bisa! Model EdPower dengan range 135km per charge sangat cocok untuk ojol full-time. Dengan SuperCharge 15 menit, Anda bisa charge sambil istirahat makan siang dan lanjut narik. Banyak driver kami yang pakai full-time dengan pendapatan lebih tinggi karena biaya operasional rendah.',
  },
  {
    category: 'Charging',
    question: 'Charging di mana? Ada stasiun charging publik?',
    answer: 'Anda bisa charging di rumah dengan charger standar (4-5 jam) atau di stasiun SuperCharge kami (15 menit ke 80%). Saat ini sudah ada 20+ stasiun SuperCharge di Jabodetabek, dan terus bertambah. Lokasi bisa dicek di aplikasi Wedison.',
  },
  {
    category: 'Biaya',
    question: 'Berapa biaya maintenance motor listrik?',
    answer: 'Jauh lebih murah dari motor bensin! Tidak perlu ganti oli, busi, atau filter udara. Maintenance rutin hanya cek rem dan ban. Estimasi biaya maintenance 60-70% lebih rendah dari motor bensin.',
  },
  {
    category: 'Subsidi',
    question: 'Ada subsidi pemerintah untuk motor listrik?',
    answer: 'Ya! Pemerintah memberikan subsidi hingga Rp 8 juta untuk pembelian motor listrik baru. Syaratnya adalah memiliki KTP Indonesia dan belum pernah menerima subsidi motor listrik sebelumnya. Tim kami akan bantu prosesnya.',
  },
  {
    category: 'Pembayaran',
    question: 'Bisa kredit? Berapa DP minimalnya?',
    answer: 'Bisa! Kami bekerja sama dengan berbagai leasing untuk cicilan hingga 36 bulan. DP minimal 10% atau bahkan DP 0% untuk program tertentu. Cicilan mulai dari Rp 400rb/bulan untuk model Mini.',
  },
  {
    category: 'Performa',
    question: 'Kuat untuk naik tanjakan dan boncengan?',
    answer: 'Kuat! Motor Wedison dilengkapi motor BLDC bertenaga yang bisa menanjak hingga 15 derajat dengan boncengan. Torsi instan dari motor listrik membuat akselerasi lebih responsif dibanding motor bensin.',
  },
  {
    category: 'Garansi',
    question: 'Garansi berapa lama? Kalau baterai rusak bagaimana?',
    answer: 'Garansi baterai 3 tahun dan motor 2 tahun. Jika ada masalah, bisa langsung bawa ke showroom atau hubungi layanan servis kami. Untuk baterai, kami juga menyediakan opsi sewa baterai yang lebih terjangkau.',
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
