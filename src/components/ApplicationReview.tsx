"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Building2
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
    <div className="max-w-[1360px] mx-auto px-6 sm:px-8 py-10 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-[#0F3854] uppercase tracking-wider mb-1">
            <Building2 className="h-4 w-4" />
            Tender Applications & Shortlisting Queue
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#0A2540] tracking-tight">
            Review Submitted Startup Proposals ({applications.length})
          </h1>
          <p className="text-xs text-[#5B6A78] mt-1">
            Validate DPIIT statutory exemptions under Rule 173, review expert panel scores, and sanction 90-day sandbox pilots.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveView("evaluation_scorecard")}
            className="px-4 py-2 rounded bg-[#0F3854] hover:bg-[#1D4E72] text-white font-medium text-xs flex items-center gap-1.5 transition-colors"
          >
            <Award className="h-4 w-4 text-emerald-400" />
            <span>Score as Evaluator (95/100)</span>
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
              className={`bg-white rounded border p-6 transition-all ${
                isAquaSense ? "border-2 border-[#0F3854]" : "border-[#E2DED6]"
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-4 border-b border-[#EDE9E1] gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-medium text-[#0F3854] bg-[#FAF8F5] border border-[#E2DED6] px-2 py-0.5 rounded">
                      ID: {app.id}
                    </span>
                    <h2 className="text-lg font-semibold text-[#0A2540]">{app.startupName}</h2>
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-[#EBF6F0] text-[#147452] border border-[#C2E5D2]">
                      <ShieldCheck className="h-3 w-3" /> DPIIT Exemption Verified
                    </span>
                  </div>
                  <p className="text-xs text-[#5B6A78] font-mono mt-1">
                    Applied on: {app.appliedDate} • Financial Turnover: {app.financialTurnover}
                  </p>
                </div>

                <div className="flex items-center gap-3 font-mono">
                  <span className={`text-xs px-2.5 py-1 rounded border font-medium ${
                    app.status === "Shortlisted" || app.status === "Pilot Active"
                      ? "bg-[#EBF6F0] text-[#147452] border-[#C2E5D2]"
                      : app.status === "Evaluated"
                      ? "bg-[#FEF7EA] text-[#8A5B0B] border-[#F6E1B9]"
                      : "bg-[#F2EFEB] text-[#0F3854] border-[#E2DED6]"
                  }`}>
                    Status: {app.status}
                  </span>
                </div>
              </div>

              {/* Proposal Overview & Score Comparison */}
              <div className="grid md:grid-cols-2 gap-6 pt-5">
                <div className="space-y-3">
                  <div>
                    <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#5B6A78] mb-1">
                      Proposed Solution Architecture
                    </h4>
                    <p className="text-xs text-[#141F2B] leading-relaxed bg-[#FAF8F5] p-3 rounded border border-[#E2DED6]">
                      {app.solutionOverview}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono text-[#5B6A78]">
                    <div>
                      <span>Proposed Budget: </span>
                      <strong className="text-[#0A2540]">{app.proposedCost}</strong>
                    </div>
                    <div>
                      <span>Lead Time: </span>
                      <strong className="text-[#0A2540]">{app.deploymentTime}</strong>
                    </div>
                  </div>
                </div>

                {/* Score & Committee Actions */}
                <div className="flex flex-col justify-between space-y-4">
                  {app.evaluatorScore ? (
                    <div className="bg-[#FAF8F5] p-3.5 rounded border border-[#E2DED6] text-xs text-[#0A2540]">
                      <div className="flex items-center justify-between font-semibold mb-1 font-mono">
                        <span className="flex items-center gap-1.5 text-[#0F3854]">
                          <Award className="h-4 w-4" />
                          Expert Committee Score
                        </span>
                        <span className="text-base text-[#147452]">
                          {app.evaluatorScore.total} / 100
                        </span>
                      </div>
                      <p className="text-[11px] text-[#5B6A78] italic">
                        &quot;{app.evaluatorScore.feedback}&quot;
                      </p>
                    </div>
                  ) : (
                    <div className="bg-[#FAF8F5] p-3.5 rounded border border-[#E2DED6] text-xs text-[#5B6A78] flex items-center justify-between">
                      <span>Evaluator review pending for this proposal</span>
                      <button
                        onClick={() => setActiveView("evaluation_scorecard")}
                        className="text-xs font-medium text-[#0F3854] hover:underline"
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
                        className="px-3.5 py-1.5 rounded bg-[#0A2540] hover:bg-[#141F2B] text-white font-medium text-xs transition-colors"
                      >
                        Verify DPIIT Status
                      </button>
                    )}

                    {app.status !== "Shortlisted" && app.status !== "Pilot Active" && (
                      <button
                        onClick={() => shortlistApplicationAction(app.id)}
                        className="px-3.5 py-1.5 rounded bg-[#0F3854] hover:bg-[#1D4E72] text-white font-medium text-xs transition-colors"
                      >
                        Shortlist as Rank #1 Bidder
                      </button>
                    )}

                    {(app.status === "Shortlisted" || app.status === "Pilot Active" || isAquaSense) && (
                      <button
                        onClick={createPilotAction}
                        className="px-4 py-2 rounded bg-[#0F3854] hover:bg-[#1D4E72] text-white font-medium text-xs flex items-center gap-1.5 transition-colors"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Sanction 90-Day Pilot Sandbox (5 Sites)</span>
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
