'use client'

import { motion } from 'framer-motion'
import AccordionItem from '../ui/AccordionItem'

export default function FAQSection() {
  const faqs = [
    {
      question: 'Apakah baterainya cepat lemah / degradasi?',
      answer: 'Wedison menggunakan teknologi LiFePO4 terbaru yang paling awet & aman. Warranty 3 tahun penuh untuk battery replacement. Data dari pengguna menunjukkan battery capacity masih 90%+ setelah 1-2 tahun penggunaan normal. Cycling kecil setiap hari = battery lebih awet.',
    },
    {
      question: 'Bisakah charging di rumah? Perlu renovasi rumah?',
      answer: 'Ya, charging bisa di rumah! Kami install charger gratis. Tidak perlu renovasi besar. Cukup ada socket AC 220V. Proses instalasi cepat (2-3 hari) dan Technician kami profesional. Gratis konsultasi lokasi terbaik untuk charger.',
    },
    {
      question: 'Spare parts / servis kemana? Mahal gak?',
      answer: 'Indonesia local assembly = spare parts lokal, terjangkau. Warranty 3 tahun battery, 2 tahun motor. Minor maintenance (tire, brake pad) very affordable, bisa di bengkel biasa. Major service: Authorized service center di Jakarta (Pondok Indah, Kemang), expansion ke kota lain.',
    },
    {
      question: 'Garansi apa aja? Bisa extend?',
      answer: 'Standard package: Battery 3 tahun, Motor 2 tahun. Optional extended warranty tersedia untuk 5 tahun total. Covers parts & labor. Comprehensive insurance juga available (1 tahun gratis untuk pembeli hari ini).',
    },
    {
      question: 'Apa ada test drive? Harus ke showroom Pondok Indah?',
      answer: 'Test drive bisa di showroom Pondok Indah (kami arrange). Jika lokasi Anda jauh (Bandung, Tangerang), kami bisa arrange mobile unit atau direct ke nearest charging station untuk experience. Coordination via WhatsApp.',
    },
  ]
  
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-800 mb-4">
            <span className="text-electric-blue">
              FAQ
            </span>{' '}
            - Pertanyaan Umum
          </h2>
          <p className="text-xl text-slate-600">
            Jawaban untuk pertanyaan yang sering ditanyakan
          </p>
        </motion.div>
        
        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
        >
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </motion.div>
        
        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-slate-600 mb-4 text-lg">
            Masih ada pertanyaan? Hubungi kami langsung!
          </p>
          <a
            href={`https://wa.me/62XXXXXXXXXX?text=${encodeURIComponent('Halo! Saya punya pertanyaan tentang Wedison. Bisa dibantu?')}`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-electric-blue text-white font-semibold rounded-lg hover:shadow-xl transition-all hover:scale-105"
          >
            Chat WhatsApp - Tanya Langsung
          </a>
        </motion.div>
      </div>
    </section>
  )
}
