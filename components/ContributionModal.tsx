"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Plus, Trash, Clock, DollarSign } from "lucide-react";
import { useState } from "react";

interface RouteStepInput {
  title: string;
  duration: string;
  fare: string;
}

interface ContributionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContributionModal({
  isOpen,
  onClose,
}: ContributionModalProps) {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    routeSteps: [{ title: "", duration: "", fare: "" } as RouteStepInput],
    fareEstimate: "",
    safetyTips: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStepChange = (
    index: number,
    field: keyof RouteStepInput,
    value: string,
  ) => {
    setFormData((prev) => {
      const updatedSteps = [...prev.routeSteps];
      updatedSteps[index] = { ...updatedSteps[index], [field]: value };
      return { ...prev, routeSteps: updatedSteps };
    });
  };

  const addRouteStep = () => {
    setFormData((prev) => ({
      ...prev,
      routeSteps: [...prev.routeSteps, { title: "", duration: "", fare: "" }],
    }));
  };

  const removeRouteStep = (index: number) => {
    setFormData((prev) => {
      const updatedSteps = prev.routeSteps.filter((_, i) => i !== index);
      return {
        ...prev,
        routeSteps: updatedSteps.length
          ? updatedSteps
          : [{ title: "", duration: "", fare: "" }],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle submission
    console.log("Submitting:", formData);
    onClose();
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    show: { opacity: 1, scale: 1, y: 0 },
  };

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
                  className="p-2 bg-[rgb(var(--surface-container-low))] rounded-2xl hover:bg-[rgb(var(--surface-container))] transition-colors"
                >
                  <X className="w-5 h-5 text-[rgb(var(--on-surface))]" />
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

                {/* Route Steps */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-muted-foreground">
                      Route Steps
                    </label>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={addRouteStep}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
                    >
                      <Plus className="w-4 h-4" />
                      Add Step
                    </motion.button>
                  </div>
                  <div className="space-y-4">
                    {formData.routeSteps.map((step, index) => (
                      <div
                        key={index}
                        className="grid gap-3 p-4 rounded-3xl bg-[rgb(var(--surface-container-low))] border border-border/50"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <p className="text-sm font-semibold">
                            Step {index + 1}
                          </p>
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => removeRouteStep(index)}
                            className="inline-flex items-center gap-2 text-xs font-medium text-destructive"
                          >
                            <Trash className="w-4 h-4" />
                            Remove
                          </motion.button>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-muted-foreground mb-1">
                            Step Description
                          </label>
                          <input
                            type="text"
                            value={step.title}
                            onChange={(e) =>
                              handleStepChange(index, "title", e.target.value)
                            }
                            placeholder="What to do at this step"
                            className="glass-input w-full px-4 py-3"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-muted-foreground mb-1">
                              Duration
                            </label>
                            <div className="relative">
                              <Clock className="absolute left-3 top-3 w-4 h-4 text-primary/60" />
                              <input
                                type="text"
                                value={step.duration}
                                onChange={(e) =>
                                  handleStepChange(
                                    index,
                                    "duration",
                                    e.target.value,
                                  )
                                }
                                placeholder="e.g., 10 mins"
                                className="glass-input w-full pl-10 pr-4 py-3"
                                required
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-muted-foreground mb-1">
                              Fare Estimate
                            </label>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-3 w-4 h-4 text-primary/60" />
                              <input
                                type="text"
                                value={step.fare}
                                onChange={(e) =>
                                  handleStepChange(
                                    index,
                                    "fare",
                                    e.target.value,
                                  )
                                }
                                placeholder="e.g., ₦200"
                                className="glass-input w-full pl-10 pr-4 py-3"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
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
                  className="w-full py-3 rounded-2xl gradient-blue text-[rgb(var(--on-primary))] font-semibold shadow-[0_15px_35px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.12)] transition-shadow glow-blue mt-6"
                >
                  Submit Route
                </motion.button>

                {/* Reward Note */}
                <p className="text-xs text-center text-[rgb(var(--on-surface))] bg-[rgb(var(--secondary-container))]/15 p-3 rounded-2xl border border-[rgb(var(--secondary-container))]/30">
                  ✨ Earn{" "}
                  <span className="text-[rgb(var(--secondary-container))] font-semibold">
                    +20 XP
                  </span>{" "}
                  when this route is verified
                </p>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
