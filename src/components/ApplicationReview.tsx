"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { 
  FileCheck2, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Building2, 
  Sparkles, 
  AlertCircle,
  ExternalLink
} from "lucide-react";

export const ApplicationReview: React.FC = () => {
  const { 
    applications, 
    verifyEligibilityAction, 
    shortlistApplicationAction, 
    createPilotAction, 
    setActiveView 
  } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">
            <Building2 className="h-4 w-4" />
            Tender Applications & Shortlisting Queue
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Review Submitted Startup Proposals ({applications.length})
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Validate DPIIT statutory exemptions, review expert panel scores, and sanction 90-day sandbox pilots.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveView("evaluation_scorecard")}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <Award className="h-4 w-4" />
            Score as Evaluator (95/100)
          </button>
        </div>
      </div>

      {/* Applications Cards */}
      <div className="space-y-6">
        {applications.map((app) => {
          const isAquaSense = app.startupId === "ST-AQUASENSE";

          return (
            <div
              key={app.id}
              className={`bg-white rounded-2xl border p-6 shadow-xs ${
                isAquaSense ? "border-blue-400 ring-1 ring-blue-300" : "border-slate-200"
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-4 border-b border-slate-100 gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      ID: {app.id}
                    </span>
                    <h2 className="text-lg font-bold text-slate-900">{app.startupName}</h2>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      <ShieldCheck className="h-3 w-3" /> DPIIT Exemption Verified
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Applied on: {app.appliedDate} • Financial Turnover: {app.financialTurnover}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    app.status === "Shortlisted" || app.status === "Pilot Active"
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                      : app.status === "Evaluated"
                      ? "bg-amber-100 text-amber-800 border border-amber-300"
                      : "bg-blue-100 text-blue-800 border border-blue-200"
                  }`}>
                    Status: {app.status}
                  </span>
                </div>
              </div>

              {/* Proposal Overview & Score Comparison */}
              <div className="grid md:grid-cols-2 gap-6 pt-5">
                <div className="space-y-3">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Proposed Solution Architecture
                    </h4>
                    <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                      {app.solutionOverview}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    <div>
                      <span className="text-slate-500">Proposed Budget: </span>
                      <strong className="text-slate-900">{app.proposedCost}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500">Deployment Lead Time: </span>
                      <strong className="text-slate-900">{app.deploymentTime}</strong>
                    </div>
                  </div>
                </div>

                {/* Score & Committee Actions */}
                <div className="flex flex-col justify-between space-y-4">
                  {app.evaluatorScore ? (
                    <div className="bg-amber-50/80 p-3.5 rounded-xl border border-amber-200 text-xs text-amber-900">
                      <div className="flex items-center justify-between font-bold mb-1">
                        <span className="flex items-center gap-1.5">
                          <Award className="h-4 w-4 text-amber-600" />
                          Expert Committee Score
                        </span>
                        <span className="text-base font-extrabold text-amber-800">
                          {app.evaluatorScore.total} / 100
                        </span>
                      </div>
                      <p className="text-[11px] text-amber-800 italic">
                        "{app.evaluatorScore.feedback}"
                      </p>
                    </div>
                  ) : (
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-500 flex items-center justify-between">
                      <span>Evaluator review pending for this proposal</span>
                      <button
                        onClick={() => setActiveView("evaluation_scorecard")}
                        className="text-xs font-bold text-amber-600 hover:underline"
                      >
                        Score Now →
                      </button>
                    </div>
                  )}

                  {/* Procurement Decision Workflow Buttons */}
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    {app.status === "Submitted" && (
                      <button
                        onClick={() => verifyEligibilityAction(app.id)}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
                      >
                        Verify DPIIT Status
                      </button>
                    )}

                    {app.status !== "Shortlisted" && app.status !== "Pilot Active" && (
                      <button
                        onClick={() => shortlistApplicationAction(app.id)}
                        className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs"
                      >
                        Shortlist as Rank #1 Bidder
                      </button>
                    )}

                    {(app.status === "Shortlisted" || app.status === "Pilot Active" || isAquaSense) && (
                      <button
                        onClick={createPilotAction}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 transition-colors"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Sanction 90-Day Pilot Sandbox (5 Sites)
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
