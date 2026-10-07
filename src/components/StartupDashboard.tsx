"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { 
  Rocket, 
  Sparkles, 
  CheckCircle2, 
  Send, 
  ArrowRight, 
  Clock, 
  FileText, 
  ShieldCheck, 
  CreditCard, 
  BarChart3,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  AlertCircle
} from "lucide-react";

export const StartupDashboard: React.FC = () => {
  const { challenge, applications, pilot, setActiveView, applyToChallengeAction } = useApp();
  const [proposalInput, setProposalInput] = useState(
    "We propose deploying 15 HydroGuard 4X submersible spectrophotometric probes across 5 high-priority municipal water distribution zones. Telemetry is sent every 60 seconds with edge-AI anomaly inference within 2.8 minutes."
  );
  const [hasSubmitted, setHasSubmitted] = useState(true);

  const myApp = applications.find(a => a.startupId === "ST-AQUASENSE");

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 mb-8 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 uppercase tracking-wider mb-2">
            <Rocket className="h-4 w-4" />
            Startup Innovation Workspace • AquaSense AI Innovations Pvt Ltd
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold">
            Startup Pilot & Procurement Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-2xl">
            Track your DPIIT certifications, submit bids for matched public challenges, and manage 90-day sandbox pilots with automated milestone disbursements.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/20 text-center">
            <p className="text-[10px] uppercase font-bold text-slate-300">DPIIT Status</p>
            <p className="text-xs font-bold text-emerald-300 flex items-center gap-1 justify-center mt-0.5">
              <ShieldCheck className="h-3.5 w-3.5" /> Verified (80-IAC)
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/20 text-center">
            <p className="text-[10px] uppercase font-bold text-slate-300">GFR Exemption</p>
            <p className="text-xs font-bold text-sky-300 mt-0.5">Applied (Rule 170)</p>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Column: Applications & Matched Challenges */}
        <div className="lg:col-span-8 space-y-6">
          {/* Matched Challenge Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full">
                  94% AI Recommended Opportunity
                </span>
                <h2 className="text-lg font-bold text-slate-900 mt-2">
                  {challenge.title}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Issued by: {challenge.department} ({challenge.ministry})
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs font-bold text-slate-500">Pilot Budget</span>
                <p className="text-base font-extrabold text-blue-700">{challenge.budget}</p>
              </div>
            </div>

            {/* Application Form or Status */}
            <div className="mt-5">
              {myApp ? (
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Application Status: {myApp.id}
                    </span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      myApp.status === "Shortlisted" || myApp.status === "Pilot Active"
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                        : "bg-blue-100 text-blue-800 border border-blue-200"
                    }`}>
                      {myApp.status}
                    </span>
                  </div>

                  <div className="space-y-3 text-xs text-slate-700">
                    <div>
                      <p className="font-semibold text-slate-900">Submitted Proposal Highlights:</p>
                      <p className="text-slate-600 mt-0.5">{myApp.proposalSummary}</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-2 pt-2 border-t border-slate-200/80">
                      <div>
                        <span className="text-slate-500">Proposed Cost: </span>
                        <span className="font-bold text-slate-900">{myApp.proposedCost}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Turnover Relaxation: </span>
                        <span className="font-bold text-emerald-700">Approved under GFR 149</span>
                      </div>
                    </div>

                    {myApp.evaluatorScore && (
                      <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-900">
                        <div className="flex items-center justify-between font-bold">
                          <span>Evaluator Score Awarded:</span>
                          <span className="text-sm text-amber-800">{myApp.evaluatorScore.total} / 100</span>
                        </div>
                        <p className="text-[11px] text-amber-800 mt-1 italic">
                          "{myApp.evaluatorScore.feedback}"
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
                    <button
                      onClick={() => setActiveView("pilot_management")}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors"
                    >
                      View Live 90-Day Pilot Sandbox <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => setActiveView("kpi_monitoring")}
                      className="text-xs font-bold text-blue-600 hover:text-blue-800"
                    >
                      Open Telemetry KPIs →
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Startup Proposal Overview
                    </label>
                    <textarea
                      rows={3}
                      value={proposalInput}
                      onChange={(e) => setProposalInput(e.target.value)}
                      className="w-full text-xs rounded-xl border border-slate-300 p-3 text-slate-800"
                    />
                  </div>
                  <button
                    onClick={() => applyToChallengeAction("ST-AQUASENSE", proposalInput)}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs flex items-center gap-2"
                  >
                    <Send className="h-3.5 w-3.5" />
                    Submit Formal Challenge Bid
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Pilot Milestone & Payment Status */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-emerald-600" />
              Pilot Milestone Sanctions & PFMS Direct Payment Status
            </h3>

            <div className="space-y-3">
              {pilot.milestones.map((m, idx) => (
                <div key={idx} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">{m.name}</p>
                      <p className="text-[11px] text-slate-500">Timeline: {m.dueDate}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xs font-extrabold text-slate-900">{m.payout}</p>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <CheckCircle2 className="h-3 w-3" /> Disbursed via PFMS
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between">
              <span>Total Pilot Sanction Disbursed: <strong>₹28,50,000 (100%)</strong></span>
              <span className="font-bold">Next: Scale-Up Commercial Contract ₹18.5 Cr</span>
            </div>
          </div>
        </div>

        {/* Right Column: AI Insights & Quick Stats */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-blue-600" />
              AI Proposal Optimizer
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Your submission scored <strong className="text-emerald-700">98% compliance</strong> with GFR 2017 public procurement criteria. Zero objections raised during technical due diligence.
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>IS 10500 Drinking Water Threshold: Passed</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>Reagent-Free Optical Sensors: Validated</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>Local Content Mandate: 82% Make In India</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Scale-Up Commercial Pipeline
            </h4>
            <div className="text-3xl font-extrabold text-white">₹18.50 Cr</div>
            <p className="text-xs text-slate-300 mt-1">
              Procurement sanction for 50 municipal wards across 3 state districts upon successful pilot validation.
            </p>
            <button
              onClick={() => setActiveView("scale_up")}
              className="mt-4 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              Review Scale-Up Schedule <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
