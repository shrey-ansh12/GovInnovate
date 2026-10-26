"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { 
  Activity, 
  MapPin, 
  CheckCircle2, 
  TrendingUp, 
  ArrowRight, 
  Upload, 
  AlertTriangle, 
  FileText, 
  Check, 
  X, 
  Clock, 
  DollarSign 
} from "lucide-react";
import { PilotMilestone } from "@/types";

export const PilotManagement: React.FC = () => {
  const { 
    pilot, 
    role, 
    setRole,
    setActiveView, 
    submitMilestoneEvidenceAction,
    reviewMilestoneAction,
    approveValidationAction 
  } = useApp();

  const [evidenceModalOpen, setEvidenceModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [activeMilestone, setActiveMilestone] = useState<PilotMilestone | null>(null);

  // Evidence submission state
  const [evidenceDesc, setEvidenceDesc] = useState("");
  const [evidenceUrl, setEvidenceUrl] = useState("");

  // Review state
  const [reviewApproved, setReviewApproved] = useState(true);
  const [reviewNotes, setReviewNotes] = useState("");

  const handleOpenEvidence = (m: PilotMilestone) => {
    setActiveMilestone(m);
    setEvidenceDesc(m.evidenceDescription || "");
    setEvidenceUrl(m.evidenceUrl || "https://example.com/docs/milestone-evidence.pdf");
    setEvidenceModalOpen(true);
  };

  const handleSubmitEvidence = () => {
    if (!activeMilestone) return;
    submitMilestoneEvidenceAction(pilot.id, activeMilestone.id, evidenceDesc, evidenceUrl);
    setEvidenceModalOpen(false);
  };

  const handleOpenReview = (m: PilotMilestone) => {
    setActiveMilestone(m);
    setReviewApproved(true);
    setReviewNotes(m.reviewNotes || "Technical verification affirmed. Milestone deliverables complete.");
    setReviewModalOpen(true);
  };

  const handleSubmitReview = () => {
    if (!activeMilestone) return;
    reviewMilestoneAction(pilot.id, activeMilestone.id, reviewApproved, reviewNotes);
    setReviewModalOpen(false);
  };

  // Check for risk alerts
  const pendingMilestones = pilot.milestones.filter(m => m.status === "Pending Evidence" || m.status === "Rejected");
  const hasRiskAlert = pilot.kpis.some(k => k.status === "Needs Attention") || pilot.milestones.some(m => m.status === "Rejected");

  return (
    <div className="max-w-[1360px] mx-auto px-6 sm:px-8 py-10 font-sans">
      {/* Top Banner */}
      <div className="bg-[#0F3854] text-white rounded p-6 sm:p-8 mb-8 border border-[#1D4E72] shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-medium text-emerald-400 uppercase tracking-wider mb-2">
              <Activity className="h-4 w-4" />
              90-Day Municipal Pilot Sandbox • Live Telemetry & Evidence Verification
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {pilot.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl font-mono">
              Contractor: <strong className="text-white">AquaSense AI Innovations</strong> | Sites: <strong className="text-white">{pilot.locationsCount} Municipal Intake Reservoirs</strong> | Overall Score: <strong className="text-emerald-300">{pilot.overallScore} / 100</strong>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveView("kpi_monitoring")}
              className="w-full sm:w-auto px-4 py-2 rounded bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 flex items-center justify-center gap-2 transition-colors"
            >
              <TrendingUp className="h-4 w-4 text-emerald-300" />
              <span>Live Sensor Telemetry</span>
            </button>
            <button
              onClick={approveValidationAction}
              className="w-full sm:w-auto px-5 py-2 rounded bg-white hover:bg-slate-100 text-[#0F3854] font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <CheckCircle2 className="h-4 w-4 text-[#147452]" />
              <span>Proceed to Validation Report</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar of the 90 days */}
        <div className="mt-8 pt-6 border-t border-[#1D4E72]">
          <div className="flex items-center justify-between text-xs text-slate-300 mb-2 font-mono">
            <span>Pilot Sandbox Day: <strong className="text-white">Day {pilot.currentDay} of {pilot.totalDays}</strong></span>
            <span className="text-emerald-300 font-semibold">Phase: {pilot.phase}</span>
          </div>
          <div className="h-2 w-full bg-[#0A2540] rounded overflow-hidden border border-[#1D4E72]">
            <div 
              className="h-full bg-emerald-400 rounded transition-all duration-500"
              style={{ width: `${Math.round((pilot.currentDay / pilot.totalDays) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* MILESTONE RISK ALERTS BANNER */}
      {hasRiskAlert && (
        <div className="mb-8 p-4 rounded bg-[#FEF7EA] border border-[#F6E1B9] text-xs text-[#8A5B0B] flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 shrink-0 text-[#8A5B0B] mt-0.5" />
          <div>
            <div className="font-bold text-sm">Milestone Risk Warning Detected</div>
            <p className="mt-0.5">
              One or more milestones require evidence re-submission or review attention. Ensure on-site technical inspection documents are logged before milestone deadlines.
            </p>
          </div>
        </div>
      )}

      {/* 5 Pilot Deployment Locations */}
      <div className="mb-8">
        <h2 className="text-base font-bold text-[#0A2540] mb-4 flex items-center gap-2">
          <MapPin className="h-4 w-4 text-[#0F3854]" />
          5 Active Municipal Sandbox Monitoring Sites
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { name: "Ward 12 Intake Pump", ph: "7.2 pH", turb: "1.1 NTU", status: "Nominal", lead: "0.001 mg/L" },
            { name: "Central River Canal #4", ph: "7.4 pH", turb: "1.8 NTU", status: "Nominal", lead: "0.002 mg/L" },
            { name: "North Municipal Tank", ph: "7.1 pH", turb: "0.9 NTU", status: "Nominal", lead: "0.001 mg/L" },
            { name: "East Industrial Border", ph: "7.6 pH", turb: "2.1 NTU", status: "Flagged & Neutralized", lead: "0.004 mg/L" },
            { name: "South Distribution Gate", ph: "7.3 pH", turb: "1.3 NTU", status: "Nominal", lead: "0.001 mg/L" },
          ].map((site, i) => (
            <div key={i} className="bg-white rounded border border-[#E2DED6] p-4 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between font-mono">
                <span className="text-[10px] uppercase font-semibold text-[#5B6A78]">Site 0{i+1}</span>
                <span className="inline-block w-2 h-2 rounded-full bg-[#147452]"></span>
              </div>
              <h3 className="text-xs font-bold text-[#0A2540] truncate">{site.name}</h3>
              <div className="text-[11px] font-mono text-[#5B6A78] space-y-0.5 pt-1 border-t border-[#EDE9E1]">
                <div className="flex justify-between"><span>pH:</span> <strong className="text-[#141F2B]">{site.ph}</strong></div>
                <div className="flex justify-between"><span>Turb:</span> <strong className="text-[#141F2B]">{site.turb}</strong></div>
                <div className="flex justify-between"><span>Heavy Metals:</span> <strong className="text-[#147452]">{site.lead}</strong></div>
              </div>
              <div className="text-[10px] font-mono text-[#147452] bg-[#EBF6F0] border border-[#C2E5D2] p-1 rounded text-center font-semibold">
                {site.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pilot Milestones and Verification Gates */}
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white rounded border border-[#E2DED6] p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#EDE9E1] mb-6">
            <div>
              <h2 className="text-base font-bold text-[#0A2540] flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#147452]" />
                Milestone Progress & Evidence Review
              </h2>
              <p className="text-xs text-[#5B6A78] mt-0.5">
                Every payout tranche requires verifiable field evidence co-signed by technical authorities.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {role === "startup" && (
                <span className="text-[11px] font-mono text-[#147452] bg-[#EBF6F0] px-2 py-0.5 rounded border border-[#C2E5D2]">
                  Startup Mode: Submit Evidence
                </span>
              )}
              {role !== "startup" && (
                <span className="text-[11px] font-mono text-[#0F3854] bg-[#F2EFEB] px-2 py-0.5 rounded border border-[#E2DED6]">
                  Reviewer Mode: Approve/Reject
                </span>
              )}
            </div>
          </div>

          <div className="space-y-4">
            {pilot.milestones.map((milestone) => {
              const isApproved = milestone.status === "Approved";
              const isSubmitted = milestone.status === "Submitted for Review";
              const isPending = milestone.status === "Pending Evidence";
              const isRejected = milestone.status === "Rejected";

              return (
                <div 
                  key={milestone.id} 
                  className={`p-5 rounded border transition-all ${
                    isApproved 
                      ? "bg-[#FAF8F5] border-[#E2DED6]" 
                      : isSubmitted 
                      ? "bg-[#FEF7EA] border-[#F6E1B9]" 
                      : isRejected
                      ? "bg-red-50 border-red-200"
                      : "bg-white border-[#E2DED6]"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className={`h-8 w-8 rounded flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5 border ${
                        isApproved
                          ? "bg-[#EBF6F0] text-[#147452] border-[#C2E5D2]"
                          : isSubmitted
                          ? "bg-[#FEF7EA] text-[#8A5B0B] border-[#F6E1B9]"
                          : isRejected
                          ? "bg-red-100 text-red-700 border-red-300"
                          : "bg-[#F2EFEB] text-[#5B6A78] border-[#E2DED6]"
                      }`}>
                        {isApproved ? "✓" : isSubmitted ? "⏳" : isRejected ? "✗" : "○"}
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-[#0A2540]">{milestone.name}</h3>
                        <p className="text-[11px] font-mono text-[#5B6A78] mt-0.5">
                          Target: {milestone.dueDate} • Allocation: <strong className="text-[#0A2540]">{milestone.payout}</strong>
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                      <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${
                        isApproved 
                          ? "bg-[#EBF6F0] text-[#147452] border-[#C2E5D2]" 
                          : isSubmitted 
                          ? "bg-[#FEF7EA] text-[#8A5B0B] border-[#F6E1B9]"
                          : isRejected
                          ? "bg-red-100 text-red-700 border-red-300"
                          : "bg-[#F2EFEB] text-[#5B6A78] border-[#E2DED6]"
                      }`}>
                        {milestone.status}
                      </span>

                      {/* Action buttons based on status & role */}
                      {(isPending || isRejected) && (
                        <button
                          onClick={() => handleOpenEvidence(milestone)}
                          className="px-3 py-1.5 rounded bg-[#147452] hover:bg-[#0f583e] text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                        >
                          <Upload className="h-3 w-3" />
                          <span>Submit Evidence</span>
                        </button>
                      )}

                      {isSubmitted && (
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleOpenReview(milestone)}
                            className="px-3 py-1.5 rounded bg-[#0F3854] hover:bg-[#1D4E72] text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                          >
                            <FileText className="h-3 w-3" />
                            <span>Review & Decide</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Evidence & Review Notes Details */}
                  {(milestone.evidenceDescription || milestone.paymentRef || milestone.reviewNotes) && (
                    <div className="mt-3 pt-3 border-t border-[#EDE9E1] text-xs font-mono space-y-1.5 text-[#5B6A78]">
                      {milestone.evidenceDescription && (
                        <div>
                          <strong className="text-[#141F2B]">Submitted Evidence:</strong> {milestone.evidenceDescription}
                          {milestone.evidenceUrl && (
                            <a 
                              href={milestone.evidenceUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-[#0F3854] underline ml-2 font-semibold"
                            >
                              [View Evidence Doc]
                            </a>
                          )}
                        </div>
                      )}

                      {milestone.reviewedBy && (
                        <div>
                          <strong className="text-[#141F2B]">Review Authority:</strong> {milestone.reviewedBy} ({milestone.reviewedAt})
                          {milestone.reviewNotes && <span> — &quot;{milestone.reviewNotes}&quot;</span>}
                        </div>
                      )}

                      {milestone.paymentRef && (
                        <div className="text-[#147452] font-semibold flex items-center gap-1 pt-0.5">
                          <DollarSign className="h-3.5 w-3.5" />
                          <span>{milestone.paymentRef}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Card: Recommendation & Validation Summary */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#0F3854] text-white rounded p-6 border border-[#1D4E72]">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-200">
                Pilot Milestone Health Verdict
              </h3>
            </div>
            <div className="p-3 bg-white/10 rounded border border-white/20 text-emerald-300 text-xs font-mono font-semibold mb-3">
              ✓ {pilot.recommendationSummary?.verdict || "Technical Milestones On Schedule"}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              {pilot.recommendationSummary?.notes || "AquaSense sensors maintained uninterrupted uptime with empirical correlation across all pilot wards."}
            </p>
            <div className="text-xs font-mono space-y-2 pt-2 border-t border-[#1D4E72]">
              <div className="flex justify-between">
                <span className="text-slate-300">Composite Score:</span>
                <span className="font-semibold text-emerald-300">{pilot.overallScore} / 100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Statutory Compliance:</span>
                <span className="font-semibold text-white">GFR Rule 173 Guidelines</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveView("validation_report")}
            className="w-full py-3 rounded bg-white hover:bg-slate-100 border border-[#E2DED6] text-[#0F3854] font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <span>Open Comprehensive Validation Report</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* MODAL: SUBMIT EVIDENCE */}
      {evidenceModalOpen && activeMilestone && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl border border-[#E2DED6] max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#EDE9E1]">
              <div className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-[#147452]" />
                <h3 className="text-lg font-bold text-[#0A2540]">Submit Milestone Evidence</h3>
              </div>
              <button 
                onClick={() => setEvidenceModalOpen(false)}
                className="text-[#5B6A78] hover:text-[#141F2B]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="text-xs font-mono text-[#5B6A78]">
              Milestone: <strong className="text-[#0A2540]">{activeMilestone.name}</strong>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-[#141F2B] block">Evidence Summary & Results:</label>
              <textarea
                rows={3}
                value={evidenceDesc}
                onChange={(e) => setEvidenceDesc(e.target.value)}
                className="w-full text-xs p-2.5 rounded border border-[#E2DED6] bg-[#FAF8F5] focus:bg-white"
                placeholder="Describe completed deliverables, physical installation sign-off, or test results..."
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-[#141F2B] block">Evidence Document / Lab Certificate URL:</label>
              <input
                type="text"
                value={evidenceUrl}
                onChange={(e) => setEvidenceUrl(e.target.value)}
                className="w-full text-xs p-2.5 rounded border border-[#E2DED6] bg-[#FAF8F5] focus:bg-white"
                placeholder="https://example.com/evidence/..."
              />
            </div>

            <div className="pt-3 border-t border-[#EDE9E1] flex justify-end gap-2">
              <button
                onClick={() => setEvidenceModalOpen(false)}
                className="px-4 py-2 rounded bg-white border border-[#E2DED6] text-xs font-medium text-[#5B6A78]"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitEvidence}
                className="px-4 py-2 rounded bg-[#147452] hover:bg-[#0f583e] text-white text-xs font-bold"
              >
                Submit Evidence for Review
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: REVIEW EVIDENCE */}
      {reviewModalOpen && activeMilestone && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl border border-[#E2DED6] max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#EDE9E1]">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-[#0F3854]" />
                <h3 className="text-lg font-bold text-[#0A2540]">Review Milestone Deliverable</h3>
              </div>
              <button 
                onClick={() => setReviewModalOpen(false)}
                className="text-[#5B6A78] hover:text-[#141F2B]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="text-xs font-mono text-[#5B6A78]">
              Milestone: <strong className="text-[#0A2540]">{activeMilestone.name}</strong>
            </div>

            {activeMilestone.evidenceDescription && (
              <div className="p-3 rounded bg-[#FAF8F5] border border-[#E2DED6] text-xs text-[#141F2B]">
                <strong className="block text-[11px] font-mono text-[#5B6A78] uppercase mb-1">Submitted Description:</strong>
                {activeMilestone.evidenceDescription}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-[#141F2B] block">Review Decision:</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <input
                    type="radio"
                    name="decision"
                    checked={reviewApproved}
                    onChange={() => setReviewApproved(true)}
                    className="accent-[#147452]"
                  />
                  <span className="text-[#147452]">Approve Milestone & Log Payment Reference</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <input
                    type="radio"
                    name="decision"
                    checked={!reviewApproved}
                    onChange={() => setReviewApproved(false)}
                    className="accent-red-600"
                  />
                  <span className="text-red-600">Reject / Request Remediation</span>
                </label>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-[#141F2B] block">Review Notes & Justification:</label>
              <textarea
                rows={3}
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
                className="w-full text-xs p-2.5 rounded border border-[#E2DED6] bg-[#FAF8F5] focus:bg-white"
                placeholder="Enter approval comments or specify deficiencies that must be addressed..."
              />
            </div>

            <div className="pt-3 border-t border-[#EDE9E1] flex justify-end gap-2">
              <button
                onClick={() => setReviewModalOpen(false)}
                className="px-4 py-2 rounded bg-white border border-[#E2DED6] text-xs font-medium text-[#5B6A78]"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReview}
                className={`px-4 py-2 rounded text-white text-xs font-bold ${
                  reviewApproved ? "bg-[#0F3854] hover:bg-[#1D4E72]" : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {reviewApproved ? "Confirm Approval" : "Record Rejection"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
