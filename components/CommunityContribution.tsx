"use client";

import { motion } from "framer-motion";
import { Award, Star, Lock, Plus } from "lucide-react";
import type { UserProfile } from "@/lib/types";
import BadgeIcon from "@/components/BadgeIcon";

interface CommunityContributionProps {
  onContributeClick: () => void;
  onVerifyClick: () => void;
  profile?: UserProfile | null;
  isLoading?: boolean;
}

const LEVEL_THRESHOLDS = [
  { name: "Route Scout", min: 0, max: 999 },
  { name: "Route Commander", min: 1000, max: 2499 },
  { name: "Area Guide", min: 2500, max: 4999 },
  { name: "Street Legend", min: 5000, max: Infinity },
];

function getLevelInfo(xp: number) {
  const idx = LEVEL_THRESHOLDS.findIndex((l) => xp >= l.min && xp <= l.max);
  const level = LEVEL_THRESHOLDS[Math.max(idx, 0)];
  const next = LEVEL_THRESHOLDS[Math.max(idx, 0) + 1] ?? null;
  const progressXP = xp - level.min;
  const levelRange = next ? next.min - level.min : 1;
  return {
    name: level.name,
    nextName: next?.name ?? null,
    progressXP,
    levelRange,
    xpToNext: next ? next.min - xp : 0,
  };
}

const ALL_BADGES = [
  { id: 1, name: "First Ride", hint: "Submit your first route", unlock: (p: UserProfile) => p.contributionCount >= 1 },
  { id: 2, name: "Fare Whisperer", hint: "Submit 3 routes", unlock: (p: UserProfile) => p.contributionCount >= 3 },
  { id: 3, name: "Street Guardian", hint: "Submit 5 routes", unlock: (p: UserProfile) => p.contributionCount >= 5 },
  { id: 4, name: "Area Commander", hint: "Submit 10 routes", unlock: (p: UserProfile) => p.contributionCount >= 10 },
  { id: 5, name: "City Explorer", hint: "Reach 2,500 XP", unlock: (p: UserProfile) => p.xp >= 2500 },
  { id: 6, name: "Master Scout", hint: "Reach 5,000 XP", unlock: (p: UserProfile) => p.xp >= 5000 },
];

export default function CommunityContribution({
  onContributeClick,
  onVerifyClick,
  profile,
  isLoading,
}: CommunityContributionProps) {
  const xp = profile?.xp ?? 0;
  const levelInfo = getLevelInfo(xp);
  const xpPercentage = Math.min((levelInfo.progressXP / levelInfo.levelRange) * 100, 100);

  const badges = ALL_BADGES.map((b) => ({
    ...b,
    unlocked: profile ? b.unlock(profile) : false,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* XP Progress Card */}
      <div className="glass-card p-8 bg-[rgb(var(--surface-container-low))]">
        <div className="mb-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-2">
            <h3 className="text-xl font-bold text-[rgb(var(--on-surface))]">
              Level: {levelInfo.name}
            </h3>
            <div className="text-sm text-[rgb(var(--on-surface-variant))]">
              <span className="text-[rgb(var(--primary))] font-bold">{xp.toLocaleString()}</span> XP
            </div>
          </div>

          <div
            className="w-full h-2 rounded-full bg-[rgb(var(--surface-container))] overflow-hidden"
            style={{ border: "none" }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: isLoading ? "0%" : `${xpPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{ background: "rgb(var(--secondary-container))", border: "none" }}
            />
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          {levelInfo.nextName
            ? `${levelInfo.xpToNext.toLocaleString()} XP until ${levelInfo.nextName}`
            : "Max level reached!"}
        </p>
      </div>

      {/* Badges Grid */}
      <div className="glass-card p-8">
        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
          <Award className="w-5 h-5 text-primary" />
          Achievements
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {badges.map((badge, idx) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={badge.unlocked ? { scale: 1.04, y: -2 } : {}}
              className="relative flex flex-col items-center gap-1.5 p-3.5 rounded-xl text-center bg-[rgb(var(--surface-container-lowest))]"
              style={{ border: "1px solid var(--border)" }}
            >
              {/* Lock badge overlay */}
              {!badge.unlocked && (
                <div
                  className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full flex items-center justify-center"
                  style={{ background: "rgb(var(--on-surface-variant))" }}
                >
                  <Lock className="w-2.5 h-2.5 text-white" />
                </div>
              )}
              <div
                style={
                  !badge.unlocked
                    ? { filter: "grayscale(1)", opacity: 0.32 }
                    : undefined
                }
              >
                <BadgeIcon badgeId={badge.id} className="w-10 h-10" />
              </div>
              <p className="text-[0.78rem] font-bold text-foreground leading-tight">{badge.name}</p>
              <p className="font-mono text-[0.64rem] text-muted-foreground">{badge.unlocked ? "Unlocked" : badge.hint}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onContributeClick}
          className="py-4 gradient-blue text-[rgb(var(--on-secondary-container))] font-bold flex items-center justify-center gap-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Contribute Route
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onVerifyClick}
          className="py-4 rounded-[9px] bg-transparent text-[rgb(var(--on-surface))] font-bold flex items-center justify-center gap-2 transition-colors"
          style={{ border: "2px solid rgb(var(--on-surface))" }}
        >
          <Star className="w-5 h-5" />
          Verify Route
        </motion.button>
      </div>

      {/* Tip banner — spec: surface-2 bg, Forest-tinted border, lightbulb icon */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex gap-2.5 items-start p-3 rounded-xl text-sm bg-[rgb(var(--surface-container-low))]"
        style={{ border: "1px solid var(--border)" }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 shrink-0 mt-0.5 text-[rgb(var(--primary))]">
          <path d="M9 18h6M10 22h4M12 2a6 6 0 00-4 10.5c.6.6 1 1.4 1 2.5h6c0-1.1.4-1.9 1-2.5A6 6 0 0012 2z"/>
        </svg>
        <span className="text-foreground">
          Earn <strong className="font-mono">+10 XP</strong> for each route contribution and verification
        </span>
      </motion.div>
    </motion.div>
  );
}
