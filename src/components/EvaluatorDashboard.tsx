"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { DashboardSwitcher } from "@/components/DashboardSwitcher";
import { BlockchainSafetyBanner } from "@/components/BlockchainSafetyBanner";
import { 
  Award,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Blocks,
  FileText,
  UserCheck
} from "lucide-react";

export const EvaluatorDashboard: React.FC = () => {
  const { applications, setActiveView, setSelectedAppIdForScore, openBlockchainModal } = useApp();

  const evaluatedCount = applications.filter(a => !!a.evaluatorScore).length;
  const pendingCount = applications.length - evaluatedCount;

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-8 py-8 font-sans space-y-6">
      {/* 1. EASY DASHBOARD SWITCH OPTION */}
      <DashboardSwitcher />

      {/* 2. BLOCKCHAIN DATA SAFETY BANNER */}
      <BlockchainSafetyBanner />

      {/* 3. EVALUATOR TOP BANNER */}
      <div className="bg-[#0F3854] text-white rounded-xl p-6 sm:p-8 border border-[#1D4E72] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-emerald-400 uppercase tracking-wider mb-2">
            <Award className="h-4 w-4" />
            Independent Technical Evaluation Panel • Standing Committee
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Expert Evaluator Workspace
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Review assigned startup proposals, assess technical feasibility and patents, score the 5-pillar criteria (Innovation, Feasibility, Impact, Scalability, Viability), and seal scores onto the blockchain ledger.
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono">
          <div className="bg-white/10 px-4 py-2.5 rounded-lg border border-white/20 text-center">
            <p className="text-[10px] uppercase font-bold text-slate-300">Pending Reviews</p>
            <p className="text-xl font-bold text-amber-300 mt-0.5">{pendingCount} Bids</p>
          </div>
          <div className="bg-white/10 px-4 py-2.5 rounded-lg border border-white/20 text-center">
            <p className="text-[10px] uppercase font-bold text-slate-300">Completed Scores</p>
            <p className="text-xl font-bold text-emerald-300 mt-0.5">{evaluatedCount} Bids</p>
          </div>
        </div>
      </div>

      {/* 4. APPLICATIONS LIST */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#0A2540]">
            Assigned Startup Submissions for Technical Review ({applications.length})
          </h2>
          <span className="text-xs font-mono text-[#5B6A78]">
            Statutory 5-Pillar Rubric (100-Point Objective Matrix)
          </span>
        </div>

        {applications.map((app) => (
          <div key={app.id} className="bg-white rounded-xl border border-[#E2DED6] p-6 shadow-2xs space-y-4">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-[#EDE9E1] pb-4">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono font-semibold bg-[#F2EFEB] text-[#0F3854] border border-[#E2DED6] px-2.5 py-0.5 rounded">
                    {app.id}
                  </span>
                  <h3 className="text-lg font-bold text-[#0A2540]">{app.startupName}</h3>
                  <span className="text-[10px] font-mono font-semibold text-[#147452] bg-[#EBF6F0] px-2 py-0.5 rounded border border-[#C2E5D2]">
                    <ShieldCheck className="h-3 w-3 inline mr-0.5" /> DPIIT Recognized
                  </span>
                  {app.blockchainTx && (
                    <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded flex items-center gap-1">
                      <Blocks className="h-3 w-3" /> Block #{app.blockNumber || 10843}
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#5B6A78] max-w-3xl mt-1 leading-relaxed">
                  {app.proposalSummary}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#5B6A78] pt-2">
                  <span>Proposed Cost: <strong className="text-[#141F2B]">{app.proposedCost}</strong></span>
                  <span>•</span>
                  <span>Deployment: <strong className="text-[#141F2B]">{app.deploymentTime}</strong></span>
                  <span>•</span>
                  <span>TRL: <strong className="text-[#0A2540]">Level {app.trlLevel || 7}</strong></span>
                  <span>•</span>
                  <span>Local Content: <strong className="text-[#0F3854]">{app.localContentPercentage || 65}%</strong></span>
                </div>
              </div>

              <div className="shrink-0">
                {app.evaluatorScore ? (
                  <div className="text-right font-mono bg-[#EBF6F0] p-3 rounded-xl border border-[#C2E5D2]">
                    <span className="text-[10px] text-[#147452] uppercase font-bold block">Evaluation Score</span>
                    <span className="text-2xl font-extrabold text-[#147452]">
                      {app.evaluatorScore.total} <span className="text-xs text-[#5B6A78]">/ 100</span>
                    </span>
                    <button
                      onClick={() => {
                        setSelectedAppIdForScore(app.id);
                        setActiveView("evaluation_scorecard");
                      }}
                      className="text-xs font-bold text-[#0F3854] hover:underline mt-1 block"
                    >
                      Update Scorecard →
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedAppIdForScore(app.id);
                      setActiveView("evaluation_scorecard");
                    }}
                    className="px-5 py-2.5 rounded-lg bg-[#0F3854] hover:bg-[#1D4E72] text-white font-bold text-xs flex items-center gap-2 transition-colors shadow-2xs"
                  >
                    <Award className="h-4 w-4 text-emerald-400" />
                    <span>Score Proposal (5 Pillars)</span>
                  </button>
                )}
              </div>
            </div>

            {/* IF EVALUATED: SHOW PROMINENT SCORECARD BREAKDOWN */}
            {app.evaluatorScore && (
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E2DED6] space-y-3 font-mono">
                <div className="flex items-center justify-between text-xs font-bold text-[#0A2540]">
                  <span className="flex items-center gap-1.5 text-[#0F3854]">
                    <Award className="h-4 w-4 text-emerald-600" />
                    <span>5-Pillar Score Breakdown</span>
                  </span>
                  <span className="text-[11px] font-normal text-[#5B6A78]">
                    Evaluator: {app.evaluatorScore.evaluatorName}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                  <div className="p-2 bg-white rounded-lg border border-[#E2DED6]">
                    <span className="text-[10px] text-[#5B6A78] block">Innovation (25%)</span>
                    <span className="font-bold text-[#0A2540]">{app.evaluatorScore.innovation} / 20</span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-[#E2DED6]">
                    <span className="text-[10px] text-[#5B6A78] block">Feasibility (25%)</span>
                    <span className="font-bold text-[#0A2540]">{app.evaluatorScore.feasibility} / 20</span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-[#E2DED6]">
                    <span className="text-[10px] text-[#5B6A78] block">Impact (20%)</span>
                    <span className="font-bold text-[#0A2540]">{app.evaluatorScore.impact} / 20</span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-[#E2DED6]">
                    <span className="text-[10px] text-[#5B6A78] block">Scalability (15%)</span>
                    <span className="font-bold text-[#0A2540]">{app.evaluatorScore.scalability} / 20</span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-[#E2DED6]">
                    <span className="text-[10px] text-[#5B6A78] block">Viability (15%)</span>
                    <span className="font-bold text-[#0A2540]">{app.evaluatorScore.viability} / 20</span>
                  </div>
                </div>

                {app.evaluatorScore.feedback && (
                  <p className="text-xs text-[#5B6A78] italic bg-white p-2.5 rounded-lg border border-[#EDE9E1]">
                    &quot;{app.evaluatorScore.feedback}&quot;
                  </p>
                )}

                <div className="flex items-center justify-between text-[11px] text-[#5B6A78] pt-1">
                  <span className="flex items-center gap-1 text-emerald-700">
                    <ShieldCheck className="h-3 w-3" />
                    <span>Blockchain Scorecard Sealed: Block #{app.evaluatorScore.blockNumber || 10845}</span>
                  </span>
                  <button
                    onClick={openBlockchainModal}
                    className="text-xs font-bold text-[#0F3854] hover:underline"
                  >
                    View On-Chain Receipt →
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
