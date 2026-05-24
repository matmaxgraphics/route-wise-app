'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle, Mail, ArrowRight } from 'lucide-react'

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </motion.div>

        {/* Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="glass-card p-8 mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-3">Welcome to RouteWise!</h1>
          <p className="text-muted-foreground mb-6">Your account has been created successfully.</p>

          {/* Email Verification Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-700 text-left">
                <p className="font-semibold mb-1">Verify your email</p>
                <p>
                  Check your inbox for a confirmation link. You&apos;ll need to confirm your email before you can contribute or verify routes.
                </p>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm font-bold">
                1
              </div>
              <p className="text-sm text-foreground text-left">Check your email for verification link</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm font-bold">
                2
              </div>
              <p className="text-sm text-foreground text-left">Click the link to confirm your account</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm font-bold">
                3
              </div>
              <p className="text-sm text-foreground text-left">Start contributing and earning XP</p>
            </div>
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.location.href = '/'}
            className="w-full py-3 rounded-xl gradient-blue text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
          >
            Back to RouteWise
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>

        {/* Footer */}
        <div className="text-sm text-muted-foreground space-y-2">
          <p>Already confirmed your email?</p>
          <Link href="/auth/login" className="text-primary hover:underline font-semibold">
            Sign in to your account
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
