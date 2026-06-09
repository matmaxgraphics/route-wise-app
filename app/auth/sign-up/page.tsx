"use client";

import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus, AlertCircle, Eye, EyeOff, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const router = useRouter();

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setPasswordMatch(value === confirmPassword || confirmPassword === "");
  };

  const handleConfirmChange = (value: string) => {
    setConfirmPassword(value);
    setPasswordMatch(password === value || password === "");
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      toast.error("Password is too short", {
        description: "Use at least 8 characters.",
      });
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ??
            `${window.location.origin}/auth/callback`,
          data: {
            display_name: displayName,
          },
        },
      });
      if (error) throw error;
      toast.success("Account created", {
        description: "Check your email to confirm your account.",
      });
      router.push("/auth/sign-up-success");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "An error occurred";
      setError(message);
      toast.error("Sign up failed", {
        description: message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center justify-center w-12 h-12 rounded-full gradient-blue mb-4"
          >
            <span className="text-white font-bold text-lg">RW</span>
          </motion.div>
          <h1 className="text-3xl font-bold text-foreground mb-2">RouteWise</h1>
          <p className="text-muted-foreground">Join the transport community</p>
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="glass-card p-6 sm:p-8 mb-6"
        >
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Create Account
          </h2>

          <form onSubmit={handleSignUp} className="space-y-5">
            {/* Display Name */}
            <div>
              <label htmlFor="display-name" className="form-label">
                Display Name
              </label>
              <Input
                id="display-name"
                type="text"
                placeholder="Your name (optional)"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                disabled={isLoading}
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  required
                  className="pr-10"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="form-helper-text">Minimum 8 characters</p>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirm-password" className="form-label">
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirm ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => handleConfirmChange(e.target.value)}
                  required
                  className="pr-10"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  disabled={isLoading}
                >
                  {showConfirm ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {confirmPassword && passwordMatch && (
                <p className="form-success-text flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Passwords match
                </p>
              )}
              {confirmPassword && !passwordMatch && (
                <p className="form-error-text">Passwords do not match</p>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-start gap-2 p-3 rounded-lg bg-[rgb(var(--error))]/10 border border-[rgb(var(--error))]/30"
              >
                <AlertCircle className="w-4 h-4 text-[rgb(var(--error))] shrink-0 mt-0.5" />
                <p className="text-sm text-[rgb(var(--error))]">{error}</p>
              </motion.div>
            )}

            {/* Sign Up Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading || !passwordMatch || password.length < 8}
              className="w-full py-3 rounded-xl gradient-blue text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <UserPlus className="w-4 h-4" />
              {isLoading ? "Creating account..." : "Create Account"}
            </motion.button>

            {/* Divider */}
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 bg-background text-muted-foreground">
                  Already have an account?
                </span>
              </div>
            </div>

            {/* Sign In Link */}
            <Link
              href="/auth/login"
              className="w-full py-3 rounded-xl border border-border text-foreground font-semibold text-center hover:bg-card transition-colors"
            >
              Sign In
            </Link>
          </form>
        </motion.div>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground space-y-2">
          <p>Contribute routes and earn XP</p>
        </div>
      </motion.div>
    </div>
  );
}
