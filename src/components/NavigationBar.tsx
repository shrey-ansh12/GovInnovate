"use client";

import React from "react";
import { useApp, ActiveView } from "@/context/AppContext";
import { 
  Building2, 
  Rocket, 
  Award, 
  Layers, 
  ChevronRight, 
  RotateCcw,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  FileText,
  BarChart3,
  Scale,
  LogIn,
  UserPlus,
  User,
  LogOut
} from "lucide-react";

export const NavigationBar: React.FC = () => {
  const { 
    role, 
    setRole, 
    activeView, 
    setActiveView, 
    resetDemoAction, 
    challenge,
    currentUser,
    openAuthModal,
    logoutUser
  } = useApp();

  const getRoleBadge = () => {
    switch (role) {
      case "government":
        return { label: "Department Administrator", color: "bg-blue-600 text-white", icon: Building2 };
      case "startup":
        return { label: "DPIIT Verified Startup", color: "bg-emerald-600 text-white", icon: Rocket };
      case "evaluator":
        return { label: "Expert Technical Panel", color: "bg-amber-600 text-white", icon: Award };
    }
  };

  const roleInfo = getRoleBadge();
  const RoleIcon = roleInfo.icon;

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
                  GovInnovate
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                  GovTech Sandbox
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Public Procurement Mechanism for Startups</p>
            </div>
          </div>

          {/* Quick Scenario Status Bar */}
          <div className="hidden xl:flex items-center gap-2 bg-slate-100/80 px-3 py-1.5 rounded-full border border-slate-200/80 text-xs text-slate-600">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-semibold text-slate-800">Demo Scenario:</span>
            <span className="truncate max-w-[180px] text-slate-600 font-medium">{challenge.title.slice(0, 26)}...</span>
            <span className="text-slate-300">|</span>
            <span className="font-bold text-blue-700 uppercase text-[10px] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              Stage: {challenge.status}
            </span>
          </div>

          {/* Sign In, Sign Up, & Role Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Direct Sign In & Sign Up Links / Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => openAuthModal("signin")}
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:text-blue-700 hover:bg-slate-100 border border-slate-200 transition-colors flex items-center gap-1.5 shadow-2xs"
                title="Sign in to your account"
              >
                <LogIn className="h-3.5 w-3.5 text-blue-600" />
                <span>Sign In</span>
              </button>

              <div className="relative group">
                <button
                  onClick={() => openAuthModal("signup", "startup")}
                  className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all"
                  title="Register new Startup"
                >
                  <Rocket className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Register Startup</span>
                  <span className="sm:hidden">Register</span>
                </button>
              </div>

              <button
                onClick={() => openAuthModal("signup", "government")}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold transition-colors"
                title="Register Government Officer"
              >
                <Building2 className="h-3.5 w-3.5 text-blue-600" />
                <span>Govt Sign Up</span>
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
                <span>Govt</span>
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
                <span>Startup</span>
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
                <span>Eval</span>
              </button>
            </div>

            {/* Quick Reset Demo */}
            <button
              onClick={resetDemoAction}
              className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200"
              title="Reset Demo to Initial State"
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
            <Sparkles className="h-3.5 w-3.5 text-yellow-400" /> Procurement Flow:
          </span>
          <div className="flex items-center gap-2">
            <NavPill label="1. Landing" active={activeView === "landing"} onClick={() => setActiveView("landing")} />
            <span className="text-slate-600">→</span>
            <NavPill label="2. Gov Dashboard" active={activeView === "gov_dashboard"} onClick={() => { setRole("government"); setActiveView("gov_dashboard"); }} />
            <span className="text-slate-600">→</span>
            <NavPill label="3. Create Challenge" active={activeView === "create_challenge"} onClick={() => { setRole("government"); setActiveView("create_challenge"); }} />
            <span className="text-slate-600">→</span>
            <NavPill label="4. AI Startup Matches" active={activeView === "ai_startup_matches"} onClick={() => setActiveView("ai_startup_matches")} />
            <span className="text-slate-600">→</span>
            <NavPill label="5. Startup Profile" active={activeView === "startup_profile"} onClick={() => setActiveView("startup_profile")} />
            <span className="text-slate-600">→</span>
            <NavPill label="6. Startup Dashboard" active={activeView === "startup_dashboard"} onClick={() => { setRole("startup"); setActiveView("startup_dashboard"); }} />
            <span className="text-slate-600">→</span>
            <NavPill label="7. Review & Shortlist" active={activeView === "application_review"} onClick={() => { setRole("government"); setActiveView("application_review"); }} />
            <span className="text-slate-600">→</span>
            <NavPill label="8. Evaluator Scorecard" active={activeView === "evaluation_scorecard"} onClick={() => { setRole("evaluator"); setActiveView("evaluation_scorecard"); }} />
            <span className="text-slate-600">→</span>
            <NavPill label="9. 90-Day Pilot" active={activeView === "pilot_management"} onClick={() => setActiveView("pilot_management")} />
            <span className="text-slate-600">→</span>
            <NavPill label="10. KPI Dashboard" active={activeView === "kpi_monitoring"} onClick={() => setActiveView("kpi_monitoring")} />
            <span className="text-slate-600">→</span>
            <NavPill label="11. Validation Report" active={activeView === "validation_report"} onClick={() => setActiveView("validation_report")} />
            <span className="text-slate-600">→</span>
            <NavPill label="12. Procurement Approval" active={activeView === "procurement_recommendation"} onClick={() => setActiveView("procurement_recommendation")} />
            <span className="text-slate-600">→</span>
            <NavPill label="13. Scale-Up (50 Locs)" active={activeView === "scale_up"} onClick={() => setActiveView("scale_up")} />
            <span className="text-slate-600">|</span>
            <NavPill label="Audit Trail" active={activeView === "audit_trail"} onClick={() => setActiveView("audit_trail")} />
            <NavPill label="Documents" active={activeView === "documents"} onClick={() => setActiveView("documents")} />
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
