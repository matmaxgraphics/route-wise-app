"use client";

import { useState } from "react";
import type { RouteToVerify } from "@/lib/types";
import { motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  MapPin,
  Clock,
  DollarSign,
  Shield,
  ArrowRight,
  Loader2,
} from "lucide-react";

interface VerificationFormState {
  accuracyRating: number;
  fareAccuracy: "accurate" | "lower" | "higher" | "";
  safetyRating: number;
  safetyTips: string;
  errors: Record<string, string>;
  submitted: boolean;
}

interface RouteVerificationFlowProps {
  route: RouteToVerify | null;
  onBack: () => void;
  onSuccess: (data: any) => void;
}

export default function RouteVerificationFlow({
  route,
  onBack,
  onSuccess,
}: RouteVerificationFlowProps) {
  const [step, setStep] = useState<"preview" | "verification" | "success">(
    "preview",
  );
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState<VerificationFormState>({
    accuracyRating: 75,
    fareAccuracy: "",
    safetyRating: 75,
    safetyTips: "",
    errors: {},
    submitted: false,
  });

  if (!route) return null;

  const handleSubmitVerification = async () => {
    const newErrors: Record<string, string> = {};

    if (!formState.fareAccuracy) {
      newErrors.fareAccuracy = "Please select fare accuracy";
    }
    if (formState.safetyRating < 20) {
      newErrors.safetyRating = "Safety rating must be at least 20%";
    }

    if (Object.keys(newErrors).length > 0) {
      setFormState({ ...formState, errors: newErrors });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setStep("success");
      onSuccess({
        routeId: route.id,
        accuracyRating: formState.accuracyRating,
        fareAccuracy: formState.fareAccuracy,
        safetyRating: formState.safetyRating,
        safetyTips: formState.safetyTips,
      });
    }, 1500);
  };

  const clearError = (field: string) => {
    const newErrors = { ...formState.errors };
    delete newErrors[field];
    setFormState({ ...formState, errors: newErrors });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-end overflow-y-auto"
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        className="w-full glass-card rounded-t-3xl max-h-[95vh] overflow-y-auto"
      >
        {step === "preview" && (
          <div className="max-w-2xl">
            {/* Header */}
            <div className="sticky top-0 px-6 py-4 border-b border-border bg-background/95 backdrop-blur-sm">
              <h2 className="text-xl font-bold text-foreground">
                Verify Route
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Review and verify this community-submitted route
              </p>
            </div>

            {/* Route Preview */}
            <div className="p-6 space-y-6">
              {/* Route Overview */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-5"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold text-foreground">
                        {route.from}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 ml-7 mb-3">
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      <h3 className="font-semibold text-foreground">
                        {route.to}
                      </h3>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground mb-1">
                      Submitted
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {route.createdAt}
                    </p>
                  </div>
                </div>

                {/* Route Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground mb-1">
                      Estimated Fare
                    </p>
                    <p className="font-bold text-foreground">
                      {route.estimatedFare}
                    </p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground mb-1">
                      Estimated Time
                    </p>
                    <p className="font-bold text-foreground flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {route.estimatedTime}
                    </p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground mb-1">Steps</p>
                    <p className="font-bold text-foreground">{route.steps}</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground mb-1">
                      Current Confidence
                    </p>
                    <p className="font-bold text-foreground">
                      {route.confidence}%
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Contributor Info */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card p-5"
              >
                <p className="text-xs font-semibold text-muted-foreground mb-3">
                  SUBMITTED BY
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-base font-bold text-primary">
                    {route.contributor[0]}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">
                      {route.contributor}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {route.contributorLevel}
                    </p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
              </motion.div>

              {/* Info Box */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200"
              >
                <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900 mb-1">
                    Verification Helps the Community
                  </p>
                  <p className="text-xs text-blue-800">
                    Your verification will help other commuters trust this
                    route. Be honest about accuracy, fares, and safety
                    conditions.
                  </p>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={onBack}
                  className="flex-1 px-4 py-3 rounded-xl border-2 border-border text-foreground font-semibold hover:bg-muted transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep("verification")}
                  className="flex-1 px-4 py-3 rounded-xl gradient-blue text-white font-semibold hover:shadow-lg transition-shadow"
                >
                  Verify Route
                </button>
              </div>
            </div>
          </div>
        )}

        {step === "verification" && (
          <div className="max-w-2xl">
            {/* Header */}
            <div className="sticky top-0 px-6 py-4 border-b border-border bg-background/95 backdrop-blur-sm flex items-center gap-3">
              <button
                onClick={() => setStep("preview")}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
                aria-label="Go back"
              >
                <ArrowRight className="w-5 h-5 text-foreground rotate-180" />
              </button>
              <div>
                <h2 className="text-xl font-bold text-foreground">
                  Verification Details
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {route.from} → {route.to}
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="p-6 space-y-6">
              {/* Accuracy Rating */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <label className="form-label flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-primary" />
                  Route Accuracy
                </label>
                <p className="text-xs text-muted-foreground mb-3">
                  How well does this route match the actual transport
                  experience?
                </p>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formState.accuracyRating}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        accuracyRating: parseInt(e.target.value),
                      })
                    }
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                    aria-label="Route accuracy rating"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">0%</span>
                    <span className="text-sm font-semibold text-primary">
                      {formState.accuracyRating}%
                    </span>
                    <span className="text-sm text-muted-foreground">100%</span>
                  </div>
                </div>
              </motion.div>

              {/* Fare Accuracy Selection */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <label className="form-label flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-primary" />
                  Fare Accuracy
                </label>
                <p className="text-xs text-muted-foreground mb-3">
                  How does the estimated fare compare to actual costs?
                </p>
                <div className="space-y-2">
                  {[
                    {
                      value: "accurate",
                      label: "Accurate - Matches actual fares",
                    },
                    {
                      value: "lower",
                      label: "Too Low - Actual fares are higher",
                    },
                    {
                      value: "higher",
                      label: "Too High - Actual fares are lower",
                    },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-3 p-3 rounded-xl border-2 border-border hover:border-primary cursor-pointer transition-colors"
                    >
                      <input
                        type="radio"
                        name="fareAccuracy"
                        value={option.value}
                        checked={formState.fareAccuracy === option.value}
                        onChange={(e) => {
                          setFormState({
                            ...formState,
                            fareAccuracy: e.target.value as any,
                          });
                          clearError("fareAccuracy");
                        }}
                        className="w-4 h-4 accent-primary"
                        aria-label={option.label}
                      />
                      <span className="text-sm font-medium text-foreground">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
                {formState.errors.fareAccuracy && (
                  <p className="form-error-text">
                    {formState.errors.fareAccuracy}
                  </p>
                )}
              </motion.div>

              {/* Safety Rating */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label className="form-label flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  Safety Rating
                </label>
                <p className="text-xs text-muted-foreground mb-3">
                  How safe did you feel using this route?
                </p>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formState.safetyRating}
                    onChange={(e) => {
                      setFormState({
                        ...formState,
                        safetyRating: parseInt(e.target.value),
                      });
                      clearError("safetyRating");
                    }}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                    aria-label="Safety rating"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Not Safe
                    </span>
                    <span className="text-sm font-semibold text-primary">
                      {formState.safetyRating}%
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Very Safe
                    </span>
                  </div>
                </div>
                {formState.errors.safetyRating && (
                  <p className="form-error-text">
                    {formState.errors.safetyRating}
                  </p>
                )}
              </motion.div>

              {/* Safety Tips */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label
                  htmlFor="safetyTips"
                  className="form-label flex items-center gap-2"
                >
                  <AlertCircle className="w-4 h-4 text-primary" />
                  Safety Tips (Optional)
                </label>
                <p className="text-xs text-muted-foreground mb-3">
                  Share any important safety tips or warnings for this route
                </p>
                <textarea
                  id="safetyTips"
                  value={formState.safetyTips}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      safetyTips: e.target.value,
                    })
                  }
                  placeholder="e.g., Keep valuables secure, avoid solo trips after 8PM, watch out for potholes near the roundabout..."
                  className="form-input resize-none"
                  rows={4}
                  aria-label="Safety tips for this route"
                />
                <p className="form-helper-text">
                  {formState.safetyTips.length}/200 characters
                </p>
              </motion.div>

              {/* Reward Info */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex gap-3 p-4 bg-green-50 rounded-xl border border-green-200"
              >
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-900 mb-1">
                    Earn +10 XP
                  </p>
                  <p className="text-xs text-green-800">
                    Verified verifications help the community trust routes.
                  </p>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setStep("preview")}
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 rounded-xl border-2 border-border text-foreground font-semibold hover:bg-muted transition-colors disabled:opacity-50"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmitVerification}
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 rounded-xl gradient-blue text-white font-semibold hover:shadow-lg transition-shadow disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Verification"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {step === "success" && (
          <div className="max-w-2xl">
            {/* Success Content */}
            <div className="px-6 py-12 text-center space-y-6">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="flex justify-center"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Verification Complete!
                </h2>
                <p className="text-muted-foreground">
                  Thank you for helping strengthen community trust in RouteWise
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-left"
              >
                <p className="text-sm text-blue-900 font-medium mb-2">
                  Route Verified ✓
                </p>
                <p className="text-sm text-blue-800">
                  {route.from} → {route.to}
                </p>
                <p className="text-xs text-blue-700 mt-2">
                  You&apos;ve earned +10 XP. Your verification will help
                  increase the confidence score for this route.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex gap-3 pt-4"
              >
                <button
                  onClick={() => onBack()}
                  className="flex-1 px-4 py-3 rounded-xl gradient-blue text-white font-semibold hover:shadow-lg transition-shadow"
                >
                  Back to Contribute
                </button>
              </motion.div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
