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
  PilotMilestone,
  DocumentVerificationRecord,
  EvidenceRecord,
  EvidenceVerificationResponse
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
import { 
  computeStartupHash, 
  verifyStartupRecordIntegrity, 
  computeAuditBlockHash 
} from "@/lib/cryptoUtils";
import { calculateStartupMatch } from "@/lib/matchingEngine";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

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

export type AppMode = "real" | "demo";

interface AppContextType {
  // Mode
  appMode: AppMode;
  setAppMode: (mode: AppMode) => void;
  isLiveDbConnected: boolean;
  isLoadingLiveData: boolean;
  refreshLiveData: () => Promise<void>;

  // Role & Navigation
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
  evidenceRecords: EvidenceRecord[];
  refreshEvidenceRecords: () => Promise<void>;
  verifyEvidenceAction: (evidenceId: string, file?: File, fileHash?: string) => Promise<EvidenceVerificationResponse | null>;
  getEvidenceRecordAction: (evidenceId: string) => Promise<EvidenceRecord | null>;
  
  // Challenges List & Selection
  challenges: Challenge[];
  selectChallengeAction: (challengeId: string) => void;

  // Blockchain Modal
  blockchainModalOpen: boolean;
  openBlockchainModal: () => void;
  closeBlockchainModal: () => void;

  // RBAC & Errors
  roleErrorMessage: string | null;
  clearRoleError: () => void;
  checkRoleAccess: (allowedRoles: UserRole[], actionDescription: string) => boolean;

  // Auth Modals & Actions
  authModalOpen: boolean;
  authModalMode: "signin" | "signup";
  authModalRole: UserRole;
  setAuthModalRole: (role: UserRole) => void;
  openAuthModal: (mode?: "signin" | "signup", targetRole?: UserRole) => void;
  closeAuthModal: () => void;
  loginUser: (user: AuthUser) => void;
  logoutUser: () => void;
  signInReal: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUpReal: (data: {
    email: string;
    password: string;
    role: UserRole;
    fullName: string;
    organizationName: string;
    designation?: string;
    identifier?: string;
    sector?: string;
    city?: string;
  }) => Promise<{ success: boolean; error?: string }>;
  resetPasswordReal: (email: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  
  // Step 1: Challenge creation & dynamic matching
  createChallengeAction: (data: Partial<Challenge>) => Promise<void> | void;
  recalculateMatchesAction: (customChallenge?: Challenge) => void;
  
  // Step 2: Startup onboarding, profile, and application
  registerStartupAction: (data: { name: string; dpiitNumber: string; founderName: string; email: string; sector: string; city: string }) => Promise<void>;
  registerGovOfficerAction: (data: { name: string; designation: string; ministry: string; email: string; officerId: string }) => void;
  updateStartupProfileAction: (startupId: string, data: Partial<Startup>) => Promise<void> | void;
  applyToChallengeAction: (startupId: string, proposalData?: Partial<Application>) => Promise<void> | void;
  
  // Step 3: Eligibility & Shortlisting
  verifyEligibilityAction: (appId: string) => Promise<void> | void;
  shortlistApplicationAction: (appId: string) => Promise<void> | void;
  
  // Document Verification (Real PDF & DigiLocker Sandbox)
  uploadAndParseDpiitAction: (startupId: string, file: File) => Promise<boolean>;
  pullDigiLockerAction: (startupId: string, dpiitNumber: string) => Promise<boolean>;
  officialReviewDpiitAction: (startupId: string, approved: boolean, notes?: string) => void;

  // Cryptographic SHA-256 Record Integrity Actions
  verifyStartupIntegrityAction: (startupId: string) => Promise<boolean>;
  flagStartupForReviewAction: (startupId: string, reason: string) => void;
  clearTamperFlagAction: (startupId: string) => Promise<void>;
  
  // Step 4: 5-Pillar Structured Evaluation
  evaluateApplicationAction: (appId: string, score: EvaluatorScore) => Promise<void> | void;
  selectedAppIdForScore: string;
  setSelectedAppIdForScore: (id: string) => void;
  
  // Step 5: Commission Pilot with Milestones & KPIs
  createPilotAction: (customPilot?: Partial<Pilot>) => void;
  
  // Step 6: Startup submits milestone evidence
  submitMilestoneEvidenceAction: (
    pilotId: string, 
    milestoneId: string, 
    evidenceDescription: string, 
    evidenceUrl: string,
    file?: File
  ) => Promise<boolean>;
  
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

const DEMO_STORAGE_KEY = "govinnovate_demo_state_v1";

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Mode Selection: "demo" vs "real"
  const [appMode, setAppModeState] = useState<AppMode>(() => {
    if (typeof window !== "undefined") {
      const savedMode = localStorage.getItem("govinnovate_mode") as AppMode;
      if (savedMode === "real" || savedMode === "demo") return savedMode;
    }
    return "demo";
  });

  const isLiveDbConnected = isSupabaseConfigured();
  const [isLoadingLiveData, setIsLoadingLiveData] = useState<boolean>(false);

  // Common UI State
  const [role, setRoleState] = useState<UserRole>("government");
  const [activeView, setActiveView] = useState<ActiveView>("landing");
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("govinnovate_lang") as SupportedLanguage;
      if (savedLang && ["en", "hi", "ta", "te", "bn", "mr", "gu"].includes(savedLang)) {
        return savedLang;
      }
    }
    return "en";
  });
  const [roleErrorMessage, setRoleErrorMessage] = useState<string | null>(null);
  const [selectedAppIdForScore, setSelectedAppIdForScore] = useState<string>(sampleApplications[0]?.id || "APP-WQ-091");

  // Demo State (isolated from real database)
  const [demoChallenges, setDemoChallenges] = useState<Challenge[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(DEMO_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.challenges && Array.isArray(parsed.challenges) && parsed.challenges.length > 0) {
            return parsed.challenges;
          }
        }
      } catch {}
    }
    return [initialChallenge];
  });

  const [blockchainModalOpen, setBlockchainModalOpen] = useState<boolean>(false);
  const openBlockchainModal = () => setBlockchainModalOpen(true);
  const closeBlockchainModal = () => setBlockchainModalOpen(false);

  const [demoChallenge, setDemoChallenge] = useState<Challenge>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(DEMO_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.challenge) return parsed.challenge;
        }
      } catch {
        // Ignore
      }
    }
    return initialChallenge;
  });

  const [demoStartups, setDemoStartups] = useState<Startup[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(DEMO_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.startups) return parsed.startups;
        }
      } catch {
        // Ignore
      }
    }
    return sampleStartups;
  });

  const [demoApplications, setDemoApplications] = useState<Application[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(DEMO_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.applications) return parsed.applications;
        }
      } catch {
        // Ignore
      }
    }
    return sampleApplications;
  });

  const [demoPilot, setDemoPilot] = useState<Pilot>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(DEMO_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.pilot) return parsed.pilot;
        }
      } catch {
        // Ignore
      }
    }
    return samplePilot;
  });

  const [demoAuditLogs, setDemoAuditLogs] = useState<AuditLog[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(DEMO_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.auditLogs) return parsed.auditLogs;
        }
      } catch {
        // Ignore
      }
    }
    return sampleAuditLogs;
  });

  const [demoNotifications, setDemoNotifications] = useState<NotificationItem[]>(sampleNotifications);
  const [demoUser, setDemoUser] = useState<AuthUser | null>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(DEMO_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.currentUser) return parsed.currentUser;
        }
      } catch {
        // Ignore
      }
    }
    return {
      id: "GOV-DEMO-01",
      name: "Dr. Rajeshwar Sharma, IAS",
      email: "rajeshwar.sharma@jalshakti.gov.in",
      role: "government",
      organization: "Ministry of Jal Shakti",
      designation: "Director (Procurement & Innovation)",
      identifier: "GOV-IAS-2024-991"
    };
  });

  // Real State (synced with Supabase / live API)
  const [realChallenge, setRealChallenge] = useState<Challenge>(initialChallenge);
  const [realStartups, setRealStartups] = useState<Startup[]>([]);
  const [realApplications, setRealApplications] = useState<Application[]>([]);
  const [realPilot, setRealPilot] = useState<Pilot>(samplePilot);
  const [realAuditLogs, setRealAuditLogs] = useState<AuditLog[]>([]);
  const [realNotifications, setRealNotifications] = useState<NotificationItem[]>([]);
  const [realUser, setRealUser] = useState<AuthUser | null>(null);
  const [evidenceRecords, setEvidenceRecords] = useState<EvidenceRecord[]>([]);

  const refreshEvidenceRecords = useCallback(async () => {
    try {
      const res = await fetch("/api/evidence");
      const data = await res.json();
      if (data.success && Array.isArray(data.records)) {
        setEvidenceRecords(data.records);
      }
    } catch (e) {
      console.warn("Could not load evidence records:", e);
    }
  }, []);

  useEffect(() => {
    refreshEvidenceRecords();
  }, [refreshEvidenceRecords]);

  // Modals
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<"signin" | "signup">("signin");
  const [authModalRole, setAuthModalRole] = useState<UserRole>("startup");

  // Active getters depending on mode
  const challenges = appMode === "real" ? [realChallenge] : demoChallenges;
  const challenge = appMode === "real" ? realChallenge : demoChallenge;

  const selectChallengeAction = (challengeId: string) => {
    const found = demoChallenges.find(c => c.id === challengeId);
    if (found) {
      setDemoChallenge(found);
      recalculateMatchesAction(found);
    }
  };
  const setChallenge = appMode === "real" ? setRealChallenge : setDemoChallenge;
  const startups = appMode === "real" ? realStartups : demoStartups;
  const setStartups = appMode === "real" ? setRealStartups : setDemoStartups;
  const applications = appMode === "real" ? realApplications : demoApplications;
  const setApplications = appMode === "real" ? setRealApplications : setDemoApplications;
  const pilot = appMode === "real" ? realPilot : demoPilot;
  const setPilot = appMode === "real" ? setRealPilot : setDemoPilot;
  const auditLogs = appMode === "real" ? realAuditLogs : demoAuditLogs;
  const setAuditLogs = appMode === "real" ? setRealAuditLogs : setDemoAuditLogs;
  const notifications = appMode === "real" ? realNotifications : demoNotifications;
  const setNotifications = appMode === "real" ? setRealNotifications : setDemoNotifications;
  const currentUser = appMode === "real" ? realUser : demoUser;

  // Persist demo state (strictly isolated)
  useEffect(() => {
    try {
      const stateToPersist = {
        challenges: demoChallenges,
        challenge: demoChallenge,
        startups: demoStartups,
        applications: demoApplications,
        pilot: demoPilot,
        auditLogs: demoAuditLogs,
        currentUser: demoUser,
      };
      localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(stateToPersist));
    } catch (e) {
      console.warn("Could not persist demo state:", e);
    }
  }, [demoChallenge, demoStartups, demoApplications, demoPilot, demoAuditLogs, demoUser]);

  const fetchProfileAndSetUser = useCallback(async (_userId: string, token: string) => {
    try {
      const res = await fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.authenticated && data.user) {
        setRealUser(data.user);
        setRoleState(data.user.role);
      }
    } catch (err) {
      console.warn("Error fetching profile:", err);
    }
  }, []);

  // Fetch Live Data for Real Mode
  const refreshLiveData = useCallback(async () => {
    setIsLoadingLiveData(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;
      const headers: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};

      // Challenges
      const resChallenges = await fetch("/api/challenges", { headers });
      const chalData = await resChallenges.json();
      if (chalData.success && Array.isArray(chalData.challenges) && chalData.challenges.length > 0) {
        const topChal = chalData.challenges[0];
        setRealChallenge({
          id: topChal.id,
          title: topChal.title,
          department: topChal.department_name,
          ministry: topChal.ministry,
          category: topChal.category,
          budget: topChal.budget,
          pilotDuration: topChal.pilot_duration,
          deadline: topChal.application_deadline || "2026-11-30",
          status: topChal.status,
          summary: topChal.summary || topChal.title,
          problemStatement: topChal.problem_statement,
          expectedOutcomes: topChal.expected_outcomes || [],
          technicalThresholds: topChal.technical_thresholds || [],
          targetLocations: topChal.target_locations || 5,
          scaleLocations: topChal.scale_locations || 50,
          matchedCount: 0,
          applicationsCount: 0,
        });
      }

      // Applications
      const resApps = await fetch("/api/applications", { headers });
      const appsData = await resApps.json();
      if (appsData.success && Array.isArray(appsData.applications)) {
        setRealApplications(appsData.applications.map((a: {
          id: string;
          challenge_id: string;
          startup_id?: string;
          startup_user_id?: string;
          startup_name: string;
          submitted_at?: string;
          status: Application["status"];
          financial_turnover?: string;
          proposal_summary: string;
          proposed_solution: string;
          proposed_cost: string;
          deployment_time: string;
          trl_level?: number;
          local_content_percentage?: number;
          patents_count?: number;
          evidence_links?: string[];
        }) => ({
          id: a.id,
          challengeId: a.challenge_id,
          startupId: a.startup_id || a.startup_user_id || "ST-01",
          startupName: a.startup_name,
          appliedDate: a.submitted_at?.slice(0, 10) || new Date().toISOString().slice(0, 10),
          status: a.status,
          dpiitVerified: true,
          financialTurnover: a.financial_turnover || "Relaxation under GFR 149/170 applicable",
          proposalSummary: a.proposal_summary,
          solutionOverview: a.proposed_solution,
          proposedCost: a.proposed_cost,
          deploymentTime: a.deployment_time,
          trlLevel: a.trl_level || 7,
          localContentPercentage: a.local_content_percentage || 65,
          patentsCount: a.patents_count || 1,
          evidenceLinks: a.evidence_links || [],
        })));
      }
    } catch (err) {
      console.error("Failed to refresh live data:", err);
    } finally {
      setIsLoadingLiveData(false);
    }
  }, []);

  // Mode Switcher
  const setAppMode = (mode: AppMode) => {
    setAppModeState(mode);
    try {
      localStorage.setItem("govinnovate_mode", mode);
    } catch {
      // Ignore
    }
    if (mode === "real") {
      refreshLiveData();
    }
  };

  // Setup Supabase Auth Session in Real Mode
  useEffect(() => {
    if (!isLiveDbConnected) return;

    // Check active session on load
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchProfileAndSetUser(session.user.id, session.access_token);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchProfileAndSetUser(session.user.id, session.access_token);
      } else {
        setRealUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [isLiveDbConnected, fetchProfileAndSetUser]);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (appMode === "demo") {
      if (newRole === "government") {
        setDemoUser({
          id: "GOV-DEMO-01",
          name: "Dr. Rajeshwar Sharma, IAS",
          email: "rajeshwar.sharma@jalshakti.gov.in",
          role: "government",
          organization: "Ministry of Jal Shakti",
          designation: "Director (Procurement & Innovation)",
          identifier: "GOV-IAS-2024-991"
        });
      } else if (newRole === "startup") {
        setDemoUser({
          id: "ST-AQUASENSE",
          name: "Dr. Aranya Sen",
          email: "aranya@aquasense-ai.in",
          role: "startup",
          organization: "AquaSense AI Innovations Pvt Ltd",
          designation: "Founder & CEO",
          identifier: "DPIIT-REC-89241-DL"
        });
      } else if (newRole === "evaluator") {
        setDemoUser({
          id: "EVAL-DEMO-01",
          name: "Prof. Vinod Nair",
          email: "vinod.nair@iitd.ac.in",
          role: "evaluator",
          organization: "IIT Delhi / Technical Evaluation Board",
          designation: "Chairman, Expert Committee",
          identifier: "EVAL-IITD-770"
        });
      } else {
        setDemoUser({
          id: "ADMIN-DEMO-01",
          name: "Administrator (GovInnovate)",
          email: "admin@govinnovate.gov.in",
          role: "admin",
          organization: "Public Innovation Oversight Bureau",
          designation: "Chief Administrator",
        });
      }
    }
  };

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("govinnovate_lang", lang);
    } catch {
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
    if (appMode === "demo") {
      if (!allowedRoles.includes(role)) {
        const nextRole = allowedRoles[0];
        setRoleState(nextRole);
      }
      setRoleErrorMessage(null);
      return true;
    }

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

  // Cryptographically Chained Audit Log Generation
  const addAuditLog = useCallback(async (
    action: string, 
    details: string, 
    badge: AuditLog["badge"], 
    logRole?: UserRole
  ) => {
    const actorName = currentUser ? `${currentUser.name} (${currentUser.organization})` : "System Vigilance Desk";
    const timestamp = new Date().toISOString().replace("T", " ").slice(0, 19);
    
    setAuditLogs(prev => {
      const prevHash = prev[0]?.blockHash || "0000000000000000000000000000000000000000000000000000000000000000";
      const blockHash = "sh" + Math.random().toString(16).slice(2) + prevHash.slice(0, 32);

      const newLog: AuditLog = {
        id: `LOG-${Date.now().toString().slice(-5)}`,
        timestamp,
        user: actorName,
        role: logRole || role,
        action,
        details,
        badge,
        prevHash,
        blockHash
      };

      computeAuditBlockHash(prevHash, timestamp, actorName, action, details).then(realHash => {
        setAuditLogs(current => current.map(l => l.id === newLog.id ? { ...l, blockHash: realHash } : l));
      });

      return [newLog, ...prev];
    });
  }, [currentUser, role, setAuditLogs]);

  // Demo Login
  const loginUser = (user: AuthUser) => {
    if (appMode === "demo") {
      setDemoUser(user);
      setRoleState(user.role);
      setAuthModalOpen(false);
      addAuditLog("USER_AUTHENTICATED", `Demo User ${user.name} logged into ${user.role} workspace.`, "Security", user.role);
    } else {
      setRealUser(user);
      setRoleState(user.role);
      setAuthModalOpen(false);
    }

    if (user.role === "government") {
      setActiveView("gov_dashboard");
    } else if (user.role === "startup") {
      setActiveView("startup_dashboard");
    } else {
      setActiveView("evaluator_dashboard");
    }
  };

  // Real Supabase Authentication
  const signInReal = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    if (!isLiveDbConnected) {
      return { success: false, error: "Supabase credentials are not configured. Use Demo Mode or configure .env.local" };
    }
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error || !data.user) {
        return { success: false, error: error?.message || "Invalid email or password." };
      }
      await fetchProfileAndSetUser(data.user.id, data.session.access_token);
      setAuthModalOpen(false);
      return { success: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Login failed due to unexpected error.";
      return { success: false, error: msg };
    }
  };

  const signUpReal = async (data: {
    email: string;
    password: string;
    role: UserRole;
    fullName: string;
    organizationName: string;
    designation?: string;
    identifier?: string;
    sector?: string;
    city?: string;
  }): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const resData = await res.json();
      if (!res.ok) {
        return { success: false, error: resData.error || "Registration failed." };
      }
      setAuthModalOpen(false);
      if (resData.user) {
        setRealUser(resData.user);
        setRoleState(resData.user.role);
      }
      return { success: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Registration request failed.";
      return { success: false, error: msg };
    }
  };

  const resetPasswordReal = async (email: string): Promise<{ success: boolean; message?: string; error?: string }> => {
    if (!isLiveDbConnected) {
      return { success: false, error: "Database not configured. Cannot dispatch live password reset emails." };
    }
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin,
      });
      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true, message: "Password reset link has been dispatched to your email." };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Password reset request failed.";
      return { success: false, error: msg };
    }
  };

  const logoutUser = async () => {
    if (appMode === "real" && isLiveDbConnected) {
      await supabase.auth.signOut();
      setRealUser(null);
    } else {
      setDemoUser(null);
    }
    setActiveView("landing");
  };

  // Recalculates match score for all startups against active challenge
  const recalculateMatchesAction = useCallback((customChallenge?: Challenge) => {
    const targetChallenge = customChallenge || challenge;
    setStartups(prev => prev.map(s => {
      const match = calculateStartupMatch(s, targetChallenge);
      return {
        ...s,
        matchScore: match.matchScore,
        matchReasons: match.matchReasons,
        matchBreakdown: match.matchBreakdown,
        riskAnalysis: match.riskAnalysis
      };
    }));
  }, [challenge]);

  // Step 1: Create Challenge
  const createChallengeAction = async (data: Partial<Challenge>) => {
    if (!checkRoleAccess(["government", "admin"], "publish a procurement challenge")) return;

    const newId = data.id || `CH-${new Date().getFullYear()}-0${Math.floor(Math.random() * 90 + 10)}`;
    const randomTx = `0x${Math.random().toString(16).slice(2, 10)}${Math.random().toString(16).slice(2, 10)}${Math.random().toString(16).slice(2, 10)}`;
    const randomBlock = 10842 + Math.floor(Math.random() * 20);

    const updated: Challenge = {
      ...demoChallenge,
      ...data,
      id: newId,
      title: data.title || "Untitled Civic Challenge",
      department: data.department || "Government Department",
      ministry: data.ministry || "Ministry of Public Works",
      category: data.category || "Public Sector Innovation",
      budget: data.budget || "₹25,00,000",
      pilotDuration: data.pilotDuration || "90 Days",
      deadline: "Day 45",
      status: "Open",
      summary: data.summary || data.problemStatement || "",
      problemStatement: data.problemStatement || "",
      expectedOutcomes: data.expectedOutcomes && data.expectedOutcomes.length > 0 ? data.expectedOutcomes : [
        "Sub-5 minute automated edge alert latency",
        "98.0%+ sensor and hardware operational uptime",
        "Under 2% false-positive anomaly rate"
      ],
      technicalThresholds: data.technicalThresholds && data.technicalThresholds.length > 0 ? data.technicalThresholds : [
        "Minimum TRL 7 (Operational demonstration)",
        "Domestic Local Content >= 50% (Make in India Class-1)",
        "DPIIT startup recognition with relaxation under GFR 170"
      ],
      targetLocations: data.targetLocations || 5,
      scaleLocations: data.scaleLocations || 50,
      applicationsCount: 0,
      matchedCount: 3,
      blockchainTx: randomTx,
      blockNumber: randomBlock,
      createdAt: new Date().toISOString()
    };

    setDemoChallenges(prev => [updated, ...prev.filter(c => c.id !== updated.id)]);
    setDemoChallenge(updated);
    recalculateMatchesAction(updated);

    addAuditLog(
      "CHALLENGE_PUBLISHED", 
      `Published new procurement challenge: "${updated.title}" (ID: ${updated.id}) by ${updated.department}. Budget: ${updated.budget}. Blockchain Anchor: TX ${updated.blockchainTx} (Block #${updated.blockNumber}).`, 
      "Procurement", 
      "government"
    );

    // Switch to Startup Dashboard with startup role so the user immediately sees the challenge!
    setRoleState("startup");
    setActiveView("startup_dashboard");
  };

  // Step 2: Register Startup (Demo Mode fallback)
  const registerStartupAction = async (data: {
    name: string;
    dpiitNumber: string;
    founderName: string;
    email: string;
    sector: string;
    city: string;
  }) => {
    const newStartupId = `ST-${Date.now().toString().slice(-4)}`;
    const baseStartup: Startup = {
      id: newStartupId,
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
      matchScore: 85,
      matchReasons: [],
      riskAnalysis: {
        level: "Low",
        factors: []
      },
      tamperStatus: "VERIFIED",
      verificationStage: "Document Uploaded"
    };

    // Calculate dynamic match
    const match = calculateStartupMatch(baseStartup, challenge);
    baseStartup.matchScore = match.matchScore;
    baseStartup.matchReasons = match.matchReasons;
    baseStartup.matchBreakdown = match.matchBreakdown;
    baseStartup.riskAnalysis = match.riskAnalysis;

    // Calculate canonical SHA-256 hash
    const hash = await computeStartupHash(baseStartup);
    baseStartup.canonicalHash = hash;
    baseStartup.currentHash = hash;

    setDemoStartups(prev => [baseStartup, ...prev]);

    const newUser: AuthUser = {
      id: baseStartup.id,
      name: data.founderName,
      email: data.email,
      role: "startup",
      organization: data.name,
      identifier: data.dpiitNumber,
      designation: "Founder / Managing Director"
    };
    setDemoUser(newUser);
    setRoleState("startup");
    setAuthModalOpen(false);

    addAuditLog(
      "STARTUP_REGISTERED",
      `New Startup Registered: "${data.name}" (DPIIT: ${data.dpiitNumber}, SHA-256 Genesis: ${hash.slice(0, 16)}...).`,
      "Security",
      "startup"
    );

    setNotifications(prev => [
      {
        id: `NOTIF-${Date.now()}`,
        title: "Startup Registered & Hashed",
        message: `Welcome ${data.name}! Your profile SHA-256 integrity hash is recorded in vigilance ledger.`,
        time: "Just now",
        read: false,
        type: "success"
      },
      ...prev
    ]);

    setActiveView("startup_dashboard");
  };

  // SHA-256 Integrity Verification: Detects if startup records were altered
  const verifyStartupIntegrityAction = async (startupId: string): Promise<boolean> => {
    const startup = startups.find(s => s.id === startupId);
    if (!startup) return false;

    const result = await verifyStartupRecordIntegrity(startup, startup.canonicalHash);
    
    setStartups(prev => prev.map(s => {
      if (s.id === startupId) {
        return {
          ...s,
          currentHash: result.computedHash,
          tamperStatus: result.isValid ? "VERIFIED" : "FLAGGED_FOR_REVIEW",
          tamperAuditNote: result.isValid 
            ? `Cryptographically Verified: Current hash matches genesis signature (${result.computedHash.slice(0, 16)}...).`
            : `SECURITY ALERT: Divergence detected! Current SHA-256 (${result.computedHash.slice(0, 12)}...) differs from recorded genesis hash (${result.expectedHash.slice(0, 12)}...). Core metrics modified outside official audit.`
        };
      }
      return s;
    }));

    setApplications(prev => prev.map(a => {
      if (a.startupId === startupId) {
        return {
          ...a,
          tamperStatus: result.isValid ? "VERIFIED" : "FLAGGED_FOR_REVIEW"
        };
      }
      return a;
    }));

    if (!result.isValid) {
      addAuditLog(
        "TAMPER_ALERT_FLAGGED",
        `Vigilance Flag: Startup "${startup.name}" (${startupId}) record divergence detected. Expected: ${result.expectedHash.slice(0, 16)}..., Computed: ${result.computedHash.slice(0, 16)}.... Flagged for review.`,
        "Security",
        "government"
      );
    } else {
      addAuditLog(
        "TAMPER_CHECK_PASSED",
        `Vigilance Check Passed: Startup "${startup.name}" record hash integrity verified against genesis ledger (${result.computedHash.slice(0, 16)}...). Zero unauthorized alterations.`,
        "Security",
        "government"
      );
    }

    return result.isValid;
  };

  const flagStartupForReviewAction = (startupId: string, reason: string) => {
    setStartups(prev => prev.map(s => {
      if (s.id === startupId) {
        return {
          ...s,
          tamperStatus: "FLAGGED_FOR_REVIEW",
          tamperAuditNote: `Vigilance Review Flagged by Officer: ${reason}`
        };
      }
      return s;
    }));
    setApplications(prev => prev.map(a => {
      if (a.startupId === startupId) {
        return { ...a, tamperStatus: "FLAGGED_FOR_REVIEW" };
      }
      return a;
    }));
    addAuditLog(
      "STARTUP_FLAGGED_FOR_REVIEW",
      `Startup ${startupId} manually flagged for scrutiny: "${reason}".`,
      "Security",
      "government"
    );
  };

  const clearTamperFlagAction = async (startupId: string) => {
    const startup = startups.find(s => s.id === startupId);
    if (!startup) return;
    const newHash = await computeStartupHash(startup);
    setStartups(prev => prev.map(s => {
      if (s.id === startupId) {
        return {
          ...s,
          canonicalHash: newHash,
          currentHash: newHash,
          tamperStatus: "VERIFIED",
          tamperAuditNote: `Re-anchored by Officer: Integrity re-verified and new SHA-256 genesis hash registered (${newHash.slice(0, 16)}...).`
        };
      }
      return s;
    }));
    setApplications(prev => prev.map(a => {
      if (a.startupId === startupId) {
        return { ...a, tamperStatus: "VERIFIED" };
      }
      return a;
    }));
    addAuditLog(
      "TAMPER_FLAG_CLEARED",
      `Vigilance review cleared for startup ${startupId}. Canonical SHA-256 signature re-anchored to ${newHash.slice(0, 16)}....`,
      "Security",
      "government"
    );
  };

  const uploadAndParseDpiitAction = async (startupId: string, file: File): Promise<boolean> => {
    const startup = startups.find(s => s.id === startupId);
    const claimedName = startup ? startup.name : "";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("claimedEntityName", claimedName);

    try {
      const res = await fetch("/api/documents/parse", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      if (!data.success) {
        alert(data.error || "Document parse failed");
        return false;
      }

      const docRecord: DocumentVerificationRecord = data.record;
      const isMismatch = docRecord.entityMismatchFlag;

      setStartups(prev => prev.map(s => {
        if (s.id === startupId) {
          const updatedStartup = {
            ...s,
            isDpiitVerified: !isMismatch && docRecord.preliminaryStatus === "Passed",
            dpiitNumber: docRecord.extractedDpiitNumber || s.dpiitNumber,
            documentRecord: docRecord,
            verificationStage: isMismatch 
              ? "Preliminary Check Failed - Mismatch Flagged" 
              : "Preliminary Checks Passed - Official Review Pending",
            tamperStatus: isMismatch ? ("FLAGGED_FOR_REVIEW" as const) : s.tamperStatus,
            tamperAuditNote: isMismatch 
              ? `DPIIT Mismatch: Document entity '${docRecord.extractedEntityName}' differs from profile '${s.name}'.` 
              : s.tamperAuditNote
          };
          computeStartupHash(updatedStartup).then(newHash => {
            setStartups(inner => inner.map(x => x.id === startupId ? { ...x, currentHash: newHash, canonicalHash: !isMismatch ? newHash : x.canonicalHash } : x));
          });
          return updatedStartup;
        }
        return s;
      }));

      setApplications(prev => prev.map(a => {
        if (a.startupId === startupId) {
          return {
            ...a,
            documentRecord: docRecord,
            dpiitVerified: !isMismatch && docRecord.preliminaryStatus === "Passed",
            tamperStatus: isMismatch ? "FLAGGED_FOR_REVIEW" : a.tamperStatus
          };
        }
        return a;
      }));

      addAuditLog(
        isMismatch ? "DPIIT_OCR_MISMATCH" : "DPIIT_DOCUMENT_PARSED",
        isMismatch
          ? `OCR parsed certificate for ${startupId} (${docRecord.extractedDpiitNumber}), but legal entity mismatch detected (${docRecord.nameSimilarityScore}% match). Flagged for review.`
          : `DPIIT Recognition Certificate parsed for ${startupId}: Certificate ${docRecord.extractedDpiitNumber}, SHA-256: ${docRecord.fileHash.slice(0, 16)}.... Preliminary validation Passed. Official human sign-off pending.`,
        "Security",
        "startup"
      );

      return true;
    } catch (err) {
      console.error("Upload error:", err);
      return false;
    }
  };

  const pullDigiLockerAction = async (startupId: string, dpiitNumber: string): Promise<boolean> => {
    const startup = startups.find(s => s.id === startupId);
    const claimedName = startup ? startup.name : "";

    try {
      const res = await fetch("/api/digilocker/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dpiitNumber, claimedEntityName: claimedName })
      });
      const data = await res.json();
      if (!data.success) {
        alert(data.error || "DigiLocker verification failed");
        return false;
      }

      const docRecord: DocumentVerificationRecord = data.record;

      setStartups(prev => prev.map(s => {
        if (s.id === startupId) {
          const updated = {
            ...s,
            isDpiitVerified: true,
            dpiitNumber: docRecord.extractedDpiitNumber || s.dpiitNumber,
            documentRecord: docRecord,
            verificationStage: "Preliminary Checks Passed - Official Review Pending"
          };
          computeStartupHash(updated).then(nh => {
            setStartups(curr => curr.map(item => item.id === startupId ? { ...item, canonicalHash: nh, currentHash: nh } : item));
          });
          return updated;
        }
        return s;
      }));

      setApplications(prev => prev.map(a => {
        if (a.startupId === startupId) {
          return {
            ...a,
            documentRecord: docRecord,
            dpiitVerified: true
          };
        }
        return a;
      }));

      addAuditLog(
        "DIGILOCKER_URI_PULL_SUCCESS",
        `DigiLocker Sandbox URI retrieved for ${startupId}: URI ${data.digiLockerUri}, Doc SHA-256: ${docRecord.fileHash.slice(0, 16)}.... Preliminary verification passed.`,
        "Security",
        "startup"
      );

      return true;
    } catch (err) {
      console.error("DigiLocker error:", err);
      return false;
    }
  };

  const officialReviewDpiitAction = (startupId: string, approved: boolean, notes?: string) => {
    if (!checkRoleAccess(["government", "evaluator", "admin"], "officially certify documents")) return;

    const reviewerName = currentUser ? `${currentUser.name} (${currentUser.organization})` : "Government Verification Officer";
    const verifiedDate = new Date().toISOString().replace("T", " ").slice(0, 16);

    setStartups(prev => prev.map(s => {
      if (s.id === startupId && s.documentRecord) {
        const updatedDoc: DocumentVerificationRecord = {
          ...s.documentRecord,
          officialStatus: approved ? "Officially Verified" : "Rejected",
          verifiedBy: reviewerName,
          verifiedAt: verifiedDate,
          rejectionReason: approved ? undefined : (notes || "Document verification rejected by government evaluator.")
        };
        const updatedStartup = {
          ...s,
          isDpiitVerified: approved,
          documentRecord: updatedDoc,
          verificationStage: approved ? "Officially Verified by Government Officer" : "Verification Rejected",
          tamperStatus: approved ? ("VERIFIED" as const) : s.tamperStatus
        };
        computeStartupHash(updatedStartup).then(nh => {
          setStartups(curr => curr.map(item => item.id === startupId ? { ...item, canonicalHash: nh, currentHash: nh } : item));
        });
        return updatedStartup;
      }
      return s;
    }));

    setApplications(prev => prev.map(a => {
      if (a.startupId === startupId && a.documentRecord) {
        return {
          ...a,
          dpiitVerified: approved,
          documentRecord: {
            ...a.documentRecord,
            officialStatus: approved ? "Officially Verified" : "Rejected",
            verifiedBy: reviewerName,
            verifiedAt: verifiedDate,
            rejectionReason: approved ? undefined : (notes || "Rejected by government evaluator.")
          }
        };
      }
      return a;
    }));

    if (approved) {
      addAuditLog(
        "OFFICIAL_DPIIT_VERIFIED",
        `Official verification sign-off granted by ${reviewerName} for startup ${startupId}. GFR startup relaxations sanctioned.`,
        "Security",
        "government"
      );
    } else {
      addAuditLog(
        "OFFICIAL_DPIIT_REJECTED",
        `DPIIT verification rejected by ${reviewerName} for startup ${startupId}. Reason: "${notes || "Incomplete documentation"}".`,
        "Security",
        "government"
      );
    }
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
    setDemoUser(newUser);
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

  const updateStartupProfileAction = (startupId: string, data: Partial<Startup>) => {
    if (!checkRoleAccess(["startup"], "update startup profile")) return;
    if (appMode === "real") {
      setRealStartups(prev => prev.map(s => s.id === startupId ? { ...s, ...data } : s));
    } else {
      setDemoStartups(prev => prev.map(s => s.id === startupId ? { ...s, ...data } : s));
    }
    addAuditLog("STARTUP_PROFILE_UPDATED", `Startup profile updated: ${data.name || startupId}.`, "Security", "startup");
  };

  // Step 2 (Cont.): Apply to Challenge
  const applyToChallengeAction = async (startupId: string, proposalData?: Partial<Application>) => {
    if (!checkRoleAccess(["startup"], "apply to a procurement challenge")) return;

    const startup = demoStartups.find(s => s.id === startupId) || demoStartups[0];
    const newAppId = `APP-${new Date().getFullYear()}-${Math.floor(Math.random() * 900 + 100)}`;
    const randomTx = `0x${Math.random().toString(16).slice(2, 10)}${Math.random().toString(16).slice(2, 10)}${Math.random().toString(16).slice(2, 10)}`;
    const randomBlock = 10844 + Math.floor(Math.random() * 15);

    const newApp: Application = {
      id: newAppId,
      challengeId: demoChallenge.id,
      startupId: startup.id,
      startupName: startup.name,
      appliedDate: new Date().toISOString().slice(0, 10),
      status: "Submitted",
      dpiitVerified: startup.isDpiitVerified,
      financialTurnover: "Eligible for GFR Rule 170(i) turnover & experience relaxation",
      solutionOverview: proposalData?.solutionOverview || startup.products[0]?.description || "AI & IoT edge sensing deployment tailored for public challenge requirements.",
      proposedCost: proposalData?.proposedCost || demoChallenge.budget || "₹24,50,000",
      deploymentTime: proposalData?.deploymentTime || "14 Calendar Days",
      proposalSummary: proposalData?.proposalSummary || "Turnkey sensing deployment with zero civil modifications, NABL-traceable calibration, and real-time dashboard API telemetry.",
      trlLevel: startup.trlLevel || 7,
      localContentPercentage: startup.localContentPercentage || 65,
      patentsCount: startup.patents || 1,
      evidenceLinks: proposalData?.evidenceLinks || ["https://example.com/docs/technical-spec.pdf"],
      documentRecord: startup.documentRecord,
      tamperStatus: startup.tamperStatus || "VERIFIED",
      blockchainTx: randomTx,
      blockNumber: randomBlock
    };

    setDemoApplications(prev => {
      const filtered = prev.filter(a => !(a.startupId === startup.id && a.challengeId === demoChallenge.id));
      return [newApp, ...filtered];
    });

    setDemoChallenge(prev => ({
      ...prev,
      applicationsCount: (prev.applicationsCount || 0) + 1,
      status: "Reviewing"
    }));

    setDemoChallenges(prev => prev.map(c => c.id === demoChallenge.id ? { ...c, applicationsCount: (c.applicationsCount || 0) + 1, status: "Reviewing" } : c));

    addAuditLog(
      "APPLICATION_SUBMITTED",
      `Application ${newAppId} submitted by ${startup.name} for challenge "${demoChallenge.title}". Proposed Cost: ${newApp.proposedCost}. Blockchain Anchor: TX ${newApp.blockchainTx} (Block #${newApp.blockNumber}).`,
      "Procurement",
      "startup"
    );

    setActiveView("startup_dashboard");
  };

  // Step 3: Verify & Shortlist (Gov only)
  const verifyEligibilityAction = async (appId: string) => {
    if (!checkRoleAccess(["government", "admin"], "verify startup eligibility")) return;

    if (appMode === "real") {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const token = session?.access_token;
        await fetch(`/api/applications/${appId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {})
          },
          body: JSON.stringify({ status: "Eligibility Verified" })
        });
        await refreshLiveData();
      } catch (err) {
        console.error("Error updating eligibility:", err);
      }
    } else {
      setDemoApplications(prev => prev.map(a => a.id === appId ? { ...a, status: "Eligibility Verified" } : a));
    }

    addAuditLog(
      "DPIIT_ELIGIBILITY_VERIFIED",
      `DPIIT registration and tender relaxation eligibility verified for application ${appId}.`,
      "Security",
      "government"
    );
  };

  const shortlistApplicationAction = async (appId: string) => {
    if (!checkRoleAccess(["government", "admin"], "shortlist an application")) return;

    if (appMode === "real") {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const token = session?.access_token;
        await fetch(`/api/applications/${appId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {})
          },
          body: JSON.stringify({ status: "Shortlisted" })
        });
        await refreshLiveData();
      } catch (err) {
        console.error("Error shortlisting application:", err);
      }
    } else {
      setDemoApplications(prev => prev.map(a => a.id === appId ? { ...a, status: "Shortlisted" } : a));
      setDemoChallenge(prev => ({ ...prev, status: "Shortlisted" }));
    }

    addAuditLog(
      "STARTUP_SHORTLISTED",
      `Application ${appId} formally shortlisted by Procurement Committee following multi-attribute review.`,
      "Procurement",
      "government"
    );
  };

  // Step 4: 5-Pillar Structured Evaluation (Evaluator only)
  const evaluateApplicationAction = async (appId: string, score: EvaluatorScore) => {
    if (!checkRoleAccess(["evaluator", "admin"], "score and evaluate an application")) return;

    const randomTx = `0x${Math.random().toString(16).slice(2, 10)}${Math.random().toString(16).slice(2, 10)}${Math.random().toString(16).slice(2, 10)}`;
    const randomBlock = 10846 + Math.floor(Math.random() * 15);

    const scoredWithBlockchain: EvaluatorScore = {
      ...score,
      blockchainTx: randomTx,
      blockNumber: randomBlock
    };

    setDemoApplications(prev => prev.map(a => {
      if (a.id === appId) {
        return {
          ...a,
          status: "Evaluated",
          evaluatorScore: scoredWithBlockchain
        };
      }
      return a;
    }));

    const targetApp = demoApplications.find(a => a.id === appId);
    const appName = targetApp?.startupName || appId;

    addAuditLog(
      "APPLICATION_SCORED",
      `Technical Committee awarded ${score.total}/100 to ${appName} across 5 pillars (Inn: ${score.innovation}, Feas: ${score.feasibility}, Imp: ${score.impact}, Scal: ${score.scalability}, Viab: ${score.viability}). Evaluator: ${score.evaluatorName}. Blockchain Proof: TX ${scoredWithBlockchain.blockchainTx} (Block #${scoredWithBlockchain.blockNumber}).`,
      "Evaluation",
      "evaluator"
    );

    setActiveView("evaluator_dashboard");
  };

  // Step 5: Commission Pilot (Gov only)
  const createPilotAction = (customPilot?: Partial<Pilot>) => {
    if (!checkRoleAccess(["government", "admin"], "commission a pilot")) return;

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

    addAuditLog(
      "PILOT_COMMISSIONED",
      `Pilot sanction order ${newPilot.id} issued for ${newPilot.locationsCount} locations with milestone disbursements.`,
      "Procurement",
      "government"
    );

    setActiveView("pilot_management");
  };

  // Step 6: Startup submits milestone evidence
  const submitMilestoneEvidenceAction = async (
    pilotId: string, 
    milestoneId: string, 
    evidenceDescription: string, 
    evidenceUrl: string,
    file?: File
  ): Promise<boolean> => {
    if (!checkRoleAccess(["startup"], "submit milestone evidence")) return false;

    let attachedEvidenceId = `EVID-${milestoneId}-${Date.now().toString().slice(-4)}`;
    let attachedHash = "";
    let attachedFilename = file ? file.name : `${milestoneId}_Deliverable_Report.pdf`;
    let attachedVersion = 1;
    let blockchainTx = "";
    let blockchainStatus: any = "Pending Registration";

    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("evidenceId", attachedEvidenceId);
        formData.append("pilotId", pilotId);
        formData.append("milestoneId", milestoneId);
        formData.append("category", "Milestone Deliverable");
        formData.append("uploadedBy", currentUser?.name || "AquaSense AI Innovations");
        formData.append("uploadedByRole", "startup");

        const res = await fetch("/api/evidence/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (data.success && data.evidenceRecord) {
          attachedEvidenceId = data.evidenceRecord.id;
          attachedHash = data.evidenceRecord.fileHash;
          attachedFilename = data.evidenceRecord.originalFilename;
          attachedVersion = data.evidenceRecord.version;
          blockchainTx = data.evidenceRecord.blockchainTxHash || "";
          blockchainStatus = data.evidenceRecord.blockchainStatus || "Registered On Blockchain";
          refreshEvidenceRecords();
        }
      } catch (uploadErr) {
        console.warn("Evidence upload failed, proceeding with fallback:", uploadErr);
      }
    } else {
      // Create synthetic byte record if only URL/description given
      try {
        const textContent = `GovInnovate Milestone Deliverable Archive\nMilestone: ${milestoneId}\nPilot: ${pilotId}\nSummary: ${evidenceDescription}\nReference URL: ${evidenceUrl}\nTimestamp: ${new Date().toISOString()}`;
        const blob = new Blob([textContent], { type: "text/plain" });
        const synFile = new File([blob], `${milestoneId}_Report_Enclosure.txt`, { type: "text/plain" });
        const formData = new FormData();
        formData.append("file", synFile);
        formData.append("evidenceId", attachedEvidenceId);
        formData.append("pilotId", pilotId);
        formData.append("milestoneId", milestoneId);
        formData.append("category", "Milestone Deliverable");
        formData.append("uploadedBy", currentUser?.name || "AquaSense AI Innovations");
        formData.append("uploadedByRole", "startup");

        const res = await fetch("/api/evidence/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (data.success && data.evidenceRecord) {
          attachedEvidenceId = data.evidenceRecord.id;
          attachedHash = data.evidenceRecord.fileHash;
          attachedFilename = data.evidenceRecord.originalFilename;
          attachedVersion = data.evidenceRecord.version;
          blockchainTx = data.evidenceRecord.blockchainTxHash || "";
          blockchainStatus = data.evidenceRecord.blockchainStatus || "Registered On Blockchain";
          refreshEvidenceRecords();
        }
      } catch (err) {
        console.warn("Synthetic evidence upload notice:", err);
      }
    }

    setPilot(prev => {
      const updatedMilestones = prev.milestones.map(m => {
        if (m.id === milestoneId) {
          return {
            ...m,
            status: "Submitted for Review" as const,
            evidenceDescription,
            evidenceUrl: evidenceUrl || attachedFilename,
            evidenceId: attachedEvidenceId,
            evidenceHash: attachedHash,
            evidenceFilename: attachedFilename,
            evidenceVersion: attachedVersion,
            blockchainTxHash: blockchainTx,
            blockchainStatus: blockchainStatus,
            submittedAt: new Date().toISOString().slice(0, 16).replace("T", " "),
          };
        }
        return m;
      });
      return { ...prev, milestones: updatedMilestones };
    });

    addAuditLog(
      "MILESTONE_EVIDENCE_SUBMITTED",
      `Milestone evidence submitted for ${milestoneId} [Evidence ID: ${attachedEvidenceId}, SHA-256: ${attachedHash ? attachedHash.slice(0, 16) + "..." : "Recorded"}]. Committed to verification ledger.`,
      "Milestone",
      "startup"
    );

    return true;
  };

  const verifyEvidenceAction = async (
    evidenceId: string,
    file?: File,
    fileHash?: string
  ): Promise<EvidenceVerificationResponse | null> => {
    try {
      let body: any;
      let headers: any = {};
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("evidenceId", evidenceId);
        body = formData;
      } else {
        headers["Content-Type"] = "application/json";
        body = JSON.stringify({ evidenceId, fileHash });
      }

      const res = await fetch("/api/evidence/verify", {
        method: "POST",
        headers,
        body,
      });
      const data: EvidenceVerificationResponse = await res.json();
      return data;
    } catch (err) {
      console.error("verifyEvidenceAction error:", err);
      return null;
    }
  };

  const getEvidenceRecordAction = async (evidenceId: string): Promise<EvidenceRecord | null> => {
    try {
      const res = await fetch(`/api/evidence/${encodeURIComponent(evidenceId)}`);
      const data = await res.json();
      if (data.success && data.evidenceRecord) {
        return data.evidenceRecord;
      }
    } catch (err) {
      console.warn("getEvidenceRecordAction error:", err);
    }
    return null;
  };

  // Step 7: Evaluator / Govt reviews milestone evidence
  const reviewMilestoneAction = (
    pilotId: string, 
    milestoneId: string, 
    approved: boolean, 
    notes: string
  ) => {
    if (!checkRoleAccess(["government", "evaluator", "admin"], "review milestone evidence")) return;

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
    if (!checkRoleAccess(["government", "evaluator", "admin"], "update pilot KPI telemetry")) return;

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
    if (!checkRoleAccess(["government", "admin"], "record final procurement or scale decision")) return;

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
    if (!checkRoleAccess(["government", "evaluator", "admin"], "validate pilot outcomes")) return;
    setChallenge(prev => ({ ...prev, status: "Validation Done" }));
    setPilot(prev => ({ ...prev, phase: "Validation Completed" }));
    addAuditLog("PILOT_VALIDATED", `Independent lab validation affirm 96.4/100 pilot KPI correlation. Final decision unlocked.`, "Evaluation", role);
    setActiveView("procurement_recommendation");
  };

  const approveProcurementAction = () => {
    if (!checkRoleAccess(["government", "admin"], "advance to scale-up review")) return;
    setChallenge(prev => ({ ...prev, status: "Reviewing" }));
    addAuditLog("PROCUREMENT_REVIEW_OPENED", `Scale-up review session opened for Competent Authority decision.`, "Procurement", "government");
    setActiveView("scale_up");
  };

  const executeScaleUpAction = () => {
    if (!checkRoleAccess(["government", "admin"], "sanction scale-up")) return;
    setChallenge(prev => ({ ...prev, status: "Scale-Up Approved" }));
    addAuditLog("SCALE_UP_ROLLOUT_SANCTIONED", `Scale-up expansion sanctioned across 50 municipal water zones (Simulated Sanction Note).`, "Procurement", "government");
  };

  const resetDemoAction = () => {
    try {
      localStorage.removeItem(DEMO_STORAGE_KEY);
    } catch {
      // Ignore
    }
    setDemoChallenge(initialChallenge);
    setDemoStartups(sampleStartups);
    setDemoApplications(sampleApplications);
    setDemoPilot(samplePilot);
    setDemoAuditLogs(sampleAuditLogs);
    setDemoNotifications(sampleNotifications);
    setSelectedAppIdForScore(sampleApplications[0]?.id || "APP-WQ-091");
    setRoleState("government");
    setDemoUser({
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
    if (appMode === "real") {
      setRealNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    } else {
      setDemoNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    }
  };

  return (
    <AppContext.Provider value={{
      appMode,
      challenges,
      selectChallengeAction,
      blockchainModalOpen,
      openBlockchainModal,
      closeBlockchainModal,
      setAppMode,
      isLiveDbConnected,
      isLoadingLiveData,
      refreshLiveData,
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
      evidenceRecords,
      refreshEvidenceRecords,
      verifyEvidenceAction,
      getEvidenceRecordAction,
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
      signInReal,
      signUpReal,
      resetPasswordReal,
      createChallengeAction,
      recalculateMatchesAction,
      registerStartupAction,
      registerGovOfficerAction,
      updateStartupProfileAction,
      applyToChallengeAction,
      verifyEligibilityAction,
      shortlistApplicationAction,
      uploadAndParseDpiitAction,
      pullDigiLockerAction,
      officialReviewDpiitAction,
      verifyStartupIntegrityAction,
      flagStartupForReviewAction,
      clearTamperFlagAction,
      evaluateApplicationAction,
      selectedAppIdForScore,
      setSelectedAppIdForScore,
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
