'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, MapPin } from 'lucide-react'
import { useState } from 'react'

interface ContributionModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContributionModal({ isOpen, onClose }: ContributionModalProps) {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    instructions: '',
    fareEstimate: '',
    safetyTips: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle submission
    console.log('Submitting:', formData)
    onClose()
  }

  const backdropVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    show: { opacity: 1, scale: 1, y: 0 }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 pointer-events-none"
          >
            <motion.div
              className="w-full max-w-md bg-background rounded-2xl border border-border/40 shadow-2xl pointer-events-auto max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-background/95 backdrop-blur-lg border-b border-border/40 p-6 flex items-center justify-between">
                <h2 className="text-xl font-bold">Contribute Route</h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-1.5 hover:bg-card rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* From */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    From Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-primary/60" />
                    <input
                      type="text"
                      name="from"
                      value={formData.from}
                      onChange={handleInputChange}
                      placeholder="Starting point"
                      className="glass-input w-full pl-10 pr-4 py-3"
                      required
                    />
                  </div>
                </div>

                {/* To */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    To Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-primary/60" />
                    <input
                      type="text"
                      name="to"
                      value={formData.to}
                      onChange={handleInputChange}
                      placeholder="Destination"
                      className="glass-input w-full pl-10 pr-4 py-3"
                      required
                    />
                  </div>
                </div>

                {/* Route Instructions */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Route Instructions
                  </label>
                  <textarea
                    name="instructions"
                    value={formData.instructions}
                    onChange={handleInputChange}
                    placeholder="Describe the route step-by-step..."
                    rows={4}
                    className="glass-input w-full p-4 resize-none"
                    required
                  />
                </div>

                {/* Fare Estimate */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Estimated Fare (₦)
                  </label>
                  <input
                    type="text"
                    name="fareEstimate"
                    value={formData.fareEstimate}
                    onChange={handleInputChange}
                    placeholder="e.g., 500-700"
                    className="glass-input w-full px-4 py-3"
                    required
                  />
                </div>

                {/* Safety Tips */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Safety Tips (optional)
                  </label>
                  <textarea
                    name="safetyTips"
                    value={formData.safetyTips}
                    onChange={handleInputChange}
                    placeholder="Any safety tips for this route..."
                    rows={3}
                    className="glass-input w-full p-4 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3 rounded-lg gradient-blue text-white font-semibold shadow-lg hover:shadow-xl transition-shadow glow-blue mt-6"
                >
                  Submit Route
                </motion.button>

                {/* Reward Note */}
                <p className="text-xs text-center text-muted-foreground bg-card/50 p-3 rounded-lg">
                  ✨ Earn <span className="text-primary font-semibold">+20 XP</span> when this route is verified
                </p>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
