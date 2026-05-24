'use client'

import { motion } from 'framer-motion'
import { Trophy, Crown, Flame } from 'lucide-react'

export default function Leaderboard() {
  const topContributors = [
    {
      rank: 1,
      name: 'Adeniyi',
      title: 'Mayor of Mokola',
      xp: 3420,
      avatar: '👨‍💼',
      territory: 'Mokola'
    },
    {
      rank: 2,
      name: 'Zainab',
      title: 'Guardian of Ojoo',
      xp: 2890,
      avatar: '👩‍🔬',
      territory: 'Ojoo'
    },
    {
      rank: 3,
      name: 'Chukwu',
      title: 'Voice of Moniya',
      xp: 2540,
      avatar: '👨‍🎓',
      territory: 'Moniya'
    },
    {
      rank: 4,
      name: 'Amara',
      title: 'Path Explorer',
      xp: 2100,
      avatar: '👩‍💼',
      territory: 'UI/Dugbe'
    },
    {
      rank: 5,
      name: 'Tunde',
      title: 'Route Master',
      xp: 1850,
      avatar: '👨‍🚀',
      territory: 'Central'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.3 } }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass-card p-8"
    >
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Trophy className="w-5 h-5 text-primary" />
        Top Contributors
      </h3>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-3"
      >
        {topContributors.map((contributor) => (
          <motion.div
            key={contributor.rank}
            variants={itemVariants}
            whileHover={{ scale: 1.02, x: 4 }}
            className="p-4 rounded-lg bg-card/50 border border-border/40 hover:border-primary/40 transition-all"
          >
            <div className="flex items-center gap-4">
              {/* Rank Badge */}
              <div className="shrink-0 w-10 h-10 rounded-full bg-linear-to-br from-primary to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                {contributor.rank === 1 ? (
                  <Crown className="w-5 h-5" />
                ) : (
                  contributor.rank
                )}
              </div>

              {/* Avatar & Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">{contributor.avatar}</span>
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground truncate">{contributor.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{contributor.title}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Territory: {contributor.territory}</p>
              </div>

              {/* XP & Flame */}
              <div className="shrink-0 text-right">
                <div className="flex items-center justify-end gap-1.5 mb-1">
                  {contributor.rank <= 3 && (
                    <Flame className="w-4 h-4 text-amber-400" />
                  )}
                  <p className="font-bold text-primary">{contributor.xp}</p>
                </div>
                <p className="text-xs text-muted-foreground">XP</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Leaderboard Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 pt-6 border-t border-border/40"
      >
        <p className="text-sm text-muted-foreground text-center">
          You are ranked <span className="text-primary font-bold">#247</span> globally with <span className="text-primary font-bold">740 XP</span>
        </p>
      </motion.div>
    </motion.div>
  )
}
