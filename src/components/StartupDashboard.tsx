"use client";

import { TextToSpeechButton } from "@/components/TextToSpeechButton";

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
  FileText,
  Award,
  Clock,
  Blocks,
  Building2
} from "lucide-react";

export const StartupDashboard: React.FC = () => {
  const { 
    challenge, 
    challenges,
    selectChallengeAction,
    applications, 
    pilot, 
    setActiveView, 
    setRole,
    applyToChallengeAction, 
    submitMilestoneEvidenceAction,
    currentUser,
    openBlockchainModal
  } = useApp();

  // Find application specifically linked to this challenge
  const currentChallengeApp = applications.find(a => 
    a.challengeId === challenge.id && 
    (a.startupId === currentUser?.id || a.startupId === "ST-AQUASENSE" || a.startupName === currentUser?.organization)
  );

  const [proposalInput, setProposalInput] = useState(
    "We propose deploying an AI & IoT edge sensing telemetry unit with real-time anomaly detection, calibrated under NABL-traceable lab benchmarks, with zero civil modifications to existing infrastructure."
  );
  const [proposedCostInput, setProposedCostInput] = useState(challenge.budget || "₹24,50,000");
  const [deploymentTimeInput, setDeploymentTimeInput] = useState("14 Calendar Days");
  const [isSubmittingProposal, setIsSubmittingProposal] = useState(false);

  // Milestone evidence state for direct upload
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string>(pilot.milestones[0]?.id || "M-01");
  const [evidenceText, setEvidenceText] = useState("");
  const [evidenceDocUrl, setEvidenceDocUrl] = useState("https://example.com/docs/field-report.pdf");
  const [selectedEvidenceFile, setSelectedEvidenceFile] = useState<File | null>(null);
  const [isUploadingEvidence, setIsUploadingEvidence] = useState(false);
  const [evidenceSuccess, setEvidenceSuccess] = useState(false);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingProposal(true);
    try {
      await applyToChallengeAction(currentUser?.id || "ST-AQUASENSE", { 
        proposalSummary: proposalInput,
        solutionOverview: proposalInput,
        proposedCost: proposedCostInput,
        deploymentTime: deploymentTimeInput
      });
    } finally {
      setIsSubmittingProposal(false);
    }
  };

  const handleSubmitEvidence = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploadingEvidence(true);
    await submitMilestoneEvidenceAction(
      pilot.id, 
      selectedMilestoneId, 
      evidenceText || "Verified physical installation and telemetry calibration sign-off.", 
      evidenceDocUrl,
      selectedEvidenceFile || undefined
    );
    setIsUploadingEvidence(false);
    setEvidenceSuccess(true);
    setTimeout(() => setEvidenceSuccess(false), 4000);
  };

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-8 py-8 font-sans space-y-6">
      {/* 3. STARTUP BANNER */}
      <div className="bg-[#0F3854] text-white rounded-xl p-6 sm:p-8 border border-[#1D4E72] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-emerald-400 uppercase tracking-wider mb-2">
            <Rocket className="h-4 w-4" />
            Startup Innovation Workspace • {currentUser?.organization || "AquaSense AI Innovations Pvt Ltd"}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Startup Pilot & Procurement Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Discover active government procurement challenges, submit technical bids with statutory DPIIT relaxations, and track milestone disbursements on the blockchain ledger.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white/10 px-4 py-2.5 rounded-lg border border-white/20 text-center font-mono">
            <p className="text-[10px] uppercase font-bold text-slate-300">DPIIT Status</p>
            <p className="text-xs font-bold text-emerald-300 flex items-center gap-1 justify-center mt-0.5">
              <ShieldCheck className="h-3.5 w-3.5" /> Verified
            </p>
          </div>
          <div className="bg-white/10 px-4 py-2.5 rounded-lg border border-white/20 text-center font-mono">
            <p className="text-[10px] uppercase font-bold text-slate-300">Tender Relaxation</p>
            <p className="text-xs font-semibold text-slate-100 mt-0.5">Eligible (GFR 170)</p>
          </div>
        </div>
      </div>

      {/* 4. CHALLENGE SELECTOR (IF MULTIPLE CHALLENGES PUBLISHED) */}
      {challenges && challenges.length > 1 && (
        <div className="bg-white p-4 rounded-xl border border-[#E2DED6] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#0F3854]">
            <Building2 className="h-4 w-4" />
            <span>Select Government Challenge ({challenges.length} Available):</span>
          </div>
          <select
            value={challenge.id}
            onChange={(e) => selectChallengeAction(e.target.value)}
            className="text-xs font-semibold p-2 rounded-lg border border-[#E2DED6] bg-[#FAF8F5] text-[#0A2540] max-w-md"
          >
            {challenges.map((c) => (
              <option key={c.id} value={c.id}>
                {c.id}: {c.title} ({c.department})
              </option>
            ))}
          </select>
        </div>
      )}

      {/* 5. MAIN CONTENT GRID */}
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Column: Matched Public Challenge & Bid Action */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-xl border border-[#E2DED6] p-6 shadow-2xs space-y-4">
            {/* Challenge Header */}
            <div className="flex items-start justify-between border-b border-[#EDE9E1] pb-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-[#FAF0D9] text-[#784A05] border border-[#F0D598] uppercase">
                    Active Challenge
                  </span>
                  <span className="text-xs font-mono text-[#5B6A78]">ID: {challenge.id}</span>
                  {challenge.blockchainTx && (
                    <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded flex items-center gap-1">
                      <Blocks className="h-3 w-3" /> Block #{challenge.blockNumber || 10842}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-[#0A2540] mt-2">
                  {challenge.title}
                </h3>
                <p className="text-xs text-[#5B6A78] mt-1">
                  <strong>{challenge.department}</strong> ({challenge.ministry}) • Sandbox Allocation: <strong className="text-[#0A2540]">{challenge.budget}</strong>
                </p>
              </div>

              <button
                onClick={() => setActiveView("challenge_details")}
                className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold bg-[#F2EFEB] text-[#0F3854] hover:bg-[#EDE9E1] border border-[#E2DED6] transition-colors shrink-0"
              >
                View Scope
              </button>
            </div>

            {/* Problem Statement Display */}
            <div className="p-4 rounded-lg bg-[#FAF8F5] border border-[#E2DED6] text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#0A2540] uppercase text-[10px] tracking-wider font-mono">
                  Government Problem Statement:
                </span>
                <TextToSpeechButton 
                  text={challenge.problemStatement || "Municipal body requires rapid-response edge sensing and automated alert telemetry across pilot distribution zones."}
                  label="Listen"
                  size="sm"
                />
              </div>
              <p className="text-[#5B6A78] leading-relaxed">
                {challenge.problemStatement || "Municipal body requires rapid-response edge sensing and automated alert telemetry across pilot distribution zones before citywide expansion."}
              </p>

              {challenge.technicalThresholds && challenge.technicalThresholds.length > 0 && (
                <div className="pt-2 border-t border-[#EDE9E1]">
                  <span className="text-[10px] font-mono uppercase font-bold text-[#0F3854] block mb-1">
                    Mandatory Technical Thresholds:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {challenge.technicalThresholds.map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-white text-[11px] font-mono rounded border border-[#E2DED6] text-[#5B6A78]">
                        ✓ {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* APPLICATION / BID STATUS OR SUBMISSION FORM */}
            {currentChallengeApp ? (
              <div className="space-y-4">
                {/* Submitted Bid Summary Card */}
                <div className="p-4 rounded-xl bg-[#EBF6F0] border border-[#C2E5D2] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#147452] flex items-center gap-1.5 font-mono">
                      <CheckCircle2 className="h-4 w-4" />
                      Proposal Submitted ({currentChallengeApp.status})
                    </span>
                    <span className="text-xs font-mono text-[#5B6A78]">
                      App ID: {currentChallengeApp.id}
                    </span>
                  </div>

                  <p className="text-xs text-[#5B6A78] font-mono bg-white p-3 rounded-lg border border-[#C2E5D2]">
                    &quot;{currentChallengeApp.proposalSummary}&quot;
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#5B6A78] pt-1">
                    <span>Proposed Cost: <strong className="text-[#0A2540]">{currentChallengeApp.proposedCost}</strong></span>
                    <span>Deployment: <strong className="text-[#0A2540]">{currentChallengeApp.deploymentTime}</strong></span>
                    {currentChallengeApp.blockchainTx && (
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <Blocks className="h-3 w-3" /> Sealed on Blockchain
                      </span>
                    )}
                  </div>
                </div>

                {/* EVALUATOR SCORES (WHEN SCORED) */}
                {currentChallengeApp.evaluatorScore ? (
                  <div className="p-5 rounded-xl bg-white border-2 border-[#147452] shadow-sm space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E2DED6] pb-3">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#147452] uppercase">
                          <Award className="h-4 w-4" />
                          <span>Evaluation Scorecard (Technical Panel)</span>
                        </div>
                        <h4 className="text-sm font-bold text-[#0A2540] mt-0.5">
                          Evaluated by {currentChallengeApp.evaluatorScore.evaluatorName}
                        </h4>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-mono uppercase text-[#5B6A78] block">Total Score</span>
                        <span className="text-2xl font-extrabold text-[#147452] font-mono">
                          {currentChallengeApp.evaluatorScore.total} <span className="text-xs text-[#5B6A78]">/ 100</span>
                        </span>
                      </div>
                    </div>

                    {/* 5-Pillar Score Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-center">
                      <div className="p-2.5 bg-[#FAF8F5] rounded-lg border border-[#E2DED6]">
                        <span className="text-[10px] text-[#5B6A78] block uppercase">Innovation</span>
                        <span className="text-sm font-bold text-[#0F3854]">
                          {currentChallengeApp.evaluatorScore.innovation} / 20
                        </span>
                      </div>
                      <div className="p-2.5 bg-[#FAF8F5] rounded-lg border border-[#E2DED6]">
                        <span className="text-[10px] text-[#5B6A78] block uppercase">Feasibility</span>
                        <span className="text-sm font-bold text-[#0F3854]">
                          {currentChallengeApp.evaluatorScore.feasibility} / 20
                        </span>
                      </div>
                      <div className="p-2.5 bg-[#FAF8F5] rounded-lg border border-[#E2DED6]">
                        <span className="text-[10px] text-[#5B6A78] block uppercase">Impact</span>
                        <span className="text-sm font-bold text-[#0F3854]">
                          {currentChallengeApp.evaluatorScore.impact} / 20
                        </span>
                      </div>
                      <div className="p-2.5 bg-[#FAF8F5] rounded-lg border border-[#E2DED6]">
                        <span className="text-[10px] text-[#5B6A78] block uppercase">Scalability</span>
                        <span className="text-sm font-bold text-[#0F3854]">
                          {currentChallengeApp.evaluatorScore.scalability} / 20
                        </span>
                      </div>
                      <div className="p-2.5 bg-[#FAF8F5] rounded-lg border border-[#E2DED6]">
                        <span className="text-[10px] text-[#5B6A78] block uppercase">Viability</span>
                        <span className="text-sm font-bold text-[#0F3854]">
                          {currentChallengeApp.evaluatorScore.viability} / 20
                        </span>
                      </div>
                    </div>

                    {/* Evaluator Written Feedback */}
                    {currentChallengeApp.evaluatorScore.feedback && (
                      <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#E2DED6] text-xs space-y-1">
                        <span className="text-[10px] font-mono font-bold uppercase text-[#5B6A78] block">
                          Technical Committee Written Assessment:
                        </span>
                        <p className="text-[#0A2540] italic leading-relaxed">
                          &quot;{currentChallengeApp.evaluatorScore.feedback}&quot;
                        </p>
                      </div>
                    )}

                    {/* Blockchain Proof */}
                    <div className="flex items-center justify-between text-xs font-mono text-[#5B6A78] pt-2 border-t border-[#EDE9E1]">
                      <span className="flex items-center gap-1 text-emerald-700">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        <span>Blockchain Proof: Block #{currentChallengeApp.evaluatorScore.blockNumber || 10845}</span>
                      </span>
                      <button
                        onClick={openBlockchainModal}
                        className="text-xs font-bold text-[#0F3854] hover:underline"
                      >
                        Verify TX On-Chain →
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-[#FEF7EA] border border-[#F0D598] text-xs text-[#8A5B0B] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 shrink-0 text-[#8A5B0B]" />
                      <span>
                        <strong>Awaiting Technical Committee Evaluation:</strong> Your proposal is queued for 5-pillar technical scoring.
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setRole("evaluator");
                        setActiveView("evaluator_dashboard");
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-[#8A5B0B] text-white font-bold text-xs hover:bg-[#6c4708] transition-colors shrink-0"
                    >
                      Score as Evaluator →
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* BID SUBMISSION FORM */
              <form onSubmit={handleApply} className="space-y-4 pt-2">
                <div className="p-3 bg-[#EBF6F0] border border-[#C2E5D2] rounded-lg text-xs text-[#147452] flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 shrink-0" />
                  <span>
                    <strong>Open for Bids:</strong> Submit your prototype specifications and deployment schedule for this government challenge.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0A2540] mb-1">
                    Technical Solution & Proposal Summary
                  </label>
                  <textarea
                    rows={3}
                    value={proposalInput}
                    onChange={(e) => setProposalInput(e.target.value)}
                    required
                    className="w-full text-xs rounded-lg border border-[#E2DED6] p-3 text-[#141F2B] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#0F3854]"
                    placeholder="Describe your technical innovation, TRL readiness, edge hardware design, and sensor calibration..."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-[#5B6A78] uppercase mb-1">
                      Proposed Sandbox Cost
                    </label>
                    <input
                      type="text"
                      value={proposedCostInput}
                      onChange={(e) => setProposedCostInput(e.target.value)}
                      className="w-full text-xs rounded-lg border border-[#E2DED6] p-2.5 bg-[#FAF8F5] font-mono"
                      placeholder="e.g. ₹24,50,000"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-[#5B6A78] uppercase mb-1">
                      Deployment Timeline
                    </label>
                    <input
                      type="text"
                      value={deploymentTimeInput}
                      onChange={(e) => setDeploymentTimeInput(e.target.value)}
                      className="w-full text-xs rounded-lg border border-[#E2DED6] p-2.5 bg-[#FAF8F5] font-mono"
                      placeholder="e.g. 14 Calendar Days"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingProposal}
                  className="w-full py-3 px-5 rounded-lg bg-[#0F3854] hover:bg-[#1D4E72] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-2xs disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                  <span>{isSubmittingProposal ? "Submitting to Blockchain Ledger..." : "Submit Formal Bid Proposal to Government"}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>

          {/* Statutory Safe Harbor Info */}
          <div className="bg-[#FEF7EA] rounded-xl p-4 border border-[#F6E1B9] text-xs text-[#8A5B0B] space-y-1">
            <span className="font-bold block">GFR 2017 Rule 170(i) & 149 Exemption Applied:</span>
            <p className="leading-relaxed">
              As a DPIIT-recognized entity, prior turnover thresholds and prior experience penalties are waived for this sandbox pilot stage, subject to technical threshold validation.
            </p>
          </div>
        </div>

        {/* Right Column: Direct Milestone Evidence Submission */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-xl border border-[#E2DED6] p-6 shadow-2xs">
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
                  className="w-full text-xs rounded-lg border border-[#E2DED6] p-2.5 bg-[#FAF8F5] font-mono"
                >
                  {pilot.milestones.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.id}: {m.name} ({m.status})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#5B6A78] uppercase mb-1">
                  Evidence Notes / Test Sign-off
                </label>
                <textarea
                  rows={2}
                  value={evidenceText}
                  onChange={(e) => setEvidenceText(e.target.value)}
                  placeholder="e.g., Calibrated 5 spectrophotometric probes against NABL standard titration..."
                  className="w-full text-xs rounded-lg border border-[#E2DED6] p-2.5 bg-[#FAF8F5]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#5B6A78] uppercase mb-1">
                  Attach Document / Test File (Generates SHA-256 Hash)
                </label>
                <input
                  type="file"
                  onChange={(e) => setSelectedEvidenceFile(e.target.files?.[0] || null)}
                  className="w-full text-xs text-[#5B6A78] file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#F2EFEB] file:text-[#0F3854] hover:file:bg-[#E2DED6]"
                />
                {selectedEvidenceFile && (
                  <p className="text-[10px] text-emerald-700 font-mono mt-1">
                    Selected: {selectedEvidenceFile.name} ({(selectedEvidenceFile.size / 1024).toFixed(1)} KB)
                  </p>
                )}
              </div>

              {evidenceSuccess && (
                <div className="p-3 bg-[#EBF6F0] border border-[#C2E5D2] rounded-lg text-xs text-[#147452] flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>Milestone evidence successfully submitted and cryptographically registered!</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isUploadingEvidence}
                className="w-full py-2.5 px-4 rounded-lg bg-[#147452] hover:bg-[#0e583e] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-2xs disabled:opacity-50"
              >
                <Upload className="h-4 w-4" />
                <span>{isUploadingEvidence ? "Hashing & Registering On Ledger..." : "Upload & Request Milestone Verification"}</span>
              </button>
            </form>
          </div>

          {/* Direct Treasury Disbursements */}
          <div className="bg-white rounded-xl border border-[#E2DED6] p-6 shadow-2xs">
            <div className="flex items-center gap-2 border-b border-[#EDE9E1] pb-3 mb-3">
              <CreditCard className="h-4 w-4 text-[#0F3854]" />
              <h3 className="text-sm font-bold text-[#0A2540]">
                Milestone Payouts
              </h3>
            </div>
            <div className="space-y-2 text-xs">
              {pilot.milestones.map((m) => (
                <div key={m.id} className="p-2.5 bg-[#FAF8F5] rounded-lg border border-[#EDE9E1] flex items-center justify-between">
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
