"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { 
  Award,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight
} from "lucide-react";

export const EvaluatorDashboard: React.FC = () => {
  const { applications, setActiveView, setSelectedAppIdForScore } = useApp();

  const evaluatedCount = applications.filter(a => !!a.evaluatorScore).length;
  const pendingCount = applications.length - evaluatedCount;

  return (
    <div className="max-w-[1360px] mx-auto px-6 sm:px-8 py-10 font-sans">
      {/* Top Banner */}
      <div className="bg-[#0F3854] text-white rounded p-6 sm:p-8 mb-8 border border-[#1D4E72] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-emerald-400 uppercase tracking-wider mb-2">
            <Award className="h-4 w-4" />
            Independent Technical Evaluation Panel • Standing Committee
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Expert Evaluator Workspace
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Review assigned startup proposals, assess technical feasibility and patents, score the 5-pillar criteria (Innovation, Feasibility, Impact, Scalability, Viability), and cite evidence references.
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono">
          <div className="bg-white/10 px-4 py-2.5 rounded border border-white/20 text-center">
            <p className="text-[10px] uppercase font-bold text-slate-300">Pending Reviews</p>
            <p className="text-xl font-bold text-amber-300 mt-0.5">{pendingCount} Bids</p>
          </div>
          <div className="bg-white/10 px-4 py-2.5 rounded border border-white/20 text-center">
            <p className="text-[10px] uppercase font-bold text-slate-300">Completed Scores</p>
            <p className="text-xl font-bold text-emerald-300 mt-0.5">{evaluatedCount} Bids</p>
          </div>
        </div>
      </div>

      {/* Applications Assigned to Evaluator */}
      <div className="space-y-6">
        <h2 className="text-lg font-bold text-[#0A2540]">
          Assigned Startup Submissions for Technical Review ({applications.length})
        </h2>

        {applications.map((app) => (
          <div key={app.id} className="bg-white rounded border border-[#E2DED6] p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xs">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-semibold bg-[#F2EFEB] text-[#0F3854] border border-[#E2DED6] px-2 py-0.5 rounded">
                  {app.id}
                </span>
                <h3 className="text-lg font-bold text-[#0A2540]">{app.startupName}</h3>
                <span className="text-[10px] font-mono font-semibold text-[#147452] bg-[#EBF6F0] px-2 py-0.5 rounded border border-[#C2E5D2]">
                  <ShieldCheck className="h-3 w-3 inline mr-0.5" /> DPIIT Recognized
                </span>
              </div>
              <p className="text-xs text-[#5B6A78] max-w-2xl mt-1 leading-relaxed">
                {app.proposalSummary}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#5B6A78] pt-2">
                <span>Proposed Cost: <strong className="text-[#141F2B]">{app.proposedCost}</strong></span>
                <span>•</span>
                <span>Deployment Time: <strong className="text-[#141F2B]">{app.deploymentTime}</strong></span>
                <span>•</span>
                <span>TRL: <strong className="text-[#0A2540]">Level {app.trlLevel || 7}</strong></span>
                <span>•</span>
                <span>Local Content: <strong className="text-[#0F3854]">{app.localContentPercentage || 65}%</strong></span>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              {app.evaluatorScore ? (
                <div className="text-right font-mono">
                  <div className="text-xs text-[#5B6A78]">Awarded Score</div>
                  <div className="text-2xl font-bold text-[#147452]">
                    {app.evaluatorScore.total} <span className="text-xs text-[#5B6A78]">/ 100</span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedAppIdForScore(app.id);
                      setActiveView("evaluation_scorecard");
                    }}
                    className="text-xs font-semibold text-[#0F3854] hover:underline mt-1 block"
                  >
                    Edit 5-Pillar Scorecard →
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setSelectedAppIdForScore(app.id);
                    setActiveView("evaluation_scorecard");
                  }}
                  className="px-5 py-2.5 rounded bg-[#0F3854] hover:bg-[#1D4E72] text-white font-bold text-xs flex items-center gap-2 transition-colors shadow-2xs"
                >
                  <Award className="h-4 w-4 text-emerald-400" />
                  <span>Score Proposal (5 Pillars)</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
