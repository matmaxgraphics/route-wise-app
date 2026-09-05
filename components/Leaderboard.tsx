"use client";

import { motion } from "framer-motion";
import { Trophy, ChevronDown, Loader2 } from "lucide-react";
import type { LeaderboardEntry } from "@/lib/types";
import ShimmerLoader from "@/components/ShimmerLoader";

function PixelCrownIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 12"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <rect x="1" y="1" width="1" height="1" fill="#1B231D"/><rect x="6" y="1" width="2" height="1" fill="#1B231D"/><rect x="12" y="1" width="1" height="1" fill="#1B231D"/>
      <rect x="1" y="2" width="1" height="1" fill="#D7EA3C"/><rect x="2" y="2" width="1" height="1" fill="#1B231D"/><rect x="6" y="2" width="2" height="1" fill="#D7EA3C"/><rect x="11" y="2" width="1" height="1" fill="#1B231D"/><rect x="12" y="2" width="1" height="1" fill="#D7EA3C"/>
      <rect x="1" y="3" width="2" height="1" fill="#D7EA3C"/><rect x="3" y="3" width="1" height="1" fill="#1B231D"/><rect x="5" y="3" width="1" height="1" fill="#1B231D"/><rect x="6" y="3" width="3" height="1" fill="#D7EA3C"/><rect x="9" y="3" width="1" height="1" fill="#1B231D"/><rect x="11" y="3" width="1" height="1" fill="#1B231D"/><rect x="12" y="3" width="2" height="1" fill="#D7EA3C"/>
      <rect x="1" y="4" width="3" height="1" fill="#D7EA3C"/><rect x="4" y="4" width="1" height="1" fill="#1B231D"/><rect x="5" y="4" width="5" height="1" fill="#D7EA3C"/><rect x="10" y="4" width="1" height="1" fill="#1B231D"/><rect x="11" y="4" width="3" height="1" fill="#D7EA3C"/>
      <rect x="1" y="5" width="13" height="1" fill="#D7EA3C"/>
      <rect x="1" y="6" width="13" height="1" fill="#1B231D"/>
      <rect x="1" y="7" width="13" height="1" fill="#D7EA3C"/>
      <rect x="1" y="8" width="13" height="1" fill="#D7EA3C"/>
      <rect x="1" y="9" width="13" height="1" fill="#1B231D"/>
    </svg>
  );
}

interface LeaderboardProps {
  contributors?: LeaderboardEntry[] | null;
  userRank?: number | null;
  userXp?: number | null;
  isLoading?: boolean;
  hasMore?: boolean;
  loadingMore?: boolean;
  onLoadMore?: () => void;
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
  hasMore,
  loadingMore,
  onLoadMore,
}: LeaderboardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-[rgb(var(--on-surface))]">
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
          style={{
            border: "1px solid var(--border)",
            borderRadius: "12px",
            background: "rgb(var(--surface-container-lowest))",
            overflow: "hidden",
          }}
        >
          {contributors.map((contributor, idx) => (
            <motion.div
              key={contributor.id}
              variants={itemVariants}
              className="flex items-center gap-2.5 px-3.5 py-2.5"
              style={{
                borderTop: idx === 0 ? "none" : "1px solid var(--border)",
                background:
                  contributor.rank === userRank
                    ? "rgb(var(--surface-container-low))"
                    : undefined,
              }}
            >
              {/* Rank / Crown */}
              <div
                className="shrink-0 flex items-center justify-center font-mono font-bold text-sm text-muted-foreground"
                style={{ width: 24, textAlign: "center" }}
              >
                {contributor.rank === 1 ? (
                  <PixelCrownIcon className="w-[22px] h-[22px]" />
                ) : (
                  contributor.rank
                )}
              </div>

              {/* Avatar */}
              <div
                className="shrink-0 flex items-center justify-center rounded-full font-display font-extrabold"
                style={{
                  width: 34,
                  height: 34,
                  fontSize: "0.85rem",
                  background: "rgb(var(--primary))",
                  color: "rgb(var(--on-primary))",
                }}
              >
                {contributor.username[0]?.toUpperCase()}
              </div>

              {/* Name + meta */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[0.92rem] text-foreground truncate leading-tight">
                  {contributor.username}
                </p>
                <p className="text-xs text-muted-foreground leading-tight">
                  {contributor.contributionCount} routes
                </p>
              </div>

              {/* XP */}
              <p className="shrink-0 font-mono font-bold text-[0.9rem] text-[rgb(var(--primary))]">
                {contributor.xp.toLocaleString()} XP
              </p>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <Trophy className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm">No contributors yet. Be the first!</p>
        </div>
      )}

      {hasMore && onLoadMore && !isLoading && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onLoadMore}
          disabled={loadingMore}
          className="w-full mt-3 py-2.5 rounded-xl text-sm font-semibold text-[rgb(var(--on-surface-variant))] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ border: "1px solid var(--border)" }}
        >
          {loadingMore ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
          {loadingMore ? "Loading..." : "Load more"}
        </motion.button>
      )}

      {(userRank !== undefined && userRank !== null) || (userXp !== undefined && userXp !== null) ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 pt-4"
          style={{ borderTop: "1px solid var(--border)" }}
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
