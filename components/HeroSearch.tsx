'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, ArrowRightLeft, Search } from 'lucide-react'

interface HeroSearchProps {
  onSearch?: () => void
}

export default function HeroSearch({ onSearch }: HeroSearchProps) {
  const [from, setFrom] = useState('Mokola')
  const [to, setTo] = useState('Moniya')

  const quickRoutes = [
    { from: 'Mokola', to: 'Ojoo' },
    { from: 'UI', to: 'Ojoo' },
    { from: 'Moniya', to: 'Dugbe' },
    { from: 'Ojoo', to: 'Challenge' }
  ]

  const handleSwap = () => {
    [setFrom, setTo].forEach((setter, i) => {
      setter(i === 0 ? to : from)
    })
  }

  const handleSearch = () => {
    onSearch?.()
  }

  const handleQuickRoute = (route: typeof quickRoutes[0]) => {
    setFrom(route.from)
    setTo(route.to)
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="w-full"
    >
      <div className="glass-card p-8 md:p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-pretty">
            Find Your Way Across The City
          </h2>
          <p className="text-muted-foreground text-lg">
            Community-verified transport routes and local street intelligence
          </p>
        </div>

        {/* Search Inputs */}
        <div className="space-y-4 mb-8">
          {/* From Input */}
          <motion.div whileFocus={{ scale: 1.02 }}>
            <label className="block text-sm font-medium text-muted-foreground mb-2">From</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-3 w-5 h-5 text-primary/60" />
              <input
                type="text"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="Enter starting location"
                className="glass-input w-full pl-12 pr-4 py-3 text-foreground"
              />
            </div>
          </motion.div>

          {/* Swap Button */}
          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleSwap}
              className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
            >
              <ArrowRightLeft className="w-5 h-5" />
            </motion.button>
          </div>

          {/* To Input */}
          <motion.div whileFocus={{ scale: 1.02 }}>
            <label className="block text-sm font-medium text-muted-foreground mb-2">To</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-3 w-5 h-5 text-primary/60" />
              <input
                type="text"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="Enter destination"
                className="glass-input w-full pl-12 pr-4 py-3 text-foreground"
              />
            </div>
          </motion.div>
        </div>

        {/* Find Route Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSearch}
          className="w-full py-3 rounded-lg gradient-blue text-white font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-shadow smooth-transition glow-blue"
        >
          <Search className="w-5 h-5" />
          Find Route
        </motion.button>

        {/* Quick Routes */}
        <div className="mt-8 pt-8 border-t border-border/40">
          <p className="text-sm text-muted-foreground mb-4">Quick routes:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {quickRoutes.map((route, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleQuickRoute(route)}
                className="p-3 rounded-lg bg-card/50 hover:bg-card border border-border/40 hover:border-primary/40 transition-all text-sm font-medium text-foreground"
              >
                <span className="text-primary">{route.from}</span>
                <span className="text-muted-foreground mx-1">→</span>
                <span className="text-primary">{route.to}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
