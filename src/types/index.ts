export type UserRole = "government" | "startup" | "evaluator";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organization: string;
  designation?: string;
  identifier?: string;
}

export type ChallengeStatus = 
  | "Draft"
  | "Open"
  | "Reviewing"
  | "Shortlisted"
  | "Pilot Active"
  | "Validation Done"
  | "Scale-Up Approved"
  | "Rejected"
  | "Further Review";

export interface Startup {
  id: string;
  name: string;
  tagline: string;
  dpiitNumber: string;
  isDpiitVerified: boolean;
  incorporationYear: number;
  location: string;
  founders: string[];
  techStack: string[];
  sector?: string;
  products: {
    title: string;
    description: string;
    stage: string;
  }[];
  patents: number;
  trlLevel: number;
  localContentPercentage: number;
  matchScore: number;
  matchReasons: string[];
  matchBreakdown?: {
    sectorMatch: boolean;
    techMatch: boolean;
    eligibilityMatch: boolean;
    trlMatch: boolean;
    score: number;
    details: string[];
  };
  riskAnalysis: {
    level: "Low" | "Medium" | "High";
    factors: string[];
  };
}

export interface Challenge {
  id: string;
  title: string;
  department: string;
  ministry: string;
  category: string;
  budget: string;
  pilotDuration: string;
  deadline: string;
  status: ChallengeStatus;
  summary: string;
  problemStatement: string;
  expectedOutcomes: string[];
  technicalThresholds?: string[];
  targetLocations: number;
  scaleLocations: number;
  matchedCount: number;
  applicationsCount: number;
}

export interface EvaluatorScore {
  innovation: number;   // 0-20
  feasibility: number;  // 0-20
  impact: number;       // 0-20
  scalability: number;  // 0-20
  viability: number;    // 0-20 (Replaces old generic cost/security)
  total: number;        // 0-100
  justifications: {
    innovation: string;
    feasibility: string;
    impact: string;
    scalability: string;
    viability: string;
  };
  evidenceReferences?: string;
  feedback: string;
  evaluatorName: string;
  evaluatedAt: string;
}

export interface Application {
  id: string;
  challengeId: string;
  startupId: string;
  startupName: string;
  appliedDate: string;
  status: "Submitted" | "Eligibility Verified" | "Evaluated" | "Shortlisted" | "Pilot Active" | "Completed" | "Rejected";
  dpiitVerified: boolean;
  financialTurnover: string;
  proposalSummary: string;
  solutionOverview: string;
  proposedCost: string;
  deploymentTime: string;
  trlLevel: number;
  localContentPercentage: number;
  patentsCount: number;
  evidenceLinks?: string[];
  evaluatorScore?: EvaluatorScore;
}

export interface PilotKPI {
  id: string;
  metric: string;
  target: string;
  current: string;
  unit: string;
  status: "Ahead" | "On Track" | "Needs Attention";
  trend: number[];
  lastUpdated?: string;
}

export interface PilotMilestone {
  id: string;
  name: string;
  dueDate: string;
  status: "Pending Evidence" | "Submitted for Review" | "Approved" | "Rejected";
  payout: string;
  paymentRef?: string; // Demo Payment Reference (Simulated)
  evidenceDescription?: string;
  evidenceUrl?: string;
  submittedAt?: string;
  reviewedAt?: string;
  reviewedBy?: string;
  reviewNotes?: string;
}

export interface FinalDecision {
  type: "Scale-Up" | "Rejected" | "Further Review";
  reason: string;
  decidedBy: string;
  decidedAt: string;
  targetLocations?: number;
  scaleBudget?: string;
}

export interface Pilot {
  id: string;
  challengeId: string;
  startupId: string;
  title: string;
  currentDay: number;
  totalDays: number;
  locationsCount: number;
  scaleLocationsCount: number;
  phase: "Deployment" | "Live Data Gathering" | "Evaluation" | "Validation Completed" | "Concluded";
  overallScore: number;
  kpis: PilotKPI[];
  milestones: PilotMilestone[];
  finalDecision?: FinalDecision;
  recommendationSummary?: {
    verdict: string;
    score: number;
    notes: string;
  };
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  role: UserRole;
  action: string;
  details: string;
  badge: "Security" | "Procurement" | "Matching" | "Evaluation" | "Payment" | "Milestone" | "Decision";
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "info" | "success" | "warning";
}
