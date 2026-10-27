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

export interface DocumentVerificationRecord {
  id: string;
  fileName: string;
  fileSizeBytes: number;
  fileHash: string; // SHA-256 of the document
  uploadedAt: string;
  extractedEntityName?: string;
  extractedDpiitNumber?: string;
  extractedDate?: string;
  extractedCategory?: string;
  nameSimilarityScore?: number; // 0-100%
  entityMismatchFlag?: boolean;
  preliminaryStatus: "Passed" | "Mismatch Detected" | "Format Error" | "Pending";
  officialStatus: "Pending Review" | "Officially Verified" | "Rejected";
  verifiedBy?: string;
  verifiedAt?: string;
  rejectionReason?: string;
  source: "Direct Upload" | "DigiLocker Sandbox";
  rawTextPreview?: string;
}

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
  // Cryptographic SHA-256 Integrity & Vigilance Verification Fields
  canonicalHash?: string;
  currentHash?: string;
  tamperStatus?: "VERIFIED" | "FLAGGED_FOR_REVIEW";
  tamperAuditNote?: string;
  verificationStage?: 
    | "Not Uploaded"
    | "Document Uploaded"
    | "Preliminary Checks Passed"
    | "Preliminary Check Failed - Mismatch Flagged"
    | "Official Verification Pending"
    | "Officially Verified"
    | "Verification Failed";
  documentRecord?: DocumentVerificationRecord;
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
  viability: number;    // 0-20
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
  // Document and hash attachment
  documentRecord?: DocumentVerificationRecord;
  tamperStatus?: "VERIFIED" | "FLAGGED_FOR_REVIEW";
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
  blockHash?: string;
  prevHash?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "info" | "success" | "warning";
}
