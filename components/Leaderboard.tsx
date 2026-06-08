"use client";

import { motion } from "framer-motion";
import { Trophy, Crown, Flame } from "lucide-react";
import type { LeaderboardEntry } from "@/lib/types";
import ShimmerLoader from "@/components/ShimmerLoader";

interface LeaderboardProps {
  contributors?: LeaderboardEntry[] | null;
  userRank?: number | null;
  userXp?: number | null;
  isLoading?: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

export default function Leaderboard({
  contributors,
  userRank,
  userXp,
  isLoading,
}: LeaderboardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass-card p-8"
    >
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-[rgb(var(--on-surface))]">
        <Trophy className="w-5 h-5 text-[rgb(var(--primary))]" />
        Top Contributors
      </h3>

      {isLoading ? (
        <ShimmerLoader />
      ) : contributors && contributors.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-3"
        >
          {contributors.map((contributor) => (
            <motion.div
              key={contributor.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02, x: 4 }}
              className="p-4 rounded-2xl bg-[rgb(var(--surface-container-low))] border border-[rgba(110,122,112,0.12)] hover:border-[rgb(var(--primary))] transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-[0_0_0_5px_rgba(252,212,0,0.15)] bg-[rgb(var(--secondary-container))]">
                  {contributor.rank === 1 ? (
                    <Crown className="w-5 h-5" />
                  ) : (
                    contributor.rank
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 rounded-full bg-[rgb(var(--primary))]/15 flex items-center justify-center text-sm font-bold text-[rgb(var(--primary))]">
                      {contributor.username[0]?.toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground truncate">{contributor.username}</p>
                      <p className="text-xs text-muted-foreground">
                        {contributor.contributionCount} routes
                      </p>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <div className="flex items-center justify-end gap-1.5 mb-1">
                    {contributor.rank <= 3 && (
                      <Flame className="w-4 h-4 text-[rgb(var(--secondary-container))]" />
                    )}
                    <p className="font-bold text-[rgb(var(--primary))]">
                      {contributor.xp.toLocaleString()}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">XP</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <Trophy className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm">No contributors yet. Be the first!</p>
        </div>
      )}

      {(userRank !== undefined && userRank !== null) || (userXp !== undefined && userXp !== null) ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 pt-6 border-t border-[rgba(110,122,112,0.16)]"
        >
          <p className="text-sm text-muted-foreground text-center">
            {userRank !== null && userRank !== undefined && (
              <>
                You are ranked{" "}
                <span className="text-primary font-bold">#{userRank}</span>{" "}
                globally
              </>
            )}
            {userXp !== null && userXp !== undefined && (
              <>
                {userRank !== null && userRank !== undefined ? " with " : "You have "}
                <span className="text-primary font-bold">{userXp.toLocaleString()} XP</span>
              </>
            )}
          </p>
        </motion.div>
      ) : null}
    </motion.div>
  );
}
