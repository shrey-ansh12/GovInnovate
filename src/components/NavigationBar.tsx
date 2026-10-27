"use client";

import React, { useState, useRef, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { SUPPORTED_LANGUAGES } from "@/lib/translations";
import { DashboardSwitcher } from "@/components/DashboardSwitcher";
import { ProcessRoadmap } from "@/components/ProcessRoadmap";
import { 
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
  FileText,
  History,
  Blocks,
  ShieldCheck
} from "lucide-react";

export const NavigationBar: React.FC = () => {
  const { 
    role, 
    setRole, 
    activeView, 
    setActiveView, 
    resetDemoAction, 
    openAuthModal,
    openBlockchainModal,
    language,
    setLanguage,
    t,
    roleErrorMessage,
    clearRoleError,
    appMode,
    setAppMode,
    isLiveDbConnected,
    currentUser,
    logoutUser
  } = useApp();

  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

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
      {/* 1. SLIM CLEAN UTILITY STRIP */}
      <div className="w-full bg-[#0F3854] text-white text-xs font-normal border-b border-[#1D4E72]/80">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 py-1.5 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-slate-100 tracking-tight">
              GovInnovate
            </span>
            <span className="text-white/30">•</span>
            <span className="text-slate-300 font-normal">
              National Public Innovation Sandbox
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-300 font-mono text-[11px]">
            {/* Mode Indicator */}
            {appMode === "demo" ? (
              <div className="flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold uppercase text-[10px] flex items-center gap-1">
                  <PlayCircle className="h-3 w-3" /> Demo Mode
                </span>
                <button
                  onClick={() => setAppMode("real")}
                  className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-slate-200 text-[10px] transition-colors"
                >
                  Exit Demo
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold uppercase text-[10px] flex items-center gap-1">
                  <Database className="h-3 w-3" /> Live DB ({isLiveDbConnected ? "Online" : "Connecting"})
                </span>
                <button
                  onClick={() => setAppMode("demo")}
                  className="px-2 py-0.5 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-[10px] transition-colors"
                >
                  Enter Demo
                </button>
              </div>
            )}

            {/* Language Selector */}
            <div className="relative" ref={langDropdownRef}>
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium text-slate-200 bg-white/10 hover:bg-white/20 transition-colors"
                title="Select Language / भाषा चुनें"
              >
                <Globe className="h-3 w-3 text-emerald-300" />
                <span>{currentLangOption.nativeLabel}</span>
                <ChevronDown className={`h-3 w-3 transition-transform ${langDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-1 w-44 bg-white text-[#141F2B] rounded-lg shadow-xl border border-[#E2DED6] py-1 z-50">
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-1.5 text-xs text-left ${
                        lang.code === language ? "bg-[#EBF6F0] text-[#147452] font-bold" : "hover:bg-[#FAF8F5]"
                      }`}
                    >
                      <span>{lang.nativeLabel} ({lang.label})</span>
                      {lang.code === language && <Check className="h-3.5 w-3.5 text-[#147452]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Role Error Toast (if any) */}
      {roleErrorMessage && (
        <div className="w-full bg-red-600 text-white px-4 py-2 text-xs flex items-center justify-between shadow-md">
          <div className="max-w-[1360px] mx-auto flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 shrink-0 text-amber-200" />
            <span className="font-medium">{roleErrorMessage}</span>
          </div>
          <button onClick={clearRoleError} className="p-1 hover:bg-red-700 rounded text-white">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* 2. MAIN HEADER (CLEAN & CENTERED SWITCHER) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E2DED6] shadow-xs">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3">
          {/* Brand Logo */}
          <div 
            className="flex items-center gap-2.5 cursor-pointer group shrink-0" 
            onClick={() => setActiveView("landing")}
            title="Return to 3-Dashboards Hub"
          >
            <div className="w-8 h-8 rounded-lg bg-[#0F3854] flex items-center justify-center text-white shadow-xs group-hover:bg-[#1D4E72] transition-colors">
              <span className="material-symbols-outlined text-[20px]">account_balance</span>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-lg text-[#0A2540] tracking-tight leading-none">
                GovInnovate
              </span>
              <span className="text-[10px] text-[#5B6A78] tracking-wide mt-0.5">
                3 Stakeholder Portals
              </span>
            </div>
          </div>

          {/* CENTER: THE 3-DASHBOARD SWITCHER */}
          <div className="flex-1 flex justify-center min-w-[260px] max-w-xl">
            <DashboardSwitcher variant="header" />
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Blockchain Proof Button */}
            <button
              onClick={openBlockchainModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border bg-emerald-50 text-[#147452] border-emerald-300 hover:bg-emerald-100 shadow-2xs"
              title="Open Blockchain Proof of Data Safety & Smart Contract Registry"
            >
              <Blocks className="h-3.5 w-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Blockchain Safety</span>
            </button>

            {/* Audit Log Quick Link */}
            <button
              onClick={() => setActiveView("audit_trail")}
              className={`p-2 rounded-lg text-xs font-medium text-[#5B6A78] hover:text-[#0A2540] hover:bg-[#F2EFEB] transition-colors ${
                activeView === "audit_trail" ? "bg-[#F2EFEB] text-[#0A2540] font-bold" : ""
              }`}
              title="Vigilance Audit Trail"
            >
              <History className="h-4 w-4" />
            </button>

            {/* User Session */}
            {currentUser ? (
              <div className="flex items-center gap-2 pl-2 border-l border-[#EDE9E1]">
                <div className="hidden md:flex flex-col text-right">
                  <span className="text-xs font-bold text-[#0A2540] truncate max-w-[120px]">
                    {currentUser.name}
                  </span>
                  <span className="text-[9px] text-[#5B6A78] font-mono uppercase">
                    {currentUser.role}
                  </span>
                </div>
                <button
                  onClick={logoutUser}
                  className="p-1.5 text-[#5B6A78] hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => openAuthModal("signin")}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-[#0A2540] bg-[#FAF8F5] hover:bg-[#F2EFEB] rounded-lg border border-[#E2DED6] transition-colors"
              >
                <span>{t("nav.signIn")}</span>
              </button>
            )}

            {/* Reset Demo */}
            {appMode === "demo" && (
              <button
                onClick={resetDemoAction}
                className="p-1.5 text-[#5B6A78] hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                title={t("nav.resetDemo")}
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 3. COMPACT PROCESS ROADMAP STRIP (ONLY WHEN INSIDE A SUB-VIEW, TO KEEP LANDING PAGE CLEAN!) */}
      {activeView !== "landing" && (
        <div className="bg-[#0F3854] text-slate-200 px-4 py-1.5 border-b border-[#1D4E72] shadow-2xs">
          <div className="max-w-[1360px] mx-auto flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 overflow-x-auto py-0.5 scrollbar-none">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-400 shrink-0 flex items-center gap-1">
                <Sparkles className="h-3 w-3" /> Stage:
              </span>
              <ProcessRoadmap variant="compact-bar" />
            </div>

            <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-slate-300 shrink-0">
              <button 
                onClick={() => setActiveView("documents")}
                className={`hover:text-white transition-colors ${activeView === "documents" ? "text-emerald-400 underline font-bold" : ""}`}
              >
                Docs
              </button>
              <span>•</span>
              <button 
                onClick={() => setActiveView("audit_trail")}
                className={`hover:text-white transition-colors ${activeView === "audit_trail" ? "text-emerald-400 underline font-bold" : ""}`}
              >
                Audit Trail
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
