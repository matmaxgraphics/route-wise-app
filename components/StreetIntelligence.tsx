'use client'

import { motion } from 'framer-motion'
import { AlertCircle, Info, Shield } from 'lucide-react'

export default function StreetIntelligence() {
  const tips = [
    {
      type: 'warning',
      icon: AlertCircle,
      title: 'Hold your phone securely',
      location: 'near Iwo Road',
      color: 'text-amber-400'
    },
    {
      type: 'info',
      icon: Info,
      title: 'Keep small cash ready',
      location: 'at Ojoo park',
      color: 'text-blue-400'
    },
    {
      type: 'warning',
      icon: AlertCircle,
      title: 'Drivers may increase fares',
      location: 'after 7PM',
      color: 'text-amber-400'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass-card p-8"
    >
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          Street Tips
        </h3>
        <p className="text-muted-foreground text-sm">Local insights for a safer journey</p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-3 mb-6"
      >
        {tips.map((tip, idx) => {
          const IconComponent = tip.icon
          return (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ scale: 1.02, x: 4 }}
              className="p-4 rounded-lg bg-card/50 border border-border/40 hover:border-primary/40 transition-all"
            >
              <div className="flex gap-3">
                <IconComponent className={`w-5 h-5 shrink-0 mt-0.5 ${tip.color}`} />
                <div className="flex-1">
                  <p className="font-medium text-foreground">{tip.title}</p>
                  <p className="text-sm text-muted-foreground">{tip.location}</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Trust Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="p-4 rounded-lg bg-linear-to-r from-primary/10 to-blue-500/10 border border-primary/20 flex items-center gap-3"
      >
        <BadgeCheckIcon className="w-5 h-5 text-primary shrink-0" />
        <div>
          <p className="text-sm font-medium text-foreground">
            Verified by <span className="text-primary font-bold">18 locals</span>
          </p>
          <p className="text-xs text-muted-foreground">All tips verified by community members</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

function BadgeCheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.85 8.75a4 4 0 0 0 4.12-5.86" />
      <path d="M16.67 4.06a4 4 0 0 1 2.82 7.19" />
      <path d="M9.5 13l2 2 4-4" />
      <path d="M20.894 20.553c-3.946 2.749-10.707 2.966-15.348.512-4.667-2.487-7.265-8.114-5.814-13.456" />
    </svg>
  )
}
