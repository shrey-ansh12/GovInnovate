"use client";

import React, { useState, useRef, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { SUPPORTED_LANGUAGES } from "@/lib/translations";
import { 
  Building2, 
  Rocket, 
  Award, 
  RotateCcw,
  Sparkles,
  Globe,
  ChevronDown,
  Check,
  AlertTriangle,
  X,
  Database,
  PlayCircle,
  LogOut,
  User,
  ShieldCheck
} from "lucide-react";

export const NavigationBar: React.FC = () => {
  const { 
    role, 
    setRole, 
    activeView, 
    setActiveView, 
    resetDemoAction, 
    challenge,
    openAuthModal,
    language,
    setLanguage,
    t,
    roleErrorMessage,
    clearRoleError,
    appMode,
    setAppMode,
    isLiveDbConnected,
    currentUser,
    logoutUser,
    startups,
    challenges,
    selectChallenge,
    loginUser
  } = useApp();

  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  // Close language dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLangOption = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

  return (
    <>
      {/* 1. TOP STATUTORY BENCHMARK BAR */}
      <div className="w-full bg-[#0F3854] text-white border-b border-[#1D4E72] text-[12px] font-normal tracking-wide">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 py-2 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-1.5 font-medium text-slate-100">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>National Public Innovation Sandbox • Transparent Procurement-to-Pilot Rails</span>
            </div>
            <span className="hidden md:inline text-white/30">•</span>
            <span className="hidden md:inline text-slate-300 font-normal">GFR 2017 Innovation Guidelines (Safe Harbor)</span>
          </div>

          <div className="flex items-center gap-3 text-slate-300 font-mono text-[11px]">
            {/* Mode Indicator & Switcher */}
            {appMode === "demo" ? (
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] tracking-wider uppercase font-semibold flex items-center gap-1">
                  <PlayCircle className="h-3 w-3" />
                  Demo Mode Active
                </span>
                <button
                  onClick={() => setAppMode("real")}
                  className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-slate-200 text-[10px] tracking-wider font-semibold transition-colors"
                >
                  Exit Demo Mode
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] tracking-wider uppercase font-semibold flex items-center gap-1">
                  <Database className="h-3 w-3" />
                  Real Mode ({isLiveDbConnected ? "Supabase Live" : "DB Offline"})
                </span>
                <button
                  onClick={() => setAppMode("demo")}
                  className="px-2 py-0.5 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-[10px] tracking-wider font-semibold transition-colors"
                >
                  Enter Demo Mode
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 1B. DEMO MODE WARNING STRIP */}
      {appMode === "demo" && (
        <div className="w-full bg-[#FEF7EA] text-[#8A5B0B] border-b border-[#F6E1B9] text-[11px] py-1 px-4 flex items-center justify-between">
          <div className="max-w-[1360px] mx-auto w-full flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-medium">
              <PlayCircle className="h-3.5 w-3.5 text-amber-600 shrink-0" />
              <span>
                <strong>Demo Sandbox Active:</strong> You are exploring simulated scenario data. Real database records and live tenders are strictly unaffected.
              </span>
            </span>
            <button
              onClick={() => setAppMode("real")}
              className="font-bold underline text-[11px] ml-4 hover:text-[#583a05]"
            >
              Switch to Real Mode →
            </button>
          </div>
        </div>
      )}

      {/* 1C. STATUTORY DISCLAIMER STRIP */}
      <div className="w-full bg-[#FAF0D9] text-[#784A05] border-b border-[#F0D598] text-[11px] py-1 px-4 text-center font-medium">
        <span>
          <strong>Legal Disclaimer:</strong> Procurement decisions are subject to applicable GFR, GeM rules, departmental policies, and competent-authority approval. All simulated milestones and figures are illustrative demo references.
        </span>
      </div>

      {/* 1D. ROLE ERROR TOAST / BANNER */}
      {roleErrorMessage && (
        <div className="w-full bg-red-600 text-white px-4 py-2 text-xs flex items-center justify-between shadow-md">
          <div className="max-w-[1360px] mx-auto flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 shrink-0 text-amber-200" />
            <span className="font-medium">{roleErrorMessage}</span>
          </div>
          <button 
            onClick={clearRoleError}
            className="p-1 hover:bg-red-700 rounded text-white"
            title="Dismiss error"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* 2. STREAMLINED CIVIC NAVIGATION */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E2DED6]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-4">
          {/* Brand Title */}
          <div 
            className="flex items-center gap-3 cursor-pointer group shrink-0" 
            onClick={() => setActiveView("landing")}
          >
            <div className="w-9 h-9 rounded-sm bg-[#0F3854] flex items-center justify-center text-white shadow-xs">
              <span className="material-symbols-outlined text-[20px]">account_balance</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[18px] text-[#0A2540] tracking-tight">
                  {t("brand.name")}
                </span>
                <span className="px-1.5 py-0.5 rounded-xs text-[10px] font-mono font-medium bg-[#EBF6F0] text-[#147452] border border-[#C2E5D2] uppercase">
                  {t("brand.badge")}
                </span>
              </div>
              <span className="text-[11px] text-[#5B6A78] tracking-wide">
                {t("brand.tagline")}
              </span>
            </div>
          </div>

          {/* Quick Scenario / Challenge Switcher Bar */}
          <div className="hidden lg:flex items-center gap-2 bg-[#F2EFEB] px-3 py-1.5 rounded border border-[#E2DED6] text-xs text-[#5B6A78]">
            <span className="inline-block w-2 h-2 rounded-full bg-[#147452] animate-pulse shrink-0"></span>
            <span className="font-semibold text-[#0F3854] font-mono shrink-0">Tender:</span>
            <select
              value={challenge.id}
              onChange={(e) => selectChallenge(e.target.value)}
              className="bg-white text-[#0A2540] font-medium text-xs rounded border border-[#D5D0C7] px-2 py-0.5 focus:outline-none focus:ring-1 focus:ring-[#0F3854] max-w-[210px] truncate cursor-pointer"
              title="Switch Active Challenge to view matching startups"
            >
              {challenges.map((c) => (
                <option key={c.id} value={c.id}>
                  [{c.id.split("-").pop()}] {c.title}
                </option>
              ))}
            </select>
            <button
              onClick={() => setActiveView("ai_startup_matches")}
              className="text-[11px] font-semibold text-[#147452] hover:underline shrink-0"
              title="Inspect matching startups for selected challenge"
            >
              Matches →
            </button>
          </div>

          {/* Actions: Multi-language, Auth, Role Switchers */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* AI Startup Matches Direct Button */}
            <button
              onClick={() => setActiveView("ai_startup_matches")}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded text-[13px] font-bold transition-all border cursor-pointer ${
                activeView === "ai_startup_matches"
                  ? "bg-[#147452] text-white border-[#147452] shadow-xs"
                  : "bg-white text-[#147452] hover:bg-[#EBF6F0] border-[#C2E5D2]"
              }`}
              title="Browse AI Matched Startups"
            >
              <Sparkles className="h-4 w-4 text-emerald-500" />
              <span className="hidden sm:inline">AI Matches</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-[#EBF6F0] text-[#147452] border border-[#C2E5D2]">
                {startups.length}
              </span>
            </button>

            {/* Multi-Language Selector Dropdown */}
            <div className="relative" ref={langDropdownRef}>
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded text-[13px] font-medium text-[#141F2B] bg-white hover:bg-[#F2EFEB] border border-[#E2DED6] transition-colors"
                title="Select Language / भाषा चुनें"
                aria-expanded={langDropdownOpen}
              >
                <Globe className="h-4 w-4 text-[#0F3854]" />
                <span className="font-semibold">{currentLangOption.nativeLabel}</span>
                <ChevronDown className={`h-3.5 w-3.5 text-[#5B6A78] transition-transform duration-200 ${langDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-52 bg-white rounded shadow-xl border border-[#E2DED6] py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-3 py-1.5 text-[10px] uppercase font-mono font-bold tracking-wider text-[#7E8B97] border-b border-[#EDE9E1] mb-1">
                    Select Language / भाषा
                  </div>
                  {SUPPORTED_LANGUAGES.map((lang) => {
                    const isSelected = lang.code === language;
                    return (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors ${
                          isSelected 
                            ? "bg-[#EBF6F0] text-[#147452] font-bold" 
                            : "text-[#141F2B] hover:bg-[#FAF8F5]"
                        }`}
                      >
                        <div className="flex flex-col">
                          <span className="font-medium">{lang.nativeLabel}</span>
                          <span className="text-[10px] text-[#7E8B97] font-mono">{lang.label}</span>
                        </div>
                        {isSelected && <Check className="h-3.5 w-3.5 text-[#147452]" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* User Session / Sign In Buttons */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex flex-col text-right">
                  <span className="text-xs font-bold text-[#0A2540] truncate max-w-[130px]">
                    {currentUser.name}
                  </span>
                  <span className="text-[10px] text-[#5B6A78] font-mono uppercase">
                    {currentUser.role}
                  </span>
                </div>
                <button
                  onClick={logoutUser}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 rounded border border-red-200 hover:border-red-300 transition-colors cursor-pointer shadow-2xs"
                  title="Sign Out of GovInnovate"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openAuthModal("signin")}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-[13px] font-medium text-[#141F2B] bg-transparent hover:bg-[#F2EFEB] rounded border border-[#E2DED6] transition-colors"
                  title="Sign in to your account"
                >
                  <span className="material-symbols-outlined text-[17px] text-[#5B6A78]">login</span>
                  <span>{t("nav.signIn")}</span>
                </button>

                <button
                  onClick={() => openAuthModal("signup", "startup")}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold text-white bg-[#0F3854] hover:bg-[#1D4E72] rounded shadow-none transition-colors"
                  title="Register Startup"
                >
                  <span>Enter Sandbox</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            )}

            {/* 3 Dashboard Logins Pill */}
            <div className="hidden md:flex items-center bg-[#F2EFEB] p-1 rounded border border-[#E2DED6] gap-0.5">
              <button
                onClick={() => {
                  if (currentUser && currentUser.role === "government") {
                    setActiveView("gov_dashboard");
                  } else {
                    openAuthModal("signin", "government");
                  }
                }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                  role === "government"
                    ? "bg-[#0F3854] text-white shadow-xs"
                    : "text-[#5B6A78] hover:text-[#141F2B]"
                }`}
                title="Log in to Government Dashboard"
              >
                <Building2 className="h-3 w-3" />
                <span>{t("role.govt")}</span>
              </button>

              <button
                onClick={() => {
                  if (currentUser && currentUser.role === "startup") {
                    setActiveView("startup_dashboard");
                  } else {
                    openAuthModal("signin", "startup");
                  }
                }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                  role === "startup"
                    ? "bg-[#147452] text-white shadow-xs"
                    : "text-[#5B6A78] hover:text-[#141F2B]"
                }`}
                title="Log in to Startup Dashboard"
              >
                <Rocket className="h-3 w-3" />
                <span>{t("role.startup")}</span>
              </button>

              <button
                onClick={() => {
                  if (currentUser && currentUser.role === "evaluator") {
                    setActiveView("evaluator_dashboard");
                  } else {
                    openAuthModal("signin", "evaluator");
                  }
                }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                  role === "evaluator"
                    ? "bg-[#8A5B0B] text-white shadow-xs"
                    : "text-[#5B6A78] hover:text-[#141F2B]"
                }`}
                title="Log in to Evaluator Dashboard"
              >
                <Award className="h-3 w-3" />
                <span>{t("role.eval")}</span>
              </button>
            </div>

            {/* Quick Reset Demo */}
            {appMode === "demo" && (
              <button
                onClick={resetDemoAction}
                className="p-2 text-[#5B6A78] hover:text-red-700 hover:bg-red-50 rounded transition-colors border border-transparent hover:border-red-200"
                title={t("nav.resetDemo")}
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 3. SECONDARY FAST-HOP FLOW NAVIGATION */}
      <div className="bg-[#0F3854] text-slate-200 px-4 py-2 text-xs overflow-x-auto whitespace-nowrap border-b border-[#1D4E72]">
        <div className="max-w-[1360px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider mr-1">
              <Sparkles className="h-3.5 w-3.5 text-emerald-400" /> {t("scenario.flow")}
            </span>
            <NavPill label={t("flow.landing")} active={activeView === "landing"} onClick={() => setActiveView("landing")} />
            <span className="text-slate-500">→</span>
            <NavPill label={t("flow.govDashboard")} active={activeView === "gov_dashboard"} onClick={() => { setRole("government"); setActiveView("gov_dashboard"); }} />
            <span className="text-slate-500">→</span>
            <NavPill label={t("flow.createChallenge")} active={activeView === "create_challenge"} onClick={() => { setRole("government"); setActiveView("create_challenge"); }} />
            <span className="text-slate-500">→</span>
            <NavPill label={`${t("flow.aiMatches")} (${startups?.length || 0})`} active={activeView === "ai_startup_matches"} onClick={() => setActiveView("ai_startup_matches")} />
            <span className="text-slate-500">→</span>
            <NavPill label={t("flow.startupProfile")} active={activeView === "startup_profile"} onClick={() => setActiveView("startup_profile")} />
            <span className="text-slate-500">→</span>
            <NavPill label={t("flow.startupDashboard")} active={activeView === "startup_dashboard"} onClick={() => { setRole("startup"); setActiveView("startup_dashboard"); }} />
            <span className="text-slate-500">→</span>
            <NavPill label={t("flow.reviewShortlist")} active={activeView === "application_review"} onClick={() => { setRole("government"); setActiveView("application_review"); }} />
            <span className="text-slate-500">→</span>
            <NavPill label={t("flow.evalScorecard")} active={activeView === "evaluation_scorecard"} onClick={() => { setRole("evaluator"); setActiveView("evaluation_scorecard"); }} />
            <span className="text-slate-500">→</span>
            <NavPill label={t("flow.pilot")} active={activeView === "pilot_management"} onClick={() => setActiveView("pilot_management")} />
            <span className="text-slate-500">→</span>
            <NavPill label={t("flow.kpi")} active={activeView === "kpi_monitoring"} onClick={() => setActiveView("kpi_monitoring")} />
            <span className="text-slate-500">→</span>
            <NavPill label={t("flow.validation")} active={activeView === "validation_report"} onClick={() => setActiveView("validation_report")} />
            <span className="text-slate-500">→</span>
            <NavPill label={t("flow.scaleUp")} active={activeView === "scale_up"} onClick={() => setActiveView("scale_up")} />
            <span className="text-slate-500">|</span>
            <NavPill label={t("flow.auditTrail")} active={activeView === "audit_trail"} onClick={() => setActiveView("audit_trail")} />
            <NavPill label={t("flow.documents")} active={activeView === "documents"} onClick={() => setActiveView("documents")} />
          </div>
        </div>
      </div>
    </>
  );
};

const NavPill: React.FC<{ label: string; active: boolean; onClick: () => void }> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1 rounded text-[11px] font-mono transition-all ${
      active 
        ? "bg-white text-[#0F3854] font-bold shadow-xs" 
        : "text-slate-300 hover:text-white hover:bg-white/10"
    }`}
  >
    {label}
  </button>
);
