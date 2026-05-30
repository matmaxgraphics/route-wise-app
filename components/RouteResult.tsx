"use client";

import { motion } from "framer-motion";
import {
  Navigation,
  MapPin,
  Clock,
  BadgeCheck,
  Zap,
  Shield,
} from "lucide-react";

export default function RouteResult() {
  const steps = [
    {
      id: 1,
      title: "Walk to Mokola roundabout",
      duration: "5 mins",
      fareRange: null,
      icon: Navigation,
    },
    {
      id: 2,
      title: "Take taxi to UI gate",
      duration: "15 mins",
      fareRange: "₦200–₦300",
      icon: MapPin,
    },
    {
      id: 3,
      title: "Board cab to Ojoo",
      duration: "12 mins",
      fareRange: "₦150–₦200",
      icon: MapPin,
    },
    {
      id: 4,
      title: "Take bus to Moniya",
      duration: "8 mins",
      fareRange: "₦200",
      icon: MapPin,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-6"
    >
      {/* Header with Stats */}
      <div className="glass-card p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {/* Total Fare */}
          <div className="text-center p-4 rounded-2xl bg-[rgb(var(--surface-container-low))]">
            <p className="text-[rgb(var(--on-surface-variant))] text-sm mb-1">
              Estimated Total Fare
            </p>
            <p className="text-2xl font-bold text-[rgb(var(--primary))]">
              ₦500–₦700
            </p>
          </div>

          {/* Travel Time */}
          <div className="text-center p-4 rounded-2xl bg-[rgb(var(--surface-container-low))]">
            <p className="text-[rgb(var(--on-surface-variant))] text-sm mb-1">
              Travel Time
            </p>
            <p className="text-2xl font-bold">35–50 mins</p>
          </div>

          {/* Confidence Score */}
          <div className="text-center p-4 rounded-2xl bg-[rgb(var(--surface-container-low))]">
            <p className="text-[rgb(var(--on-surface-variant))] text-sm mb-1">
              Confidence
            </p>
            <p className="text-2xl font-bold text-[rgb(var(--secondary-container))]">
              92% Verified
            </p>
          </div>

          {/* Route Quality */}
          <div className="text-center p-4 rounded-2xl bg-[rgb(var(--surface-container-low))]">
            <p className="text-[rgb(var(--on-surface-variant))] text-sm mb-1">
              Route Quality
            </p>
            <div className="flex gap-1 justify-center">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className={`w-2 h-2 rounded-full ${i < 4 ? "bg-[rgb(var(--primary))]" : "bg-[rgb(var(--outline))]"}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Badge Section */}
        <div className="flex flex-wrap gap-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="px-3 py-1.5 rounded-full bg-[rgb(var(--secondary-container))]/15 border border-[rgb(var(--secondary-container))]/30 flex items-center gap-1.5"
          >
            <Zap className="w-4 h-4 text-[rgb(var(--secondary-container))]" />
            <span className="text-sm font-semibold text-[rgb(var(--secondary-container))]">
              Fastest
            </span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="px-3 py-1.5 rounded-full bg-[rgb(var(--primary))]/12 border border-[rgb(var(--primary))]/25 flex items-center gap-1.5"
          >
            <Shield className="w-4 h-4 text-[rgb(var(--primary))]" />
            <span className="text-sm font-semibold text-[rgb(var(--primary))]">
              Most Reliable
            </span>
          </motion.div>
        </div>
      </div>

      {/* Steps */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="glass-card p-8"
      >
        <h3 className="text-xl font-bold mb-6">Route Steps</h3>
        <div className="space-y-2">
          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={step.id}
                variants={itemVariants}
                className="flex gap-4"
              >
                {/* Step Indicator */}
                <div className="flex flex-col items-center">
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    className="w-10 h-10 rounded-full bg-[rgb(var(--primary))] flex items-center justify-center text-white font-semibold text-sm flex-0 shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
                  >
                    {step.id}
                  </motion.div>
                  {idx < steps.length - 1 && (
                    <div className="w-1 h-12 bg-[rgb(var(--primary))]/40 my-2 rounded-full" />
                  )}
                </div>

                {/* Step Content */}
                <div className="flex-1 pb-4">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-semibold text-foreground">
                      {step.title}
                    </h4>
                    {step.fareRange && (
                      <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded-md">
                        {step.fareRange}
                      </span>
                    )}
                  </div>
                  {/* <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{step.duration}</span>
                  </div> */}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
