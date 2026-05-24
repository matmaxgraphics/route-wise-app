"use client";

import { useState } from "react";
import type { RouteToVerify } from "@/lib/types";
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

export default function Home() {
  const [activeTab, setActiveTab] = useState<
    "explore" | "contribute" | "profile"
  >("explore");
  const [showContributeModal, setShowContributeModal] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [selectedRouteForVerification, setSelectedRouteForVerification] =
    useState<RouteToVerify | null>(null);
  const [routeFound, setRouteFound] = useState(true);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <TopNavigation />

      <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
          {activeTab === "explore" && (
            <>
              <HeroSearch onSearch={() => setRouteFound(true)} />

              {routeFound && (
                <>
                  <RouteResult />
                  <StreetIntelligence />
                </>
              )}
            </>
          )}

          {activeTab === "contribute" && (
            <AuthGuard feature="contribute and verify routes">
              <>
                <CommunityContribution
                  onContributeClick={() => setShowContributeModal(true)}
                  onVerifyClick={() => setShowVerifyModal(true)}
                />
                <Leaderboard />
              </>
            </AuthGuard>
          )}

          {activeTab === "profile" && (
            <div className="glass-card p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
              <p className="text-muted-foreground">
                Profile section coming soon
              </p>
            </div>
          )}
        </div>
      </main>

      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      <ContributionModal
        isOpen={showContributeModal}
        onClose={() => setShowContributeModal(false)}
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
        onSuccess={(data) => {
          console.log("[v0] Verification submitted:", data);
          setSelectedRouteForVerification(null);
          setTimeout(() => {
            setShowVerifyModal(false);
          }, 3000);
        }}
      />
    </div>
  );
}
