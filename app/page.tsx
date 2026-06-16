"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { MapPin, Award, Settings, Check, X, LogOut } from "lucide-react";
import type { RouteToVerify, RouteSearchResult, UserProfile, LeaderboardEntry } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";
import { searchRoutes, getUserProfile, getLeaderboard, awardXP, updateProfile } from "@/lib/supabase/queries";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";
import TopNavigation from "@/components/TopNavigation";
import HeroSearch from "@/components/HeroSearch";
import RouteResult from "@/components/RouteResult";
import StreetIntelligence from "@/components/StreetIntelligence";
import CommunityContribution from "@/components/CommunityContribution";
import Leaderboard from "@/components/Leaderboard";
import ContributionModal from "@/components/ContributionModal";
import VerifyRouteModal from "@/components/VerifyRouteModal";
import RouteVerificationFlow from "@/components/RouteVerificationFlow";
import BottomNavigation from "@/components/BottomNavigation";
import AuthGuard from "@/components/AuthGuard";

type SearchState = "idle" | "loading" | "found" | "not_found";

const LEVEL_THRESHOLDS = [
  { name: "Route Scout", min: 0, max: 999 },
  { name: "Route Commander", min: 1000, max: 2499 },
  { name: "Area Guide", min: 2500, max: 4999 },
  { name: "Street Legend", min: 5000, max: Infinity },
];

function getLevelInfo(xp: number) {
  const idx = LEVEL_THRESHOLDS.findIndex((l) => xp >= l.min && xp <= l.max);
  const i = Math.max(idx, 0);
  const level = LEVEL_THRESHOLDS[i];
  const next = LEVEL_THRESHOLDS[i + 1] ?? null;
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
  { id: 1, name: "First Ride", icon: "🚌", hint: "Submit your first route", unlock: (p: UserProfile) => p.contributionCount >= 1 },
  { id: 2, name: "Fare Whisperer", icon: "💰", hint: "Submit 3 routes", unlock: (p: UserProfile) => p.contributionCount >= 3 },
  { id: 3, name: "Street Guardian", icon: "🛡️", hint: "Submit 5 routes", unlock: (p: UserProfile) => p.contributionCount >= 5 },
  { id: 4, name: "Area Commander", icon: "🗺️", hint: "Submit 10 routes", unlock: (p: UserProfile) => p.contributionCount >= 10 },
  { id: 5, name: "City Explorer", icon: "🌍", hint: "Reach 2500 XP", unlock: (p: UserProfile) => p.xp >= 2500 },
  { id: 6, name: "Master Scout", icon: "👑", hint: "Reach 5000 XP", unlock: (p: UserProfile) => p.xp >= 5000 },
];

export default function Home() {
  const { user, signOut } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const searchResultRef = useRef<HTMLDivElement | null>(null);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut();
      toast.success("Signed out successfully");
      setUserProfile(null);
      setSearchResult(null);
      setSearchState("idle");
      setActiveTab("explore");
    } catch {
      toast.error("Unable to sign out");
    } finally {
      setIsSigningOut(false);
    }
  };

  const [activeTab, setActiveTab] = useState<"explore" | "contribute" | "profile">("explore");
  const [showContributeModal, setShowContributeModal] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [selectedRouteForVerification, setSelectedRouteForVerification] = useState<RouteToVerify | null>(null);

  const [searchState, setSearchState] = useState<SearchState>("idle");
  const [searchResult, setSearchResult] = useState<RouteSearchResult | null>(null);

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[] | null>(null);
  const [userRank, setUserRank] = useState<number | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [leaderboardHasMore, setLeaderboardHasMore] = useState(false);
  const [leaderboardOffset, setLeaderboardOffset] = useState(0);
  const [leaderboardLoadingMore, setLeaderboardLoadingMore] = useState(false);

  // Settings edit state
  const [editingSettings, setEditingSettings] = useState(false);
  const [settingsForm, setSettingsForm] = useState({ username: "", city: "" });
  const [settingsLoading, setSettingsLoading] = useState(false);

  const refreshProfile = useCallback(async () => {
    if (!user?.id) return;
    setProfileLoading(true);
    const supabase = createClient();
    const [profileResult, leaderboardResult] = await Promise.all([
      getUserProfile(supabase, user.id),
      getLeaderboard(supabase, user.id),
    ]);
    if (profileResult.data) setUserProfile(profileResult.data);
    if (leaderboardResult.data) {
      setLeaderboard(leaderboardResult.data);
      setUserRank(leaderboardResult.userRank);
      setLeaderboardHasMore(leaderboardResult.hasMore);
      setLeaderboardOffset(10);
    }
    setProfileLoading(false);
  }, [user?.id]);

  useEffect(() => {
    refreshProfile();
  }, [refreshProfile]);

  // Supabase Realtime — auto-refresh leaderboard when profiles change.
  // Requires Realtime enabled on the `profiles` table in the Supabase dashboard.
  useEffect(() => {
    if (!user?.id) return;
    const supabase = createClient();
    const channel = supabase
      .channel("profiles-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "profiles" }, () => {
        refreshProfile();
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [user?.id, refreshProfile]);

  // Scroll to search result on search state change
  useEffect(() => {
    if (searchState !== "idle") {
      const timer = setTimeout(() => {
        searchResultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [searchState]);

  const handleSearch = async (from: string, to: string) => {
    setSearchState("loading");
    setSearchResult(null);
    const supabase = createClient();
    const { data, error } = await searchRoutes(supabase, from, to);
    if (error || !data) {
      setSearchState("not_found");
    } else {
      setSearchResult(data);
      setSearchState("found");
    }
  };

  const handleContributionSuccess = () => {
    setShowContributeModal(false);
    if (user?.id) {
      const supabase = createClient();
      awardXP(supabase, user.id, 10, true).then(() => refreshProfile());
    }
  };

  const handleVerificationSuccess = () => {
    setSelectedRouteForVerification(null);
    if (user?.id) {
      const supabase = createClient();
      awardXP(supabase, user.id, 10, false).then(() => refreshProfile());
    }
    setTimeout(() => setShowVerifyModal(false), 3000);
  };

  const handleLoadMore = async () => {
    if (!user?.id || leaderboardLoadingMore) return;
    setLeaderboardLoadingMore(true);
    const supabase = createClient();
    const result = await getLeaderboard(supabase, user.id, 10, leaderboardOffset);
    if (result.data) {
      setLeaderboard((prev) => [...(prev ?? []), ...result.data!]);
      setLeaderboardHasMore(result.hasMore);
      setLeaderboardOffset((prev) => prev + 10);
    }
    setLeaderboardLoadingMore(false);
  };

  const handleOpenSettings = () => {
    setSettingsForm({ username: userProfile?.username ?? "", city: userProfile?.city ?? "" });
    setEditingSettings(true);
  };

  const handleSaveSettings = async () => {
    if (!user?.id) return;
    setSettingsLoading(true);
    const supabase = createClient();
    const { error } = await updateProfile(supabase, user.id, {
      username: settingsForm.username.trim() || undefined,
      city: settingsForm.city.trim() || undefined,
    });
    setSettingsLoading(false);
    if (!error) {
      setEditingSettings(false);
      await refreshProfile();
    }
  };

  const levelInfo = userProfile ? getLevelInfo(userProfile.xp) : null;
  const xpRingProgress = levelInfo ? Math.min(levelInfo.progressXP / levelInfo.levelRange, 1) : 0;
  const badges = ALL_BADGES.map((b) => ({
    ...b,
    unlocked: userProfile ? b.unlock(userProfile) : false,
  }));

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <TopNavigation xpProgress={xpRingProgress} />

      <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">

          {activeTab === "explore" && (
            <>
              <HeroSearch onSearch={handleSearch} />

              <div ref={searchResultRef} className="scroll-mt-24" />

              {searchState === "loading" && <RouteResult route={null} isLoading />}

              {searchState === "found" && searchResult && (
                <>
                  <RouteResult route={searchResult} />
                  <StreetIntelligence
                    tips={searchResult.safetyTips}
                    verificationCount={searchResult.confidenceScore}
                  />
                </>
              )}

              {searchState === "not_found" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card p-8 text-center"
                >
                  <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-40" />
                  <h3 className="text-lg font-semibold mb-2">No route found</h3>
                  <p className="text-muted-foreground text-sm">
                    No community route exists for this search yet.{" "}
                    <button
                      onClick={() => setActiveTab("contribute")}
                      className="text-primary font-semibold hover:underline"
                    >
                      Be the first to contribute one!
                    </button>
                  </p>
                </motion.div>
              )}
            </>
          )}

          {activeTab === "contribute" && (
            <AuthGuard feature="contribute and verify routes">
              <>
                <CommunityContribution
                  onContributeClick={() => setShowContributeModal(true)}
                  onVerifyClick={() => setShowVerifyModal(true)}
                  profile={userProfile}
                  isLoading={profileLoading}
                />
                <Leaderboard
                  contributors={leaderboard}
                  userRank={userRank}
                  userXp={userProfile?.xp ?? null}
                  isLoading={profileLoading}
                  hasMore={leaderboardHasMore}
                  loadingMore={leaderboardLoadingMore}
                  onLoadMore={handleLoadMore}
                />
              </>
            </AuthGuard>
          )}

          {activeTab === "profile" && (
            <AuthGuard feature="view your profile">
              {userProfile ? (
                <div className="space-y-6">
                  {/* Profile Header */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-8 text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-[rgb(var(--primary))]/15 flex items-center justify-center text-3xl font-bold text-[rgb(var(--primary))] mx-auto mb-4">
                      {userProfile.username[0]?.toUpperCase()}
                    </div>
                    <h2 className="text-2xl font-bold mb-1">{userProfile.username}</h2>
                    <p className="text-muted-foreground text-sm mb-3">{userProfile.city}</p>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[rgb(var(--primary))]/10 border border-[rgb(var(--primary))]/20">
                      <span className="text-sm font-semibold text-[rgb(var(--primary))]">
                        {levelInfo?.name ?? "Route Scout"}
                      </span>
                    </div>
                  </motion.div>

                  {/* Stats */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-3 gap-4"
                  >
                    {[
                      { label: "XP Earned", value: userProfile.xp.toLocaleString() },
                      { label: "Routes", value: userProfile.contributionCount },
                      { label: "Global Rank", value: userRank !== null ? `#${userRank}` : "—" },
                    ].map((stat) => (
                      <div key={stat.label} className="glass-card p-4 text-center">
                        <p className="text-2xl font-bold text-[rgb(var(--primary))]">{stat.value}</p>
                        <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                      </div>
                    ))}
                  </motion.div>

                  {/* XP Progress */}
                  {levelInfo && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                      className="glass-card p-6"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-semibold text-[rgb(var(--on-surface))]">{levelInfo.name}</span>
                        <span className="text-sm text-[rgb(var(--on-surface-variant))]">
                          <span className="text-[rgb(var(--primary))] font-bold">
                            {userProfile.xp.toLocaleString()}
                          </span>{" "}
                          XP
                        </span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-[rgb(var(--surface-container))] overflow-hidden mb-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `${Math.min((levelInfo.progressXP / levelInfo.levelRange) * 100, 100)}%`,
                          }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full gradient-blue rounded-full glow-blue"
                        />
                      </div>
                      {levelInfo.nextName ? (
                        <p className="text-xs text-muted-foreground">
                          {levelInfo.xpToNext.toLocaleString()} XP until{" "}
                          <span className="text-[rgb(var(--primary))] font-medium">
                            {levelInfo.nextName}
                          </span>
                        </p>
                      ) : (
                        <p className="text-xs text-[rgb(var(--primary))] font-medium">
                          Max level reached!
                        </p>
                      )}
                    </motion.div>
                  )}

                  {/* Badges */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-card p-8"
                  >
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                      <Award className="w-5 h-5 text-primary" />
                      Achievements
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {badges.map((badge, idx) => (
                        <motion.div
                          key={badge.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.05 }}
                          whileHover={badge.unlocked ? { scale: 1.08, y: -4 } : {}}
                          className={`p-4 rounded-2xl border text-center transition-all ${
                            badge.unlocked
                              ? "bg-[rgb(var(--primary))]/10 border-[rgb(var(--primary))]/30 cursor-pointer hover:border-[rgb(var(--primary))]/50"
                              : "bg-[rgb(var(--surface-container-low))] border-[rgba(110,122,112,0.12)] opacity-60"
                          }`}
                        >
                          <div className="text-3xl mb-2">{badge.icon}</div>
                          <p className="text-xs md:text-sm font-medium text-foreground mb-1">
                            {badge.name}
                          </p>
                          {badge.unlocked ? (
                            <p className="text-xs text-[rgb(var(--primary))]">Unlocked</p>
                          ) : (
                            <p className="text-xs text-muted-foreground">{badge.hint}</p>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Settings */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="glass-card p-8"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-bold flex items-center gap-2">
                        <Settings className="w-5 h-5 text-primary" />
                        Settings
                      </h3>
                      {!editingSettings && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleOpenSettings}
                          className="text-sm text-primary font-semibold hover:underline"
                        >
                          Edit
                        </motion.button>
                      )}
                    </div>

                    {editingSettings ? (
                      <div className="space-y-4">
                        <div>
                          <label className="form-label">Display Name</label>
                          <input
                            type="text"
                            value={settingsForm.username}
                            onChange={(e) => setSettingsForm((f) => ({ ...f, username: e.target.value }))}
                            placeholder="Your display name"
                            className="glass-input"
                            disabled={settingsLoading}
                          />
                        </div>
                        <div>
                          <label className="form-label">City</label>
                          <input
                            type="text"
                            value={settingsForm.city}
                            onChange={(e) => setSettingsForm((f) => ({ ...f, city: e.target.value }))}
                            placeholder="Your city"
                            className="glass-input"
                            disabled={settingsLoading}
                          />
                        </div>
                        <div className="flex gap-3 pt-2">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleSaveSettings}
                            disabled={settingsLoading}
                            className="flex-1 py-3 rounded-xl gradient-blue text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                          >
                            <Check className="w-4 h-4" />
                            {settingsLoading ? "Saving..." : "Save Changes"}
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setEditingSettings(false)}
                            disabled={settingsLoading}
                            className="px-4 py-3 rounded-xl border border-border text-foreground font-semibold flex items-center gap-2 hover:bg-[rgb(var(--surface-container))] transition-colors disabled:opacity-50"
                          >
                            <X className="w-4 h-4" />
                            Cancel
                          </motion.button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="space-y-3">
                          {[
                            { label: "Display Name", value: userProfile.username },
                            { label: "City", value: userProfile.city },
                          ].map((item) => (
                            <div key={item.label} className="flex items-center justify-between p-3 rounded-xl bg-[rgb(var(--surface-container-low))]">
                              <span className="text-sm text-muted-foreground">{item.label}</span>
                              <span className="text-sm font-semibold text-foreground">{item.value}</span>
                            </div>
                          ))}
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={handleSignOut}
                          disabled={isSigningOut}
                          className="w-full mt-4 py-3 rounded-xl border border-[rgb(var(--error))]/30 bg-[rgb(var(--error))]/5 hover:bg-[rgb(var(--error))]/10 text-[rgb(var(--error))] font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                        >
                          <LogOut className="w-4 h-4" />
                          {isSigningOut ? "Signing out..." : "Sign Out"}
                        </motion.button>
                      </div>
                    )}
                  </motion.div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card p-8 text-center"
                >
                  {profileLoading ? (
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
                  ) : (
                    <p className="text-muted-foreground">Unable to load profile.</p>
                  )}
                </motion.div>
              )}
            </AuthGuard>
          )}
        </div>
      </main>

      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      <ContributionModal
        isOpen={showContributeModal}
        onClose={() => setShowContributeModal(false)}
        onSuccess={handleContributionSuccess}
      />

      <VerifyRouteModal
        isOpen={showVerifyModal && !selectedRouteForVerification}
        onClose={() => setShowVerifyModal(false)}
        onSelectRoute={(route) => setSelectedRouteForVerification(route)}
      />

      <RouteVerificationFlow
        route={selectedRouteForVerification}
        onBack={() => {
          setSelectedRouteForVerification(null);
          setShowVerifyModal(true);
        }}
        onSuccess={handleVerificationSuccess}
      />
    </div>
  );
}
