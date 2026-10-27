"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { DashboardSwitcher } from "@/components/DashboardSwitcher";
import { BlockchainSafetyBanner } from "@/components/BlockchainSafetyBanner";
import { ProcessRoadmap } from "@/components/ProcessRoadmap";
import { 
  Building2, 
  Rocket, 
  Award, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  AlertCircle,
  Blocks,
  CheckCircle2,
  FileCheck2,
  ExternalLink
} from "lucide-react";

export const LandingPage: React.FC = () => {
  const { 
    setRole, 
    setActiveView, 
    challenge, 
    applications, 
    startups, 
    pilot,
    openBlockchainModal
  } = useApp();

  const handleOpenDashboard = (targetRole: "government" | "startup" | "evaluator") => {
    setRole(targetRole);
    if (targetRole === "government") {
      setActiveView("gov_dashboard");
    } else if (targetRole === "startup") {
      setActiveView("startup_dashboard");
    } else {
      setActiveView("evaluator_dashboard");
    }
  };

  const approvedMilestones = pilot.milestones.filter(m => m.status === "Approved").length;
  const evaluatedCount = applications.filter(a => !!a.evaluatorScore).length;

  return (
    <div className="bg-[#FAF8F5] text-[#141F2B] font-sans min-h-screen pb-16">
      {/* 1. TOP WELCOME & STATUTORY BANNER */}
      <div className="bg-[#FEF7EA] border-b border-[#F0D598] py-2 px-4 sm:px-8">
        <div className="max-w-[1360px] mx-auto flex flex-wrap items-center justify-between text-xs text-[#8A5B0B] gap-2">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0 text-[#8A5B0B]" />
            <span>
              <strong>GFR Safe-Harbor Rails:</strong> Public sandbox prototype enabling 90-day evidence-backed pilots with DPIIT startup relaxations.
            </span>
          </div>
          <span className="font-mono text-[11px] font-bold bg-white/80 px-2 py-0.5 rounded border border-[#E2DED6] text-[#784A05]">
            GFR 2017 Rules 170(i) & 173
          </span>
        </div>
      </div>

      {/* 2. HERO HEADER */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 pt-8 pb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#E2DED6]">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#EBF6F0] text-[#147452] border border-[#C2E5D2] text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5" />
              <span>National Public Sector Innovation Rails</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0A2540] tracking-tight">
              Three Stakeholder Dashboards
            </h1>
            <p className="text-sm sm:text-base text-[#5B6A78] max-w-2xl leading-relaxed">
              Explore how Government Departments, Verified Startups, and Independent Evaluators collaborate seamlessly across the 90-day sandbox procurement lifecycle.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => handleOpenDashboard("government")}
              className="px-4 py-2.5 rounded-lg bg-[#0F3854] text-white text-xs font-bold hover:bg-[#1D4E72] transition-colors shadow-xs flex items-center gap-2"
            >
              <Building2 className="h-4 w-4 text-emerald-300" />
              <span>Open Gov Desk</span>
            </button>
            <button
              onClick={() => handleOpenDashboard("startup")}
              className="px-4 py-2.5 rounded-lg bg-[#147452] text-white text-xs font-bold hover:bg-[#0f583e] transition-colors shadow-xs flex items-center gap-2"
            >
              <Rocket className="h-4 w-4 text-emerald-200" />
              <span>Open Startup Hub</span>
            </button>
            <button
              onClick={() => handleOpenDashboard("evaluator")}
              className="px-4 py-2.5 rounded-lg bg-[#8A5B0B] text-white text-xs font-bold hover:bg-[#6c4708] transition-colors shadow-xs flex items-center gap-2"
            >
              <Award className="h-4 w-4 text-amber-200" />
              <span>Open Evaluator Panel</span>
            </button>
          </div>
        </div>

        {/* 3. PROMINENT EASY DASHBOARD SWITCH OPTION BAR */}
        <div className="pt-6 space-y-4">
          <DashboardSwitcher variant="prominent" />
          <BlockchainSafetyBanner />
        </div>
      </div>

      {/* 4. THREE DASHBOARD OVERVIEW CARDS (FRONT & CENTER - 1-CLICK DIRECT NAVIGATION) */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Government Dashboard */}
          <div 
            onClick={() => handleOpenDashboard("government")}
            className="rounded-xl border border-[#0F3854]/40 hover:border-[#0F3854] p-6 flex flex-col justify-between transition-all cursor-pointer relative bg-white hover:shadow-md group ring-1 ring-[#0F3854]/10"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-lg bg-[#F2EFEB] text-[#0F3854] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Building2 className="h-6 w-6" />
                </div>
                <span className="text-[11px] font-mono font-bold uppercase px-2.5 py-1 rounded bg-[#F2EFEB] text-[#0F3854] border border-[#E2DED6]">
                  Role: Government
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#0A2540] group-hover:text-[#0F3854] transition-colors">
                  1. Government Dashboard
                </h3>
                <p className="text-xs text-[#5B6A78] mt-1.5 leading-relaxed">
                  Procurement desk to formulate problem statements, review incoming startup proposals, sanction 90-day sandbox pilots, and approve scale-up decisions.
                </p>
              </div>

              {/* Live Metric Snippets */}
              <div className="bg-[#FAF8F5] rounded-lg p-3 border border-[#E2DED6] space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-[#5B6A78]">
                  <span>Active Challenge:</span>
                  <span className="font-bold text-[#0A2540] truncate max-w-[140px]">{challenge.title.slice(0, 18)}...</span>
                </div>
                <div className="flex justify-between text-[#5B6A78]">
                  <span>Bids Received:</span>
                  <span className="font-bold text-[#0F3854]">{applications.length} Startups</span>
                </div>
                <div className="flex justify-between text-[#5B6A78]">
                  <span>Milestones Cleared:</span>
                  <span className="font-bold text-[#147452]">{approvedMilestones} / {pilot.milestones.length} Gates</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-[#EDE9E1]">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenDashboard("government");
                }}
                className="w-full py-2.5 px-4 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 bg-[#0F3854] text-white hover:bg-[#1D4E72] shadow-xs"
              >
                <span>Enter Government Desk</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: Startup Dashboard */}
          <div 
            onClick={() => handleOpenDashboard("startup")}
            className="rounded-xl border border-[#147452]/40 hover:border-[#147452] p-6 flex flex-col justify-between transition-all cursor-pointer relative bg-white hover:shadow-md group ring-1 ring-[#147452]/10"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-lg bg-[#EBF6F0] text-[#147452] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Rocket className="h-6 w-6" />
                </div>
                <span className="text-[11px] font-mono font-bold uppercase px-2.5 py-1 rounded bg-[#EBF6F0] text-[#147452] border border-[#C2E5D2]">
                  Role: Startup
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#0A2540] group-hover:text-[#147452] transition-colors">
                  2. Startup Dashboard
                </h3>
                <p className="text-xs text-[#5B6A78] mt-1.5 leading-relaxed">
                  Innovator workspace to discover matched challenges, submit bids with DPIIT turnover relaxations, and upload cryptographic milestone telemetry.
                </p>
              </div>

              {/* Live Metric Snippets */}
              <div className="bg-[#FAF8F5] rounded-lg p-3 border border-[#E2DED6] space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-[#5B6A78]">
                  <span>DPIIT Recognition:</span>
                  <span className="font-bold text-[#147452] flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3" /> Verified
                  </span>
                </div>
                <div className="flex justify-between text-[#5B6A78]">
                  <span>Submitted Bid:</span>
                  <span className="font-bold text-[#0A2540]">
                    {applications.find(a => a.challengeId === challenge.id)?.startupName || "AquaSense AI (Under Review)"}
                  </span>
                </div>
                <div className="flex justify-between text-[#5B6A78]">
                  <span>Active Milestone:</span>
                  <span className="font-bold text-[#8A5B0B]">M-02 Sensor Calibrations</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-[#EDE9E1]">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenDashboard("startup");
                }}
                className="w-full py-2.5 px-4 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 bg-[#147452] text-white hover:bg-[#0f583e] shadow-xs"
              >
                <span>Enter Startup Hub</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3: Evaluator Dashboard */}
          <div 
            onClick={() => handleOpenDashboard("evaluator")}
            className="rounded-xl border border-[#8A5B0B]/40 hover:border-[#8A5B0B] p-6 flex flex-col justify-between transition-all cursor-pointer relative bg-white hover:shadow-md group ring-1 ring-[#8A5B0B]/10"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-lg bg-[#FEF7EA] text-[#8A5B0B] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Award className="h-6 w-6" />
                </div>
                <span className="text-[11px] font-mono font-bold uppercase px-2.5 py-1 rounded bg-[#FEF7EA] text-[#8A5B0B] border border-[#F0D598]">
                  Role: Evaluator
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#0A2540] group-hover:text-[#8A5B0B] transition-colors">
                  3. Evaluator Dashboard
                </h3>
                <p className="text-xs text-[#5B6A78] mt-1.5 leading-relaxed">
                  Standing technical committee panel to score proposals across the 5 pillars (Innovation, Feasibility, Impact, Scalability, Viability) and audit evidence.
                </p>
              </div>

              {/* Live Metric Snippets */}
              <div className="bg-[#FAF8F5] rounded-lg p-3 border border-[#E2DED6] space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-[#5B6A78]">
                  <span>Assigned Reviews:</span>
                  <span className="font-bold text-[#0A2540]">{applications.length} Submissions</span>
                </div>
                <div className="flex justify-between text-[#5B6A78]">
                  <span>Scored Completed:</span>
                  <span className="font-bold text-[#147452]">{evaluatedCount} Bids</span>
                </div>
                <div className="flex justify-between text-[#5B6A78]">
                  <span>Scoring Rubric:</span>
                  <span className="font-bold text-[#8A5B0B]">5-Pillar (100 Pts)</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-[#EDE9E1]">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenDashboard("evaluator");
                }}
                className="w-full py-2.5 px-4 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 bg-[#8A5B0B] text-white hover:bg-[#6c4708] shadow-xs"
              >
                <span>Enter Evaluator Panel</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CLEAR, SIMPLE 6-STEP PROCESS ROADMAP */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-8 py-8">
        <ProcessRoadmap variant="full-cards" />
      </section>

      {/* 6. QUICK NAVIGATION BAR TO COMPLETE SANDBOX WORKFLOW */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-8 pt-4">
        <div className="bg-white rounded-xl border border-[#E2DED6] p-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-[#0A2540]">
              Ready to execute an action?
            </h4>
            <p className="text-xs text-[#5B6A78]">
              Switch into any dashboard above or jump to a specific procurement phase directly.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setRole("government");
                setActiveView("create_challenge");
              }}
              className="px-3.5 py-2 rounded-lg text-xs font-bold bg-[#FAF8F5] hover:bg-[#F2EFEB] text-[#0F3854] border border-[#E2DED6] transition-colors"
            >
              + Create Challenge
            </button>
            <button
              onClick={() => {
                setRole("startup");
                setActiveView("startup_dashboard");
              }}
              className="px-3.5 py-2 rounded-lg text-xs font-bold bg-[#FAF8F5] hover:bg-[#F2EFEB] text-[#147452] border border-[#E2DED6] transition-colors"
            >
              Submit Bid Proposal
            </button>
            <button
              onClick={() => {
                setRole("evaluator");
                setActiveView("evaluation_scorecard");
              }}
              className="px-3.5 py-2 rounded-lg text-xs font-bold bg-[#FAF8F5] hover:bg-[#F2EFEB] text-[#8A5B0B] border border-[#E2DED6] transition-colors"
            >
              Score Applications
            </button>
            <button
              onClick={openBlockchainModal}
              className="px-3.5 py-2 rounded-lg text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-[#147452] border border-emerald-300 transition-colors flex items-center gap-1.5"
            >
              <Blocks className="h-3.5 w-3.5 text-emerald-600" />
              <span>Verify Blockchain</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
