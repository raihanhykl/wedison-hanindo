'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiUser, FiPhone, FiMail, FiMapPin, FiSend, FiCheck } from 'react-icons/fi'
import { BsWhatsapp } from 'react-icons/bs'
import { MODEL_SPECS } from '@/utils/modelSpecs'
import { WHATSAPP_LINKS } from '@/utils/whatsappLinks'
import { trackWhatsAppClick } from '@/utils/analytics'

interface FormData {
  name: string
  phone: string
  email: string
  location: string
  model: string
  message: string
}

export default function LeadFormSection() {
  const mainModels = MODEL_SPECS.filter((m) => !m.id.includes('-extended'))
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    location: '',
    model: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      // Submit to API
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit')
      }

      setIsSubmitted(true)
      setFormData({
        name: '',
        phone: '',
        email: '',
        location: '',
        model: '',
        message: '',
      })
    } catch (err) {
      setError('Gagal mengirim data. Silakan coba lagi atau hubungi via WhatsApp.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Generate WhatsApp message from form data
  const generateWhatsAppMessage = () => {
    const model = mainModels.find((m) => m.id === formData.model)
    let message = `Halo! Saya ${formData.name || '[Nama]'} dari ${formData.location || '[Kota]'}.`
    if (model) {
      message += ` Saya tertarik dengan model ${model.name}.`
    }
    if (formData.message) {
      message += ` ${formData.message}`
    }
    message += ' Bisa info lebih lanjut?'
    return `https://wa.me/62XXXXXXXXXX?text=${encodeURIComponent(message)}`
  }

  return (
    <section id="lead-form" className="py-12 md:py-20 bg-gradient-to-br from-electric-blue to-cyan-600 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Siap Beralih ke Motor Listrik?
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Isi form di bawah dan tim kami akan menghubungi Anda, atau langsung chat via WhatsApp
          </p>
        </motion.div>

        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-8 md:p-12 text-center"
          >
            <div className="w-16 h-16 bg-success-green rounded-full flex items-center justify-center mx-auto mb-6">
              <FiCheck className="text-3xl text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Terima Kasih!
            </h3>
            <p className="text-slate-600 mb-6">
              Data Anda sudah kami terima. Tim kami akan segera menghubungi Anda dalam 1x24 jam.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-full hover:bg-slate-200 transition-colors"
              >
                Kirim Lagi
              </button>
              <a
                href={WHATSAPP_LINKS.general}
                onClick={() => trackWhatsAppClick('lead-form-success')}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-success-green text-white font-semibold rounded-full hover:bg-green-600 transition-colors"
              >
                <BsWhatsapp className="text-xl" />
                <span>Chat WhatsApp</span>
              </a>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-6 md:p-10 shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                    Nama Lengkap *
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-electric-blue transition-colors text-slate-800"
                      placeholder="Nama Anda"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                    Nomor WhatsApp *
                  </label>
                  <div className="relative">
                    <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-electric-blue transition-colors text-slate-800"
                      placeholder="08xxxxxxxxxx"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-electric-blue transition-colors text-slate-800"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-slate-700 mb-2">
                    Kota/Daerah *
                  </label>
                  <div className="relative">
                    <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-electric-blue transition-colors text-slate-800"
                      placeholder="Jakarta, Tangerang, dll"
                    />
                  </div>
                </div>
              </div>

              {/* Model Selection */}
              <div>
                <label htmlFor="model" className="block text-sm font-medium text-slate-700 mb-2">
                  Model yang Diminati
                </label>
                <select
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-electric-blue transition-colors text-slate-800 bg-white"
                >
                  <option value="">Pilih model (opsional)</option>
                  {mainModels.map((model) => (
                    <option key={model.id} value={model.id}>
                      {model.name} - {model.price}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                  Pesan / Pertanyaan
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-electric-blue transition-colors text-slate-800 resize-none"
                  placeholder="Ada pertanyaan khusus?"
                />
              </div>

              {/* Error */}
              {error && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-electric-blue text-white font-semibold rounded-full hover:bg-cyan-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <FiSend className="text-xl" />
                  )}
                  <span>{isSubmitting ? 'Mengirim...' : 'Kirim Data'}</span>
                </button>
                <a
                  href={generateWhatsAppMessage()}
                  onClick={() => trackWhatsAppClick('lead-form-whatsapp')}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-success-green text-white font-semibold rounded-full hover:bg-green-600 transition-all"
                >
                  <BsWhatsapp className="text-xl" />
                  <span>Chat WhatsApp Langsung</span>
                </a>
              </div>
            </form>
          </motion.div>
        )}
      </div>
    </section>
  )
}
