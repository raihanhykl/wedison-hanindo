'use client'

import { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { FiBattery, FiZap } from 'react-icons/fi'
import { MODEL_SPECS } from '@/utils/modelSpecs'

// Model efficiency in km/kWh
// Since only battery capacity differs (motor and system are the same), 
// efficiency should be consistent. Based on real-world electric motorcycle data: ~40-50 km/kWh
// Using calculated efficiency from actual range and battery capacity
// Formula: Range (km) / Battery Capacity (kWh) = Efficiency (km/kWh)
// Battery Capacity = Ah × Voltage (48V) / 1000 = kWh
const calculateEfficiency = (rangeKm: number, batteryAh: number, voltage: number = 48): number => {
  const batteryKWh = (batteryAh * voltage) / 1000
  return rangeKm / batteryKWh
}

// Calculate efficiency for each model
// Note: Extended versions use same motor, so efficiency should be similar
const MODEL_EFFICIENCY: Record<string, number> = {
  edpower: calculateEfficiency(135, 70, 48), // 135km / 3.36kWh = 40.18 km/kWh
  athena: calculateEfficiency(100, 45, 48), // 100km / 2.16kWh = 46.3 km/kWh
  'athena-extended': calculateEfficiency(130, 60, 48), // 130km / 2.88kWh = 45.1 km/kWh (similar to regular)
  victory: calculateEfficiency(100, 45, 48), // 100km / 2.16kWh = 46.3 km/kWh (same motor as Athena)
  'victory-extended': calculateEfficiency(130, 60, 48), // 130km / 2.88kWh = 45.1 km/kWh (similar to regular)
  mini: calculateEfficiency(80, 30, 48), // 80km / 1.44kWh = 55.6 km/kWh (smaller motor, more efficient)
}

// Animated Bar Chart Component with smooth real-time updates
function AnimatedBarChart({
  monthlyFuelCost,
  monthlyElectricityCost,
  monthlySavings,
  monthlyFuelLiters,
  monthlyElectricityKWh,
  selectedModelData,
}: {
  monthlyFuelCost: number
  monthlyElectricityCost: number
  monthlySavings: number
  monthlyFuelLiters: number
  monthlyElectricityKWh: number
  selectedModelData: any
}) {
  // Use absolute scale based on rupiah (cost) for direct visual comparison
  // Maximum expected cost: ~Rp 300,000 for fuel (30L × Rp 10,000) for 1000km distance
  // Use this as the maximum scale for both bars to show cost difference clearly
  const maxCost = 300000 // Maximum expected fuel cost per month (Rp 300,000 for ~1000km)
  
  // Calculate percentages based on cost (rupiah) for direct comparison
  // This makes it easy to see the cost difference visually
  const fuelPercentage = Math.min((monthlyFuelCost / maxCost) * 100, 100)
  const electricPercentage = Math.min((monthlyElectricityCost / maxCost) * 100, 100)

  // Use motion values for smooth real-time animation
  const fuelWidth = useMotionValue(fuelPercentage)
  const electricWidth = useMotionValue(electricPercentage)

  // Spring animations for smooth transitions
  const fuelSpring = useSpring(fuelWidth, { stiffness: 200, damping: 25 })
  const electricSpring = useSpring(electricWidth, { stiffness: 200, damping: 25 })

  // Transform to percentage strings
  const fuelWidthPercent = useTransform(fuelSpring, (latest) => `${latest}%`)
  const electricWidthPercent = useTransform(electricSpring, (latest) => `${latest}%`)

  // Update motion values when data changes
  useEffect(() => {
    fuelWidth.set(fuelPercentage)
  }, [fuelPercentage, fuelWidth])

  useEffect(() => {
    electricWidth.set(electricPercentage)
  }, [electricPercentage, electricWidth])

  return (
    <div className="space-y-4">
      {/* Motor BBM Bar */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-slate-700">Motor Bensin</span>
          <motion.span
            key={`fuel-${monthlyFuelLiters}`}
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.15 }}
            className="text-lg font-bold text-red-600"
          >
            {monthlyFuelLiters.toFixed(1)} L
          </motion.span>
        </div>
        <div className="relative h-12 bg-slate-200 rounded-full overflow-hidden shadow-inner">
          <motion.div
            style={{ width: fuelWidthPercent }}
            className="absolute left-0 top-0 h-full bg-red-500 rounded-full flex items-center justify-end pr-3 shadow-md"
          >
            {fuelPercentage > 15 && (
              <motion.span
                key={`fuel-label-${monthlyFuelCost}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="text-white text-xs font-bold"
              >
                Rp {Math.round(monthlyFuelCost).toLocaleString('id-ID')}
              </motion.span>
            )}
          </motion.div>
        </div>
      </div>

      {/* Wedison Bar */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-slate-700">Wedison {selectedModelData.name}</span>
          <motion.span
            key={`electric-${monthlyElectricityKWh}`}
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.15 }}
            className="text-lg font-bold text-success-green"
          >
            {monthlyElectricityKWh.toFixed(1)} kWh
          </motion.span>
        </div>
        <div className="relative h-12 bg-slate-200 rounded-full overflow-hidden shadow-inner">
          <motion.div
            style={{ width: electricWidthPercent }}
            className="absolute left-0 top-0 h-full bg-success-green rounded-full flex items-center shadow-md"
          >
            {electricPercentage > 8 ? (
              // Label di dalam bar jika cukup lebar
              <motion.span
                key={`electric-label-in-${monthlyElectricityCost}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="text-white text-xs font-bold pr-3 ml-auto"
              >
                Rp {Math.round(monthlyElectricityCost).toLocaleString('id-ID')}
              </motion.span>
            ) : (
              // Label di luar bar jika terlalu kecil
              <motion.span
                key={`electric-label-out-${monthlyElectricityCost}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="text-success-green text-xs font-bold absolute left-full ml-2 whitespace-nowrap"
              >
                Rp {Math.round(monthlyElectricityCost).toLocaleString('id-ID')}
              </motion.span>
            )}
          </motion.div>
        </div>
      </div>

    </div>
  )
}

export default function ComparisonSection() {
  // Filter main models only (exclude extended variants)
  const mainModels = MODEL_SPECS.filter((m) => !m.id.includes('-extended'))
  
  const [sliderValue, setSliderValue] = useState(15) // Default to 15 minutes (Wedison 80%)
  const [distance, setDistance] = useState(500) // Default 500 km per month (within 50-1000 range)
  const [selectedFuel, setSelectedFuel] = useState('pertalite') // Default: Pertalite
  const [selectedElectricity, setSelectedElectricity] = useState('r1-1300') // Default: R1 1.300VA+
  const [selectedModel, setSelectedModel] = useState('edpower') // Default: EdPower
  const [selectedVariant, setSelectedVariant] = useState<'regular' | 'extended'>('regular')
  
  // Tooltip state for chart
  const [tooltip, setTooltip] = useState<{
    visible: boolean
    x: number
    y: number
    time: number
    wedisonPercent: number
    otherPercent: number
  } | null>(null)

  // Fuel options (simplified - 2 most common)
  const fuelOptions = {
    pertalite: {
      name: 'Pertalite',
      price: 10000, // Rp per liter
      label: 'Pertalite Rp 10 rb/liter',
    },
    pertamax: {
      name: 'Pertamax',
      price: 13000, // Rp per liter
      label: 'Pertamax Rp 13 rb/liter',
    },
  }

  // Electricity tariff (default: most common in Indonesia)
  const electricityTariff = {
    'r1-1300': {
      name: 'R1 1.300VA+',
      price: 1444, // Rp per kWh
      label: 'R1 1.300VA+ Rp 1.444/kWh',
    },
  }

  // Calculate positions based on slider value
  const maxTime = 180 // Maximum time in minutes (changed from 240)
  const wedison80Time = 15
  const wedison100Time = 30
  const other80Time = 180
  const other100Time = 240 // Still 240 for other motors, but slider only goes to 180

  const getBatteryLevel = (time: number) => {
    if (time <= wedison80Time) {
      return Math.min((time / wedison80Time) * 80, 80)
    } else if (time <= wedison100Time) {
      return 80 + ((time - wedison80Time) / (wedison100Time - wedison80Time)) * 20
    }
    return 100
  }

  const getOtherBatteryLevel = (time: number) => {
    if (time <= other80Time) {
      return Math.min((time / other80Time) * 80, 80)
    } else if (time <= other100Time) {
      return 80 + ((time - other80Time) / (other100Time - other80Time)) * 20
    }
    return 100
  }

  const currentWedisonBattery = getBatteryLevel(sliderValue)
  const currentOtherBattery = getOtherBatteryLevel(sliderValue)

  // Determine actual model ID based on variant
  const actualModelId = selectedVariant === 'extended' && MODEL_SPECS.find((m) => m.id === selectedModel)?.hasExtended
    ? MODEL_SPECS.find((m) => m.id === selectedModel)?.extendedId || selectedModel
    : selectedModel

  // Calculate savings
  // Assumptions:
  // - Motor BBM: ~40 km/liter average (fixed for all petrol bikes)
  // - Wedison: Varies by model (see MODEL_EFFICIENCY)
  //   - EdPower: 40.18 km/kWh (similar to petrol, so similar consumption)
  //   - Athena: 46.3 km/kWh (more efficient, less kWh needed)
  //   - Victory: 46.3 km/kWh (same as Athena)
  //   - Mini: 55.6 km/kWh (most efficient, least kWh needed)
  const fuelEfficiency = 40 // km per liter (fixed for petrol bikes)
  const electricEfficiency = MODEL_EFFICIENCY[actualModelId] || MODEL_EFFICIENCY[selectedModel] || MODEL_EFFICIENCY['edpower'] // km per kWh (varies by model)

  // Calculate consumption based on distance and efficiency
  // Formula: distance (km) / efficiency (km per unit) = consumption (unit)
  const monthlyFuelLiters = distance / fuelEfficiency // e.g., 500km / 40km/L = 12.5L
  const monthlyFuelCost = monthlyFuelLiters * fuelOptions[selectedFuel as keyof typeof fuelOptions].price

  const monthlyElectricityKWh = distance / electricEfficiency // e.g., 500km / 40.18km/kWh = 12.44kWh (EdPower) or 500km / 55.6km/kWh = 8.99kWh (Mini)
  const monthlyElectricityCost = monthlyElectricityKWh * electricityTariff['r1-1300'].price

  const monthlySavings = monthlyFuelCost - monthlyElectricityCost
  const yearlySavings = monthlySavings * 12

  const selectedModelData = MODEL_SPECS.find((m) => m.id === actualModelId) || MODEL_SPECS.find((m) => m.id === selectedModel) || MODEL_SPECS[0]
  const currentMainModel = MODEL_SPECS.find((m) => m.id === selectedModel) || MODEL_SPECS[0]

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-success-green">SuperCharge</span>{' '}
            <span className="text-slate-700">vs Motor Listrik Lain</span>
          </h2>
          <p className="text-xl text-slate-600">
            Charge 15 menit sambil istirahat. Motor listrik lain butuh 180 menit.
          </p>
        </motion.div>

        {/* Comparison Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-slate-200">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">
              Perbandingan Waktu Charging
            </h3>
            
            {/* Chart Container */}
            <div className="relative">
              <svg
                viewBox="0 0 800 400"
                className="w-full h-auto"
                preserveAspectRatio="xMidYMid meet"
                onMouseMove={(e) => {
                  const svg = e.currentTarget
                  const rect = svg.getBoundingClientRect()
                  
                  // Get mouse position relative to SVG
                  const mouseX = e.clientX - rect.left
                  const mouseY = e.clientY - rect.top
                  
                  // SVG viewBox is 0 0 800 400, so we need to scale
                  const svgWidth = rect.width
                  const svgHeight = rect.height
                  const viewBoxWidth = 800
                  const viewBoxHeight = 400
                  
                  // Convert to viewBox coordinates
                  const svgX = (mouseX / svgWidth) * viewBoxWidth
                  const svgY = (mouseY / svgHeight) * viewBoxHeight
                  
                  // Chart area: X from 80 to 760 (680px wide), Y from 40 to 360 (320px tall)
                  // Calculate time from X position (80 to 760 is 0 to 240 minutes)
                  const chartX = svgX - 80
                  const chartWidth = 680
                  const time = Math.max(0, Math.min(240, (chartX / chartWidth) * 240))
                  
                  // Calculate battery percentage for Wedison
                  let wedisonPercent = 0
                  if (time <= 15) {
                    wedisonPercent = (time / 15) * 80
                  } else if (time <= 30) {
                    wedisonPercent = 80 + ((time - 15) / 15) * 20
                  } else {
                    wedisonPercent = 100
                  }
                  
                  // Calculate battery percentage for other motors
                  let otherPercent = 0
                  if (time <= 180) {
                    otherPercent = (time / 180) * 80
                  } else if (time <= 240) {
                    otherPercent = 80 + ((time - 180) / 60) * 20
                  } else {
                    otherPercent = 100
                  }
                  
                  setTooltip({
                    visible: true,
                    x: mouseX,
                    y: mouseY,
                    time: Math.round(time),
                    wedisonPercent: Math.round(wedisonPercent),
                    otherPercent: Math.round(otherPercent),
                  })
                }}
                onMouseLeave={() => {
                  setTooltip(null)
                }}
              >
                {/* Grid Lines */}
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="800" height="400" fill="url(#grid)" />

                {/* Y-Axis (Battery Percentage) */}
                <line x1="80" y1="40" x2="80" y2="360" stroke="#64748b" strokeWidth="2" />
                {[0, 20, 40, 60, 80, 100].map((percent) => (
                  <g key={percent}>
                    <line
                      x1="75"
                      y1={360 - (percent / 100) * 320}
                      x2="80"
                      y2={360 - (percent / 100) * 320}
                      stroke="#64748b"
                      strokeWidth="2"
                    />
                    <text
                      x="70"
                      y={360 - (percent / 100) * 320 + 4}
                      textAnchor="end"
                      fill="#64748b"
                      fontSize="12"
                    >
                      {percent}%
                    </text>
                  </g>
                ))}
                <text
                  x="20"
                  y="200"
                  textAnchor="middle"
                  transform="rotate(-90 20 200)"
                  fill="#334155"
                  fontSize="14"
                  fontWeight="600"
                >
                  Persen Baterai
                </text>

                {/* X-Axis (Time in Minutes) */}
                <line x1="80" y1="360" x2="760" y2="360" stroke="#64748b" strokeWidth="2" />
                {[0, 30, 60, 90, 120, 150, 180, 210, 240].map((minute) => (
                  <g key={minute}>
                    <line
                      x1={80 + (minute / 240) * 680}
                      y1="360"
                      x2={80 + (minute / 240) * 680}
                      y2="365"
                      stroke="#64748b"
                      strokeWidth="2"
                    />
                    <text
                      x={80 + (minute / 240) * 680}
                      y="380"
                      textAnchor="middle"
                      fill="#64748b"
                      fontSize="12"
                    >
                      {minute}
                    </text>
                  </g>
                ))}
                <text
                  x="420"
                  y="395"
                  textAnchor="middle"
                  fill="#334155"
                  fontSize="14"
                  fontWeight="600"
                >
                  Waktu (Menit)
                </text>

                {/* Wedison SuperCharge Line */}
                <path
                  d={`M ${80 + (0 / 240) * 680} ${360 - (0 / 100) * 320} 
                      L ${80 + (15 / 240) * 680} ${360 - (80 / 100) * 320} 
                      L ${80 + (30 / 240) * 680} ${360 - (100 / 100) * 320}`}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Wedison Points */}
                <circle cx={80 + (15 / 240) * 680} cy={360 - (80 / 100) * 320} r="6" fill="#10b981" />
                <circle cx={80 + (30 / 240) * 680} cy={360 - (100 / 100) * 320} r="6" fill="#10b981" />

                {/* Motor Listrik Lain Line */}
                <path
                  d={`M ${80 + (0 / 240) * 680} ${360 - (0 / 100) * 320} 
                      L ${80 + (180 / 240) * 680} ${360 - (80 / 100) * 320} 
                      L ${80 + (240 / 240) * 680} ${360 - (100 / 100) * 320}`}
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="8 4"
                />
                {/* Motor Lain Points */}
                <circle cx={80 + (180 / 240) * 680} cy={360 - (80 / 100) * 320} r="6" fill="#ef4444" />
                <circle cx={80 + (240 / 240) * 680} cy={360 - (100 / 100) * 320} r="6" fill="#ef4444" />
              </svg>
              
              {/* Tooltip */}
              {tooltip && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute bg-slate-900 text-white rounded-lg p-3 shadow-2xl pointer-events-none z-50"
                  style={{
                    left: `${tooltip.x + 10}px`,
                    top: `${tooltip.y - 10}px`,
                    transform: 'translateY(-100%)',
                  }}
                >
                  <div className="text-xs font-semibold mb-2 text-slate-300">Waktu: {tooltip.time} menit</div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-success-green"></div>
                      <span className="text-xs">Wedison: <span className="font-bold">{tooltip.wedisonPercent}%</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <span className="text-xs">Motor Lain: <span className="font-bold">{tooltip.otherPercent}%</span></span>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-4 transform translate-y-full">
                    <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900"></div>
                  </div>
                </motion.div>
              )}

              {/* Labels Below Chart */}
              <div className="mt-6 flex justify-center gap-8 md:gap-12 flex-wrap">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <div className="w-3 h-3 rounded-full bg-success-green"></div>
                    <span className="text-sm font-semibold text-slate-700">Wedison SuperCharge</span>
                  </div>
                  <div className="text-xs text-slate-600 space-y-1">
                    <div>15 menit = <span className="font-semibold text-success-green">80%</span></div>
                    <div>30 menit = <span className="font-semibold text-green-600">100%</span></div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-sm font-semibold text-slate-700">Motor Listrik Lain</span>
                  </div>
                  <div className="text-xs text-slate-600 space-y-1">
                    <div>180 menit = <span className="font-semibold text-red-600">80%</span></div>
                    <div>240 menit = <span className="font-semibold text-red-600">100%</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Savings Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 shadow-xl border-2 border-slate-200"
        >
          <h3 className="text-3xl font-bold text-slate-800 mb-4 text-center">
            Bandingkan Biaya dengan Motor BBM
          </h3>
          <p className="text-center text-slate-600 mb-8">
            Hitung berapa banyak yang bisa Anda hemat dengan Wedison
          </p>

          {/* Model Selection Tabs */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-slate-700 mb-4 text-center">
              Pilih Model Wedison:
            </label>
            <div className="flex flex-wrap justify-center gap-3">
              {mainModels.map((model) => (
                <button
                  key={model.id}
                  onClick={() => {
                    setSelectedModel(model.id)
                    setSelectedVariant('regular') // Reset to regular when switching models
                  }}
                  className={`px-6 py-3 rounded-lg border-2 font-semibold transition-all ${
                    selectedModel === model.id
                      ? 'border-success-green bg-success-green text-white shadow-lg scale-105'
                      : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400'
                  }`}
                >
                  <div className="text-sm font-bold">{model.name}</div>
                  <div className="text-xs opacity-80">{model.range}</div>
                </button>
              ))}
            </div>
            
            {/* Variant Selection (Regular/Extended) - Only show if model has extended */}
            {currentMainModel.hasExtended && (
              <div className="mt-4 flex justify-center gap-3">
                <button
                  onClick={() => setSelectedVariant('regular')}
                  className={`px-6 py-3 rounded-lg border-2 font-semibold transition-all ${
                    selectedVariant === 'regular'
                      ? 'border-electric-blue bg-cyan-50 text-electric-blue shadow-md'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <div className="text-sm font-bold">Regular</div>
                  <div className="text-xs opacity-80">{currentMainModel.range}</div>
                </button>
                <button
                  onClick={() => setSelectedVariant('extended')}
                  className={`px-6 py-3 rounded-lg border-2 font-semibold transition-all ${
                    selectedVariant === 'extended'
                      ? 'border-electric-blue bg-cyan-50 text-electric-blue shadow-md'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <div className="text-sm font-bold">Extended</div>
                  <div className="text-xs opacity-80">Baterai Lebih Besar</div>
                </button>
              </div>
            )}
            
            <p className="text-center text-sm text-slate-500 mt-3">
              Efisiensi: {electricEfficiency.toFixed(1)} km/kWh • Range: {selectedModelData.range}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: Input Section */}
            <div className="space-y-6">
              {/* Distance Slider */}
              <div>
                <label className="block text-lg font-semibold text-slate-700 mb-3">
                  Jarak per bulan (km):
                </label>
                <div className="mb-2">
                  <div className="text-2xl font-bold text-electric-blue mb-2">
                    {distance.toLocaleString('id-ID')} km
                  </div>
                  <div className="text-sm text-slate-500 mb-3">Geser untuk mengubah</div>
                </div>
                <input
                  type="range"
                  min="50"
                  max="1000"
                  step="50"
                  value={distance}
                  onChange={(e) => setDistance(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-electric-blue"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>50 km</span>
                  <span>1000 km</span>
                </div>
              </div>

              {/* Fuel Type Selection */}
              <div>
                <label className="block text-lg font-semibold text-slate-700 mb-3">
                  Tipe BBM:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(fuelOptions).map(([key, option]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedFuel(key)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedFuel === key
                          ? 'border-red-500 bg-red-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className={`w-4 h-4 rounded-full border-2 ${
                            selectedFuel === key
                              ? 'border-red-500 bg-red-500'
                              : 'border-slate-400'
                          }`}
                        >
                          {selectedFuel === key && (
                            <div className="w-full h-full rounded-full bg-white scale-50" />
                          )}
                        </div>
                        <span className="font-semibold text-slate-700">{option.name}</span>
                      </div>
                      <div className="text-sm text-slate-600">{option.label}</div>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Bahan bakar paling populer untuk motor
                </p>
              </div>

              {/* Electricity Tariff (Fixed - Most Common) */}
              <div>
                <label className="block text-lg font-semibold text-slate-700 mb-3">
                  Tarif Listrik (Default):
                </label>
                <div className="p-4 rounded-lg border-2 border-success-green bg-green-50">
                  <div className="font-semibold text-slate-700 mb-1">
                    {electricityTariff['r1-1300'].name}
                  </div>
                  <div className="text-sm text-slate-600">{electricityTariff['r1-1300'].label}</div>
                  <p className="text-xs text-slate-500 mt-2">
                    Tarif listrik paling banyak digunakan di Indonesia
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Results Section */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-slate-800 mb-4">Biaya Bulanan:</h4>

              {/* Visual Comparison Chart */}
              <div className="bg-slate-50 rounded-xl p-6 border-2 border-slate-200">
                <h5 className="text-lg font-semibold text-slate-700 mb-4 text-center">Perbandingan Biaya Bulanan</h5>
                
                {/* Bar Chart with Animated Bars */}
                <AnimatedBarChart
                  monthlyFuelCost={monthlyFuelCost}
                  monthlyElectricityCost={monthlyElectricityCost}
                  monthlySavings={monthlySavings}
                  monthlyFuelLiters={monthlyFuelLiters}
                  monthlyElectricityKWh={monthlyElectricityKWh}
                  selectedModelData={selectedModelData}
                />
              </div>

              {/* Detailed Breakdown */}
              <div className="space-y-4">
                {/* Motor BBM Cost */}
                <div className="bg-red-50 rounded-xl p-4 border-2 border-red-200">
                  <div className="text-sm text-slate-600 mb-1">Motor Bensin</div>
                  <div className="text-xs text-slate-500 mb-2">
                    {monthlyFuelLiters.toFixed(1)} liter × Rp {fuelOptions[selectedFuel as keyof typeof fuelOptions].price.toLocaleString('id-ID')}
                  </div>
                  <div className="text-2xl font-bold text-red-600">
                    Rp {Math.round(monthlyFuelCost).toLocaleString('id-ID')}
                  </div>
                </div>

                {/* Wedison Cost */}
                <div className="bg-green-50 rounded-xl p-4 border-2 border-success-green">
                  <div className="text-sm text-slate-600 mb-1">Wedison {selectedModelData.name.toUpperCase()}</div>
                  <div className="text-xs text-slate-500 mb-1">Range: {selectedModelData.range} • Efisiensi: {electricEfficiency.toFixed(1)} km/kWh</div>
                  <div className="text-xs text-slate-500 mb-2">
                    {monthlyElectricityKWh.toFixed(1)} kWh × Rp {electricityTariff['r1-1300'].price.toLocaleString('id-ID')}
                  </div>
                  <div className="text-2xl font-bold text-success-green">
                    Rp {Math.round(monthlyElectricityCost).toLocaleString('id-ID')}
                  </div>
                </div>

                {/* Monthly Savings */}
                <div className="bg-success-green rounded-xl p-6 text-white text-center">
                  <div className="text-sm opacity-90 mb-2">Hemat per Bulan</div>
                  <div className="text-4xl font-bold">
                    Rp {Math.round(monthlySavings).toLocaleString('id-ID')}
                  </div>
                  <div className="text-sm mt-2 opacity-90">
                    Hemat hingga Rp {Math.round(yearlySavings).toLocaleString('id-ID')} per tahun!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-lg text-slate-600 mb-4">
            Pilih Wedison SuperCharge untuk efisiensi maksimal dan hemat biaya
          </p>
          <a
            href="#models"
            className="inline-flex items-center gap-2 px-8 py-4 bg-electric-blue text-white font-bold text-lg rounded-full hover:shadow-xl transition-all hover:scale-105"
          >
            Lihat Model Wedison →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
