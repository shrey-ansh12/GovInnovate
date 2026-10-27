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
  ShieldCheck,
  FileText,
  History,
  Blocks
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
      {/* 1. CLEAN SLIM STATUTORY BENCHMARK BAR */}
      <div className="w-full bg-[#0F3854] text-white border-b border-[#1D4E72] text-[12px] font-normal tracking-wide">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 py-1.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-slate-100 text-xs tracking-tight">
              National Public Innovation Sandbox
            </span>
            <span className="hidden sm:inline text-white/30">•</span>
            <span className="hidden sm:inline text-slate-300 font-normal text-xs">
              Transparent Procurement-to-Pilot Rails (GFR 2017 Safe Harbor)
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-300 font-mono text-[11px]">
            {/* Mode Switcher */}
            {appMode === "demo" ? (
              <div className="flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] tracking-wider uppercase font-semibold flex items-center gap-1">
                  <PlayCircle className="h-3 w-3" />
                  Demo Mode
                </span>
                <button
                  onClick={() => setAppMode("real")}
                  className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-slate-200 text-[10px] tracking-wider font-semibold transition-colors"
                >
                  Exit Demo
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] tracking-wider uppercase font-semibold flex items-center gap-1">
                  <Database className="h-3 w-3" />
                  Real Mode ({isLiveDbConnected ? "Supabase Live" : "DB Offline"})
                </span>
                <button
                  onClick={() => setAppMode("demo")}
                  className="px-2 py-0.5 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-[10px] tracking-wider font-semibold transition-colors"
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
                aria-expanded={langDropdownOpen}
              >
                <Globe className="h-3 w-3 text-emerald-300" />
                <span>{currentLangOption.nativeLabel}</span>
                <ChevronDown className={`h-3 w-3 transition-transform ${langDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-1 w-48 bg-white text-[#141F2B] rounded-lg shadow-xl border border-[#E2DED6] py-1 z-50 animate-in fade-in duration-150">
                  <div className="px-3 py-1 text-[10px] uppercase font-mono font-bold tracking-wider text-[#7E8B97] border-b border-[#EDE9E1] mb-1">
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
                        className={`w-full flex items-center justify-between px-3 py-1.5 text-xs text-left transition-colors ${
                          isSelected 
                            ? "bg-[#EBF6F0] text-[#147452] font-bold" 
                            : "hover:bg-[#FAF8F5]"
                        }`}
                      >
                        <span>{lang.nativeLabel} ({lang.label})</span>
                        {isSelected && <Check className="h-3.5 w-3.5 text-[#147452]" />}
                      </button>
                    );
                  })}
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
          <button 
            onClick={clearRoleError}
            className="p-1 hover:bg-red-700 rounded text-white"
            title="Dismiss error"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* 2. MAIN HEADER WITH PROMINENT DASHBOARD SWITCHER */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E2DED6] shadow-2xs">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
          {/* Brand Logo & Title */}
          <div 
            className="flex items-center gap-3 cursor-pointer group shrink-0" 
            onClick={() => setActiveView("landing")}
            title="Go to Three Dashboards Hub"
          >
            <div className="w-9 h-9 rounded-md bg-[#0F3854] flex items-center justify-center text-white shadow-xs group-hover:bg-[#1D4E72] transition-colors">
              <span className="material-symbols-outlined text-[22px]">account_balance</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[18px] text-[#0A2540] tracking-tight">
                  GovInnovate
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#EBF6F0] text-[#147452] border border-[#C2E5D2] uppercase">
                  3 Dashboards
                </span>
              </div>
              <span className="text-[11px] text-[#5B6A78] tracking-wide hidden sm:inline">
                Public Procurement-to-Pilot Rails
              </span>
            </div>
          </div>

          {/* CENTER: THE EASY DASHBOARD SWITCH OPTION (PROMINENT!) */}
          <div className="flex-1 flex justify-center min-w-[280px] max-w-xl">
            <DashboardSwitcher variant="header" />
          </div>

          {/* RIGHT ACTIONS: BLOCKCHAIN SAFETY EXPLORER, AUTH, RESET */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Direct 1-Click Blockchain Safety & Ledger Explorer Button */}
            <button
              onClick={openBlockchainModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border bg-emerald-50 text-[#147452] border-emerald-300 hover:bg-emerald-100 shadow-2xs"
              title="Open Blockchain Proof of Data Safety & Smart Contract Registry"
            >
              <Blocks className="h-4 w-4 text-emerald-600" />
              <span className="hidden sm:inline">Blockchain Safety</span>
            </button>

            {/* User Session / Sign In Buttons */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                <div className="hidden md:flex flex-col text-right">
                  <span className="text-xs font-bold text-[#0A2540] truncate max-w-[130px]">
                    {currentUser.name}
                  </span>
                  <span className="text-[10px] text-[#5B6A78] font-mono uppercase">
                    {currentUser.role}
                  </span>
                </div>
                <button
                  onClick={logoutUser}
                  className="p-1.5 text-[#5B6A78] hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200"
                  title="Sign Out"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => openAuthModal("signin")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#141F2B] bg-white hover:bg-[#F2EFEB] rounded-lg border border-[#E2DED6] transition-colors"
                title="Sign in to your account"
              >
                <span className="material-symbols-outlined text-[16px] text-[#5B6A78]">login</span>
                <span>{t("nav.signIn")}</span>
              </button>
            )}

            {/* Quick Reset Demo */}
            {appMode === "demo" && (
              <button
                onClick={resetDemoAction}
                className="p-1.5 text-[#5B6A78] hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200"
                title={t("nav.resetDemo")}
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 3. SIMPLE, CLEAR PROCESS PROGRESSION BAR */}
      <div className="bg-[#0F3854] text-slate-200 px-4 py-1.5 border-b border-[#1D4E72] shadow-xs">
        <div className="max-w-[1360px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
          {/* Process Stepper */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto py-0.5 scrollbar-none">
            <span className="font-semibold text-slate-300 font-mono text-[11px] uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-emerald-400" />
              Process:
            </span>
            <ProcessRoadmap variant="compact-bar" />
          </div>

          {/* Quick Utility Links */}
          <div className="flex items-center gap-3 shrink-0 text-slate-300 text-xs font-mono">
            <button 
              onClick={() => setActiveView("audit_trail")}
              className={`hover:text-white transition-colors flex items-center gap-1 ${
                activeView === "audit_trail" ? "text-emerald-400 font-bold underline" : ""
              }`}
            >
              <History className="h-3 w-3" />
              <span>Audit Log</span>
            </button>
            <span className="text-white/20">|</span>
            <button 
              onClick={() => setActiveView("documents")}
              className={`hover:text-white transition-colors flex items-center gap-1 ${
                activeView === "documents" ? "text-emerald-400 font-bold underline" : ""
              }`}
            >
              <FileText className="h-3 w-3" />
              <span>Docs</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
