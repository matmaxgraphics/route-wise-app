'use client'

import { motion } from 'framer-motion'

export default function ShimmerLoader() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="h-24 rounded-xl bg-card/30 overflow-hidden"
        >
          <motion.div
            className="h-full w-full bg-linear-to-r from-transparent via-white/5 to-transparent"
            animate={{
              x: ['0%', '100%']
            }}
            transition={{
              duration: 2,
              ease: 'easeInOut',
              repeat: Infinity
            }}
            style={{
              backgroundSize: '200% 100%'
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}
