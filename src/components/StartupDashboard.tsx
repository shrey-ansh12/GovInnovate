"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { 
  Rocket, 
  Sparkles, 
  CheckCircle2, 
  Send, 
  ArrowRight, 
  ShieldCheck, 
  CreditCard
} from "lucide-react";

export const StartupDashboard: React.FC = () => {
  const { challenge, applications, pilot, setActiveView, applyToChallengeAction } = useApp();
  const [proposalInput, setProposalInput] = useState(
    "We propose deploying 15 HydroGuard 4X submersible spectrophotometric probes across 5 high-priority municipal water distribution zones. Telemetry is sent every 60 seconds with edge-AI anomaly inference within 2.8 minutes."
  );
  const [hasSubmitted, setHasSubmitted] = useState(true);

  const myApp = applications.find(a => a.startupId === "ST-AQUASENSE");

  return (
    <div className="max-w-[1360px] mx-auto px-6 sm:px-8 py-10 font-sans">
      {/* Top Banner */}
      <div className="bg-[#0F3854] text-white rounded p-6 sm:p-8 mb-8 border border-[#1D4E72] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-emerald-400 uppercase tracking-wider mb-2">
            <Rocket className="h-4 w-4" />
            Startup Innovation Workspace • AquaSense AI Innovations Pvt Ltd
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            Startup Pilot & Procurement Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Track your DPIIT certifications, submit bids for matched public challenges, and manage 90-day sandbox pilots with automated milestone disbursements.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white/10 px-4 py-2.5 rounded border border-white/20 text-center font-mono">
            <p className="text-[10px] uppercase font-semibold text-slate-300">DPIIT Status</p>
            <p className="text-xs font-semibold text-emerald-300 flex items-center gap-1 justify-center mt-0.5">
              <ShieldCheck className="h-3.5 w-3.5" /> Verified (80-IAC)
            </p>
          </div>
          <div className="bg-white/10 px-4 py-2.5 rounded border border-white/20 text-center font-mono">
            <p className="text-[10px] uppercase font-semibold text-slate-300">GFR Exemption</p>
            <p className="text-xs font-semibold text-slate-100 mt-0.5">Applied (Rule 173)</p>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Column: Applications & Matched Challenges */}
        <div className="lg:col-span-8 space-y-6">
          {/* Matched Challenge Card */}
          <div className="bg-white rounded border border-[#E2DED6] p-6">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#EDE9E1]">
              <div>
                <span className="text-[10px] font-mono font-medium uppercase tracking-wider bg-[#EBF6F0] text-[#147452] border border-[#C2E5D2] px-2.5 py-0.5 rounded">
                  Top AI Match (94% Fit)
                </span>
                <h3 className="text-lg font-semibold text-[#0A2540] mt-2">
                  {challenge.title}
                </h3>
                <p className="text-xs text-[#5B6A78] mt-0.5">
                  {challenge.department} • Sandbox Budget: {challenge.budget}
                </p>
              </div>

              <button
                onClick={() => setActiveView("challenge_details")}
                className="px-3.5 py-1.5 rounded text-xs font-mono font-medium bg-[#F2EFEB] text-[#0F3854] hover:bg-[#EDE9E1] border border-[#E2DED6] transition-colors"
              >
                View RFP
              </button>
            </div>

            <div className="pt-4 space-y-4">
              <div className="p-3.5 rounded bg-[#FAF8F5] border border-[#E2DED6] text-xs">
                <span className="font-semibold text-[#0A2540] block mb-1">
                  Why AquaSense AI Matched:
                </span>
                <p className="text-[#5B6A78] leading-relaxed">
                  Optical spectrophotometric sensor meets SLA criteria for reagent-free real-time turbidity and biological contamination warnings under 5 minutes.
                </p>
              </div>

              {hasSubmitted && myApp ? (
                <div className="p-4 rounded bg-[#EBF6F0] border border-[#C2E5D2]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#147452] flex items-center gap-1.5 font-mono">
                      <CheckCircle2 className="h-4 w-4" />
                      Proposal Submitted & Shortlisted
                    </span>
                    <span className="text-xs font-mono font-semibold text-[#147452]">
                      Evaluator Score: 95/100
                    </span>
                  </div>
                  <p className="text-xs text-[#5B6A78] mt-2 font-mono bg-white p-3 rounded border border-[#C2E5D2]">
                    &quot;{proposalInput}&quot;
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#0A2540] mb-1">
                      Startup Proposal Overview
                    </label>
                    <textarea
                      rows={3}
                      value={proposalInput}
                      onChange={(e) => setProposalInput(e.target.value)}
                      className="w-full text-xs rounded border border-[#E2DED6] p-3 text-[#141F2B] bg-[#FAF8F5] focus:bg-white"
                    />
                  </div>
                  <button
                    onClick={() => {
                      applyToChallengeAction("ST-AQUASENSE", proposalInput);
                      setHasSubmitted(true);
                    }}
                    className="px-5 py-2.5 rounded bg-[#0F3854] hover:bg-[#1D4E72] text-white font-medium text-xs flex items-center gap-2 transition-colors"
                  >
                    <Send className="h-3.5 w-3.5" />
                    Submit Formal Challenge Bid
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Pilot Milestone & Payment Status */}
          <div className="bg-white rounded border border-[#E2DED6] p-6">
            <h3 className="text-base font-semibold text-[#0A2540] mb-4 flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-[#147452]" />
              Pilot Milestone Sanctions & PFMS Direct Payment Status
            </h3>

            <div className="space-y-3">
              {pilot.milestones.map((m, idx) => (
                <div key={idx} className="flex items-center justify-between p-3.5 rounded bg-[#FAF8F5] border border-[#E2DED6]">
                  <div className="flex items-center gap-3">
                    <div className="h-7 w-7 rounded bg-[#EBF6F0] text-[#147452] flex items-center justify-center font-mono font-bold text-xs border border-[#C2E5D2]">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#0A2540]">{m.name}</p>
                      <p className="text-[11px] text-[#5B6A78] font-mono">Timeline: {m.dueDate}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xs font-mono font-semibold text-[#0A2540]">{m.payout}</p>
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium text-[#147452] bg-[#EBF6F0] px-2 py-0.5 rounded border border-[#C2E5D2]">
                      <CheckCircle2 className="h-3 w-3" /> Disbursed via PFMS
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-[#EBF6F0] rounded border border-[#C2E5D2] text-[#147452] text-xs flex items-center justify-between font-mono">
              <span>Total Pilot Sanction Disbursed: <strong>₹28,50,000 (100%)</strong></span>
              <span className="font-semibold">Scale-Up Order: ₹18.5 Cr</span>
            </div>
          </div>
        </div>

        {/* Right Column: AI Insights & Quick Stats */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded border border-[#E2DED6] p-6">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#5B6A78] mb-3 flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-[#0F3854]" />
              AI Proposal Optimizer
            </h3>
            <p className="text-xs text-[#5B6A78] leading-relaxed mb-4">
              Your submission scored <strong className="text-[#147452]">98% compliance</strong> with GFR 2017 public procurement criteria. Zero objections raised during technical due diligence.
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#141F2B]">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#147452]" />
                <span>IS 10500 Drinking Water Threshold: Passed</span>
              </div>
              <div className="flex items-center gap-2 text-[#141F2B]">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#147452]" />
                <span>Reagent-Free Optical Sensors: Validated</span>
              </div>
              <div className="flex items-center gap-2 text-[#141F2B]">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#147452]" />
                <span>Local Content Mandate: 82% Make In India</span>
              </div>
            </div>
          </div>

          <div className="bg-[#0F3854] text-white rounded p-6 border border-[#1D4E72]">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Scale-Up Commercial Pipeline
            </h4>
            <div className="text-3xl font-semibold text-white font-mono">₹18.50 Cr</div>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Procurement sanction for 50 municipal wards across 3 state districts upon successful pilot validation.
            </p>
            <button
              onClick={() => setActiveView("scale_up")}
              className="mt-4 w-full py-2.5 rounded bg-white text-[#0F3854] font-medium text-xs flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors"
            >
              <span>Review Scale-Up Schedule</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
