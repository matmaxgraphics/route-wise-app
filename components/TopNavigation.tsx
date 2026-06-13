"use client";

import { motion } from "framer-motion";
import { Bell, LogOut, UserPlus, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useTheme } from "next-themes";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface TopNavigationProps {
  xpProgress?: number; // 0–1
}

export default function TopNavigation({ xpProgress = 0 }: TopNavigationProps) {
  const { user, isAuthenticated, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsSigningOut(true);
    try {
      await signOut();
      setShowProfileMenu(false);
      toast.success("Signed out");
      router.push("/");
    } catch {
      toast.error("Unable to sign out");
    } finally {
      setIsSigningOut(false);
    }
  };
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-40 backdrop-blur-xl border-b border-[rgba(var(--outline-variant),0.2)]"
      style={{ backgroundColor: "rgb(var(--surface) / 0.92)" }}
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[rgb(var(--primary))] via-[rgb(var(--primary-container))] to-[rgb(var(--secondary-container))] flex items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.12)]">
            <span className="text-white font-black text-sm">RW</span>
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold text-[rgb(var(--on-surface))]">
            RouteWise
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-2xl bg-[rgb(var(--surface-container-low))] hover:bg-[rgb(var(--surface-container))] transition-colors"
            aria-label="Toggle theme"
            type="button"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-[rgb(var(--secondary-container))]" />
            ) : (
              <Moon className="w-5 h-5 text-[rgb(var(--on-surface-variant))]" />
            )}
          </motion.button>

          {isAuthenticated && (
            <>
              {/* Notification Bell */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 rounded-2xl bg-[rgb(var(--surface-container-low))] hover:bg-[rgb(var(--surface-container))] transition-colors"
                aria-label="Notifications"
                type="button"
              >
                <Bell className="w-5 h-5 text-[rgb(var(--primary))] transition-colors" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[rgb(var(--secondary-container))] rounded-full animate-pulse" />
              </motion.button>

              {/* Profile Avatar with XP Ring */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-[rgb(var(--primary))]/90 via-[rgb(var(--inverse-primary))]/80 to-[rgb(var(--secondary-container))]/90 flex items-center justify-center border-2 border-[rgba(0,107,63,0.24)] cursor-pointer relative"
                  aria-label="Open profile menu"
                  type="button"
                >
                  <span className="text-white font-bold text-xs">
                    {user?.email?.[0].toUpperCase() || "U"}
                  </span>
                </motion.button>

                {/* Profile Menu */}
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-xl shadow-lg overflow-hidden z-50"
                  >
                    <div className="p-3 border-b border-border">
                      <p className="text-xs text-muted-foreground">
                        Signed in as
                      </p>
                      <p className="text-sm font-semibold text-foreground truncate">
                        {user?.email}
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={handleLogout}
                      disabled={isSigningOut}
                      className="w-full text-left px-4 py-2.5 text-sm text-[rgb(var(--error))] hover:bg-[rgb(var(--surface-container-low))] flex items-center gap-2 transition-colors border-t border-border/40 cursor-pointer"
                      type="button"
                    >
                      <LogOut className="w-4 h-4 text-[rgb(var(--error))]" />
                      {isSigningOut ? "Signing out..." : "Sign Out"}
                    </motion.button>
                  </motion.div>
                )}

                {/* XP Ring Progress */}
                {(() => {
                  const circumference = 2 * Math.PI * 10;
                  const dashOffset = circumference * (1 - Math.min(xpProgress, 1));
                  return (
                    <svg
                      className="absolute -inset-1 w-12 h-12"
                      viewBox="0 0 24 24"
                      style={{ transform: "rotate(-90deg)", color: "rgb(var(--primary))" }}
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        fill="none"
                        strokeWidth="0.5"
                        style={{ stroke: "rgb(var(--outline-variant) / 0.35)" }}
                      />
                      <motion.circle
                        cx="12"
                        cy="12"
                        r="10"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: dashOffset }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      />
                    </svg>
                  );
                })()}
              </div>
            </>
          )}

          {!isAuthenticated && (
            <Link
              href="/auth/login"
              className="px-4 py-2 rounded-2xl bg-[rgb(var(--primary))] text-[rgb(var(--on-primary))] font-semibold text-sm hover:shadow-[0_10px_20px_rgba(0,0,0,0.12)] transition-shadow flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              Sign In
            </Link>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
