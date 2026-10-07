"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { 
  Building2, 
  Rocket, 
  Award, 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  Sparkles, 
  BarChart, 
  Layers, 
  TrendingUp, 
  CheckCircle2, 
  Zap,
  Globe2,
  FileCheck2,
  Clock,
  LogIn,
  UserPlus
} from "lucide-react";

export const LandingPage: React.FC = () => {
  const { setActiveView, setRole, openAuthModal } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white pt-20 pb-28 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            National Innovation Sandbox & Procurement Framework
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Startup-Friendly Public Procurement,{" "}
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-teal-300 bg-clip-text text-transparent">
              Streamlined & Scaled.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            GovInnovate enables government departments to rapidly identify, sandbox pilot, evaluate, and scale innovative solutions from DPIIT-recognized startups with automated eligibility, AI matching, and transparent KPI monitoring.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => { setRole("government"); setActiveView("create_challenge"); }}
              className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-500/30 flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              <Building2 className="h-4 w-4" />
              Launch Sample Jal Shakti Challenge
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={() => { setRole("startup"); setActiveView("startup_dashboard"); }}
              className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-sm flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              <Rocket className="h-4 w-4 text-emerald-400" />
              Enter as AquaSense Startup (94% Match)
            </button>

            <button
              onClick={() => { setRole("evaluator"); setActiveView("evaluation_scorecard"); }}
              className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-sm flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              <Award className="h-4 w-4 text-amber-400" />
              Technical Evaluator Panel
            </button>
          </div>

          {/* Quick Registration & Sign In Links Bar */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs">
            <span className="text-slate-400 font-semibold flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-sky-400" />
              Official Portal Access:
            </span>
            <button
              onClick={() => openAuthModal("signup", "startup")}
              className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 font-bold flex items-center gap-1.5 transition-all shadow-xs"
            >
              <Rocket className="h-3.5 w-3.5" />
              Register DPIIT Startup
            </button>
            <button
              onClick={() => openAuthModal("signup", "government")}
              className="px-3.5 py-1.5 rounded-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/40 font-bold flex items-center gap-1.5 transition-all shadow-xs"
            >
              <Building2 className="h-3.5 w-3.5" />
              Govt Officer Sign Up
            </button>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <button
              onClick={() => openAuthModal("signin")}
              className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold flex items-center gap-1.5 transition-all"
            >
              <LogIn className="h-3.5 w-3.5 text-sky-400" />
              Sign In to Account
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-slate-800/80">
            <div>
              <p className="text-3xl font-bold text-white">90 Days</p>
              <p className="text-xs text-slate-400 mt-1">Average Pilot Duration</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-emerald-400">94% Match</p>
              <p className="text-xs text-slate-400 mt-1">AI Semantic Startup Matching</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-400">10x Scale</p>
              <p className="text-xs text-slate-400 mt-1">From 5 Pilot Sites to 50 Zones</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-teal-300">GFR 149/170</p>
              <p className="text-xs text-slate-400 mt-1">Zero Turnover Penalty Exemption</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 User Roles Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Government Role */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200/80 hover:border-blue-500/50 transition-all flex flex-col justify-between">
            <div>
              <div className="h-12 w-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                <Building2 className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Government Departments</h3>
              <p className="text-xs text-blue-600 font-semibold uppercase mt-0.5">Problem Owner & Procuring Entity</p>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                Publish unstructured departmental pain points. AI auto-converts them into standardized challenge briefs, matches eligible DPIIT startups, manages 90-day pilots, and triggers direct commercial scale-up orders.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-blue-600" /> AI Challenge Generator</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-blue-600" /> Live Pilot KPI Telemetry</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-blue-600" /> Fast-track Scale-up Sanctions</li>
              </ul>
            </div>
            <div className="mt-6 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openAuthModal("signin", "government")}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <LogIn className="h-3.5 w-3.5" /> Officer Sign In
                </button>
                <button
                  onClick={() => openAuthModal("signup", "government")}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <UserPlus className="h-3.5 w-3.5" /> Sign Up
                </button>
              </div>
              <button
                onClick={() => { setRole("government"); setActiveView("gov_dashboard"); }}
                className="w-full py-1.5 text-center text-[11px] text-slate-500 hover:text-blue-600 font-medium transition-colors"
              >
                Or enter demo government portal →
              </button>
            </div>
          </div>

          {/* Startup Role */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200/80 hover:border-emerald-500/50 transition-all flex flex-col justify-between">
            <div>
              <div className="h-12 w-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <Rocket className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Eligible Startups</h3>
              <p className="text-xs text-emerald-600 font-semibold uppercase mt-0.5">DPIIT Verified Innovator</p>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                Access curated public challenges without onerous pre-requisites. Benefit from GFR exemptions for prior turnover and experience, deploy paid pilots, and receive guaranteed procurement upon KPI success.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> 1-Click DPIIT Status Sync</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> AI Proposal Summarizer</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Milestone Milestone Payouts</li>
              </ul>
            </div>
            <div className="mt-6 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openAuthModal("signup", "startup")}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Rocket className="h-3.5 w-3.5" /> Register Startup
                </button>
                <button
                  onClick={() => openAuthModal("signin", "startup")}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <LogIn className="h-3.5 w-3.5" /> Sign In
                </button>
              </div>
              <button
                onClick={() => { setRole("startup"); setActiveView("startup_dashboard"); }}
                className="w-full py-1.5 text-center text-[11px] text-slate-500 hover:text-emerald-700 font-medium transition-colors"
              >
                Or enter demo AquaSense portal →
              </button>
            </div>
          </div>

          {/* Evaluator Role */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200/80 hover:border-amber-500/50 transition-all flex flex-col justify-between">
            <div>
              <div className="h-12 w-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Technical Evaluators</h3>
              <p className="text-xs text-amber-600 font-semibold uppercase mt-0.5">Independent Expert Board</p>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                Score bids rigorously on 6 pillars: Innovation, Feasibility, Impact, Scalability, Cost, and Security. Add qualitative feedback, benchmark against AI risk flags, and recommend sandbox pilots.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-amber-600" /> Weighted 6-Pillar Scorecard</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-amber-600" /> AI Risk & Technology Flagging</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-amber-600" /> Tamper-evident Audit Logging</li>
              </ul>
            </div>
            <button
              onClick={() => { setRole("evaluator"); setActiveView("evaluator_dashboard"); }}
              className="mt-6 w-full py-2.5 px-4 rounded-xl bg-amber-50 text-amber-700 hover:bg-amber-600 hover:text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
            >
              Open Evaluator Board <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Prototype Scenario Highlights Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400 bg-sky-950/80 px-3 py-1 rounded-full border border-sky-400/30">
              Interactive Prototype Scenario
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-4">
              AI-Based Water Quality Monitoring Pilot Flow
            </h2>
            <p className="text-sm text-slate-300 mt-3 leading-relaxed">
              Step through the full innovation lifecycle: Ministry of Jal Shakti posts the problem → GovInnovate AI finds 12 startups → AquaSense AI matches with 94% score → Proposal verified & evaluated at 95/100 → 90-day pilot across 5 municipal sites → Validation confirmed at 96.4 score → Immediate Scale-Up to 50 distribution zones sanctioned.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => { setRole("government"); setActiveView("create_challenge"); }}
                className="px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
              >
                Start Demo Walkthrough <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setActiveView("audit_trail")}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-all flex items-center gap-2"
              >
                Inspect Tamper-Proof Audit Trail
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
