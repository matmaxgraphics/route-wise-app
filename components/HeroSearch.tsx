"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowRightLeft, Search } from "lucide-react";
import { toast } from "sonner";

interface HeroSearchProps {
  onSearch?: (from: string, to: string) => void;
}

export default function HeroSearch({ onSearch }: HeroSearchProps) {
  const [from, setFrom] = useState("Mokola");
  const [to, setTo] = useState("Moniya");

  const quickRoutes = [
    { from: "Mokola", to: "Ojoo" },
    { from: "UI", to: "Ojoo" },
    { from: "Moniya", to: "Dugbe" },
    { from: "Ojoo", to: "Challenge" },
  ];

  const handleSwap = () => {
    [setFrom, setTo].forEach((setter, i) => {
      setter(i === 0 ? to : from);
    });
  };

  const handleSearch = () => {
    if (!from.trim() || !to.trim()) {
      toast.error("Enter both locations", {
        description: "Add a starting point and destination to find a route.",
      });
      return;
    }

    onSearch?.(from.trim(), to.trim());
  };

  const handleQuickRoute = (route: (typeof quickRoutes)[0]) => {
    setFrom(route.from);
    setTo(route.to);
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="w-full"
    >
      <div className="glass-card p-8 md:p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-[rgb(var(--on-surface))] leading-tight">
            Find Your Way Across The City
          </h2>
          <p className="text-muted-foreground text-lg">
            Community-verified transport routes and local street intelligence
          </p>
        </div>

        {/* Search Inputs */}
        <div className="space-y-4 mb-8">
          {/* From Input */}
          <motion.div whileFocus={{ scale: 1.02 }}>
            <label className="block font-mono text-[0.68rem] uppercase tracking-[0.08em] text-muted-foreground mb-1.5">
              From
            </label>
            <div className="relative">
              <MapPin className="absolute left-4 top-3 w-5 h-5 text-primary/60" />
              <input
                type="text"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="Enter starting location"
                className="glass-input w-full pl-12 pr-4 py-3"
              />
            </div>
          </motion.div>

          {/* Swap Button */}
          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleSwap}
              className="p-3 rounded-2xl bg-[rgb(var(--primary))]/10 hover:bg-[rgb(var(--primary))]/15 text-[rgb(var(--primary))] transition-colors shadow-[0_6px_18px_rgba(0,0,0,0.06)]"
              aria-label="Swap start and destination"
              type="button"
            >
              <ArrowRightLeft className="w-5 h-5" />
            </motion.button>
          </div>

          {/* To Input */}
          <motion.div whileFocus={{ scale: 1.02 }}>
            <label className="block font-mono text-[0.68rem] uppercase tracking-[0.08em] text-muted-foreground mb-1.5">
              To
            </label>
            <div className="relative">
              <MapPin className="absolute left-4 top-3 w-5 h-5 text-primary/60" />
              <input
                type="text"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="Enter destination"
                className="glass-input w-full pl-12 pr-4 py-3"
              />
            </div>
          </motion.div>
        </div>

        {/* Find Route Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSearch}
          className="w-full py-4 gradient-blue text-[rgb(var(--on-secondary-container))] font-bold flex items-center justify-center gap-3 transition-colors"
          type="button"
        >
          <Search className="w-5 h-5" />
          Find Route
        </motion.button>

        <div className="mt-6 pt-6" style={{ borderTop: "1px solid var(--border)" }}>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.08em] text-muted-foreground mb-3">Quick routes</p>
          <div className="flex flex-wrap gap-2">
            {quickRoutes.map((route, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleQuickRoute(route)}
                className="px-3.5 py-2 rounded-full font-sans font-semibold text-sm text-[rgb(var(--on-surface))] bg-[rgb(var(--surface-container-lowest))] transition-colors"
                style={{ border: "1.5px solid var(--border-strong)" }}
                type="button"
              >
                {route.from} → {route.to}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
