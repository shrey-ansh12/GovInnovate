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
  const { 
    challenge, 
    applications, 
    pilot, 
    setActiveView, 
    applyToChallengeAction, 
    submitMilestoneEvidenceAction,
    currentUser,
    appMode
  } = useApp();

  const [proposalInput, setProposalInput] = useState(
    "We propose deploying 15 HydroGuard 4X submersible spectrophotometric probes across 5 high-priority municipal water distribution zones. Telemetry is sent every 60 seconds with edge-AI anomaly inference within 2.8 minutes."
  );

  const myApp = applications.find(a => 
    a.startupId === currentUser?.id || 
    a.startupName === currentUser?.organization || 
    (appMode === "demo" && a.startupId === "ST-AQUASENSE")
  );
  const [hasSubmitted, setHasSubmitted] = useState(!!myApp);

  // Milestone evidence state for direct upload
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string>(pilot.milestones[0]?.id || "M-01");
  const [evidenceText, setEvidenceText] = useState("");
  const [evidenceDocUrl, setEvidenceDocUrl] = useState("https://example.com/docs/field-report.pdf");
  const [evidenceSuccess, setEvidenceSuccess] = useState(false);

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
            Startup Innovation Workspace • {currentUser?.organization || "AquaSense AI Innovations Pvt Ltd"}
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
            <p className="text-xs font-semibold text-slate-100 mt-0.5">Eligible (GFR 170)</p>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Column: Matched Public Challenge & Bid Action */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded border border-[#E2DED6] p-6 shadow-2xs">
            <div className="flex items-start justify-between border-b border-[#EDE9E1] pb-4">
              <div>
                <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-[#FAF0D9] text-[#784A05] border border-[#F0D598] uppercase">
                  Open Procurement Challenge
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
                  Why Your Startup Matched:
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
                      Proposal Submitted & {myApp.status}
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
                    onClick={async () => {
                      await applyToChallengeAction(currentUser?.id || "ST-AQUASENSE", { 
                        proposalSummary: proposalInput,
                        solutionOverview: proposalInput 
                      });
                      setHasSubmitted(true);
                    }}
                    className="px-5 py-2.5 rounded bg-[#0F3854] hover:bg-[#1D4E72] text-white font-bold text-xs flex items-center gap-2 transition-colors shadow-2xs"
                  >
                    <Send className="h-4 w-4" />
                    <span>Submit Formal Bid Proposal</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Statutory Safe Harbor Info */}
          <div className="bg-[#FEF7EA] rounded p-4 border border-[#F6E1B9] text-xs text-[#8A5B0B] space-y-1">
            <span className="font-bold block">GFR 2017 Rule 170(i) & 149 Exemption Applied:</span>
            <p className="leading-relaxed">
              As a DPIIT-recognized entity, prior turnover thresholds and prior experience penalties are waived for this sandbox pilot stage, subject to technical threshold validation.
            </p>
          </div>
        </div>

        {/* Right Column: Direct Milestone Evidence Submission */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded border border-[#E2DED6] p-6 shadow-2xs">
            <div className="flex items-center gap-2 border-b border-[#EDE9E1] pb-3 mb-4">
              <Upload className="h-4 w-4 text-[#0F3854]" />
              <h3 className="text-sm font-bold text-[#0A2540]">
                Submit Milestone Verification Evidence
              </h3>
            </div>

            <form onSubmit={handleSubmitEvidence} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono text-[#5B6A78] uppercase mb-1">
                  Select Active Milestone
                </label>
                <select
                  value={selectedMilestoneId}
                  onChange={(e) => setSelectedMilestoneId(e.target.value)}
                  className="w-full text-xs rounded border border-[#E2DED6] p-2 bg-[#FAF8F5] focus:bg-white"
                >
                  {pilot.milestones.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.payout})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#5B6A78] uppercase mb-1">
                  Technical Deliverable Summary
                </label>
                <textarea
                  rows={3}
                  value={evidenceText}
                  onChange={(e) => setEvidenceText(e.target.value)}
                  placeholder="Describe sensor telemetry uptime, calibration test results, or engineering certifications..."
                  className="w-full text-xs rounded border border-[#E2DED6] p-2 bg-[#FAF8F5] focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#5B6A78] uppercase mb-1">
                  Document / Report Evidence Link
                </label>
                <input
                  type="url"
                  value={evidenceDocUrl}
                  onChange={(e) => setEvidenceDocUrl(e.target.value)}
                  placeholder="https://example.com/docs/calibration-certificate.pdf"
                  className="w-full text-xs rounded border border-[#E2DED6] p-2 bg-[#FAF8F5] focus:bg-white font-mono"
                  required
                />
              </div>

              {evidenceSuccess && (
                <div className="p-3 bg-[#EBF6F0] border border-[#C2E5D2] rounded text-xs text-[#147452] flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>Evidence recorded successfully! Evaluators and Department officials have been notified.</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded bg-[#147452] hover:bg-[#0E593D] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-2xs"
              >
                <Upload className="h-4 w-4" />
                <span>Upload & Request Milestone Verification</span>
              </button>
            </form>
          </div>

          {/* Direct Treasury Disbursements */}
          <div className="bg-white rounded border border-[#E2DED6] p-6 shadow-2xs">
            <div className="flex items-center gap-2 border-b border-[#EDE9E1] pb-3 mb-3">
              <CreditCard className="h-4 w-4 text-[#0F3854]" />
              <h3 className="text-sm font-bold text-[#0A2540]">
                Milestone Payouts
              </h3>
            </div>
            <div className="space-y-2 text-xs">
              {pilot.milestones.map((m) => (
                <div key={m.id} className="p-2.5 bg-[#FAF8F5] rounded border border-[#EDE9E1] flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#0A2540] block">{m.id}: {m.name.slice(0, 30)}...</span>
                    <span className="text-[10px] font-mono text-[#5B6A78]">{m.payout} • Due {m.dueDate}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                    m.status === "Approved" ? "bg-[#EBF6F0] text-[#147452]" : "bg-[#F2EFEB] text-[#5B6A78]"
                  }`}>
                    {m.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
