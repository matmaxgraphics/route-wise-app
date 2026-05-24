'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { AlertTriangle, Home, LogIn } from 'lucide-react'

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md text-center"
      >
        {/* Error Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </motion.div>

        {/* Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="glass-card p-8 mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-3">Authentication Error</h1>
          <p className="text-muted-foreground mb-6">
            Something went wrong during authentication. Please try again.
          </p>

          {/* Error Info */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 text-left">
            <p className="text-sm text-red-700">
              The authentication link may have expired or been invalid. Please try signing up or logging in again.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 flex flex-col">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.location.href = '/auth/login'}
              className="w-full py-3 rounded-xl gradient-blue text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
            >
              <LogIn className="w-4 h-4" />
              Try Logging In Again
            </motion.button>

            <Link
              href="/"
              className="w-full py-3 rounded-xl border border-border text-foreground font-semibold flex items-center justify-center gap-2 hover:bg-card transition-colors"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="text-sm text-muted-foreground">
          <p>Need help?</p>
          <p>Contact support if this continues to happen.</p>
        </div>
      </motion.div>
    </div>
  )
}
