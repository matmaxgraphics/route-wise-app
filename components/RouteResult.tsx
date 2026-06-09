"use client";

import { motion } from "framer-motion";
import { Navigation, MapPin, Bus, Car, Bike, Zap, Shield, AlertTriangle, Clock } from "lucide-react";
import type { RouteSearchResult } from "@/lib/types";
import ShimmerLoader from "@/components/ShimmerLoader";

interface RouteResultProps {
  route: RouteSearchResult | null;
  isLoading?: boolean;
}

const TRANSPORT_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  walk: Navigation,
  cab: Car,
  bus: Bus,
  motorbike: Bike,
  other: MapPin,
};

function formatFare(min: number, max: number) {
  if (min === 0 && max === 0) return "TBD";
  if (min === max) return `₦${min}`;
  return `₦${min}–₦${max}`;
}

export default function RouteResult({ route, isLoading }: RouteResultProps) {
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="glass-card p-8">
          <ShimmerLoader />
        </div>
        <div className="glass-card p-8">
          <ShimmerLoader />
        </div>
      </div>
    );
  }

  if (!route) return null;

  const totalFare = formatFare(route.totalFareMin, route.totalFareMax);
  const qualityLevel = Math.min(Math.round((route.confidenceScore / 100) * 5), 5);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
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
      {/* Status banners */}
      {route.status === "flagged" && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 p-4 rounded-2xl bg-[rgb(var(--error))]/10 border border-[rgb(var(--error))]/30"
        >
          <AlertTriangle className="w-5 h-5 text-[rgb(var(--error))] shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-[rgb(var(--error))]">Safety Concern Flagged</p>
            <p className="text-xs text-[rgb(var(--error))]/80 mt-0.5">
              Community members have flagged this route for safety concerns. Proceed with caution.
            </p>
          </div>
        </motion.div>
      )}

      {route.status === "pending" && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 p-4 rounded-2xl bg-[rgb(var(--outline-variant))]/20 border border-[rgb(var(--outline-variant))]/40"
        >
          <Clock className="w-5 h-5 text-[rgb(var(--on-surface-variant))] shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-[rgb(var(--on-surface-variant))]">Pending Verification</p>
            <p className="text-xs text-[rgb(var(--on-surface-variant))]/80 mt-0.5">
              This route hasn't been verified by the community yet. Help verify it to improve accuracy!
            </p>
          </div>
        </motion.div>
      )}

      {/* Header with Stats */}
      <div className="glass-card p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 rounded-2xl bg-[rgb(var(--surface-container-low))]">
            <p className="text-[rgb(var(--on-surface-variant))] text-sm mb-1">
              Estimated Total Fare
            </p>
            <p className="text-2xl font-bold text-[rgb(var(--primary))]">{totalFare}</p>
          </div>

          <div className="text-center p-4 rounded-2xl bg-[rgb(var(--surface-container-low))]">
            <p className="text-[rgb(var(--on-surface-variant))] text-sm mb-1">Travel Time</p>
            <p className="text-2xl font-bold">
              {route.totalDuration > 0 ? `${route.totalDuration} mins` : "TBD"}
            </p>
          </div>

          <div className="text-center p-4 rounded-2xl bg-[rgb(var(--surface-container-low))]">
            <p className="text-[rgb(var(--on-surface-variant))] text-sm mb-1">Confidence</p>
            <p className="text-2xl font-bold text-[rgb(var(--secondary-container))]">
              {route.confidenceScore}% Verified
            </p>
          </div>

          <div className="text-center p-4 rounded-2xl bg-[rgb(var(--surface-container-low))]">
            <p className="text-[rgb(var(--on-surface-variant))] text-sm mb-1">Route Quality</p>
            <div className="flex gap-1 justify-center">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className={`w-2 h-2 rounded-full ${
                    i < qualityLevel
                      ? "bg-[rgb(var(--primary))]"
                      : "bg-[rgb(var(--outline))]"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {route.confidenceScore >= 80 && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="px-3 py-1.5 rounded-full bg-[rgb(var(--secondary-container))]/15 border border-[rgb(var(--secondary-container))]/30 flex items-center gap-1.5"
            >
              <Zap className="w-4 h-4 text-[rgb(var(--secondary-container))]" />
              <span className="text-sm font-semibold text-[rgb(var(--secondary-container))]">
                Fastest
              </span>
            </motion.div>
          )}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="px-3 py-1.5 rounded-full bg-[rgb(var(--primary))]/12 border border-[rgb(var(--primary))]/25 flex items-center gap-1.5"
          >
            <Shield className="w-4 h-4 text-[rgb(var(--primary))]" />
            <span className="text-sm font-semibold text-[rgb(var(--primary))]">
              Community Verified
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
        <h3 className="text-xl font-bold mb-6">
          Route Steps · {route.from} → {route.to}
        </h3>
        <div className="space-y-2">
          {route.steps.map((step, idx) => {
            const IconComponent = TRANSPORT_ICONS[step.transportType] ?? MapPin;
            const stepFare = formatFare(step.fareMin, step.fareMax);
            return (
              <motion.div key={step.id} variants={itemVariants} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    className="w-10 h-10 rounded-full bg-[rgb(var(--primary))] flex items-center justify-center text-white font-semibold text-sm shrink-0 shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
                  >
                    {step.stepOrder}
                  </motion.div>
                  {idx < route.steps.length - 1 && (
                    <div className="w-1 h-12 bg-[rgb(var(--primary))]/40 my-2 rounded-full" />
                  )}
                </div>

                <div className="flex-1 pb-4">
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <IconComponent className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                      <h4 className="font-semibold text-foreground">{step.instruction}</h4>
                    </div>
                    {stepFare !== "TBD" && (
                      <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded-md shrink-0 ml-2">
                        {stepFare}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
