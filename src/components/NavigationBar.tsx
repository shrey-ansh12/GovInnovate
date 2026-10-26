"use client";

import React, { useState, useRef, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { SUPPORTED_LANGUAGES, SupportedLanguage } from "@/lib/translations";
import { 
  Building2, 
  Rocket, 
  Award, 
  Layers, 
  RotateCcw,
  Sparkles,
  LogIn,
  Globe,
  ChevronDown,
  Check
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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={() => setActiveView("landing")}>
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-700 to-sky-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-slate-900 via-blue-950 to-slate-800 bg-clip-text text-transparent">
                  {t("brand.name")}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                  {t("brand.badge")}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">{t("brand.tagline")}</p>
            </div>
          </div>

          {/* Quick Scenario Status Bar */}
          <div className="hidden xl:flex items-center gap-2 bg-slate-100/80 px-3 py-1.5 rounded-full border border-slate-200/80 text-xs text-slate-600">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-semibold text-slate-800">{t("scenario.label")}</span>
            <span className="truncate max-w-[180px] text-slate-600 font-medium">{challenge.title.slice(0, 26)}...</span>
            <span className="text-slate-300">|</span>
            <span className="font-bold text-blue-700 uppercase text-[10px] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              {t("scenario.stage")} {challenge.status}
            </span>
          </div>

          {/* Actions: Language Selector, Auth, Role Switcher */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Multi-Language Selector Dropdown */}
            <div className="relative" ref={langDropdownRef}>
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:text-blue-700 bg-slate-50 hover:bg-slate-100 border border-slate-200/90 transition-all shadow-2xs"
                title="Select Language / भाषा चुनें"
                aria-expanded={langDropdownOpen}
              >
                <Globe className="h-3.5 w-3.5 text-blue-600" />
                <span className="font-semibold">{currentLangOption.nativeLabel}</span>
                <ChevronDown className={`h-3 w-3 text-slate-400 transition-transform duration-200 ${langDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-3 py-1 text-[10px] uppercase font-bold tracking-wider text-slate-400 border-b border-slate-100 mb-1">
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
                            ? "bg-blue-50 text-blue-700 font-bold" 
                            : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                      >
                        <div className="flex flex-col">
                          <span className="font-medium">{lang.nativeLabel}</span>
                          <span className="text-[10px] text-slate-400">{lang.label}</span>
                        </div>
                        {isSelected && <Check className="h-3.5 w-3.5 text-blue-600" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Direct Sign In & Sign Up Links / Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => openAuthModal("signin")}
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:text-blue-700 hover:bg-slate-100 border border-slate-200 transition-colors flex items-center gap-1.5 shadow-2xs"
                title="Sign in to your account"
              >
                <LogIn className="h-3.5 w-3.5 text-blue-600" />
                <span>{t("nav.signIn")}</span>
              </button>

              <div className="relative group">
                <button
                  onClick={() => openAuthModal("signup", "startup")}
                  className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all"
                  title="Register new Startup"
                >
                  <Rocket className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{t("nav.registerStartup")}</span>
                  <span className="sm:hidden">{t("nav.register")}</span>
                </button>
              </div>

              <button
                onClick={() => openAuthModal("signup", "government")}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold transition-colors"
                title="Register Government Officer"
              >
                <Building2 className="h-3.5 w-3.5 text-blue-600" />
                <span>{t("nav.govtSignUp")}</span>
              </button>
            </div>

            {/* Role Switcher Pill */}
            <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => { setRole("government"); setActiveView("gov_dashboard"); }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  role === "government"
                    ? "bg-white text-blue-700 shadow-xs border border-slate-200/60"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                title="Switch to Government View"
              >
                <Building2 className="h-3 w-3" />
                <span>{t("role.govt")}</span>
              </button>

              <button
                onClick={() => { setRole("startup"); setActiveView("startup_dashboard"); }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  role === "startup"
                    ? "bg-white text-emerald-700 shadow-xs border border-slate-200/60"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                title="Switch to Startup View"
              >
                <Rocket className="h-3 w-3" />
                <span>{t("role.startup")}</span>
              </button>

              <button
                onClick={() => { setRole("evaluator"); setActiveView("evaluator_dashboard"); }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  role === "evaluator"
                    ? "bg-white text-amber-700 shadow-xs border border-slate-200/60"
                    : "text-slate-600 hover:text-slate-900"
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
              className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200"
              title={t("nav.resetDemo")}
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Fast-Hop Navigation Menu */}
      <div className="bg-slate-900 text-slate-200 px-4 py-1.5 text-xs overflow-x-auto whitespace-nowrap">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <span className="font-semibold text-slate-400 flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5 text-yellow-400" /> {t("scenario.flow")}
          </span>
          <div className="flex items-center gap-2">
            <NavPill label={t("flow.landing")} active={activeView === "landing"} onClick={() => setActiveView("landing")} />
            <span className="text-slate-600">→</span>
            <NavPill label={t("flow.govDashboard")} active={activeView === "gov_dashboard"} onClick={() => { setRole("government"); setActiveView("gov_dashboard"); }} />
            <span className="text-slate-600">→</span>
            <NavPill label={t("flow.createChallenge")} active={activeView === "create_challenge"} onClick={() => { setRole("government"); setActiveView("create_challenge"); }} />
            <span className="text-slate-600">→</span>
            <NavPill label={t("flow.aiMatches")} active={activeView === "ai_startup_matches"} onClick={() => setActiveView("ai_startup_matches")} />
            <span className="text-slate-600">→</span>
            <NavPill label={t("flow.startupProfile")} active={activeView === "startup_profile"} onClick={() => setActiveView("startup_profile")} />
            <span className="text-slate-600">→</span>
            <NavPill label={t("flow.startupDashboard")} active={activeView === "startup_dashboard"} onClick={() => { setRole("startup"); setActiveView("startup_dashboard"); }} />
            <span className="text-slate-600">→</span>
            <NavPill label={t("flow.reviewShortlist")} active={activeView === "application_review"} onClick={() => { setRole("government"); setActiveView("application_review"); }} />
            <span className="text-slate-600">→</span>
            <NavPill label={t("flow.evalScorecard")} active={activeView === "evaluation_scorecard"} onClick={() => { setRole("evaluator"); setActiveView("evaluation_scorecard"); }} />
            <span className="text-slate-600">→</span>
            <NavPill label={t("flow.pilot")} active={activeView === "pilot_management"} onClick={() => setActiveView("pilot_management")} />
            <span className="text-slate-600">→</span>
            <NavPill label={t("flow.kpi")} active={activeView === "kpi_monitoring"} onClick={() => setActiveView("kpi_monitoring")} />
            <span className="text-slate-600">→</span>
            <NavPill label={t("flow.validation")} active={activeView === "validation_report"} onClick={() => setActiveView("validation_report")} />
            <span className="text-slate-600">→</span>
            <NavPill label={t("flow.procurement")} active={activeView === "procurement_recommendation"} onClick={() => setActiveView("procurement_recommendation")} />
            <span className="text-slate-600">→</span>
            <NavPill label={t("flow.scaleUp")} active={activeView === "scale_up"} onClick={() => setActiveView("scale_up")} />
            <span className="text-slate-600">|</span>
            <NavPill label={t("flow.auditTrail")} active={activeView === "audit_trail"} onClick={() => setActiveView("audit_trail")} />
            <NavPill label={t("flow.documents")} active={activeView === "documents"} onClick={() => setActiveView("documents")} />
          </div>
        </div>
      </div>
    </header>
  );
};

const NavPill: React.FC<{ label: string; active: boolean; onClick: () => void }> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium transition-all ${
      active 
        ? "bg-blue-600 text-white font-bold shadow-xs" 
        : "text-slate-300 hover:text-white hover:bg-slate-800"
    }`}
  >
    {label}
  </button>
);
