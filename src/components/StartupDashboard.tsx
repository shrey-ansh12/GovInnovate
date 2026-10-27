"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { 
  Rocket, 
  CheckCircle2, 
  Send, 
  ArrowRight, 
  ShieldCheck, 
  CreditCard,
  Upload,
  AlertCircle,
  FileText
} from "lucide-react";

export const StartupDashboard: React.FC = () => {
  const { challenge, applications, pilot, setActiveView, applyToChallengeAction, submitMilestoneEvidenceAction } = useApp();
  const [proposalInput, setProposalInput] = useState(
    "We propose deploying 15 HydroGuard 4X submersible spectrophotometric probes across 5 high-priority municipal water distribution zones. Telemetry is sent every 60 seconds with edge-AI anomaly inference within 2.8 minutes."
  );
  const [hasSubmitted, setHasSubmitted] = useState(true);

  // Milestone evidence state for direct upload
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string>(pilot.milestones[0]?.id || "M-01");
  const [evidenceText, setEvidenceText] = useState("");
  const [evidenceDocUrl, setEvidenceDocUrl] = useState("https://example.com/docs/field-report.pdf");
  const [evidenceSuccess, setEvidenceSuccess] = useState(false);

  const myApp = applications.find(a => a.startupId === "ST-AQUASENSE");

  const handleSubmitEvidence = (e: React.FormEvent) => {
    e.preventDefault();
    submitMilestoneEvidenceAction(pilot.id, selectedMilestoneId, evidenceText || "Verified physical installation and telemetry calibration sign-off.", evidenceDocUrl);
    setEvidenceSuccess(true);
    setTimeout(() => setEvidenceSuccess(false), 4000);
  };

  return (
    <div className="max-w-[1360px] mx-auto px-6 sm:px-8 py-10 font-sans">
      {/* Top Banner */}
      <div className="bg-[#0F3854] text-white rounded p-6 sm:p-8 mb-8 border border-[#1D4E72] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-emerald-400 uppercase tracking-wider mb-2">
            <Rocket className="h-4 w-4" />
            Startup Innovation Workspace • AquaSense AI Innovations Pvt Ltd
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Startup Pilot & Procurement Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Manage your DPIIT credentials, submit bids for matched public challenges, and submit milestone evidence for sandbox verification.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white/10 px-4 py-2.5 rounded border border-white/20 text-center font-mono">
            <p className="text-[10px] uppercase font-bold text-slate-300">DPIIT Status</p>
            <p className="text-xs font-bold text-emerald-300 flex items-center gap-1 justify-center mt-0.5">
              <ShieldCheck className="h-3.5 w-3.5" /> Verified
            </p>
          </div>
          <div className="bg-white/10 px-4 py-2.5 rounded border border-white/20 text-center font-mono">
            <p className="text-[10px] uppercase font-bold text-slate-300">Tender Relaxation</p>
            <p className="text-xs font-semibold text-slate-100 mt-0.5">Eligible (DPIIT)</p>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Column: Applications & Matched Challenges */}
        <div className="lg:col-span-8 space-y-6">
          {/* Matched Challenge Card */}
          <div className="bg-white rounded border border-[#E2DED6] p-6 shadow-2xs">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#EDE9E1]">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-[#EBF6F0] text-[#147452] border border-[#C2E5D2] px-2.5 py-0.5 rounded">
                  Rule-Based Match (94% Fit)
                </span>
                <h3 className="text-lg font-bold text-[#0A2540] mt-2">
                  {challenge.title}
                </h3>
                <p className="text-xs text-[#5B6A78] mt-0.5">
                  {challenge.department} • Sandbox Allocation: {challenge.budget}
                </p>
              </div>

              <button
                onClick={() => setActiveView("challenge_details")}
                className="px-3.5 py-1.5 rounded text-xs font-mono font-bold bg-[#F2EFEB] text-[#0F3854] hover:bg-[#EDE9E1] border border-[#E2DED6] transition-colors"
              >
                View Challenge
              </button>
            </div>

            <div className="pt-4 space-y-4">
              <div className="p-3.5 rounded bg-[#FAF8F5] border border-[#E2DED6] text-xs">
                <span className="font-bold text-[#0A2540] block mb-1">
                  Why AquaSense AI Matched:
                </span>
                <p className="text-[#5B6A78] leading-relaxed">
                  Optical spectrophotometric sensor meets requirement for reagent-free real-time turbidity and chemical contamination alerts under 5 minutes with TRL-8 readiness.
                </p>
              </div>

              {hasSubmitted && myApp ? (
                <div className="p-4 rounded bg-[#EBF6F0] border border-[#C2E5D2]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#147452] flex items-center gap-1.5 font-mono">
                      <CheckCircle2 className="h-4 w-4" />
                      Proposal Submitted & Shortlisted
                    </span>
                    <span className="text-xs font-mono font-bold text-[#147452]">
                      Evaluator Score: {myApp.evaluatorScore?.total || 95} / 100
                    </span>
                  </div>
                  <p className="text-xs text-[#5B6A78] mt-2 font-mono bg-white p-3 rounded border border-[#C2E5D2]">
                    &quot;{myApp.proposalSummary}&quot;
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-[#0A2540] mb-1">
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
                      applyToChallengeAction("ST-AQUASENSE", { proposalSummary: proposalInput });
                      setHasSubmitted(true);
                    }}
                    className="px-5 py-2.5 rounded bg-[#0F3854] hover:bg-[#1D4E72] text-white font-bold text-xs flex items-center gap-2 transition-colors shadow-2xs"
                  >
                    <Send className="h-3.5 w-3.5" />
                    Submit Formal Challenge Bid
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Pilot Milestone & Payment Status */}
          <div className="bg-white rounded border border-[#E2DED6] p-6 shadow-2xs">
            <h3 className="text-base font-bold text-[#0A2540] mb-4 flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-[#147452]" />
              Pilot Milestone Status & Simulated Demo Payment References
            </h3>

            <div className="space-y-3">
              {pilot.milestones.map((m, idx) => (
                <div key={idx} className="flex items-center justify-between p-3.5 rounded bg-[#FAF8F5] border border-[#E2DED6]">
                  <div className="flex items-center gap-3">
                    <div className="h-7 w-7 rounded bg-[#EBF6F0] text-[#147452] flex items-center justify-center font-mono font-bold text-xs border border-[#C2E5D2]">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#0A2540]">{m.name}</p>
                      <p className="text-[11px] text-[#5B6A78] font-mono">Timeline: {m.dueDate} • Status: {m.status}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xs font-mono font-bold text-[#0A2540]">{m.payout}</p>
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold text-[#147452] bg-[#EBF6F0] px-2 py-0.5 rounded border border-[#C2E5D2]">
                      {m.paymentRef || "Demo Payment Ref (Simulated)"}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-[#FAF8F5] rounded border border-[#E2DED6] text-xs text-[#5B6A78] flex items-center justify-between font-mono">
              <span>* Notice: Payment records represent simulated references for hackathon demonstration.</span>
            </div>
          </div>
        </div>

        {/* Right Column: Submit Milestone Evidence Quick Box */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded border border-[#E2DED6] p-6 shadow-2xs">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#5B6A78] mb-3 flex items-center gap-2">
              <Upload className="h-4 w-4 text-[#0F3854]" />
              Submit Milestone Deliverable Evidence
            </h3>

            {evidenceSuccess && (
              <div className="mb-3 p-2.5 rounded bg-[#EBF6F0] border border-[#C2E5D2] text-xs text-[#147452] font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" />
                <span>Evidence logged! Awaiting reviewer approval.</span>
              </div>
            )}

            <form onSubmit={handleSubmitEvidence} className="space-y-3 text-xs">
              <div>
                <label className="text-xs font-mono font-bold text-[#141F2B] block mb-1">Target Milestone:</label>
                <select
                  value={selectedMilestoneId}
                  onChange={(e) => setSelectedMilestoneId(e.target.value)}
                  className="w-full text-xs p-2 rounded border border-[#E2DED6] bg-[#FAF8F5]"
                >
                  {pilot.milestones.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name.slice(0, 32)}... ({m.status})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-mono font-bold text-[#141F2B] block mb-1">Evidence Deliverable Summary:</label>
                <textarea
                  rows={3}
                  value={evidenceText}
                  onChange={(e) => setEvidenceText(e.target.value)}
                  placeholder="Describe technical deployment, test result, or lab correlation..."
                  className="w-full text-xs p-2.5 rounded border border-[#E2DED6] bg-[#FAF8F5]"
                />
              </div>

              <div>
                <label className="text-xs font-mono font-bold text-[#141F2B] block mb-1">Document Reference URL:</label>
                <input
                  type="text"
                  value={evidenceDocUrl}
                  onChange={(e) => setEvidenceDocUrl(e.target.value)}
                  className="w-full text-xs p-2 rounded border border-[#E2DED6] bg-[#FAF8F5]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded bg-[#147452] hover:bg-[#0f583e] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
              >
                <Upload className="h-3.5 w-3.5" />
                <span>Submit Evidence for Approval</span>
              </button>
            </form>
          </div>

          <div className="bg-[#0F3854] text-white rounded p-6 border border-[#1D4E72] shadow-sm">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
              Pilot Sandbox Dashboard
            </h4>
            <div className="text-2xl font-bold text-white font-mono">{pilot.overallScore} / 100</div>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Track live telemetry, sensor uptime, and laboratory correlation metrics.
            </p>
            <button
              onClick={() => setActiveView("pilot_management")}
              className="mt-4 w-full py-2.5 rounded bg-white text-[#0F3854] font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors shadow-2xs"
            >
              <span>View Pilot Workspace</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
