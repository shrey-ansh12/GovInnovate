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
  | "Procurement Approved"
  | "Scale-Up";

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
  products: {
    title: string;
    description: string;
    stage: string;
  }[];
  patents: number;
  matchScore: number;
  matchReasons: string[];
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
  targetLocations: number;
  scaleLocations: number;
  matchedCount: number;
  applicationsCount: number;
}

export interface Application {
  id: string;
  challengeId: string;
  startupId: string;
  startupName: string;
  appliedDate: string;
  status: "Submitted" | "Eligibility Verified" | "Evaluated" | "Shortlisted" | "Pilot Active" | "Completed";
  dpiitVerified: boolean;
  financialTurnover: string;
  proposalSummary: string;
  aiProposalHighlights: string[];
  solutionOverview: string;
  proposedCost: string;
  deploymentTime: string;
  evaluatorScore?: {
    innovation: number;
    feasibility: number;
    impact: number;
    scalability: number;
    cost: number;
    security: number;
    total: number;
    feedback: string;
    evaluatorName: string;
  };
}

export interface PilotKPI {
  id: string;
  metric: string;
  target: string;
  current: string;
  unit: string;
  status: "Ahead" | "On Track" | "Needs Attention";
  trend: number[];
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
  phase: "Deployment" | "Live Data Gathering" | "Evaluation" | "Validation Completed";
  overallScore: number;
  kpis: PilotKPI[];
  milestones: {
    name: string;
    dueDate: string;
    status: "Completed" | "In Progress" | "Upcoming";
    payout: string;
    isPaid: boolean;
  }[];
  aiPilotRecommendation: {
    verdict: "Strongly Recommended for Commercial Procurement";
    confidence: number;
    reasons: string[];
    costBenefitRatio: string;
  };
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  role: UserRole;
  action: string;
  details: string;
  badge: "Security" | "Procurement" | "AI Decision" | "Evaluation" | "Payment";
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "info" | "success" | "warning";
}
