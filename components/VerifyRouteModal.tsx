"use client";

import { useState, useMemo } from "react";
import type { RouteToVerify } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Search,
  MapPin,
  Clock,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

const MOCK_ROUTES: RouteToVerify[] = [
  {
    id: "1",
    from: "Mokola Roundabout",
    to: "UI Gate",
    contributor: "Ade_Scout",
    contributorLevel: "Route Scout",
    estimatedFare: "₦200–₦300",
    estimatedTime: "15 mins",
    steps: 2,
    confidence: 45,
    verifications: 2,
    createdAt: "2 hours ago",
  },
  {
    id: "2",
    from: "Ojoo Park",
    to: "Moniya",
    contributor: "Tola_Navigator",
    contributorLevel: "Route Scout",
    estimatedFare: "₦150–₦200",
    estimatedTime: "12 mins",
    steps: 2,
    confidence: 38,
    verifications: 1,
    createdAt: "5 hours ago",
  },
  {
    id: "3",
    from: "Iwo Road",
    to: "Oje Roundabout",
    contributor: "Bola_Explorer",
    contributorLevel: "Fare Whisperer",
    estimatedFare: "₦250–₦350",
    estimatedTime: "18 mins",
    steps: 3,
    confidence: 52,
    verifications: 3,
    createdAt: "1 day ago",
  },
  {
    id: "4",
    from: "Akobo",
    to: "Challenge",
    contributor: "Zainab_Guide",
    contributorLevel: "Route Scout",
    estimatedFare: "₦300–₦400",
    estimatedTime: "22 mins",
    steps: 3,
    confidence: 35,
    verifications: 1,
    createdAt: "3 days ago",
  },
];

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
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<
    "recent" | "confidence" | "verifications"
  >("recent");

  const filteredRoutes = useMemo(() => {
    let filtered = MOCK_ROUTES.filter((route) =>
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
  }, [searchQuery, sortBy]);

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
            {/* Header */}
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

            {/* Search and Filter */}
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
                {["recent", "confidence", "verifications"].map((option) => (
                  <button
                    key={option}
                    onClick={() => setSortBy(option as any)}
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

            {/* Routes List */}
            <div className="flex-1 overflow-y-auto">
              {filteredRoutes.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 px-6">
                  <AlertCircle className="w-10 h-10 text-muted-foreground mb-2" />
                  <p className="text-foreground font-medium">No routes found</p>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your search filters
                  </p>
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
                      {/* Route Header */}
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="flex flex-col gap-1 flex-1">
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-4 h-4 text-primary" />
                              <p className="font-semibold text-foreground text-sm">
                                {route.from}
                              </p>
                            </div>
                            <div className="flex items-center gap-1.5 ml-5">
                              <div className="text-xs text-muted-foreground">
                                to
                              </div>
                              <p className="font-semibold text-foreground text-sm">
                                {route.to}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-medium text-muted-foreground">
                            {route.createdAt}
                          </div>
                        </div>
                      </div>

                      {/* Route Details */}
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        <div className="bg-[rgb(var(--surface-container-low))] rounded-2xl p-3">
                          <p className="text-xs text-[rgb(var(--on-surface-variant))] mb-1">
                            Fare
                          </p>
                          <p className="font-semibold text-[rgb(var(--on-surface))] text-sm">
                            {route.estimatedFare}
                          </p>
                        </div>
                        <div className="bg-[rgb(var(--surface-container-low))] rounded-2xl p-3">
                          <p className="text-xs text-[rgb(var(--on-surface-variant))] mb-1">
                            Time
                          </p>
                          <p className="font-semibold text-[rgb(var(--on-surface))] text-sm flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[rgb(var(--primary))]" />
                            {route.estimatedTime}
                          </p>
                        </div>
                        <div className="bg-[rgb(var(--surface-container-low))] rounded-2xl p-3">
                          <p className="text-xs text-[rgb(var(--on-surface-variant))] mb-1">
                            Steps
                          </p>
                          <p className="font-semibold text-[rgb(var(--on-surface))] text-sm">
                            {route.steps}
                          </p>
                        </div>
                      </div>

                      {/* Contributor & Confidence */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-[rgb(var(--primary))]/20 flex items-center justify-center text-xs font-bold text-[rgb(var(--primary))]">
                            {route.contributor[0]}
                          </div>
                          <div className="flex flex-col">
                            <p className="text-xs font-medium text-foreground">
                              {route.contributor}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {route.contributorLevel}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
                          <span className="text-xs font-medium text-muted-foreground">
                            {route.verifications}
                          </span>
                        </div>
                      </div>

                      {/* Confidence Bar */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted-foreground">
                            Confidence
                          </p>
                          <p className="text-xs font-semibold text-foreground">
                            {route.confidence}%
                          </p>
                        </div>
                        <div className="w-full h-1.5 bg-[rgb(var(--surface-container))] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-blue rounded-full transition-all duration-500"
                            style={{ width: `${route.confidence}%` }}
                          />
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
