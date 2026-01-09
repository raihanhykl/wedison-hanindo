'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'

interface FormData {
  name: string
  phone: string
  location: string
  program: string
}

export default function LeadFormSection() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    location: '',
    program: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Reset status when user starts typing again
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle')
      setErrorMessage('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form')
      }

      // Success
      setSubmitStatus('success')
      
      // Reset form after successful submission
      setFormData({
        name: '',
        phone: '',
        location: '',
        program: '',
      })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
    } catch (error) {
      // Error
      setSubmitStatus('error')
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Terjadi kesalahan. Silakan coba lagi atau hubungi kami langsung via WhatsApp.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = formData.name && formData.phone && formData.location && formData.program

  return (
    <section id="lead-form" className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl border-2 border-slate-200"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
              Dapatkan{' '}
              <span className="text-electric-blue">
                Informasi Lengkap
              </span>
            </h2>
            <p className="text-lg text-slate-600">
              Isi form di bawah ini dan kami akan menghubungi Anda segera
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                Nama <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Masukkan nama lengkap Anda"
                className="w-full px-4 py-3 rounded-lg border-2 border-slate-300 focus:border-electric-blue focus:outline-none transition-colors text-slate-800 placeholder-slate-400"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
                Nomor HP <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="08xxxxxxxxxx"
                className="w-full px-4 py-3 rounded-lg border-2 border-slate-300 focus:border-electric-blue focus:outline-none transition-colors text-slate-800 placeholder-slate-400"
              />
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-semibold text-slate-700 mb-2">
                Lokasi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="Contoh: Jakarta Selatan, Bandung, Surabaya"
                className="w-full px-4 py-3 rounded-lg border-2 border-slate-300 focus:border-electric-blue focus:outline-none transition-colors text-slate-800 placeholder-slate-400"
              />
            </div>

            {/* Program */}
            <div>
              <label htmlFor="program" className="block text-sm font-semibold text-slate-700 mb-2">
                Program <span className="text-red-500">*</span>
              </label>
              <select
                id="program"
                name="program"
                value={formData.program}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-slate-300 focus:border-electric-blue focus:outline-none transition-colors text-slate-800 bg-white"
              >
                <option value="">Pilih Program</option>
                <option value="Cash">Cash</option>
                <option value="Installment">Installment</option>
                <option value="Rent to own">Rent to own</option>
              </select>
            </div>

            {/* Success/Error Messages */}
            <AnimatePresence>
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-success-green/10 border-2 border-success-green rounded-lg p-4 flex items-center gap-3"
                >
                  <FiCheckCircle className="text-success-green text-2xl flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-success-green">Terima kasih!</p>
                    <p className="text-sm text-slate-700">
                      Tim Wedison akan menghubungi Anda segera.
                    </p>
                  </div>
                </motion.div>
              )}
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-red-50 border-2 border-red-200 rounded-lg p-4 flex items-center gap-3"
                >
                  <FiAlertCircle className="text-red-600 text-2xl flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-red-600">Gagal mengirim</p>
                    <p className="text-sm text-slate-700">{errorMessage}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              whileHover={isFormValid && !isSubmitting ? { scale: 1.02 } : {}}
              whileTap={isFormValid && !isSubmitting ? { scale: 0.98 } : {}}
              className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-3 ${
                isFormValid && !isSubmitting
                  ? 'bg-electric-blue text-white shadow-lg hover:shadow-xl'
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Mengirim...</span>
                </>
              ) : (
                <>
                  <FiSend className="text-xl" />
                  <span>Kirim Form</span>
                </>
              )}
            </motion.button>

            {/* Privacy Note */}
            <p className="text-xs text-slate-500 text-center">
              Dengan mengisi form ini, Anda menyetujui untuk dihubungi oleh tim Wedison
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
