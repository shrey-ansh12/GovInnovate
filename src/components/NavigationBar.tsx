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
  LogIn,
  Globe,
  ChevronDown,
  Check,
  ArrowRight
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
    t
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
      {/* 1. SOVEREIGN TOP NOTIFICATION BAR (Stitch Nordic Civic Style) */}
      <div className="w-full bg-[#0F3854] text-white border-b border-[#1D4E72] text-[12px] font-normal tracking-wide">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 py-2 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-1.5 font-medium text-slate-100">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>National Public Innovation Sandbox • DPIIT & Ministry of Finance</span>
            </div>
            <span className="hidden md:inline text-white/30">•</span>
            <span className="hidden md:inline text-slate-300 font-normal">GFR 2017 Rule 173 Statutory Safe Harbor</span>
          </div>
          <div className="flex items-center gap-3 text-slate-300 font-mono text-[11px]">
            <span className="hidden sm:inline">NIC Sovereign Hosting • Tier-IV</span>
            <span className="px-2 py-0.5 rounded bg-white/10 text-emerald-300 text-[10px] tracking-wider uppercase font-semibold">
              e-Pramaan Verified
            </span>
          </div>
        </div>
      </div>

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

          {/* Quick Scenario Status Bar */}
          <div className="hidden xl:flex items-center gap-2 bg-[#F2EFEB] px-3.5 py-1.5 rounded border border-[#E2DED6] text-xs text-[#5B6A78]">
            <span className="inline-block w-2 h-2 rounded-full bg-[#147452] animate-pulse"></span>
            <span className="font-semibold text-[#141F2B] font-mono">{t("scenario.label")}</span>
            <span className="truncate max-w-[170px] text-[#5B6A78] font-medium">{challenge.title.slice(0, 24)}...</span>
            <span className="text-[#E2DED6]">|</span>
            <span className="font-mono font-semibold text-[#0F3854] uppercase text-[10px] bg-white px-2 py-0.5 rounded border border-[#E2DED6]">
              {t("scenario.stage")} {challenge.status}
            </span>
          </div>

          {/* Actions: Multi-language, Auth, Role Switchers */}
          <div className="flex items-center gap-2 sm:gap-3">
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

            {/* Direct Sign In & Enter Sandbox Buttons */}
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

            {/* Role Switcher Pill */}
            <div className="hidden md:flex items-center bg-[#F2EFEB] p-1 rounded border border-[#E2DED6]">
              <button
                onClick={() => { setRole("government"); setActiveView("gov_dashboard"); }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                  role === "government"
                    ? "bg-[#0F3854] text-white shadow-xs"
                    : "text-[#5B6A78] hover:text-[#141F2B]"
                }`}
                title="Switch to Government View"
              >
                <Building2 className="h-3 w-3" />
                <span>{t("role.govt")}</span>
              </button>

              <button
                onClick={() => { setRole("startup"); setActiveView("startup_dashboard"); }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                  role === "startup"
                    ? "bg-[#147452] text-white shadow-xs"
                    : "text-[#5B6A78] hover:text-[#141F2B]"
                }`}
                title="Switch to Startup View"
              >
                <Rocket className="h-3 w-3" />
                <span>{t("role.startup")}</span>
              </button>

              <button
                onClick={() => { setRole("evaluator"); setActiveView("evaluator_dashboard"); }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                  role === "evaluator"
                    ? "bg-[#8A5B0B] text-white shadow-xs"
                    : "text-[#5B6A78] hover:text-[#141F2B]"
                }`}
                title="Switch to Evaluator View"
              >
                <Award className="h-3 w-3" />
                <span>{t("role.eval")}</span>
              </button>
            </div>

            {/* Quick Reset Demo */}
            <button
              onClick={resetDemoAction}
              className="p-2 text-[#5B6A78] hover:text-red-700 hover:bg-red-50 rounded transition-colors border border-transparent hover:border-red-200"
              title={t("nav.resetDemo")}
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* 3. SECONDARY FAST-HOP FLOW NAVIGATION */}
      <div className="bg-[#0F3854] text-slate-200 px-4 py-2 text-xs overflow-x-auto whitespace-nowrap border-b border-[#1D4E72]">
        <div className="max-w-[1360px] mx-auto flex items-center gap-4">
          <span className="font-semibold text-slate-300 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" /> {t("scenario.flow")}
          </span>
          <div className="flex items-center gap-2">
            <NavPill label={t("flow.landing")} active={activeView === "landing"} onClick={() => setActiveView("landing")} />
            <span className="text-slate-500">→</span>
            <NavPill label={t("flow.govDashboard")} active={activeView === "gov_dashboard"} onClick={() => { setRole("government"); setActiveView("gov_dashboard"); }} />
            <span className="text-slate-500">→</span>
            <NavPill label={t("flow.createChallenge")} active={activeView === "create_challenge"} onClick={() => { setRole("government"); setActiveView("create_challenge"); }} />
            <span className="text-slate-500">→</span>
            <NavPill label={t("flow.aiMatches")} active={activeView === "ai_startup_matches"} onClick={() => setActiveView("ai_startup_matches")} />
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
            <NavPill label={t("flow.procurement")} active={activeView === "procurement_recommendation"} onClick={() => setActiveView("procurement_recommendation")} />
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
