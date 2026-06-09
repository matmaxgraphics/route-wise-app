export interface RouteToVerify {
  id: string;
  from: string;
  to: string;
  contributor: string;
  contributorLevel: string;
  estimatedFare: string;
  estimatedTime: string;
  steps: number;
  confidence: number;
  verifications: number;
  createdAt: string;
}

export interface RouteStepInput {
  title: string;
  duration: string;
  fare: string;
}

export interface CreateRouteWithStepsInput {
  createdBy: string;
  from: string;
  to: string;
  routeSteps: RouteStepInput[];
  safetyTips?: string;
  city?: string;
}

export interface SubmitRouteVerificationInput {
  routeId: string;
  userId: string;
  voteType: "accurate" | "outdated" | "unsafe" | "wrong";
  safetyTips?: string;
}

export interface CreateRouteWithStepsResult {
  routeId?: string;
  error?: {
    message: string;
    details: string | null;
    hint: string | null;
    code: string | null;
    status?: number | null;
  };
}

export interface RouteStep {
  id: string;
  stepOrder: number;
  instruction: string;
  transportType: string;
  fareMin: number;
  fareMax: number;
}

export interface RouteSearchResult {
  id: string;
  from: string;
  to: string;
  status: string;
  totalFareMin: number;
  totalFareMax: number;
  totalDuration: number;
  confidenceScore: number;
  steps: RouteStep[];
  safetyTips: Array<{ id: string; content: string; severity: string }>;
}

export interface UserProfile {
  id: string;
  username: string;
  xp: number;
  level: number;
  contributionCount: number;
  city: string;
}

export interface LeaderboardEntry {
  rank: number;
  id: string;
  username: string;
  xp: number;
  contributionCount: number;
}
