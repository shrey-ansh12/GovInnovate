"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { Building2, Rocket, Award, Layers } from "lucide-react";

interface DashboardSwitcherProps {
  variant?: "header" | "card" | "prominent";
  className?: string;
}

export const DashboardSwitcher: React.FC<DashboardSwitcherProps> = ({ 
  variant = "prominent",
  className = "" 
}) => {
  const { role, setRole, activeView, setActiveView } = useApp();

  const isGovActive = activeView === "gov_dashboard";
  const isStartupActive = activeView === "startup_dashboard";
  const isEvaluatorActive = activeView === "evaluator_dashboard";
  const isHubActive = activeView === "landing";

  const switchToGov = () => {
    setRole("government");
    setActiveView("gov_dashboard");
  };

  const switchToStartup = () => {
    setRole("startup");
    setActiveView("startup_dashboard");
  };

  const switchToEvaluator = () => {
    setRole("evaluator");
    setActiveView("evaluator_dashboard");
  };

  const switchToHub = () => {
    setActiveView("landing");
  };

  if (variant === "header") {
    return (
      <div className={`inline-flex items-center p-1 bg-[#F2EFEB] rounded-lg border border-[#E2DED6] shadow-xs gap-1 ${className}`}>
        <button
          onClick={switchToHub}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-bold transition-all ${
            isHubActive
              ? "bg-[#0A2540] text-white shadow-xs"
              : "text-[#5B6A78] hover:text-[#0A2540] hover:bg-white/60"
          }`}
          title="View all 3 Dashboards in Hub"
        >
          <Layers className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">3-Dashboards Hub</span>
        </button>

        <button
          onClick={switchToGov}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
            isGovActive
              ? "bg-[#0F3854] text-white shadow-xs"
              : "text-[#5B6A78] hover:text-[#0A2540] hover:bg-white/60"
          }`}
          title="Switch to Government Dashboard"
        >
          <Building2 className="h-3.5 w-3.5" />
          <span>Government</span>
          {isGovActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
        </button>

        <button
          onClick={switchToStartup}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
            isStartupActive
              ? "bg-[#147452] text-white shadow-xs"
              : "text-[#5B6A78] hover:text-[#0A2540] hover:bg-white/60"
          }`}
          title="Switch to Startup Dashboard"
        >
          <Rocket className="h-3.5 w-3.5" />
          <span>Startup</span>
          {isStartupActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
        </button>

        <button
          onClick={switchToEvaluator}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
            isEvaluatorActive
              ? "bg-[#8A5B0B] text-white shadow-xs"
              : "text-[#5B6A78] hover:text-[#0A2540] hover:bg-white/60"
          }`}
          title="Switch to Evaluator Dashboard"
        >
          <Award className="h-3.5 w-3.5" />
          <span>Evaluator</span>
          {isEvaluatorActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
        </button>
      </div>
    );
  }

  return (
    <div className={`w-full bg-white rounded-xl border border-[#E2DED6] p-2 sm:p-2.5 shadow-sm ${className}`}>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2 px-2 text-xs font-mono font-semibold text-[#5B6A78] uppercase tracking-wider shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#147452] animate-pulse"></span>
          <span>Quick Switch Dashboard:</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 w-full sm:w-auto">
          {/* Hub Overview Tab */}
          <button
            onClick={switchToHub}
            className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
              isHubActive
                ? "bg-[#0A2540] text-white shadow-sm ring-2 ring-[#0A2540]/20"
                : "bg-[#FAF8F5] text-[#5B6A78] hover:text-[#0A2540] hover:bg-[#F2EFEB] border border-[#E2DED6]"
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Hub Overview</span>
          </button>

          {/* Government Tab */}
          <button
            onClick={switchToGov}
            className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
              isGovActive
                ? "bg-[#0F3854] text-white shadow-sm ring-2 ring-[#0F3854]/20"
                : "bg-[#FAF8F5] text-[#5B6A78] hover:text-[#0A2540] hover:bg-[#F2EFEB] border border-[#E2DED6]"
            }`}
          >
            <Building2 className="h-3.5 w-3.5" />
            <span>1. Government</span>
            {isGovActive && (
              <span className="px-1.5 py-0.2 rounded-full text-[9px] font-mono bg-emerald-400 text-[#0F3854] font-bold">
                ACTIVE
              </span>
            )}
          </button>

          {/* Startup Tab */}
          <button
            onClick={switchToStartup}
            className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
              isStartupActive
                ? "bg-[#147452] text-white shadow-sm ring-2 ring-[#147452]/20"
                : "bg-[#FAF8F5] text-[#5B6A78] hover:text-[#0A2540] hover:bg-[#F2EFEB] border border-[#E2DED6]"
            }`}
          >
            <Rocket className="h-3.5 w-3.5" />
            <span>2. Startup</span>
            {isStartupActive && (
              <span className="px-1.5 py-0.2 rounded-full text-[9px] font-mono bg-emerald-200 text-[#147452] font-bold">
                ACTIVE
              </span>
            )}
          </button>

          {/* Evaluator Tab */}
          <button
            onClick={switchToEvaluator}
            className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
              isEvaluatorActive
                ? "bg-[#8A5B0B] text-white shadow-sm ring-2 ring-[#8A5B0B]/20"
                : "bg-[#FAF8F5] text-[#5B6A78] hover:text-[#0A2540] hover:bg-[#F2EFEB] border border-[#E2DED6]"
            }`}
          >
            <Award className="h-3.5 w-3.5" />
            <span>3. Evaluator</span>
            {isEvaluatorActive && (
              <span className="px-1.5 py-0.2 rounded-full text-[9px] font-mono bg-amber-200 text-[#8A5B0B] font-bold">
                ACTIVE
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
