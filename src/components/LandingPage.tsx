"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { DashboardSwitcher } from "@/components/DashboardSwitcher";
import { ProcessRoadmap } from "@/components/ProcessRoadmap";
import { TextToSpeechButton } from "@/components/TextToSpeechButton";
import { 
  Building2, 
  Rocket, 
  Award, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  Blocks,
  CheckCircle2,
  Lock,
  FileCheck
} from "lucide-react";

export const LandingPage: React.FC = () => {
  const { 
    setRole, 
    setActiveView, 
    challenge, 
    applications, 
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
      {/* 1. HERO SECTION (CLEAN & SIMPLE) */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-8 pt-10 pb-6">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF6F0] text-[#147452] border border-[#C2E5D2] text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>National Public Sector Innovation Rails</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#0A2540] tracking-tight">
            Public Innovation, Made Simple.
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <p className="text-base sm:text-lg text-[#5B6A78] leading-relaxed">
              One unified platform with three dedicated workspaces for <strong>Government</strong>, <strong>Startups</strong>, and <strong>Evaluators</strong> to test and scale civic solutions in 90 days.
            </p>
            <div className="shrink-0">
              <TextToSpeechButton text="Welcome to GovInnovate. One unified platform with three dedicated workspaces for Government, Startups, and Evaluators to test and scale civic solutions in 90 days." label="Listen" />
            </div>
          </div>
        </div>

        {/* 2. PROMINENT ONE-CLICK SWITCHER BAR */}
        <div className="max-w-2xl mx-auto mb-10">
          <DashboardSwitcher variant="prominent" />
        </div>

        {/* 3. THREE MAIN STAKEHOLDER CARDS (FRONT & CENTER) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1: Government Desk */}
          <div 
            onClick={() => handleOpenDashboard("government")}
            className="bg-white rounded-2xl border-2 border-[#E2DED6] hover:border-[#0F3854] p-7 flex flex-col justify-between transition-all cursor-pointer shadow-xs hover:shadow-lg group"
          >
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#0F3854]/10 text-[#0F3854] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Building2 className="h-7 w-7 text-[#0F3854]" />
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#0F3854]/10 text-[#0F3854]">
                  Step 1 & 4 & 6
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-[#0A2540] group-hover:text-[#0F3854] transition-colors">
                  1. Government Desk
                </h3>
                <p className="text-sm text-[#5B6A78] mt-2 leading-relaxed">
                  Post civic challenges, review incoming startup bids, commission 90-day sandbox pilots, and approve departmental scale-ups.
                </p>
              </div>

              {/* Simple metrics summary */}
              <div className="bg-[#FAF8F5] rounded-xl p-4 border border-[#E2DED6] space-y-2 text-xs">
                <div className="flex justify-between items-center text-[#5B6A78]">
                  <span>Active Challenge:</span>
                  <span className="font-bold text-[#0A2540] truncate max-w-[160px]">{challenge.title}</span>
                </div>
                <div className="flex justify-between items-center text-[#5B6A78]">
                  <span>Bids Received:</span>
                  <span className="font-bold text-[#0F3854]">{applications.length} Startups</span>
                </div>
                <div className="flex justify-between items-center text-[#5B6A78]">
                  <span>Pilot Progress:</span>
                  <span className="font-bold text-[#147452]">{approvedMilestones} of {pilot.milestones.length} Gates Approved</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-[#EDE9E1]">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenDashboard("government");
                }}
                className="w-full py-3.5 px-5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 bg-[#0F3854] text-white hover:bg-[#1D4E72] shadow-sm"
              >
                <span>Enter Government Desk</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Card 2: Startup Workspace */}
          <div 
            onClick={() => handleOpenDashboard("startup")}
            className="bg-white rounded-2xl border-2 border-[#E2DED6] hover:border-[#147452] p-7 flex flex-col justify-between transition-all cursor-pointer shadow-xs hover:shadow-lg group"
          >
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#147452]/10 text-[#147452] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Rocket className="h-7 w-7 text-[#147452]" />
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#147452]/10 text-[#147452]">
                  Step 2 & 5
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-[#0A2540] group-hover:text-[#147452] transition-colors">
                  2. Startup Hub
                </h3>
                <p className="text-sm text-[#5B6A78] mt-2 leading-relaxed">
                  Browse open public challenges, submit proposals with statutory DPIIT relaxations, and upload pilot sensor telemetry.
                </p>
              </div>

              {/* Simple metrics summary */}
              <div className="bg-[#FAF8F5] rounded-xl p-4 border border-[#E2DED6] space-y-2 text-xs">
                <div className="flex justify-between items-center text-[#5B6A78]">
                  <span>DPIIT Status:</span>
                  <span className="font-bold text-[#147452] flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5" /> Verified & Eligible
                  </span>
                </div>
                <div className="flex justify-between items-center text-[#5B6A78]">
                  <span>Tender Relaxations:</span>
                  <span className="font-bold text-[#0A2540]">Turnover & Prior Exp. Exempt</span>
                </div>
                <div className="flex justify-between items-center text-[#5B6A78]">
                  <span>Submitted Bid:</span>
                  <span className="font-bold text-[#147452]">AquaSense AI (Sealed on Blockchain)</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-[#EDE9E1]">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenDashboard("startup");
                }}
                className="w-full py-3.5 px-5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 bg-[#147452] text-white hover:bg-[#0f583e] shadow-sm"
              >
                <span>Enter Startup Hub</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Card 3: Evaluator Panel */}
          <div 
            onClick={() => handleOpenDashboard("evaluator")}
            className="bg-white rounded-2xl border-2 border-[#E2DED6] hover:border-[#8A5B0B] p-7 flex flex-col justify-between transition-all cursor-pointer shadow-xs hover:shadow-lg group"
          >
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#8A5B0B]/10 text-[#8A5B0B] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Award className="h-7 w-7 text-[#8A5B0B]" />
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#8A5B0B]/10 text-[#8A5B0B]">
                  Step 3 & 5
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-[#0A2540] group-hover:text-[#8A5B0B] transition-colors">
                  3. Evaluator Panel
                </h3>
                <p className="text-sm text-[#5B6A78] mt-2 leading-relaxed">
                  Standing technical committee workspace to score proposals across the 5 pillars (Innovation, Feasibility, Impact, Scalability, Viability).
                </p>
              </div>

              {/* Simple metrics summary */}
              <div className="bg-[#FAF8F5] rounded-xl p-4 border border-[#E2DED6] space-y-2 text-xs">
                <div className="flex justify-between items-center text-[#5B6A78]">
                  <span>Assigned Reviews:</span>
                  <span className="font-bold text-[#0A2540]">{applications.length} Submissions</span>
                </div>
                <div className="flex justify-between items-center text-[#5B6A78]">
                  <span>Scored Completed:</span>
                  <span className="font-bold text-[#147452]">{evaluatedCount} Bids</span>
                </div>
                <div className="flex justify-between items-center text-[#5B6A78]">
                  <span>Scoring Standard:</span>
                  <span className="font-bold text-[#8A5B0B]">5-Pillar Matrix (100 Pts)</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-[#EDE9E1]">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenDashboard("evaluator");
                }}
                className="w-full py-3.5 px-5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 bg-[#8A5B0B] text-white hover:bg-[#6c4708] shadow-sm"
              >
                <span>Enter Evaluator Panel</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 4. CLEAR 6-STEP PROCESS ROADMAP */}
        <div className="mb-12">
          <ProcessRoadmap variant="full-cards" />
        </div>

        {/* 5. INSTITUTIONAL AUDIT TRAIL & DATA INTEGRITY */}
        <div className="bg-white rounded-2xl border border-[#E2DED6] p-6 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-xs">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#147452] bg-[#EBF6F0] px-2.5 py-1 rounded-md border border-[#C2E5D2]">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Institutional Compliance & Verification</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#0A2540]">
              Cryptographic Audit Trail & Data Integrity
            </h3>
            <p className="text-xs sm:text-sm text-[#5B6A78] leading-relaxed">
              Procurement notices, startup proposals, and evaluation scorecards are timestamped with SHA-256 cryptographic hashes for full transparency and zero tampering.
            </p>
          </div>

          <button
            onClick={openBlockchainModal}
            className="px-4 py-2.5 rounded-xl border border-[#D5D0C7] bg-[#FAF8F5] hover:bg-[#F0EDE6] text-[#0A2540] font-semibold text-xs flex items-center gap-2 transition-colors shrink-0 shadow-xs"
          >
            <FileCheck className="h-4 w-4 text-[#147452]" />
            <span>View Audit Ledger</span>
          </button>
        </div>
      </section>
    </div>
  );
};
