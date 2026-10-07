"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  UserRole, 
  AuthUser,
  Challenge, 
  Startup, 
  Application, 
  Pilot, 
  AuditLog, 
  NotificationItem,
  ChallengeStatus 
} from "@/types";
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
  challenge: Challenge;
  setChallenge: React.Dispatch<React.SetStateAction<Challenge>>;
  startups: Startup[];
  applications: Application[];
  pilot: Pilot;
  auditLogs: AuditLog[];
  notifications: NotificationItem[];
  currentUser: AuthUser | null;
  authModalOpen: boolean;
  authModalMode: "signin" | "signup";
  authModalRole: UserRole;
  setAuthModalRole: (role: UserRole) => void;
  openAuthModal: (mode?: "signin" | "signup", targetRole?: UserRole) => void;
  closeAuthModal: () => void;
  loginUser: (user: AuthUser) => void;
  logoutUser: () => void;
  registerStartupAction: (data: { name: string; dpiitNumber: string; founderName: string; email: string; sector: string; city: string }) => void;
  registerGovOfficerAction: (data: { name: string; designation: string; ministry: string; email: string; officerId: string }) => void;
  // Scenario actions
  createChallengeAction: (data: Partial<Challenge>) => void;
  applyToChallengeAction: (startupId: string, customText?: string) => void;
  verifyEligibilityAction: (appId: string) => void;
  evaluateApplicationAction: (appId: string, scores: {
    innovation: number;
    feasibility: number;
    impact: number;
    scalability: number;
    cost: number;
    security: number;
    feedback: string;
  }) => void;
  shortlistApplicationAction: (appId: string) => void;
  createPilotAction: () => void;
  approveValidationAction: () => void;
  approveProcurementAction: () => void;
  executeScaleUpAction: () => void;
  resetDemoAction: () => void;
  markNotificationRead: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>("government");
  const [activeView, setActiveView] = useState<ActiveView>("landing");
  const [challenge, setChallenge] = useState<Challenge>(initialChallenge);
  const [startups, setStartups] = useState<Startup[]>(sampleStartups);
  const [applications, setApplications] = useState<Application[]>(sampleApplications);
  const [pilot, setPilot] = useState<Pilot>(samplePilot);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(sampleAuditLogs);
  const [notifications, setNotifications] = useState<NotificationItem[]>(sampleNotifications);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>({
    id: "GOV-DEMO-01",
    name: "Rajesh Sharma, IAS",
    email: "rajesh.sharma@jalshakti.gov.in",
    role: "government",
    organization: "Ministry of Jal Shakti",
    designation: "Director (Procurement & Innovation)",
    identifier: "GOV-IAS-2024-991"
  });
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<"signin" | "signup">("signin");
  const [authModalRole, setAuthModalRole] = useState<UserRole>("startup");

  const openAuthModal = (mode: "signin" | "signup" = "signin", targetRole: UserRole = "startup") => {
    setAuthModalMode(mode);
    setAuthModalRole(targetRole);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const loginUser = (user: AuthUser) => {
    setCurrentUser(user);
    setRole(user.role);
    setAuthModalOpen(false);
    addAuditLog(
      "USER_AUTHENTICATED",
      `User ${user.name} logged into ${user.role === "government" ? "Government Portal" : user.role === "startup" ? "Startup Workspace" : "Evaluator Panel"} (${user.organization}).`,
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
      techStack: [data.sector, "IoT Edge AI", "Real-Time Telemetry"],
      products: [
        {
          title: `${data.name} Solution Suite`,
          description: `Enterprise-grade ${data.sector.toLowerCase()} solution built for Indian public infrastructure.`,
          stage: "Commercial Ready (TRL-8)"
        }
      ],
      patents: 1,
      matchScore: 92,
      matchReasons: [
        `DPIIT Recognized (${data.dpiitNumber}) with GFR 149/170 exemption`,
        `Specialized domain match for public challenges in ${data.sector}`,
        `Full compliance with Indian National Standards`
      ],
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
    setRole("startup");
    setAuthModalOpen(false);

    addAuditLog(
      "STARTUP_REGISTERED",
      `New Startup Registered: "${data.name}" (DPIIT ID: ${data.dpiitNumber}, Founder: ${data.founderName}) under GFR 149/170 Fast-Track Onboarding.`,
      "Security",
      "startup"
    );

    setNotifications(prev => [
      {
        id: `NOTIF-${Date.now()}`,
        title: "Startup Registered & Verified",
        message: `Welcome ${data.name}! Your DPIIT recognition (${data.dpiitNumber}) has been pre-verified for Public Procurement Sandbox challenges.`,
        time: "Just now",
        read: false,
        type: "success"
      },
      ...prev
    ]);

    setActiveView("startup_dashboard");
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
    setRole("government");
    setAuthModalOpen(false);

    addAuditLog(
      "OFFICER_ONBOARDED",
      `Government Officer authenticated: ${data.name} (${data.designation}, ${data.ministry}) via Parichay Single Sign-On (ID: ${officerId}).`,
      "Security",
      "government"
    );

    setNotifications(prev => [
      {
        id: `NOTIF-${Date.now()}`,
        title: "Officer Account Activated",
        message: `${data.name} (${data.designation}) is now authenticated to publish procurement challenges and sanction pilots.`,
        time: "Just now",
        read: false,
        type: "success"
      },
      ...prev
    ]);

    setActiveView("gov_dashboard");
  };

  const addAuditLog = (action: string, details: string, badge: AuditLog["badge"], logRole?: UserRole) => {
    const newLog: AuditLog = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().replace("T", " ").slice(0, 19),
      user: role === "government" ? "Govt Innovation Cell / Director" : role === "startup" ? "Dr. Aranya Sen (AquaSense)" : "Prof. Vinod Nair (Chairman, Evaluation)",
      role: logRole || role,
      action,
      details,
      badge
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const createChallengeAction = (data: Partial<Challenge>) => {
    setChallenge(prev => ({
      ...prev,
      ...data,
      status: "Open"
    }));
    addAuditLog("CHALLENGE_PUBLISHED", `Challenge "${data.title || challenge.title}" decomposed by AI and published for startup proposals.`, "AI Decision", "government");
    setActiveView("ai_startup_matches");
  };

  const applyToChallengeAction = (startupId: string, customText?: string) => {
    setApplications(prev => {
      const existing = prev.find(a => a.startupId === startupId);
      if (existing) return prev;
      const startup = startups.find(s => s.id === startupId);
      const newApp: Application = {
        id: `APP-WQ-10${prev.length + 1}`,
        challengeId: challenge.id,
        startupId,
        startupName: startup?.name || "Startup Applicant",
        appliedDate: new Date().toISOString().slice(0, 10),
        status: "Submitted",
        dpiitVerified: startup?.isDpiitVerified ?? true,
        financialTurnover: "₹1.42 Cr",
        proposalSummary: customText || "Comprehensive edge AI water sensor array deployment across municipal treatment plants.",
        aiProposalHighlights: [
          "Zero chemical reagent operational model",
          "Automated municipal telemetry alerts within 3 minutes",
          "Real-time sensor self-diagnostics"
        ],
        solutionOverview: "Submersible spectrophotometric multispectral probes with IoT cloud reporting.",
        proposedCost: "₹28,50,000",
        deploymentTime: "12 Days"
      };
      return [...prev, newApp];
    });
    setChallenge(prev => ({ ...prev, applicationsCount: prev.applicationsCount + 1, status: "Reviewing" }));
    addAuditLog("APPLICATION_SUBMITTED", `Application submitted for challenge "${challenge.title}".`, "Procurement", "startup");
    setActiveView("startup_dashboard");
  };

  const verifyEligibilityAction = (appId: string) => {
    setApplications(prev => prev.map(a => a.id === appId ? { ...a, status: "Eligibility Verified" } : a));
    addAuditLog("DPIIT_ELIGIBILITY_VERIFIED", `Startup DPIIT certificate validated. Exemption granted under GFR Start-up provisions.`, "Security", "government");
  };

  const evaluateApplicationAction = (appId: string, scores: {
    innovation: number;
    feasibility: number;
    impact: number;
    scalability: number;
    cost: number;
    security: number;
    feedback: string;
  }) => {
    const total = scores.innovation + scores.feasibility + scores.impact + scores.scalability + scores.cost + scores.security;
    setApplications(prev => prev.map(a => {
      if (a.id === appId) {
        return {
          ...a,
          status: "Evaluated",
          evaluatorScore: {
            ...scores,
            total,
            evaluatorName: "Prof. Vinod Nair (Chairman, Evaluation Board)"
          }
        };
      }
      return a;
    }));
    addAuditLog("APPLICATION_SCORED", `Evaluation committee score awarded: ${total}/100. Comments: "${scores.feedback}"`, "Evaluation", "evaluator");
    setActiveView("application_review");
  };

  const shortlistApplicationAction = (appId: string) => {
    setApplications(prev => prev.map(a => a.id === appId ? { ...a, status: "Shortlisted" } : a));
    setChallenge(prev => ({ ...prev, status: "Shortlisted" }));
    addAuditLog("STARTUP_SHORTLISTED", `AquaSense AI formally shortlisted as Rank 1 bidder for prototype pilot sanction.`, "Procurement", "government");
  };

  const createPilotAction = () => {
    setChallenge(prev => ({ ...prev, status: "Pilot Active" }));
    setApplications(prev => prev.map(a => a.startupId === "ST-AQUASENSE" ? { ...a, status: "Pilot Active" } : a));
    addAuditLog("PILOT_COMMISSIONED", `Sanction order PILOT-WQ-2026-01 issued for 90-day sandbox pilot across 5 municipal sites.`, "Procurement", "government");
    setActiveView("pilot_management");
  };

  const approveValidationAction = () => {
    setChallenge(prev => ({ ...prev, status: "Validation Done" }));
    setPilot(prev => ({ ...prev, phase: "Validation Completed" }));
    addAuditLog("PILOT_VALIDATED", `Central Water Laboratory audit affirmed 96.4/100 pilot outcome. Recommendation triggered.`, "AI Decision", "government");
    setActiveView("procurement_recommendation");
  };

  const approveProcurementAction = () => {
    setChallenge(prev => ({ ...prev, status: "Procurement Approved" }));
    addAuditLog("PROCUREMENT_ORDER_APPROVED", `Direct Commercial Procurement sanctioned under Special Innovation Procurement Rules.`, "Procurement", "government");
    setActiveView("scale_up");
  };

  const executeScaleUpAction = () => {
    setChallenge(prev => ({ ...prev, status: "Scale-Up" }));
    addAuditLog("SCALE_UP_ROLLOUT_SANCTIONED", `Scale-up expansion sanctioned: Expanding from 5 pilot wards to 50 district water distribution zones (Budget: ₹18.5 Cr).`, "Procurement", "government");
  };

  const resetDemoAction = () => {
    setChallenge(initialChallenge);
    setStartups(sampleStartups);
    setApplications(sampleApplications);
    setPilot(samplePilot);
    setAuditLogs(sampleAuditLogs);
    setRole("government");
    setActiveView("landing");
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
      challenge,
      setChallenge,
      startups,
      applications,
      pilot,
      auditLogs,
      notifications,
      currentUser,
      authModalOpen,
      authModalMode,
      authModalRole,
      setAuthModalRole,
      openAuthModal,
      closeAuthModal,
      loginUser,
      logoutUser,
      registerStartupAction,
      registerGovOfficerAction,
      createChallengeAction,
      applyToChallengeAction,
      verifyEligibilityAction,
      evaluateApplicationAction,
      shortlistApplicationAction,
      createPilotAction,
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
