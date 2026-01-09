'use client'

import { motion } from 'framer-motion'
import TabsComponent from '../ui/TabsComponent'
import { MODELS } from '@/utils/constants'
import Button from '../ui/Button'
import { WHATSAPP_LINKS } from '@/utils/whatsappLinks'

export default function SpecsSection() {
  const tabs = [
    {
      id: 'performance',
      label: '⚙️ Performance',
      content: <PerformanceTab />,
    },
    {
      id: 'battery',
      label: '🔋 Battery & Range',
      content: <BatteryTab />,
    },
    {
      id: 'smart',
      label: '📱 Smart Features',
      content: <SmartFeaturesTab />,
    },
    {
      id: 'pricing',
      label: '💰 Pricing & Financing',
      content: <PricingTab />,
    },
  ]
  
  return (
    <section id="specs" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-800 mb-4">
            Spesifikasi{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Teknis & Detail
            </span>
          </h2>
          <p className="text-xl text-slate-600">
            Teknologi terdepan dalam motor listrik Indonesia
          </p>
        </motion.div>
        
        <TabsComponent tabs={tabs} />
      </div>
    </section>
  )
}

function PerformanceTab() {
  const specs = {
    left: [
      { label: 'Motor Type', value: 'BLDC 3kW motor' },
      { label: 'Max Speed', value: '85 km/h' },
      { label: 'Acceleration', value: 'Smooth pickup, 3 riding modes' },
      { label: 'Braking', value: 'Regenerative + disc brake' },
      { label: 'Traction Control', value: '✓ Built-in' },
    ],
    right: [
      { label: 'Handling', value: 'Lightweight frame, agile turning' },
      { label: 'Suspension', value: 'Mono shock rear' },
      { label: 'Tire', value: '80/90-14 (tubeless)' },
      { label: 'Ground Clearance', value: '190mm' },
      { label: 'Wet Braking', value: 'Capable & safe' },
    ],
  }
  
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-4">
        {specs.left.map((spec, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-slate-50 rounded-lg p-4"
          >
            <div className="text-sm text-slate-600 mb-1">{spec.label}</div>
            <div className="text-lg font-semibold text-slate-800">{spec.value}</div>
          </motion.div>
        ))}
      </div>
      
      <div className="space-y-4">
        {specs.right.map((spec, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-slate-50 rounded-lg p-4"
          >
            <div className="text-sm text-slate-600 mb-1">{spec.label}</div>
            <div className="text-lg font-semibold text-slate-800">{spec.value}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function BatteryTab() {
  return (
    <div className="space-y-8">
      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-primary text-white rounded-xl p-6 text-center"
        >
          <div className="text-4xl mb-2">⚡</div>
          <div className="text-3xl font-bold mb-2">15 MENIT</div>
          <div className="text-sm">SuperCharge 10-80%</div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-success-green text-white rounded-xl p-6 text-center"
        >
          <div className="text-4xl mb-2">🔋</div>
          <div className="text-3xl font-bold mb-2">LiFePO4</div>
          <div className="text-sm">Safest, most reliable</div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-accent text-white rounded-xl p-6 text-center"
        >
          <div className="text-4xl mb-2">🛡️</div>
          <div className="text-3xl font-bold mb-2">3 TAHUN</div>
          <div className="text-sm">Full battery warranty</div>
        </motion.div>
      </div>
      
      {/* Models Comparison */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-cyan-50 border-2 border-cyan-200 rounded-xl p-6">
          <h4 className="text-xl font-bold text-electric-blue mb-4">EdPower (Premium)</h4>
          <ul className="space-y-2 text-slate-700">
            <li>• Capacity: <strong>70Ah</strong></li>
            <li>• Range: <strong>135 km</strong> (realistic daily use)</li>
            <li>• Full Charge (0-100%): <strong>4 jam</strong></li>
            <li>• SuperCharge: <strong>15 menit (10-80%)</strong></li>
          </ul>
        </div>
        
        <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-6">
          <h4 className="text-xl font-bold text-slate-700 mb-4">Victory/Athena</h4>
          <ul className="space-y-2 text-slate-700">
            <li>• Capacity: <strong>45Ah</strong></li>
            <li>• Range: <strong>100 km</strong></li>
            <li>• Full Charge (0-100%): <strong>2.5 jam</strong></li>
            <li>• Lighter, more agile</li>
          </ul>
        </div>
      </div>
      
      {/* Home Charging */}
      <div className="bg-gradient-to-br from-slate-50 to-cyan-50 rounded-xl p-8 border border-slate-200">
        <h4 className="text-2xl font-bold text-slate-800 mb-4">🏠 Home Charging</h4>
        <div className="grid md:grid-cols-2 gap-6">
          <ul className="space-y-2 text-slate-700">
            <li>✓ Gratis instalasi home charger</li>
            <li>✓ Smart scheduling (charge di malam)</li>
            <li>✓ Compatible dengan PLN Tapak</li>
            <li>✓ Estimated cost: <strong>Rp 3,000 per 100km</strong></li>
          </ul>
          <div className="text-right">
            <div className="text-4xl text-red-500 line-through mb-2">Rp 15,000</div>
            <div className="text-5xl text-success-green font-bold mb-2">Rp 3,000</div>
            <div className="text-sm text-slate-600">per 100km (vs bensin)</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SmartFeaturesTab() {
  const features = {
    dashboard: [
      'Navigate dengan Google Maps real-time',
      'Call & SMS hands-free',
      'Music streaming (Spotify, Apple Music, YouTube Music)',
      'WhatsApp voice messages',
      'Voice control (Google Assistant / Siri)',
    ],
    monitoring: [
      'Real-time battery percentage',
      'Range calculator',
      'Charging recommendations',
      'Battery health status',
    ],
    connectivity: [
      'Lock/unlock dari smartphone',
      'Start pre-conditioning',
      'Schedule charging',
      'Track ride history',
      'Get maintenance reminders',
    ],
    safety: [
      'Emergency SOS button',
      'Theft tracking',
      'Accident detection',
    ],
  }
  
  return (
    <div className="space-y-8">
      <div className="bg-gradient-primary text-white rounded-2xl p-8 text-center">
        <h3 className="text-3xl font-bold mb-4">
          📱 AppleCarPlay & Android Auto
        </h3>
        <p className="text-xl text-white/90">
          PERTAMA di Motor Listrik Indonesia!
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-slate-50 rounded-xl p-6">
          <h4 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span>✨</span> Dashboard Integration
          </h4>
          <ul className="space-y-2 text-slate-700">
            {features.dashboard.map((item, i) => (
              <li key={i}>• {item}</li>
            ))}
          </ul>
        </div>
        
        <div className="bg-slate-50 rounded-xl p-6">
          <h4 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span>🔋</span> Battery Monitoring
          </h4>
          <ul className="space-y-2 text-slate-700">
            {features.monitoring.map((item, i) => (
              <li key={i}>• {item}</li>
            ))}
          </ul>
        </div>
        
        <div className="bg-slate-50 rounded-xl p-6">
          <h4 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span>📲</span> App Connectivity
          </h4>
          <ul className="space-y-2 text-slate-700">
            {features.connectivity.map((item, i) => (
              <li key={i}>• {item}</li>
            ))}
          </ul>
        </div>
        
        <div className="bg-slate-50 rounded-xl p-6">
          <h4 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span>🛡️</span> Safety Features
          </h4>
          <ul className="space-y-2 text-slate-700">
            {features.safety.map((item, i) => (
              <li key={i}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function PricingTab() {
  const models = [
    {
      name: 'EdPower',
      badge: 'Premium',
      price: MODELS.edpower.price,
      dp: MODELS.edpower.dp,
      monthly: MODELS.edpower.monthly,
      features: ['135km range', 'SuperCharge 15min', 'AppleCarPlay', 'Trade-in available'],
      gradient: 'from-cyan-500 to-blue-500',
    },
    {
      name: 'Athena',
      badge: 'Mid-Range',
      price: MODELS.athena.price,
      dp: MODELS.athena.dp,
      monthly: MODELS.athena.monthly,
      features: ['100km range', 'Fast charging', 'Smart features', 'Full financing'],
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      name: 'Victory',
      badge: 'Popular',
      price: MODELS.victory.price,
      dp: MODELS.victory.dp,
      monthly: MODELS.victory.monthly,
      features: ['100km range', 'Reliable', 'Affordable', 'Student discount'],
      gradient: 'from-orange-500 to-yellow-500',
    },
    {
      name: 'Mini',
      badge: 'Entry',
      price: MODELS.mini.price,
      dp: MODELS.mini.dp,
      monthly: MODELS.mini.monthly,
      features: ['80km range', 'Compact', 'Budget-friendly', 'City commuter'],
      gradient: 'from-green-500 to-teal-500',
    },
  ]
  
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {models.map((model, index) => (
          <motion.div
            key={model.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-slate-200 hover:border-electric-blue transition-colors"
          >
            <div className={`bg-gradient-to-r ${model.gradient} text-white p-4 text-center`}>
              <div className="text-sm font-semibold mb-1">{model.badge}</div>
              <div className="text-2xl font-bold">{model.name}</div>
            </div>
            
            <div className="p-6">
              <div className="text-3xl font-bold text-slate-800 mb-2">{model.price}</div>
              <div className="text-sm text-slate-600 mb-4">
                DP: {model.dp}
                <br />
                Cicilan: {model.monthly} x 36 bulan
              </div>
              
              <ul className="space-y-2 mb-6">
                {model.features.map((feature, i) => (
                  <li key={i} className="text-sm text-slate-700 flex items-center gap-2">
                    <span className="text-success-green">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Button
                href={WHATSAPP_LINKS.general}
                size="small"
                variant="primary"
                fullWidth
              >
                Info Lengkap
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Additional Benefits */}
      <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-xl p-8 border-2 border-cyan-200">
        <h4 className="text-2xl font-bold text-slate-800 mb-6 text-center">
          ✨ Additional Benefits
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">✓</span>
            <span>Free insurance 1 tahun</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">✓</span>
            <span>Free home charger + installation</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">✓</span>
            <span>Free maintenance 2 tahun</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">✓</span>
            <span>Trade-in value guaranteed</span>
          </div>
        </div>
      </div>
    </div>
  )
}
