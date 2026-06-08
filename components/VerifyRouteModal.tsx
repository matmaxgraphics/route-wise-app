"use client";

import { useEffect, useMemo, useState } from "react";
import type { RouteToVerify } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";
import { fetchPendingRoutes } from "@/lib/supabase/queries";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  MapPin,
  Search,
  X,
} from "lucide-react";

interface VerifyRouteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRoute: (route: RouteToVerify) => void;
}

export default function VerifyRouteModal({
  isOpen,
  onClose,
  onSelectRoute,
}: VerifyRouteModalProps) {
  const [pendingRoutes, setPendingRoutes] = useState<RouteToVerify[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<
    "recent" | "confidence" | "verifications"
  >("recent");
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const loadRoutes = async () => {
      setIsLoading(true);
      setFetchError(null);

      const supabase = createClient();
      const { data, error } = await fetchPendingRoutes(supabase);

      if (error) {
        setFetchError(error.message || "Unable to load pending routes.");
        setPendingRoutes([]);
      } else {
        setPendingRoutes(data ?? []);
      }

      setIsLoading(false);
    };

    if (isOpen) {
      loadRoutes();
    }
  }, [isOpen]);

  const filteredRoutes = useMemo(() => {
    const filtered = pendingRoutes.filter((route) =>
      `${route.from} ${route.to} ${route.contributor}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
    );

    if (sortBy === "confidence") {
      filtered.sort((a, b) => a.confidence - b.confidence);
    } else if (sortBy === "verifications") {
      filtered.sort((a, b) => a.verifications - b.verifications);
    }

    return filtered;
  }, [pendingRoutes, searchQuery, sortBy]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="fixed bottom-0 left-0 right-0 glass-card mx-auto rounded-t-3xl max-h-[90vh] overflow-hidden flex flex-col z-50"
          >
            <div className="sticky top-0 px-6 py-4 border-b border-[rgba(110,122,112,0.12)] flex items-center justify-between bg-[rgb(var(--surface-container-lowest))]/95 backdrop-blur-sm">
              <div>
                <h2 className="text-lg font-semibold text-[rgb(var(--on-surface))]">
                  Routes to Verify
                </h2>
                <p className="text-xs text-[rgb(var(--on-surface-variant))] mt-0.5">
                  Community-submitted routes needing verification
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 bg-[rgb(var(--surface-container-low))] hover:bg-[rgb(var(--surface-container))] rounded-2xl transition-colors"
                aria-label="close"
              >
                <X className="w-5 h-5 text-[rgb(var(--on-surface))]" />
              </button>
            </div>

            <div className="sticky top-16 px-6 py-3 border-b border-border bg-background/90 backdrop-blur-sm space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search routes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="form-input pl-10"
                  aria-label="Search routes"
                />
              </div>
              <div className="flex gap-2">
                {(["recent", "confidence", "verifications"] as const).map((option) => (
                  <button
                    key={option}
                    onClick={() => setSortBy(option)}
                    className={`px-3 py-1.5 rounded-2xl text-xs font-semibold transition-all ${
                      sortBy === option
                        ? "bg-[rgb(var(--primary))] text-white shadow-sm"
                        : "bg-[rgb(var(--surface-container-low))] text-[rgb(var(--on-surface))] hover:bg-[rgb(var(--surface-container))]"
                    }`}
                  >
                    {option === "recent"
                      ? "Newest"
                      : option === "confidence"
                        ? "Lowest Confidence"
                        : "Fewest Verifications"}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12 px-6">
                  <div className="h-10 w-10 rounded-full border-4 border-primary/20 border-t-primary animate-spin mb-3" />
                  <p className="text-foreground font-medium">Loading routes</p>
                </div>
              ) : fetchError ? (
                <div className="flex flex-col items-center justify-center py-12 px-6">
                  <AlertCircle className="w-10 h-10 text-destructive mb-2" />
                  <p className="text-foreground font-medium">Unable to load routes</p>
                  <p className="text-sm text-muted-foreground">{fetchError}</p>
                </div>
              ) : filteredRoutes.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 px-6">
                  <AlertCircle className="w-10 h-10 text-muted-foreground mb-2" />
                  <p className="text-foreground font-medium">No routes found</p>
                  <p className="text-sm text-muted-foreground">Try adjusting your search filters</p>
                </div>
              ) : (
                <div className="space-y-2 p-4">
                  {filteredRoutes.map((route, idx) => (
                    <motion.button
                      key={route.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => onSelectRoute(route)}
                      className="w-full p-4 glass-card hover:border-[rgb(var(--primary))] transition-all duration-200 text-left group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="flex flex-col gap-1 flex-1">
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-4 h-4 text-primary" />
                              <p className="font-semibold text-foreground text-sm">{route.from}</p>
                            </div>
                            <div className="flex items-center gap-1.5 ml-5">
                              <div className="text-xs text-muted-foreground">to</div>
                              <p className="font-semibold text-foreground text-sm">{route.to}</p>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-medium text-muted-foreground">{route.createdAt}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 mb-3">
                        <div className="bg-[rgb(var(--surface-container-low))] rounded-2xl p-3">
                          <p className="text-xs text-[rgb(var(--on-surface-variant))] mb-1">Fare</p>
                          <p className="font-semibold text-[rgb(var(--on-surface))] text-sm">{route.estimatedFare}</p>
                        </div>
                        <div className="bg-[rgb(var(--surface-container-low))] rounded-2xl p-3">
                          <p className="text-xs text-[rgb(var(--on-surface-variant))] mb-1">Time</p>
                          <p className="font-semibold text-[rgb(var(--on-surface))] text-sm flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[rgb(var(--primary))]" />{route.estimatedTime}
                          </p>
                        </div>
                        <div className="bg-[rgb(var(--surface-container-low))] rounded-2xl p-3">
                          <p className="text-xs text-[rgb(var(--on-surface-variant))] mb-1">Steps</p>
                          <p className="font-semibold text-[rgb(var(--on-surface))] text-sm">{route.steps}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-[rgb(var(--primary))]/20 flex items-center justify-center text-xs font-bold text-[rgb(var(--primary))]">
                            {route.contributor[0]}
                          </div>
                          <div className="flex flex-col">
                            <p className="text-xs font-medium text-foreground">{route.contributor}</p>
                            <p className="text-xs text-muted-foreground">{route.contributorLevel}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
                          <span className="text-xs font-medium text-muted-foreground">{route.verifications}</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted-foreground">Confidence</p>
                          <p className="text-xs font-semibold text-foreground">{route.confidence}%</p>
                        </div>
                        <div className="w-full h-1.5 bg-[rgb(var(--surface-container))] rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-blue rounded-full transition-all duration-500" style={{ width: `${route.confidence}%` }} />
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
