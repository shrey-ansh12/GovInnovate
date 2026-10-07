"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { 
  Award, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  FileText, 
  Sliders, 
  ShieldCheck, 
  Sparkles,
  BarChart3
} from "lucide-react";

export const EvaluatorDashboard: React.FC = () => {
  const { applications, setActiveView } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-orange-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 mb-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
            <Award className="h-4 w-4" />
            Independent Technical Evaluation Panel • Standing Committee
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold">
            Expert Evaluator Workspace
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-2xl">
            Review assigned startup proposals, assess technical feasibility and patents, score multi-pillar criteria, and recommend high-impact solutions for 90-day sandbox pilot sanctions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/20 text-center">
            <p className="text-[10px] uppercase font-bold text-slate-300">Pending Reviews</p>
            <p className="text-xl font-extrabold text-amber-300 mt-0.5">1 Priority</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/20 text-center">
            <p className="text-[10px] uppercase font-bold text-slate-300">Completed Audits</p>
            <p className="text-xl font-extrabold text-emerald-300 mt-0.5">3 Total</p>
          </div>
        </div>
      </div>

      {/* Applications Assigned to Evaluator */}
      <div className="space-y-6">
        <h2 className="text-base font-bold text-slate-900">
          Assigned Startup Submissions for Technical Review
        </h2>

        {applications.map((app) => (
          <div key={app.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded">
                  {app.id}
                </span>
                <h3 className="text-lg font-bold text-slate-900">{app.startupName}</h3>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  DPIIT Verified
                </span>
              </div>
              <p className="text-xs text-slate-600 max-w-2xl mt-1">
                {app.proposalSummary}
              </p>
              <div className="flex items-center gap-4 text-xs text-slate-500 pt-2">
                <span>Proposed Cost: <strong className="text-slate-800">{app.proposedCost}</strong></span>
                <span>•</span>
                <span>Deployment Speed: <strong className="text-slate-800">{app.deploymentTime}</strong></span>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              {app.evaluatorScore ? (
                <div className="text-right">
                  <div className="text-xs font-bold text-slate-500">Evaluated Score</div>
                  <div className="text-2xl font-extrabold text-amber-700">
                    {app.evaluatorScore.total} <span className="text-xs text-slate-400">/ 100</span>
                  </div>
                  <button
                    onClick={() => setActiveView("evaluation_scorecard")}
                    className="text-xs font-bold text-blue-600 hover:underline mt-1"
                  >
                    Edit Scorecard
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setActiveView("evaluation_scorecard")}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs flex items-center gap-2 transition-colors"
                >
                  <Award className="h-4 w-4" />
                  Score Proposal (Multi-Pillar)
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
