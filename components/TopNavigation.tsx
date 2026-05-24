'use client'

import { motion } from 'framer-motion'
import { Bell, User, LogOut, UserPlus } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'

export default function TopNavigation() {
  const { user, isAuthenticated, signOut } = useAuth()
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    await signOut()
    setShowProfileMenu(false)
    router.push('/')
  }
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/40"
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-primary to-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">RW</span>
          </div>
          <h1 className="text-xl font-bold bg-linear-to-r from-primary to-blue-400 bg-clip-text text-transparent">
            RouteWise
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {isAuthenticated && (
            <>
              {/* Notification Bell */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 rounded-lg hover:bg-card transition-colors"
              >
                <Bell className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
              </motion.button>

              {/* Profile Avatar with XP Ring */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="w-10 h-10 rounded-full bg-linear-to-br from-primary/80 to-blue-500/80 flex items-center justify-center border-2 border-primary/30 cursor-pointer relative"
                >
                  <span className="text-white font-bold text-xs">
                    {user?.email?.[0].toUpperCase() || 'U'}
                  </span>
                </motion.button>

                {/* Profile Menu */}
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-xl shadow-lg overflow-hidden z-50"
                  >
                    <div className="p-3 border-b border-border">
                      <p className="text-xs text-muted-foreground">Signed in as</p>
                      <p className="text-sm font-semibold text-foreground truncate">{user?.email}</p>
                    </div>
                    <motion.button
                      whileHover={{ backgroundColor: '#f5f5f5' }}
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-card flex items-center gap-2 transition-colors border-t border-border"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </motion.button>
                  </motion.div>
                )}

                {/* XP Ring Progress */}
                <svg
                  className="absolute -inset-1 w-12 h-12"
                  viewBox="0 0 24 24"
                  style={{ transform: 'rotate(-90deg)' }}
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    fill="none"
                    stroke="rgba(37, 99, 255, 0.2)"
                    strokeWidth="0.5"
                  />
                  <motion.circle
                    cx="12"
                    cy="12"
                    r="10"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="0.5"
                    strokeDasharray={`${2 * Math.PI * 10}`}
                    strokeDashoffset={`${2 * Math.PI * 10 * 0.26}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 10 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 10 * 0.26 }}
                    transition={{ duration: 1.5 }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2563FF" />
                      <stop offset="100%" stopColor="#3B82F6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </>
          )}

          {!isAuthenticated && (
            <Link
              href="/auth/login"
              className="px-4 py-2 rounded-lg bg-primary text-white font-semibold text-sm hover:shadow-lg transition-shadow flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              Sign In
            </Link>
          )}
        </div>
      </div>
    </motion.nav>
  )
}
