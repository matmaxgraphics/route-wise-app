'use client'

import { useAuth } from '@/lib/auth-context'
import { motion } from 'framer-motion'
import { LogIn, Lock } from 'lucide-react'
import Link from 'next/link'

interface AuthGuardProps {
  children: React.ReactNode
  feature: string
  fallback?: React.ReactNode
}

export default function AuthGuard({ children, feature, fallback }: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      fallback || (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 rounded-2xl border border-border/40 text-center"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">Authentication Required</h3>
          <p className="text-muted-foreground mb-6">
            Sign in to {feature}. Contribute verified routes and earn XP to unlock new features.
          </p>
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-blue text-white font-semibold hover:shadow-lg transition-all"
          >
            <LogIn className="w-4 h-4" />
            Sign In to Continue
          </Link>
        </motion.div>
      )
    )
  }

  return <>{children}</>
}
