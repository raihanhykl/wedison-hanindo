'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronRight, FiChevronLeft, FiCheck } from 'react-icons/fi'
import { WHATSAPP_LINKS } from '@/utils/whatsappLinks'

// Helper function to get model image path for financing section
const getModelImagePath = (modelName: string, variant?: 'regular' | 'extended'): string => {
  // Map model names to image file names - support .png, .jpg, .webp
  const imageMap: Record<string, string[]> = {
    'MINI': ['/images/models/mini.png', '/images/models/mini.jpg', '/images/models/mini.webp'],
    'ATHENA': variant === 'extended' 
      ? ['/images/models/athena-extended.png', '/images/models/athena-extended.jpg', '/images/models/athena-extended.webp']
      : ['/images/models/athena.png', '/images/models/athena.jpg', '/images/models/athena.webp'],
    'VICTORY': variant === 'extended'
      ? ['/images/models/victory-extended.png', '/images/models/victory-extended.jpg', '/images/models/victory-extended.webp']
      : ['/images/models/victory.png', '/images/models/victory.jpg', '/images/models/victory.webp'],
    'EDPOWER': ['/images/models/edpower.png', '/images/models/edpower.jpg', '/images/models/edpower.webp'],
  }
  
  // Return first path from array (will try .png first, then .jpg, then .webp)
  // Browser will handle 404 if file doesn't exist, then fallback to Unsplash via onError
  const paths = imageMap[modelName]
  return paths ? paths[0] : `https://source.unsplash.com/featured/400x300/?motorcycle,electric,${modelName.toLowerCase()}`
}

// Data dari PDF WOM Finance Jan 2026
interface FinancingOption {
  model: string
  variant?: 'regular' | 'extended'
  discount: number
  otr: number
  dpOptions: number[]
  tenors: {
    months: number
    installments: { [dp: number]: number }
  }[]
  hasExtended?: boolean
}

const FINANCING_DATA: FinancingOption[] = [
  {
    model: 'MINI',
    discount: 5000000,
    otr: 20900000,
    dpOptions: [3200000, 3700000, 4200000, 5300000, 6300000, 8400000],
    tenors: [
      {
        months: 12,
        installments: {
          3200000: 1836000,
          3700000: 1786000,
          4200000: 1737000,
          5300000: 1629000,
          6300000: 1530000,
          8400000: 1324000,
        },
      },
      {
        months: 18,
        installments: {
          3200000: 1332000,
          3700000: 1297000,
          4200000: 1262000,
          5300000: 1184000,
          6300000: 1113000,
          8400000: 965000,
        },
      },
      {
        months: 24,
        installments: {
          3200000: 1086000,
          3700000: 1057000,
          4200000: 1029000,
          5300000: 966000,
          6300000: 909000,
          8400000: 790000,
        },
      },
      {
        months: 30,
        installments: {
          3200000: 941000,
          3700000: 916000,
          4200000: 892000,
          5300000: 838000,
          6300000: 789000,
          8400000: 687000,
        },
      },
      {
        months: 36,
        installments: {
          3200000: 845000,
          3700000: 823000,
          4200000: 801000,
          5300000: 753000,
          6300000: 710000,
          8400000: 618000,
        },
      },
    ],
  },
  {
    model: 'ATHENA',
    variant: 'regular',
    discount: 4000000,
    otr: 32900000,
    dpOptions: [5000000, 5800000, 6600000, 8300000, 9900000, 13200000],
    hasExtended: true,
    tenors: [
      {
        months: 12,
        installments: {
          5000000: 2861000,
          5800000: 2783000,
          6600000: 2704000,
          8300000: 2536000,
          9900000: 2379000,
          13200000: 2054000,
        },
      },
      {
        months: 18,
        installments: {
          5000000: 2075000,
          5800000: 2019000,
          6600000: 1962000,
          8300000: 1842000,
          9900000: 1729000,
          13200000: 1496000,
        },
      },
      {
        months: 24,
        installments: {
          5000000: 1689000,
          5800000: 1644000,
          6600000: 1598000,
          8300000: 1501000,
          9900000: 1410000,
          13200000: 1222000,
        },
      },
      {
        months: 30,
        installments: {
          5000000: 1462000,
          5800000: 1423000,
          6600000: 1384000,
          8300000: 1301000,
          9900000: 1223000,
          13200000: 1062000,
        },
      },
      {
        months: 36,
        installments: {
          5000000: 1314000,
          5800000: 1279000,
          6600000: 1244000,
          8300000: 1170000,
          9900000: 1100000,
          13200000: 957000,
        },
      },
    ],
  },
  {
    model: 'ATHENA',
    variant: 'extended',
    discount: 5000000,
    otr: 35900000,
    dpOptions: [5400000, 6300000, 7200000, 9000000, 10800000, 14400000],
    tenors: [
      {
        months: 12,
        installments: {
          5400000: 3123000,
          6300000: 3034000,
          7200000: 2945000,
          9000000: 2768000,
          10800000: 2591000,
          14400000: 2236000,
        },
      },
      {
        months: 18,
        installments: {
          5400000: 2264000,
          6300000: 2201000,
          7200000: 2137000,
          9000000: 2010000,
          10800000: 1883000,
          14400000: 1628000,
        },
      },
      {
        months: 24,
        installments: {
          5400000: 1843000,
          6300000: 1792000,
          7200000: 1741000,
          9000000: 1638000,
          10800000: 1536000,
          14400000: 1331000,
        },
      },
      {
        months: 30,
        installments: {
          5400000: 1595000,
          6300000: 1551000,
          7200000: 1507000,
          9000000: 1419000,
          10800000: 1331000,
          14400000: 1156000,
        },
      },
      {
        months: 36,
        installments: {
          5400000: 1433000,
          6300000: 1394000,
          7200000: 1355000,
          9000000: 1276000,
          10800000: 1198000,
          14400000: 1041000,
        },
      },
    ],
  },
  {
    model: 'VICTORY',
    variant: 'regular',
    discount: 5000000,
    otr: 33900000,
    dpOptions: [5100000, 5900000, 6800000, 8500000, 10200000, 13600000],
    hasExtended: true,
    tenors: [
      {
        months: 12,
        installments: {
          5100000: 2945000,
          5900000: 2866000,
          6800000: 2785000,
          8500000: 2617000,
          10200000: 2450000,
          13600000: 2115000,
        },
      },
      {
        months: 18,
        installments: {
          5100000: 2137000,
          5900000: 2078000,
          6800000: 2019000,
          8500000: 1900000,
          10200000: 1780000,
          13600000: 1540000,
        },
      },
      {
        months: 24,
        installments: {
          5100000: 1741000,
          5900000: 1694000,
          6800000: 1647000,
          8500000: 1549000,
          10200000: 1452000,
          13600000: 1258000,
        },
      },
      {
        months: 30,
        installments: {
          5100000: 1508000,
          5900000: 1467000,
          6800000: 1426000,
          8500000: 1342000,
          10200000: 1259000,
          13600000: 1093000,
        },
      },
      {
        months: 36,
        installments: {
          5100000: 1356000,
          5900000: 1319000,
          6800000: 1283000,
          8500000: 1207000,
          10200000: 1133000,
          13600000: 985000,
        },
      },
    ],
  },
  {
    model: 'VICTORY',
    variant: 'extended',
    discount: 7000000,
    otr: 36900000,
    dpOptions: [5600000, 6500000, 7400000, 9300000, 11100000, 14800000],
    tenors: [
      {
        months: 12,
        installments: {
          5600000: 3203000,
          6500000: 3115000,
          7400000: 3026000,
          9300000: 2839000,
          11100000: 2662000,
          14800000: 2297000,
        },
      },
      {
        months: 18,
        installments: {
          5600000: 2323000,
          6500000: 2259000,
          7400000: 2195000,
          9300000: 2061000,
          11100000: 1934000,
          14800000: 1672000,
        },
      },
      {
        months: 24,
        installments: {
          5600000: 1891000,
          6500000: 1839000,
          7400000: 1788000,
          9300000: 1680000,
          11100000: 1577000,
          14800000: 1367000,
        },
      },
      {
        months: 30,
        installments: {
          5600000: 1636000,
          6500000: 1592000,
          7400000: 1548000,
          9300000: 1456000,
          11100000: 1368000,
          14800000: 1187000,
        },
      },
      {
        months: 36,
        installments: {
          5600000: 1470000,
          6500000: 1431000,
          7400000: 1391000,
          9300000: 1309000,
          11100000: 1230000,
          14800000: 1069000,
        },
      },
    ],
  },
  {
    model: 'EDPOWER',
    discount: 7000000,
    otr: 53900000,
    dpOptions: [8100000, 9500000, 10800000, 13500000, 16200000, 21600000],
    tenors: [
      {
        months: 12,
        installments: {
          8100000: 4661000,
          9500000: 4523000,
          10800000: 4395000,
          13500000: 4130000,
          16200000: 3864000,
          21600000: 3332000,
        },
      },
      {
        months: 18,
        installments: {
          8100000: 3378000,
          9500000: 3279000,
          10800000: 3187000,
          13500000: 2997000,
          16200000: 2806000,
          21600000: 2424000,
        },
      },
      {
        months: 24,
        installments: {
          8100000: 2748000,
          9500000: 2669000,
          10800000: 2595000,
          13500000: 2441000,
          16200000: 2287000,
          21600000: 1980000,
        },
      },
      {
        months: 30,
        installments: {
          8100000: 2378000,
          9500000: 2309000,
          10800000: 2246000,
          13500000: 2114000,
          16200000: 1982000,
          21600000: 1718000,
        },
      },
      {
        months: 36,
        installments: {
          8100000: 2136000,
          9500000: 2075000,
          10800000: 2018000,
          13500000: 1901000,
          16200000: 1783000,
          21600000: 1548000,
        },
      },
    ],
  },
]

export default function FinancingSection() {
  // Filter main models only (MINI, ATHENA, VICTORY, EDPOWER) - exclude extended variants
  const mainModels = FINANCING_DATA.filter((m) => {
    if (m.variant === 'extended') return false
    return !m.variant || m.variant === 'regular'
  })
  
  const uniqueModels = mainModels.filter((m, index, self) => 
    index === self.findIndex((model) => model.model === m.model)
  )
  
  // Step state
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedModel, setSelectedModel] = useState<number | null>(null)
  const [selectedVariant, setSelectedVariant] = useState<'regular' | 'extended'>('regular')
  const [selectedDP, setSelectedDP] = useState<number | null>(null)
  const [selectedTenor, setSelectedTenor] = useState<number | null>(null)
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})
  const [imageLoaded, setImageLoaded] = useState<Record<string, boolean>>({})

  // Pre-load all model images (including variants) to detect load state reliably
  useEffect(() => {
    const imagesToPreload: Array<{ key: string; path: string }> = []
    
    // Pre-load main model images
    uniqueModels.forEach((model, index) => {
      const imageKey = `model-${model.model}-${index}`
      const imagePath = getModelImagePath(model.model)
      if (imagePath.startsWith('/images/models/')) {
        imagesToPreload.push({ key: imageKey, path: imagePath })
      }
      
      // Also pre-load extended variant if available
      if (model.hasExtended) {
        const extendedImageKey = `variant-extended-${model.model}`
        const extendedImagePath = getModelImagePath(model.model, 'extended')
        if (extendedImagePath.startsWith('/images/models/')) {
          imagesToPreload.push({ key: extendedImageKey, path: extendedImagePath })
        }
        
        // Pre-load regular variant too
        const regularImageKey = `variant-regular-${model.model}`
        const regularImagePath = getModelImagePath(model.model, 'regular')
        if (regularImagePath.startsWith('/images/models/')) {
          imagesToPreload.push({ key: regularImageKey, path: regularImagePath })
        }
      }
    })
    
    // Pre-load all images
    imagesToPreload.forEach(({ key, path }) => {
      const img = new Image()
      
      // Handle cached images
      const handleLoad = () => {
        setImageLoaded(prev => ({ ...prev, [key]: true }))
        setImageErrors(prev => ({ ...prev, [key]: false }))
      }
      
      const handleError = () => {
        setImageErrors(prev => ({ ...prev, [key]: true }))
        setImageLoaded(prev => ({ ...prev, [key]: false }))
      }
      
      img.onload = handleLoad
      img.onerror = handleError
      img.src = path
      
      // Check if image is already cached (complete immediately)
      if (img.complete) {
        if (img.naturalWidth > 0 && img.naturalHeight > 0) {
          handleLoad()
        } else {
          handleError()
        }
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Only run once on mount

  // Get current model data
  const activeMainModel = selectedModel !== null ? uniqueModels[selectedModel] : null
  const currentModel = activeMainModel && selectedVariant === 'extended' && activeMainModel.hasExtended
    ? FINANCING_DATA.find((m) => m.model === activeMainModel.model && m.variant === 'extended') || activeMainModel
    : activeMainModel

  // Calculate results
  const currentDP = selectedDP !== null && currentModel ? currentModel.dpOptions[selectedDP] : null
  const currentTenor = selectedTenor !== null && currentModel ? currentModel.tenors[selectedTenor] : null
  const monthlyInstallment = currentDP && currentTenor ? currentTenor.installments[currentDP] || 0 : 0
  const totalPayment = currentDP && currentTenor && currentModel ? currentDP + monthlyInstallment * currentTenor.months : 0
  const totalInterest = currentModel && totalPayment > 0 ? totalPayment - currentModel.otr : 0

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleModelSelect = (index: number) => {
    setSelectedModel(index)
    setSelectedVariant('regular')
    setSelectedDP(null)
    setSelectedTenor(null)
    setTimeout(() => handleNext(), 300)
  }

  const handleVariantSelect = (variant: 'regular' | 'extended') => {
    setSelectedVariant(variant)
    setSelectedDP(null)
    setSelectedTenor(null)
    setTimeout(() => handleNext(), 300)
  }

  const handleDPSelect = (index: number) => {
    setSelectedDP(index)
    setSelectedTenor(null)
    setTimeout(() => handleNext(), 300)
  }

  const handleTenorSelect = (index: number) => {
    setSelectedTenor(index)
    setTimeout(() => handleNext(), 300)
  }

  return (
    <section id="financing" className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-block bg-accent-orange text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
            PROMO SPESIAL JANUARI 2026
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-electric-blue">
              Cicilan Ringan
            </span>{' '}
            dengan Kredivo
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Simulasi kredit mudah dengan DP rendah dan cicilan terjangkau. 
            <span className="font-semibold text-success-green"> Promo hingga 31 Januari 2026</span>
          </p>
        </motion.div>

        {/* Step Indicator */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                      currentStep >= step
                        ? 'bg-electric-blue text-white shadow-lg scale-110'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {currentStep > step ? <FiCheck className="text-xl" /> : step}
                  </div>
                  <div className={`text-xs mt-2 text-center font-semibold ${
                    currentStep >= step ? 'text-slate-800' : 'text-slate-400'
                  }`}>
                    {step === 1 && 'Pilih Model'}
                    {step === 2 && 'Pilih DP'}
                    {step === 3 && 'Pilih Tenor'}
                    {step === 4 && 'Hasil'}
                  </div>
                </div>
                {step < 4 && (
                  <div className={`flex-1 h-1 mx-2 transition-all ${
                    currentStep > step ? 'bg-electric-blue' : 'bg-slate-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Calculator Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 shadow-xl border-2 border-slate-200 max-w-4xl mx-auto"
        >
          <AnimatePresence mode="wait">
            {/* Step 1: Pilih Model */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">Pilih Model Wedison</h3>
                  <p className="text-slate-600">Pilih model yang ingin Anda cicil</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {uniqueModels.map((model, index) => {
                    const modelImagePath = getModelImagePath(model.model)
                    const imageKey = `model-${model.model}-${index}`
                    const imageError = imageErrors[imageKey] || false
                    const imageLoadedState = imageLoaded[imageKey] || false
                    
                    return (
                      <button
                        key={`${model.model}-${index}`}
                        onClick={() => handleModelSelect(index)}
                        className="p-0 rounded-xl border-2 border-slate-200 hover:border-success-green hover:shadow-lg transition-all text-left group overflow-hidden"
                      >
                        <div className="relative h-48 w-full overflow-hidden">
                          {/* Placeholder Badge - hanya muncul jika menggunakan local image path dan belum load */}
                          {modelImagePath.startsWith('/images/models/') && !imageLoadedState && !imageError && (
                            <div className="absolute top-2 left-2 z-20 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold shadow-lg border border-yellow-600">
                              PLACEHOLDER
                            </div>
                          )}
                          <img
                            src={imageError ? `https://source.unsplash.com/featured/400x300/?motorcycle,electric,${model.model.toLowerCase()}` : modelImagePath}
                            alt={model.model}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            onError={(e) => {
                              setImageErrors(prev => ({ ...prev, [imageKey]: true }))
                              setImageLoaded(prev => ({ ...prev, [imageKey]: false }))
                            }}
                            onLoad={(e) => {
                              // Also check if image is actually loaded (for cached images)
                              const target = e.currentTarget as HTMLImageElement
                              if (target.complete && target.naturalWidth > 0 && target.naturalHeight > 0) {
                                setImageLoaded(prev => ({ ...prev, [imageKey]: true }))
                                setImageErrors(prev => ({ ...prev, [imageKey]: false }))
                              }
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                            <div className="font-bold text-xl mb-1">{model.model}</div>
                            <div className="text-sm opacity-90">
                              Rp {(model.otr / 1000000).toFixed(1)} juta
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="inline-block bg-success-green text-white px-3 py-1 rounded-full text-sm font-semibold mb-2">
                            Diskon Rp {(model.discount / 1000000).toFixed(1)} jt
                          </div>
                          {model.hasExtended && (
                            <div className="text-xs text-slate-500 mt-2">
                              Tersedia versi Extended
                            </div>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* Step 2: Pilih Variant (jika ada) atau Pilih DP */}
            {currentStep === 2 && activeMainModel && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {activeMainModel.hasExtended ? (
                  <>
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-slate-800 mb-2">Pilih Varian {activeMainModel.model}</h3>
                      <p className="text-slate-600">Pilih versi Regular atau Extended</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => handleVariantSelect('regular')}
                        className="p-0 rounded-xl border-2 border-slate-200 hover:border-electric-blue hover:shadow-lg transition-all text-center overflow-hidden group"
                      >
                        <div className="relative h-40 w-full overflow-hidden">
                          {(() => {
                            const variantImagePath = getModelImagePath(activeMainModel.model, 'regular')
                            const variantImageKey = `variant-regular-${activeMainModel.model}`
                            const variantImageError = imageErrors[variantImageKey] || false
                            const variantImageLoadedState = imageLoaded[variantImageKey] || false
                            return (
                              <>
                                {/* Placeholder Badge - hanya muncul jika menggunakan local image path dan belum load */}
                                {variantImagePath.startsWith('/images/models/') && !variantImageLoadedState && !variantImageError && (
                                  <div className="absolute top-2 left-2 z-20 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold shadow-lg border border-yellow-600">
                                    PLACEHOLDER
                                  </div>
                                )}
                                <img
                                  src={variantImageError ? `https://source.unsplash.com/featured/400x300/?motorcycle,electric,${activeMainModel.model.toLowerCase()}` : variantImagePath}
                                  alt="Regular"
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                  onError={() => {
                                    setImageErrors(prev => ({ ...prev, [variantImageKey]: true }))
                                    setImageLoaded(prev => ({ ...prev, [variantImageKey]: false }))
                                  }}
                                  onLoad={(e) => {
                                    // Check if image is actually loaded (for cached images)
                                    const target = e.currentTarget as HTMLImageElement
                                    if (target.complete && target.naturalWidth > 0 && target.naturalHeight > 0) {
                                      setImageLoaded(prev => ({ ...prev, [variantImageKey]: true }))
                                      setImageErrors(prev => ({ ...prev, [variantImageKey]: false }))
                                    }
                                  }}
                                />
                              </>
                            )
                          })()}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                            <div className="font-bold text-lg">Regular</div>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="text-lg text-slate-600 mb-2">
                            Rp {(activeMainModel.otr / 1000000).toFixed(1)} jt
                          </div>
                          <div className="text-xs text-success-green font-semibold">
                            Diskon Rp {(activeMainModel.discount / 1000000).toFixed(1)} jt
                          </div>
                        </div>
                      </button>
                      <button
                        onClick={() => handleVariantSelect('extended')}
                        className="p-0 rounded-xl border-2 border-slate-200 hover:border-electric-blue hover:shadow-lg transition-all text-center overflow-hidden group"
                      >
                        <div className="relative h-40 w-full overflow-hidden">
                          {(() => {
                            const variantImagePath = getModelImagePath(activeMainModel.model, 'extended')
                            const variantImageKey = `variant-extended-${activeMainModel.model}`
                            const variantImageError = imageErrors[variantImageKey] || false
                            const variantImageLoadedState = imageLoaded[variantImageKey] || false
                            return (
                              <>
                                {/* Placeholder Badge - hanya muncul jika menggunakan local image path dan belum load */}
                                {variantImagePath.startsWith('/images/models/') && !variantImageLoadedState && !variantImageError && (
                                  <div className="absolute top-2 left-2 z-20 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold shadow-lg border border-yellow-600">
                                    PLACEHOLDER
                                  </div>
                                )}
                                <img
                                  src={variantImageError ? `https://source.unsplash.com/featured/400x300/?motorcycle,electric,battery,extended` : variantImagePath}
                                  alt="Extended"
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                  onError={() => {
                                    setImageErrors(prev => ({ ...prev, [variantImageKey]: true }))
                                    setImageLoaded(prev => ({ ...prev, [variantImageKey]: false }))
                                  }}
                                  onLoad={(e) => {
                                    // Check if image is actually loaded (for cached images)
                                    const target = e.currentTarget as HTMLImageElement
                                    if (target.complete && target.naturalWidth > 0 && target.naturalHeight > 0) {
                                      setImageLoaded(prev => ({ ...prev, [variantImageKey]: true }))
                                      setImageErrors(prev => ({ ...prev, [variantImageKey]: false }))
                                    }
                                  }}
                                />
                              </>
                            )
                          })()}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                            <div className="font-bold text-lg">Extended</div>
                            <div className="text-xs opacity-90">Baterai Lebih Besar</div>
                          </div>
                        </div>
                        <div className="p-4">
                          {currentModel && (
                            <>
                              <div className="text-lg text-slate-600 mb-2">
                                Rp {(currentModel.otr / 1000000).toFixed(1)} jt
                              </div>
                              <div className="text-xs text-success-green font-semibold">
                                Diskon Rp {(currentModel.discount / 1000000).toFixed(1)} jt
                              </div>
                            </>
                          )}
                        </div>
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-slate-800 mb-2">Pilih Uang Muka (DP)</h3>
                      <p className="text-slate-600">Pilih jumlah uang muka yang sesuai dengan budget Anda</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {currentModel?.dpOptions.map((dp, index) => (
                        <button
                          key={dp}
                          onClick={() => handleDPSelect(index)}
                          className="p-4 rounded-lg border-2 border-slate-200 hover:border-electric-blue hover:shadow-md transition-all"
                        >
                          <div className="text-lg font-semibold text-slate-700 mb-1">
                            Rp {(dp / 1000000).toFixed(1)} jt
                          </div>
                          <div className="text-xs text-slate-500">
                            {((dp / (currentModel?.otr || 1)) * 100).toFixed(0)}% dari OTR
                          </div>
                        </button>
                      ))}
                    </div>
                  </>
                )}
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 text-slate-600 hover:text-slate-800"
                >
                  <FiChevronLeft /> Kembali
                </button>
              </motion.div>
            )}

            {/* Step 3: Pilih DP (jika sudah pilih variant) atau Pilih Tenor */}
            {currentStep === 3 && currentModel && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {selectedDP === null ? (
                  <>
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-slate-800 mb-2">Pilih Uang Muka (DP)</h3>
                      <p className="text-slate-600">Pilih jumlah uang muka yang sesuai dengan budget Anda</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {currentModel.dpOptions.map((dp, index) => (
                        <button
                          key={dp}
                          onClick={() => handleDPSelect(index)}
                          className="p-4 rounded-lg border-2 border-slate-200 hover:border-electric-blue hover:shadow-md transition-all"
                        >
                          <div className="text-lg font-semibold text-slate-700 mb-1">
                            Rp {(dp / 1000000).toFixed(1)} jt
                          </div>
                          <div className="text-xs text-slate-500">
                            {((dp / currentModel.otr) * 100).toFixed(0)}% dari OTR
                          </div>
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-slate-800 mb-2">Pilih Tenor Cicilan</h3>
                      <p className="text-slate-600">Pilih jangka waktu cicilan yang nyaman untuk Anda</p>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {currentModel.tenors.map((tenor, index) => (
                        <button
                          key={tenor.months}
                          onClick={() => handleTenorSelect(index)}
                          className="p-4 rounded-lg border-2 border-slate-200 hover:border-accent-orange hover:shadow-md transition-all"
                        >
                          <div className="font-semibold text-slate-700 text-lg mb-1">
                            {tenor.months} bulan
                          </div>
                          <div className="text-xs text-slate-500">
                            {tenor.months / 12} tahun
                          </div>
                        </button>
                      ))}
                    </div>
                  </>
                )}
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 text-slate-600 hover:text-slate-800"
                >
                  <FiChevronLeft /> Kembali
                </button>
              </motion.div>
            )}

            {/* Step 4: Hasil */}
            {currentStep === 4 && currentModel && currentDP !== null && currentTenor && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">Hasil Simulasi Kredit</h3>
                  <p className="text-slate-600">Berikut adalah rincian cicilan Anda</p>
                </div>

                {/* Promo Badge */}
                <div className="bg-accent-orange text-white rounded-xl p-4 text-center">
                  <div className="text-sm font-semibold mb-1">🎉 Promo Spesial</div>
                  <div className="text-xs opacity-90">
                    Periode: 01 Jan - 31 Jan 2026
                  </div>
                </div>

                {/* Monthly Installment */}
                <div className="bg-success-green text-white rounded-xl p-6 text-center">
                  <div className="text-sm opacity-90 mb-2">Cicilan Bulanan</div>
                  <div className="text-4xl font-bold mb-2">
                    Rp {monthlyInstallment.toLocaleString('id-ID')}
                  </div>
                  <div className="text-sm opacity-90">
                    Per bulan selama {currentTenor.months} bulan
                  </div>
                </div>

                {/* Breakdown */}
                <div className="bg-slate-50 rounded-xl p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Model:</span>
                    <span className="font-semibold text-slate-800">
                      {currentModel.model} {selectedVariant === 'extended' ? 'Extended' : ''}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Harga OTR:</span>
                    <span className="font-semibold text-slate-800">
                      Rp {currentModel.otr.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Diskon:</span>
                    <span className="font-semibold text-success-green">
                      - Rp {currentModel.discount.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Uang Muka:</span>
                    <span className="font-semibold text-slate-800">
                      Rp {currentDP.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Total Cicilan:</span>
                    <span className="font-semibold text-slate-800">
                      Rp {(monthlyInstallment * currentTenor.months).toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="border-t border-slate-300 pt-4 flex justify-between items-center">
                    <span className="text-slate-700 font-semibold">Total Pembayaran:</span>
                    <span className="text-xl font-bold text-slate-900">
                      Rp {totalPayment.toLocaleString('id-ID')}
                    </span>
                  </div>
                  {totalInterest > 0 && (
                    <div className="text-xs text-slate-500 text-center pt-2 border-t border-slate-300">
                      Total Bunga: Rp {totalInterest.toLocaleString('id-ID')}
                    </div>
                  )}
                </div>

                {/* Daily Cost */}
                <div className="bg-cyan-50 rounded-xl p-4 border-2 border-cyan-200">
                  <div className="text-center">
                    <div className="text-sm text-slate-600 mb-1">Cicilan per Hari</div>
                    <div className="text-2xl font-bold text-cyan-700">
                      Rp {Math.round(monthlyInstallment / 30).toLocaleString('id-ID')}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      Rp {monthlyInstallment.toLocaleString('id-ID')} ÷ 30 hari
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <a
                  href={WHATSAPP_LINKS.financing}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-electric-blue text-white text-center font-bold py-4 px-6 rounded-xl hover:shadow-xl transition-all hover:scale-105"
                >
                  Ajukan Kredit Sekarang →
                </a>

                <p className="text-xs text-slate-500 text-center">
                  * Simulasi ini hanya estimasi. Syarat dan ketentuan berlaku.
                </p>

                <button
                  onClick={() => {
                    setCurrentStep(1)
                    setSelectedModel(null)
                    setSelectedVariant('regular')
                    setSelectedDP(null)
                    setSelectedTenor(null)
                  }}
                  className="flex items-center justify-center gap-2 text-slate-600 hover:text-slate-800 w-full"
                >
                  <FiChevronLeft /> Mulai Lagi
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 grid md:grid-cols-4 gap-6"
        >
          {[
            { title: 'DP Fleksibel', desc: 'Mulai dari 15%' },
            { title: 'Proses Cepat', desc: 'Approval dalam 1 hari' },
            { title: 'Tenor Panjang', desc: 'Hingga 36 bulan' },
            { title: 'Tanpa Survey', desc: 'Proses mudah' },
          ].map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 text-center shadow-lg border-2 border-slate-200"
            >
              <div className="font-bold text-slate-800 mb-1">{benefit.title}</div>
              <div className="text-sm text-slate-600">{benefit.desc}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
