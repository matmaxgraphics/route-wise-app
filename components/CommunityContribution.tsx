'use client'

import { motion } from 'framer-motion'
import { Award, Star, Lock, Plus } from 'lucide-react'

interface CommunityContributionProps {
  onContributeClick: () => void
  onVerifyClick: () => void
}

export default function CommunityContribution({ onContributeClick, onVerifyClick }: CommunityContributionProps) {
  const xp = 740
  const maxXp = 1000
  const level = 'Route Scout'
  const xpPercentage = (xp / maxXp) * 100

  const badges = [
    { id: 1, name: 'First Ride', icon: '🚌', unlocked: true },
    { id: 2, name: 'Fare Whisperer', icon: '💰', unlocked: true },
    { id: 3, name: 'Street Guardian', icon: '🛡️', unlocked: true },
    { id: 4, name: 'Area Commander', icon: '🗺️', unlocked: false },
    { id: 5, name: 'City Explorer', icon: '🌍', unlocked: false },
    { id: 6, name: 'Master Scout', icon: '👑', unlocked: false }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* XP Progress Card */}
      <div className="glass-card p-8">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold">Level: {level}</h3>
            <div className="text-sm text-muted-foreground">
              <span className="text-primary font-bold">{xp}</span> / {maxXp} XP
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full h-3 rounded-full bg-card/50 overflow-hidden border border-border/40">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${xpPercentage}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full gradient-blue rounded-full glow-blue"
            />
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          {Math.round(1000 - xp)} XP until Route Commander status
        </p>
      </div>

      {/* Badges Grid */}
      <div className="glass-card p-8">
        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
          <Award className="w-5 h-5 text-primary" />
          Achievements
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {badges.map((badge, idx) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={badge.unlocked ? { scale: 1.08, y: -4 } : {}}
              className={`p-4 rounded-xl border text-center transition-all ${
                badge.unlocked
                  ? 'bg-primary/10 border-primary/30 cursor-pointer hover:border-primary/50'
                  : 'bg-card/30 border-border/40 opacity-50'
              }`}
            >
              <div className="text-3xl mb-2">{badge.icon}</div>
              <p className="text-xs md:text-sm font-medium text-foreground mb-1">
                {badge.name}
              </p>
              {!badge.unlocked && (
                <Lock className="w-3 h-3 mx-auto text-muted-foreground" />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onContributeClick}
          className="py-4 rounded-lg gradient-blue text-white font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-shadow glow-blue"
        >
          <Plus className="w-5 h-5" />
          Contribute Route
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onVerifyClick}
          className="py-4 rounded-lg bg-card/50 border border-border/40 text-foreground font-semibold flex items-center justify-center gap-2 hover:border-primary/40 transition-colors"
        >
          <Star className="w-5 h-5 text-primary" />
          Verify Route
        </motion.button>
      </div>

      {/* Reward Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="p-4 rounded-lg bg-linear-to-r from-primary/10 to-blue-500/10 border border-primary/20"
      >
        <p className="text-sm text-foreground">
          <span className="font-semibold text-primary">💡 Tip:</span> Earn <span className="text-primary font-bold">+20 XP</span> when your contributed route is verified by 3+ community members
        </p>
      </motion.div>
    </motion.div>
  )
}
