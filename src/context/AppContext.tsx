"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { 
  UserRole, 
  AuthUser,
  Challenge, 
  Startup, 
  Application, 
  Pilot, 
  AuditLog, 
  NotificationItem,
  EvaluatorScore,
  FinalDecision,
  PilotKPI,
  PilotMilestone
} from "@/types";
import { 
  SupportedLanguage, 
  getTranslation 
} from "@/lib/translations";
import { 
  initialChallenge, 
  sampleStartups, 
  sampleApplications, 
  samplePilot, 
  sampleAuditLogs, 
  sampleNotifications 
} from "@/lib/mockData";

export type ActiveView = 
  | "landing"
  | "role_select"
  | "gov_dashboard"
  | "startup_dashboard"
  | "evaluator_dashboard"
  | "create_challenge"
  | "challenge_details"
  | "ai_startup_matches"
  | "startup_profile"
  | "application_review"
  | "evaluation_scorecard"
  | "pilot_management"
  | "kpi_monitoring"
  | "validation_report"
  | "procurement_recommendation"
  | "scale_up"
  | "documents"
  | "notifications"
  | "audit_trail";

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string) => string;
  
  // Data
  challenge: Challenge;
  setChallenge: React.Dispatch<React.SetStateAction<Challenge>>;
  startups: Startup[];
  applications: Application[];
  pilot: Pilot;
  auditLogs: AuditLog[];
  notifications: NotificationItem[];
  currentUser: AuthUser | null;
  
  // RBAC & Errors
  roleErrorMessage: string | null;
  clearRoleError: () => void;
  checkRoleAccess: (allowedRoles: UserRole[], actionDescription: string) => boolean;

  // Auth Modals
  authModalOpen: boolean;
  authModalMode: "signin" | "signup";
  authModalRole: UserRole;
  setAuthModalRole: (role: UserRole) => void;
  openAuthModal: (mode?: "signin" | "signup", targetRole?: UserRole) => void;
  closeAuthModal: () => void;
  loginUser: (user: AuthUser) => void;
  logoutUser: () => void;
  
  // Step 1: Challenge creation
  createChallengeAction: (data: Partial<Challenge>) => void;
  
  // Step 2: Startup onboarding, profile, and application
  registerStartupAction: (data: { name: string; dpiitNumber: string; founderName: string; email: string; sector: string; city: string }) => void;
  registerGovOfficerAction: (data: { name: string; designation: string; ministry: string; email: string; officerId: string }) => void;
  updateStartupProfileAction: (startupId: string, data: Partial<Startup>) => void;
  applyToChallengeAction: (startupId: string, proposalData?: Partial<Application>) => void;
  
  // Step 3: Eligibility & Shortlisting
  verifyEligibilityAction: (appId: string) => void;
  shortlistApplicationAction: (appId: string) => void;
  
  // Step 4: 5-Pillar Structured Evaluation
  evaluateApplicationAction: (appId: string, score: EvaluatorScore) => void;
  
  // Step 5: Commission Pilot with Milestones & KPIs
  createPilotAction: (customPilot?: Partial<Pilot>) => void;
  
  // Step 6: Startup submits milestone evidence
  submitMilestoneEvidenceAction: (pilotId: string, milestoneId: string, evidenceDescription: string, evidenceUrl: string) => void;
  
  // Step 7: Evaluator / Govt reviews milestone
  reviewMilestoneAction: (pilotId: string, milestoneId: string, approved: boolean, notes: string) => void;
  
  // Step 8: Update Actual KPI values
  updateKpiActualAction: (pilotId: string, kpiId: string, actualValue: string, status: "Ahead" | "On Track" | "Needs Attention") => void;
  
  // Step 9: Final Decision (Scale-Up, Reject, Further Review)
  recordFinalDecisionAction: (pilotId: string, decision: FinalDecision) => void;
  
  // General
  approveValidationAction: () => void;
  approveProcurementAction: () => void;
  executeScaleUpAction: () => void;
  resetDemoAction: () => void;
  markNotificationRead: (id: string) => void;
}

const STORAGE_KEY = "govinnovate_state_v3";

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>("government");
  const [activeView, setActiveView] = useState<ActiveView>("landing");
  const [language, setLanguageState] = useState<SupportedLanguage>("en");
  const [roleErrorMessage, setRoleErrorMessage] = useState<string | null>(null);

  const [challenge, setChallenge] = useState<Challenge>(initialChallenge);
  const [startups, setStartups] = useState<Startup[]>(sampleStartups);
  const [applications, setApplications] = useState<Application[]>(sampleApplications);
  const [pilot, setPilot] = useState<Pilot>(samplePilot);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(sampleAuditLogs);
  const [notifications, setNotifications] = useState<NotificationItem[]>(sampleNotifications);
  
  const [currentUser, setCurrentUser] = useState<AuthUser | null>({
    id: "GOV-DEMO-01",
    name: "Dr. Rajeshwar Sharma, IAS",
    email: "rajeshwar.sharma@jalshakti.gov.in",
    role: "government",
    organization: "Ministry of Jal Shakti",
    designation: "Director (Procurement & Innovation)",
    identifier: "GOV-IAS-2024-991"
  });

  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<"signin" | "signup">("signin");
  const [authModalRole, setAuthModalRole] = useState<UserRole>("startup");
  const [isHydrated, setIsHydrated] = useState(false);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem("govinnovate_lang") as SupportedLanguage;
      if (savedLang && ["en", "hi", "ta", "te", "bn", "mr", "gu"].includes(savedLang)) {
        setLanguageState(savedLang);
      }

      const savedState = localStorage.getItem(STORAGE_KEY);
      if (savedState) {
        const parsed = JSON.parse(savedState);
        if (parsed.challenge) setChallenge(parsed.challenge);
        if (parsed.startups) setStartups(parsed.startups);
        if (parsed.applications) setApplications(parsed.applications);
        if (parsed.pilot) setPilot(parsed.pilot);
        if (parsed.auditLogs) setAuditLogs(parsed.auditLogs);
        if (parsed.currentUser) setCurrentUser(parsed.currentUser);
        if (parsed.role) setRoleState(parsed.role);
      }
    } catch (e) {
      console.warn("Could not load persisted GovInnovate state:", e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save state to localStorage when changes occur
  useEffect(() => {
    if (!isHydrated) return;
    try {
      const stateToPersist = {
        challenge,
        startups,
        applications,
        pilot,
        auditLogs,
        currentUser,
        role
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToPersist));
    } catch (e) {
      console.warn("Could not persist GovInnovate state to localStorage:", e);
    }
  }, [challenge, startups, applications, pilot, auditLogs, currentUser, role, isHydrated]);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    // Align demo user identity when switching roles directly
    if (newRole === "government") {
      setCurrentUser({
        id: "GOV-DEMO-01",
        name: "Dr. Rajeshwar Sharma, IAS",
        email: "rajeshwar.sharma@jalshakti.gov.in",
        role: "government",
        organization: "Ministry of Jal Shakti",
        designation: "Director (Procurement & Innovation)",
        identifier: "GOV-IAS-2024-991"
      });
    } else if (newRole === "startup") {
      setCurrentUser({
        id: "ST-AQUASENSE",
        name: "Dr. Aranya Sen",
        email: "aranya@aquasense-ai.in",
        role: "startup",
        organization: "AquaSense AI Innovations Pvt Ltd",
        designation: "Founder & CEO",
        identifier: "DPIIT-REC-89241-DL"
      });
    } else {
      setCurrentUser({
        id: "EVAL-DEMO-01",
        name: "Prof. Vinod Nair",
        email: "vinod.nair@iitd.ac.in",
        role: "evaluator",
        organization: "IIT Delhi / Technical Evaluation Board",
        designation: "Chairman, Expert Committee",
        identifier: "EVAL-IITD-770"
      });
    }
  };

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("govinnovate_lang", lang);
    } catch (e) {
      // Ignore
    }
  };

  const t = (key: string): string => {
    return getTranslation(language, key);
  };

  const clearRoleError = () => {
    setRoleErrorMessage(null);
  };

  const checkRoleAccess = (allowedRoles: UserRole[], actionDescription: string): boolean => {
    if (!allowedRoles.includes(role)) {
      const message = `Access Denied: Only users with the "${allowedRoles.join(" or ")}" role can ${actionDescription}. Your active role is "${role}". Switch roles or sign in with appropriate credentials.`;
      setRoleErrorMessage(message);
      return false;
    }
    setRoleErrorMessage(null);
    return true;
  };

  const openAuthModal = (mode: "signin" | "signup" = "signin", targetRole: UserRole = "startup") => {
    setAuthModalMode(mode);
    setAuthModalRole(targetRole);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const addAuditLog = useCallback((
    action: string, 
    details: string, 
    badge: AuditLog["badge"], 
    logRole?: UserRole
  ) => {
    const actorName = currentUser ? `${currentUser.name} (${currentUser.organization})` : "System";
    const newLog: AuditLog = {
      id: `LOG-${Date.now().toString().slice(-5)}`,
      timestamp: new Date().toISOString().replace("T", " ").slice(0, 19),
      user: actorName,
      role: logRole || role,
      action,
      details,
      badge
    };
    setAuditLogs(prev => [newLog, ...prev]);
  }, [currentUser, role]);

  const loginUser = (user: AuthUser) => {
    setCurrentUser(user);
    setRoleState(user.role);
    setAuthModalOpen(false);
    addAuditLog(
      "USER_AUTHENTICATED",
      `User ${user.name} logged into ${user.role} workspace (${user.organization}).`,
      "Security",
      user.role
    );
    if (user.role === "government") {
      setActiveView("gov_dashboard");
    } else if (user.role === "startup") {
      setActiveView("startup_dashboard");
    } else {
      setActiveView("evaluator_dashboard");
    }
  };

  const logoutUser = () => {
    if (currentUser) {
      addAuditLog("USER_LOGGED_OUT", `${currentUser.name} signed out securely.`, "Security", currentUser.role);
    }
    setCurrentUser(null);
    setActiveView("landing");
  };

  // Step 1: Create Challenge (Gov only)
  const createChallengeAction = (data: Partial<Challenge>) => {
    if (!checkRoleAccess(["government"], "publish a procurement challenge")) return;

    const updated: Challenge = {
      ...challenge,
      ...data,
      id: data.id || `CH-${new Date().getFullYear()}-0${Math.floor(Math.random() * 90 + 10)}`,
      status: "Open",
      applicationsCount: 0
    };
    setChallenge(updated);
    addAuditLog(
      "CHALLENGE_PUBLISHED", 
      `Published challenge "${updated.title}" under statutory sandbox guidelines (Subject to GFR rules and competent authority approval).`, 
      "Procurement", 
      "government"
    );
    setActiveView("ai_startup_matches");
  };

  // Step 2: Register Startup & Update Profile
  const registerStartupAction = (data: {
    name: string;
    dpiitNumber: string;
    founderName: string;
    email: string;
    sector: string;
    city: string;
  }) => {
    const newStartup: Startup = {
      id: `ST-${Date.now().toString().slice(-4)}`,
      name: data.name,
      tagline: `${data.sector} Innovation & Deployment Hub`,
      dpiitNumber: data.dpiitNumber,
      isDpiitVerified: true,
      incorporationYear: 2024,
      location: data.city || "New Delhi, India",
      founders: [data.founderName],
      techStack: [data.sector, "IoT Edge Sensing", "Real-Time Telemetry"],
      sector: data.sector,
      products: [
        {
          title: `${data.name} Core Product`,
          description: `Domain solution for public challenges in ${data.sector}.`,
          stage: "TRL-7 (Operational Field Ready)"
        }
      ],
      patents: 1,
      trlLevel: 7,
      localContentPercentage: 65,
      matchScore: 88,
      matchReasons: [
        `DPIIT Recognized (${data.dpiitNumber})`,
        `Direct match for public sector requirements in ${data.sector}`,
        `TRL-7 meets technical threshold`
      ],
      matchBreakdown: {
        sectorMatch: true,
        techMatch: true,
        eligibilityMatch: true,
        trlMatch: true,
        score: 88,
        details: [
          `Sector alignment: ${data.sector}`,
          "TRL-7 operational demonstration verified",
          "65% domestic value addition (Class 1 Local Supplier)"
        ]
      },
      riskAnalysis: {
        level: "Low",
        factors: ["Validated DPIIT certificate", "Zero adverse regulatory flags"]
      }
    };

    setStartups(prev => [newStartup, ...prev]);

    const newUser: AuthUser = {
      id: newStartup.id,
      name: data.founderName,
      email: data.email,
      role: "startup",
      organization: data.name,
      identifier: data.dpiitNumber,
      designation: "Founder / Managing Director"
    };
    setCurrentUser(newUser);
    setRoleState("startup");
    setAuthModalOpen(false);

    addAuditLog(
      "STARTUP_REGISTERED",
      `New Startup Registered: "${data.name}" (DPIIT: ${data.dpiitNumber}, Founder: ${data.founderName}).`,
      "Security",
      "startup"
    );

    setNotifications(prev => [
      {
        id: `NOTIF-${Date.now()}`,
        title: "Startup Registered",
        message: `Welcome ${data.name}! Your profile is ready to apply to open public challenges.`,
        time: "Just now",
        read: false,
        type: "success"
      },
      ...prev
    ]);

    setActiveView("startup_dashboard");
  };

  const updateStartupProfileAction = (startupId: string, data: Partial<Startup>) => {
    if (!checkRoleAccess(["startup"], "update startup profile")) return;
    setStartups(prev => prev.map(s => s.id === startupId ? { ...s, ...data } : s));
    addAuditLog("STARTUP_PROFILE_UPDATED", `Startup profile updated: ${data.name || startupId}.`, "Security", "startup");
  };

  const registerGovOfficerAction = (data: {
    name: string;
    designation: string;
    ministry: string;
    email: string;
    officerId: string;
  }) => {
    const officerId = data.officerId || `GOV-${Date.now().toString().slice(-4)}`;
    const newUser: AuthUser = {
      id: officerId,
      name: data.name,
      email: data.email,
      role: "government",
      organization: data.ministry,
      identifier: officerId,
      designation: data.designation
    };
    setCurrentUser(newUser);
    setRoleState("government");
    setAuthModalOpen(false);

    addAuditLog(
      "OFFICER_ONBOARDED",
      `Government Officer authenticated: ${data.name} (${data.designation}, ${data.ministry}).`,
      "Security",
      "government"
    );

    setActiveView("gov_dashboard");
  };

  // Step 2 (Cont.): Apply to Challenge
  const applyToChallengeAction = (startupId: string, proposalData?: Partial<Application>) => {
    if (!checkRoleAccess(["startup"], "apply to a procurement challenge")) return;

    const startup = startups.find(s => s.id === startupId) || startups[0];
    const newAppId = `APP-WQ-10${applications.length + 1}`;

    const newApp: Application = {
      id: newAppId,
      challengeId: challenge.id,
      startupId: startup.id,
      startupName: startup.name,
      appliedDate: new Date().toISOString().slice(0, 10),
      status: "Submitted",
      dpiitVerified: startup.isDpiitVerified,
      financialTurnover: "₹1.42 Cr (Eligible for relaxation subject to tender conditions)",
      solutionOverview: proposalData?.solutionOverview || startup.products[0]?.description || "Edge sensor IoT deployment with real-time analytics.",
      proposedCost: proposalData?.proposedCost || "₹28,50,000",
      deploymentTime: proposalData?.deploymentTime || "14 Calendar Days",
      proposalSummary: proposalData?.proposalSummary || "Turnkey sensing deployment with zero pipeline modifications and cloud API reporting.",
      trlLevel: startup.trlLevel || 7,
      localContentPercentage: startup.localContentPercentage || 65,
      patentsCount: startup.patents || 1,
      evidenceLinks: proposalData?.evidenceLinks || ["https://example.com/docs/technical-spec.pdf"]
    };

    setApplications(prev => {
      const filtered = prev.filter(a => a.startupId !== startup.id);
      return [newApp, ...filtered];
    });

    setChallenge(prev => ({
      ...prev,
      applicationsCount: prev.applicationsCount + 1,
      status: "Reviewing"
    }));

    addAuditLog(
      "APPLICATION_SUBMITTED",
      `Application ${newAppId} submitted by ${startup.name} for challenge "${challenge.title}".`,
      "Procurement",
      "startup"
    );

    setActiveView("startup_dashboard");
  };

  // Step 3: Verify & Shortlist (Gov only)
  const verifyEligibilityAction = (appId: string) => {
    if (!checkRoleAccess(["government"], "verify startup eligibility")) return;

    setApplications(prev => prev.map(a => a.id === appId ? { ...a, status: "Eligibility Verified" } : a));
    addAuditLog(
      "DPIIT_ELIGIBILITY_VERIFIED",
      `DPIIT registration and preliminary tender relaxation eligibility verified for application ${appId}.`,
      "Security",
      "government"
    );
  };

  const shortlistApplicationAction = (appId: string) => {
    if (!checkRoleAccess(["government"], "shortlist an application")) return;

    setApplications(prev => prev.map(a => a.id === appId ? { ...a, status: "Shortlisted" } : a));
    setChallenge(prev => ({ ...prev, status: "Shortlisted" }));
    addAuditLog(
      "STARTUP_SHORTLISTED",
      `Application ${appId} formally shortlisted by Procurement Committee following multi-attribute review.`,
      "Procurement",
      "government"
    );
  };

  // Step 4: 5-Pillar Structured Evaluation (Evaluator only)
  const evaluateApplicationAction = (appId: string, score: EvaluatorScore) => {
    if (!checkRoleAccess(["evaluator"], "score and evaluate an application")) return;

    setApplications(prev => prev.map(a => {
      if (a.id === appId) {
        return {
          ...a,
          status: "Evaluated",
          evaluatorScore: score
        };
      }
      return a;
    }));

    addAuditLog(
      "APPLICATION_SCORED",
      `Technical Committee score awarded: ${score.total}/100 across 5 pillars (Inn: ${score.innovation}, Feas: ${score.feasibility}, Imp: ${score.impact}, Scal: ${score.scalability}, Viab: ${score.viability}). Evaluator: ${score.evaluatorName}.`,
      "Evaluation",
      "evaluator"
    );

    setActiveView("application_review");
  };

  // Step 5: Commission Pilot (Gov only)
  const createPilotAction = (customPilot?: Partial<Pilot>) => {
    if (!checkRoleAccess(["government"], "commission a pilot")) return;

    const shortlistedApp = applications.find(a => a.status === "Shortlisted") || applications[0];
    const initialMilestones: PilotMilestone[] = [
      {
        id: "M-01",
        name: "Milestone 1: Equipment Deployment & Initial Calibration",
        dueDate: "Day 15",
        status: "Submitted for Review",
        payout: "₹8,55,000 (30%)",
        paymentRef: "Demo Payment Reference (Simulated) #PR-2026-0911",
        evidenceDescription: "15 submersible probes mounted at 5 designated intake sites with co-signed engineering certificates.",
        evidenceUrl: "https://example.com/evidence/m1-commissioning-report.pdf",
        submittedAt: new Date().toISOString().slice(0, 16).replace("T", " ")
      },
      {
        id: "M-02",
        name: "Milestone 2: Real-Time Telemetry & Anomaly Detection Pipeline",
        dueDate: "Day 45",
        status: "Pending Evidence",
        payout: "₹11,40,000 (40%)",
        evidenceDescription: "",
        evidenceUrl: ""
      },
      {
        id: "M-03",
        name: "Milestone 3: 90-Day Lab Benchmarking & Validation Report",
        dueDate: "Day 90",
        status: "Pending Evidence",
        payout: "₹8,55,000 (30%)",
        evidenceDescription: "",
        evidenceUrl: ""
      }
    ];

    const initialKpis: PilotKPI[] = [
      {
        id: "kpi-1",
        metric: "Contamination Anomaly Alert Latency",
        target: "< 5.0 mins",
        current: "2.8 mins",
        unit: "minutes",
        status: "Ahead",
        trend: [6.8, 4.5, 3.2, 2.8],
        lastUpdated: new Date().toISOString().slice(0, 10)
      },
      {
        id: "kpi-2",
        metric: "Hardware Sensor Telemetry Uptime",
        target: "≥ 98.0%",
        current: "99.8%",
        unit: "%",
        status: "Ahead",
        trend: [97.0, 98.5, 99.4, 99.8],
        lastUpdated: new Date().toISOString().slice(0, 10)
      },
      {
        id: "kpi-3",
        metric: "Detection Accuracy vs Central Lab Tests",
        target: "≥ 95.0%",
        current: "98.2%",
        unit: "%",
        status: "Ahead",
        trend: [93.5, 96.0, 97.5, 98.2],
        lastUpdated: new Date().toISOString().slice(0, 10)
      }
    ];

    const newPilot: Pilot = {
      id: customPilot?.id || `PILOT-WQ-${new Date().getFullYear()}-01`,
      challengeId: challenge.id,
      startupId: shortlistedApp?.startupId || "ST-AQUASENSE",
      title: customPilot?.title || `90-Day Sandbox Pilot: ${challenge.title}`,
      currentDay: customPilot?.currentDay || 45,
      totalDays: 90,
      locationsCount: challenge.targetLocations || 5,
      scaleLocationsCount: challenge.scaleLocations || 50,
      phase: "Live Data Gathering",
      overallScore: 92.5,
      kpis: customPilot?.kpis || initialKpis,
      milestones: customPilot?.milestones || initialMilestones,
      ...customPilot
    };

    setPilot(newPilot);
    setChallenge(prev => ({ ...prev, status: "Pilot Active" }));
    setApplications(prev => prev.map(a => a.id === shortlistedApp.id ? { ...a, status: "Pilot Active" } : a));

    addAuditLog(
      "PILOT_COMMISSIONED",
      `Pilot sanction order ${newPilot.id} issued for ${newPilot.locationsCount} locations with milestone disbursements.`,
      "Procurement",
      "government"
    );

    setActiveView("pilot_management");
  };

  // Step 6: Startup submits milestone evidence
  const submitMilestoneEvidenceAction = (
    pilotId: string, 
    milestoneId: string, 
    evidenceDescription: string, 
    evidenceUrl: string
  ) => {
    if (!checkRoleAccess(["startup"], "submit milestone evidence")) return;

    setPilot(prev => {
      const updatedMilestones = prev.milestones.map(m => {
        if (m.id === milestoneId) {
          return {
            ...m,
            status: "Submitted for Review" as const,
            evidenceDescription,
            evidenceUrl,
            submittedAt: new Date().toISOString().slice(0, 16).replace("T", " ")
          };
        }
        return m;
      });
      return { ...prev, milestones: updatedMilestones };
    });

    addAuditLog(
      "MILESTONE_EVIDENCE_SUBMITTED",
      `Milestone evidence submitted for ${milestoneId}: "${evidenceDescription}". Awaiting technical review.`,
      "Milestone",
      "startup"
    );
  };

  // Step 7: Evaluator / Govt reviews milestone evidence
  const reviewMilestoneAction = (
    pilotId: string, 
    milestoneId: string, 
    approved: boolean, 
    notes: string
  ) => {
    if (!checkRoleAccess(["government", "evaluator"], "review milestone evidence")) return;

    const reviewerName = currentUser ? `${currentUser.name} (${currentUser.role})` : "Technical Authority";
    const paymentReference = approved ? `Demo Payment Reference (Simulated) #PR-${Date.now().toString().slice(-6)}` : undefined;

    setPilot(prev => {
      const updatedMilestones = prev.milestones.map(m => {
        if (m.id === milestoneId) {
          return {
            ...m,
            status: approved ? ("Approved" as const) : ("Rejected" as const),
            paymentRef: paymentReference || m.paymentRef,
            reviewedAt: new Date().toISOString().slice(0, 16).replace("T", " "),
            reviewedBy: reviewerName,
            reviewNotes: notes
          };
        }
        return m;
      });
      return { ...prev, milestones: updatedMilestones };
    });

    if (approved) {
      addAuditLog(
        "MILESTONE_APPROVED",
        `Milestone ${milestoneId} approved by ${reviewerName}. Notes: "${notes}". ${paymentReference}.`,
        "Milestone",
        role
      );
    } else {
      addAuditLog(
        "MILESTONE_REJECTED",
        `Milestone ${milestoneId} rejected by ${reviewerName}. Reason: "${notes}". Startup notified for remediation.`,
        "Milestone",
        role
      );
    }
  };

  // Step 8: Update actual KPI telemetry
  const updateKpiActualAction = (
    pilotId: string, 
    kpiId: string, 
    actualValue: string, 
    status: "Ahead" | "On Track" | "Needs Attention"
  ) => {
    if (!checkRoleAccess(["government", "evaluator"], "update pilot KPI telemetry")) return;

    setPilot(prev => {
      const updatedKpis = prev.kpis.map(k => {
        if (k.id === kpiId) {
          const numVal = parseFloat(actualValue.replace(/[^0-9.]/g, "")) || 0;
          return {
            ...k,
            current: actualValue,
            status,
            trend: [...k.trend.slice(-4), numVal],
            lastUpdated: new Date().toISOString().slice(0, 10)
          };
        }
        return k;
      });
      return { ...prev, kpis: updatedKpis };
    });

    addAuditLog(
      "KPI_TELEMETRY_UPDATED",
      `KPI ${kpiId} actual value updated to "${actualValue}" (${status}).`,
      "Evaluation",
      role
    );
  };

  // Step 9: Final Decision Recording
  const recordFinalDecisionAction = (pilotId: string, decision: FinalDecision) => {
    if (!checkRoleAccess(["government"], "record final procurement or scale decision")) return;

    setPilot(prev => ({
      ...prev,
      phase: "Concluded",
      finalDecision: decision
    }));

    if (decision.type === "Scale-Up") {
      setChallenge(prev => ({ ...prev, status: "Scale-Up Approved" }));
      addAuditLog(
        "SCALE_UP_DECISION_RECORDED",
        `Scale-Up Approved: Sanctioned rollout across ${decision.targetLocations || 50} locations. Rationale: "${decision.reason}". Subject to applicable GFR and financial sanction.`,
        "Decision",
        "government"
      );
    } else if (decision.type === "Further Review") {
      setChallenge(prev => ({ ...prev, status: "Further Review" }));
      addAuditLog(
        "FURTHER_REVIEW_RECORDED",
        `Further Review Decision Recorded: Pilot requires supplemental validation before scale consideration. Reason: "${decision.reason}".`,
        "Decision",
        "government"
      );
    } else {
      setChallenge(prev => ({ ...prev, status: "Rejected" }));
      addAuditLog(
        "PILOT_REJECTED",
        `Pilot Concluded without Scale-Up: Reason: "${decision.reason}".`,
        "Decision",
        "government"
      );
    }
  };

  const approveValidationAction = () => {
    if (!checkRoleAccess(["government", "evaluator"], "validate pilot outcomes")) return;
    setChallenge(prev => ({ ...prev, status: "Validation Done" }));
    setPilot(prev => ({ ...prev, phase: "Validation Completed" }));
    addAuditLog("PILOT_VALIDATED", `Independent lab validation affirm 96.4/100 pilot KPI correlation. Final decision unlocked.`, "Evaluation", role);
    setActiveView("procurement_recommendation");
  };

  const approveProcurementAction = () => {
    if (!checkRoleAccess(["government"], "advance to scale-up review")) return;
    setChallenge(prev => ({ ...prev, status: "Reviewing" }));
    addAuditLog("PROCUREMENT_REVIEW_OPENED", `Scale-up review session opened for Competent Authority decision.`, "Procurement", "government");
    setActiveView("scale_up");
  };

  const executeScaleUpAction = () => {
    if (!checkRoleAccess(["government"], "sanction scale-up")) return;
    setChallenge(prev => ({ ...prev, status: "Scale-Up Approved" }));
    addAuditLog("SCALE_UP_ROLLOUT_SANCTIONED", `Scale-up expansion sanctioned across 50 municipal water zones (Simulated Sanction Note).`, "Procurement", "government");
  };

  const resetDemoAction = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      // Ignore
    }
    setChallenge(initialChallenge);
    setStartups(sampleStartups);
    setApplications(sampleApplications);
    setPilot(samplePilot);
    setAuditLogs(sampleAuditLogs);
    setNotifications(sampleNotifications);
    setRoleState("government");
    setCurrentUser({
      id: "GOV-DEMO-01",
      name: "Dr. Rajeshwar Sharma, IAS",
      email: "rajeshwar.sharma@jalshakti.gov.in",
      role: "government",
      organization: "Ministry of Jal Shakti",
      designation: "Director (Procurement & Innovation)",
      identifier: "GOV-IAS-2024-991"
    });
    setActiveView("landing");
    setRoleErrorMessage(null);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <AppContext.Provider value={{
      role,
      setRole,
      activeView,
      setActiveView,
      language,
      setLanguage,
      t,
      challenge,
      setChallenge,
      startups,
      applications,
      pilot,
      auditLogs,
      notifications,
      currentUser,
      roleErrorMessage,
      clearRoleError,
      checkRoleAccess,
      authModalOpen,
      authModalMode,
      authModalRole,
      setAuthModalRole,
      openAuthModal,
      closeAuthModal,
      loginUser,
      logoutUser,
      createChallengeAction,
      registerStartupAction,
      registerGovOfficerAction,
      updateStartupProfileAction,
      applyToChallengeAction,
      verifyEligibilityAction,
      shortlistApplicationAction,
      evaluateApplicationAction,
      createPilotAction,
      submitMilestoneEvidenceAction,
      reviewMilestoneAction,
      updateKpiActualAction,
      recordFinalDecisionAction,
      approveValidationAction,
      approveProcurementAction,
      executeScaleUpAction,
      resetDemoAction,
      markNotificationRead,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
