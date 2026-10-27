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
  DocumentVerificationRecord
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
  
  // Step 1: Challenge creation & dynamic matching
  createChallengeAction: (data: Partial<Challenge>) => void;
  recalculateMatchesAction: (customChallenge?: Challenge) => void;
  
  // Step 2: Startup onboarding, profile, and application
  registerStartupAction: (data: { name: string; dpiitNumber: string; founderName: string; email: string; sector: string; city: string }) => Promise<void>;
  registerGovOfficerAction: (data: { name: string; designation: string; ministry: string; email: string; officerId: string }) => void;
  updateStartupProfileAction: (startupId: string, data: Partial<Startup>) => Promise<void>;
  applyToChallengeAction: (startupId: string, proposalData?: Partial<Application>) => void;
  
  // Step 3: Eligibility & Shortlisting
  verifyEligibilityAction: (appId: string) => void;
  shortlistApplicationAction: (appId: string) => void;
  
  // Document Verification (Real PDF & DigiLocker Sandbox)
  uploadAndParseDpiitAction: (startupId: string, file: File) => Promise<boolean>;
  pullDigiLockerAction: (startupId: string, dpiitNumber: string) => Promise<boolean>;
  officialReviewDpiitAction: (startupId: string, approved: boolean, notes?: string) => void;

  // Cryptographic SHA-256 Record Integrity Actions
  verifyStartupIntegrityAction: (startupId: string) => Promise<boolean>;
  flagStartupForReviewAction: (startupId: string, reason: string) => void;
  clearTamperFlagAction: (startupId: string) => Promise<void>;
  
  // Step 4: 5-Pillar Structured Evaluation
  evaluateApplicationAction: (appId: string, score: EvaluatorScore) => void;
  selectedAppIdForScore: string;
  setSelectedAppIdForScore: (id: string) => void;
  
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

const STORAGE_KEY = "govinnovate_state_v4";

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
  const [selectedAppIdForScore, setSelectedAppIdForScore] = useState<string>(sampleApplications[0]?.id || "APP-WQ-091");
  
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
        if (parsed.selectedAppIdForScore) setSelectedAppIdForScore(parsed.selectedAppIdForScore);
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
        role,
        selectedAppIdForScore
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToPersist));
    } catch (e) {
      console.warn("Could not persist GovInnovate state to localStorage:", e);
    }
  }, [challenge, startups, applications, pilot, auditLogs, currentUser, role, selectedAppIdForScore, isHydrated]);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
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
      // Compute temporary sync hash until async subtle finishes
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

      // Asynchronously calculate real SHA-256 block hash
      computeAuditBlockHash(prevHash, timestamp, actorName, action, details).then(realHash => {
        setAuditLogs(current => current.map(l => l.id === newLog.id ? { ...l, blockHash: realHash } : l));
      });

      return [newLog, ...prev];
    });
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
    recalculateMatchesAction(updated);

    addAuditLog(
      "CHALLENGE_PUBLISHED", 
      `Published challenge "${updated.title}" under statutory sandbox guidelines (Subject to GFR rules and competent authority approval).`, 
      "Procurement", 
      "government"
    );
    setActiveView("ai_startup_matches");
  };

  // Step 2: Register Startup & Update Profile
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

    setStartups(prev => [baseStartup, ...prev]);

    const newUser: AuthUser = {
      id: baseStartup.id,
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

    // Update associated application tamper status
    setApplications(prev => prev.map(a => {
      if (a.startupId === startupId) {
        return {
          ...a,
          tamperStatus: result.isValid ? "VERIFIED" : "FLAGGED_FOR_REVIEW"
        };
      }
      return a;
    }));

    if (result.isValid) {
      addAuditLog(
        "SHA256_INTEGRITY_VERIFIED",
        `Startup ${startup.name} passed SHA-256 integrity verification. Hash: ${result.computedHash.slice(0, 20)}...`,
        "Security",
        role
      );
    } else {
      addAuditLog(
        "TAMPER_ALERT_FLAGGED",
        `VIGILANCE ALERT: Startup ${startup.name} flagged for review! SHA-256 hash divergence detected between registered and current state.`,
        "Security",
        role
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
          tamperAuditNote: reason
        };
      }
      return s;
    }));
    setApplications(prev => prev.map(a => a.startupId === startupId ? { ...a, tamperStatus: "FLAGGED_FOR_REVIEW" } : a));
    addAuditLog(
      "MANUALLY_FLAGGED_FOR_REVIEW",
      `Startup ${startupId} flagged for review by vigilance authority. Reason: "${reason}".`,
      "Security",
      role
    );
  };

  const clearTamperFlagAction = async (startupId: string) => {
    const startup = startups.find(s => s.id === startupId);
    if (!startup) return;

    const newCanonicalHash = await computeStartupHash(startup);
    setStartups(prev => prev.map(s => {
      if (s.id === startupId) {
        return {
          ...s,
          canonicalHash: newCanonicalHash,
          currentHash: newCanonicalHash,
          tamperStatus: "VERIFIED",
          tamperAuditNote: `Vigilance review completed and signed off. Re-anchored to new canonical SHA-256 hash (${newCanonicalHash.slice(0, 16)}...).`
        };
      }
      return s;
    }));
    setApplications(prev => prev.map(a => a.startupId === startupId ? { ...a, tamperStatus: "VERIFIED" } : a));

    addAuditLog(
      "TAMPER_FLAG_CLEARED",
      `Vigilance inspection completed for ${startup.name}. Alterations validated and re-anchored with fresh SHA-256 signature.`,
      "Security",
      role
    );
  };

  const updateStartupProfileAction = async (startupId: string, data: Partial<Startup>) => {
    if (!checkRoleAccess(["startup", "government"], "update startup profile")) return;

    let updatedStartup: Startup | undefined;
    setStartups(prev => prev.map(s => {
      if (s.id === startupId) {
        updatedStartup = { ...s, ...data };
        return updatedStartup;
      }
      return s;
    }));

    if (updatedStartup) {
      // Re-evaluate matching dynamically
      const match = calculateStartupMatch(updatedStartup, challenge);
      const newHash = await computeStartupHash(updatedStartup);

      setStartups(prev => prev.map(s => {
        if (s.id === startupId) {
          const isDiverged = s.canonicalHash && s.canonicalHash !== newHash;
          return {
            ...s,
            currentHash: newHash,
            matchScore: match.matchScore,
            matchReasons: match.matchReasons,
            matchBreakdown: match.matchBreakdown,
            riskAnalysis: match.riskAnalysis,
            tamperStatus: isDiverged ? "FLAGGED_FOR_REVIEW" : (s.tamperStatus || "VERIFIED"),
            tamperAuditNote: isDiverged 
              ? `Metrics updated outside formal verification. SHA-256 hash changed from ${s.canonicalHash?.slice(0, 8)}... to ${newHash.slice(0, 8)}... Flagged for vigilance re-audit.`
              : s.tamperAuditNote
          };
        }
        return s;
      }));

      addAuditLog("STARTUP_PROFILE_UPDATED", `Startup profile updated: ${data.name || startupId}. New hash: ${newHash.slice(0, 16)}...`, "Security", role);
    }
  };

  // Real PDF Upload and Parsing Pipeline
  const uploadAndParseDpiitAction = async (startupId: string, file: File): Promise<boolean> => {
    try {
      const startup = startups.find(s => s.id === startupId);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("targetEntityName", startup?.name || "");

      const res = await fetch("/api/documents/parse", {
        method: "POST",
        body: formData
      });

      if (!res.ok) {
        throw new Error("Document parsing API failed");
      }

      const json = await res.json();
      const docRecord: DocumentVerificationRecord = json.documentRecord;

      setStartups(prev => prev.map(s => {
        if (s.id === startupId) {
          const isMismatch = docRecord.entityMismatchFlag;
          return {
            ...s,
            dpiitNumber: docRecord.extractedDpiitNumber || s.dpiitNumber,
            isDpiitVerified: docRecord.preliminaryStatus === "Passed",
            documentRecord: docRecord,
            verificationStage: isMismatch 
              ? "Preliminary Check Failed - Mismatch Flagged" 
              : "Preliminary Checks Passed",
            tamperStatus: isMismatch ? "FLAGGED_FOR_REVIEW" : s.tamperStatus,
            tamperAuditNote: isMismatch 
              ? `DPIIT Mismatch: Document entity '${docRecord.extractedEntityName}' differs from profile '${s.name}'.` 
              : s.tamperAuditNote
          };
        }
        return s;
      }));

      // Update application if exists
      setApplications(prev => prev.map(a => {
        if (a.startupId === startupId) {
          return {
            ...a,
            documentRecord: docRecord,
            dpiitVerified: docRecord.preliminaryStatus === "Passed"
          };
        }
        return a;
      }));

      addAuditLog(
        "DPIIT_DOCUMENT_PARSED",
        `Parsed DPIIT Certificate PDF for ${startup?.name || startupId}. Extracted: ${docRecord.extractedDpiitNumber}, Entity: ${docRecord.extractedEntityName}. Checksum: ${docRecord.fileHash.slice(0, 16)}...`,
        "Security",
        role
      );

      return true;
    } catch (err: any) {
      console.error("uploadAndParseDpiitAction failed:", err);
      alert("Error parsing document: " + (err.message || "Failed to process PDF"));
      return false;
    }
  };

  // DigiLocker Sandbox Pull Action
  const pullDigiLockerAction = async (startupId: string, dpiitNumber: string): Promise<boolean> => {
    try {
      const startup = startups.find(s => s.id === startupId);
      const res = await fetch("/api/digilocker/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dpiitNumber,
          startupName: startup?.name || "",
          consent: true
        })
      });

      if (!res.ok) throw new Error("DigiLocker Gateway pull error");

      const json = await res.json();
      const docRecord: DocumentVerificationRecord = json.documentRecord;

      setStartups(prev => prev.map(s => {
        if (s.id === startupId) {
          return {
            ...s,
            dpiitNumber: docRecord.extractedDpiitNumber || s.dpiitNumber,
            isDpiitVerified: true,
            documentRecord: docRecord,
            verificationStage: "Officially Verified",
            tamperStatus: "VERIFIED"
          };
        }
        return s;
      }));

      setApplications(prev => prev.map(a => {
        if (a.startupId === startupId) {
          return {
            ...a,
            documentRecord: docRecord,
            dpiitVerified: true,
            status: "Eligibility Verified"
          };
        }
        return a;
      }));

      addAuditLog(
        "DIGILOCKER_CERTIFICATE_PULLED",
        `Pulled cryptographically signed DPIIT Certificate from DigiLocker Gateway for ${docRecord.extractedDpiitNumber}. Issuer: in.gov.dpiit. Checksum: ${docRecord.fileHash.slice(0, 16)}...`,
        "Security",
        role
      );

      return true;
    } catch (err: any) {
      alert("DigiLocker pull failed: " + err.message);
      return false;
    }
  };

  // Official Human Government Officer Review Action
  const officialReviewDpiitAction = (startupId: string, approved: boolean, notes?: string) => {
    if (!checkRoleAccess(["government"], "perform official document verification")) return;

    const reviewerName = currentUser ? `${currentUser.name} (${currentUser.role})` : "Government Verification Officer";
    const timestamp = new Date().toISOString().replace("T", " ").slice(0, 19);

    setStartups(prev => prev.map(s => {
      if (s.id === startupId) {
        const updatedDoc: DocumentVerificationRecord | undefined = s.documentRecord ? {
          ...s.documentRecord,
          officialStatus: approved ? "Officially Verified" : "Rejected",
          verifiedBy: reviewerName,
          verifiedAt: timestamp,
          rejectionReason: approved ? undefined : (notes || "Verification criteria not satisfied")
        } : undefined;

        return {
          ...s,
          isDpiitVerified: approved,
          documentRecord: updatedDoc,
          verificationStage: approved ? "Officially Verified" : "Verification Failed"
        };
      }
      return s;
    }));

    setApplications(prev => prev.map(a => {
      if (a.startupId === startupId) {
        return {
          ...a,
          dpiitVerified: approved,
          status: approved ? "Eligibility Verified" : "Rejected"
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
      evidenceLinks: proposalData?.evidenceLinks || ["https://example.com/docs/technical-spec.pdf"],
      documentRecord: startup.documentRecord,
      tamperStatus: startup.tamperStatus || "VERIFIED"
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
    } catch {
      // Ignore
    }
    setChallenge(initialChallenge);
    setStartups(sampleStartups);
    setApplications(sampleApplications);
    setPilot(samplePilot);
    setAuditLogs(sampleAuditLogs);
    setNotifications(sampleNotifications);
    setSelectedAppIdForScore(sampleApplications[0]?.id || "APP-WQ-091");
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
