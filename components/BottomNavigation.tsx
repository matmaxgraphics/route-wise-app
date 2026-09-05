"use client";

import { motion } from "framer-motion";
import { MapPin, Plus, User } from "lucide-react";

interface BottomNavigationProps {
  activeTab: "explore" | "contribute" | "profile";
  onTabChange: (tab: "explore" | "contribute" | "profile") => void;
}

export default function BottomNavigation({
  activeTab,
  onTabChange,
}: BottomNavigationProps) {
  const tabs = [
    { id: "explore", label: "Explore", icon: MapPin },
    { id: "contribute", label: "Contribute", icon: Plus },
    { id: "profile", label: "Profile", icon: User },
  ] as const;

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed bottom-4 left-0 right-0 flex justify-center md:hidden z-40 px-4"
    >
      <nav
        className="flex overflow-hidden bg-[rgb(var(--surface-container-lowest))] max-w-[340px] w-full"
        style={{ border: "1px solid var(--border)", borderRadius: "14px" }}
      >
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center gap-1 flex-1 py-3 px-1.5 font-mono text-[0.68rem] uppercase tracking-[0.04em] transition-colors"
              style={{
                background: isActive ? "rgb(var(--primary))" : "transparent",
                color: isActive
                  ? "rgb(var(--on-primary))"
                  : "rgb(var(--on-surface-variant))",
              }}
            >
              <IconComponent className="w-5 h-5" />
              {tab.label}
            </button>
          );
        })}
      </nav>
    </motion.div>
  );
}
