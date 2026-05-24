'use client'

import { motion } from 'framer-motion'
import { MapPin, Plus, User } from 'lucide-react'

interface BottomNavigationProps {
  activeTab: 'explore' | 'contribute' | 'profile'
  onTabChange: (tab: 'explore' | 'contribute' | 'profile') => void
}

export default function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: 'explore', label: 'Explore', icon: MapPin },
    { id: 'contribute', label: 'Contribute', icon: Plus },
    { id: 'profile', label: 'Profile', icon: User }
  ] as const

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed bottom-0 left-0 right-0 md:hidden bg-background/95 backdrop-blur-lg border-t border-border/40"
    >
      <div className="flex items-center justify-around px-4 py-3">
        {tabs.map(tab => {
          const IconComponent = tab.icon
          const isActive = activeTab === tab.id

          return (
            <motion.button
              key={tab.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center gap-1.5 px-6 py-2 rounded-lg transition-all relative"
            >
              {/* Background Pill */}
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 gradient-blue rounded-lg -z-10 glow-blue"
                  transition={{ type: 'spring', bounce: 0.2 }}
                />
              )}

              <IconComponent
                className={`w-6 h-6 transition-colors ${
                  isActive ? 'text-white' : 'text-muted-foreground'
                }`}
              />
              <span
                className={`text-xs font-semibold transition-colors ${
                  isActive ? 'text-white' : 'text-muted-foreground'
                }`}
              >
                {tab.label}
              </span>
            </motion.button>
          )
        })}
      </div>
    </motion.nav>
  )
}
