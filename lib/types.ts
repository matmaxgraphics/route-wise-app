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
